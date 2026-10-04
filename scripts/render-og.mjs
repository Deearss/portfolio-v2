// Render ulang banner link preview (public/og-image.png) dari
// scripts/og-image.html pakai browser headless.
//
// Banner ini yang muncul waktu link web dikirim lewat WhatsApp/LinkedIn/X,
// dan isinya nyontek hero. Jadi tiap kali teks hero atau description di
// app/layout.tsx berubah, samain dulu teks di og-image.html, lalu:
//
//   npm run og
//
// Butuh Brave/Chrome/Chromium di mesin ini (path-nya bisa dipaksa lewat env
// CHROME_PATH) dan koneksi internet buat ngambil font dari Google Fonts.
//
// Kenapa nggak pakai flag `--screenshot` bawaan Chromium: Brave nyuekin flag
// itu dan malah jalan terus tanpa pernah motret. Jadi browser-nya dikendaliin
// langsung lewat Chrome DevTools Protocol, yang jalan di Brave maupun Chrome.
import { execFileSync, spawn } from "node:child_process";
import { mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function cariBrowser() {
  const kandidat = [
    process.env.CHROME_PATH,
    "brave-browser",
    "google-chrome",
    "chromium",
    "chromium-browser",
  ].filter(Boolean);

  for (const nama of kandidat) {
    try {
      execFileSync("which", [nama], { stdio: "ignore" });
      return nama;
    } catch {
      // coba kandidat berikutnya
    }
  }
  throw new Error("Browser Chromium nggak ketemu. Set CHROME_PATH ke Brave/Chrome.");
}

const jeda = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Buka `url` di browser headless dengan viewport `lebar` x `tinggi`, tunggu
 * font & gambar kelar dimuat, lalu balikin hasil potretnya sebagai Buffer PNG.
 * `cssTambahan` disuntik sebelum dipotret (misal buat nyembunyiin elemen).
 */
export async function potret({ url, lebar, tinggi, cssTambahan = "" }) {
  const profil = mkdtempSync(path.join(tmpdir(), "potret-"));
  const port = 9300 + Math.floor(Math.random() * 500);
  const browser = spawn(
    cariBrowser(),
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--password-store=basic",
      "--hide-scrollbars",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profil}`,
      "about:blank",
    ],
    // Grup proses sendiri: `brave-browser` itu skrip pembungkus, jadi yang
    // dimatiin nanti harus satu grup, bukan cuma pembungkusnya.
    { stdio: "ignore", detached: true },
  );

  try {
    // Tunggu port DevTools siap, lalu ambil tab kosongnya.
    let tab;
    for (let i = 0; i < 100 && !tab; i++) {
      try {
        const daftar = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
        tab = daftar.find((t) => t.type === "page");
      } catch {
        await jeda(200);
      }
    }
    if (!tab) throw new Error("Browser headless nggak nyala dalam 20 detik.");

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((ok, gagal) => {
      ws.onopen = ok;
      ws.onerror = gagal;
    });

    let id = 0;
    const tunggu = new Map();
    const pendengar = new Set();
    ws.onmessage = ({ data }) => {
      const pesan = JSON.parse(data);
      if (pesan.id && tunggu.has(pesan.id)) {
        const { ok, gagal } = tunggu.get(pesan.id);
        tunggu.delete(pesan.id);
        if (pesan.error) gagal(new Error(pesan.error.message));
        else ok(pesan.result);
      } else if (pesan.method) {
        for (const fn of pendengar) fn(pesan);
      }
    };
    const kirim = (method, params = {}) =>
      new Promise((ok, gagal) => {
        tunggu.set(++id, { ok, gagal });
        ws.send(JSON.stringify({ id, method, params }));
      });
    const tungguEvent = (method) =>
      new Promise((ok) => {
        const fn = (pesan) => {
          if (pesan.method === method) {
            pendengar.delete(fn);
            ok(pesan.params);
          }
        };
        pendengar.add(fn);
      });

    await kirim("Page.enable");
    await kirim("Emulation.setDeviceMetricsOverride", {
      width: lebar,
      height: tinggi,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const selesaiMuat = tungguEvent("Page.loadEventFired");
    await kirim("Page.navigate", { url });
    await selesaiMuat;

    await kirim("Runtime.evaluate", {
      expression: `(async () => {
        if (${JSON.stringify(cssTambahan)}) {
          const s = document.createElement("style");
          s.textContent = ${JSON.stringify(cssTambahan)};
          document.head.appendChild(s);
        }
        await document.fonts.ready;
        // Gambar lazy di luar layar nggak pernah dimuat, jadi decode-nya
        // dibatasi waktu biar nggak nunggu selamanya.
        await Promise.race([
          Promise.all([...document.images].map((img) => img.decode().catch(() => {}))),
          new Promise((r) => setTimeout(r, 4000)),
        ]);
      })()`,
      awaitPromise: true,
    });
    // Kasih napas buat animasi masuk (misal garis bawah nama di hero).
    await jeda(1800);

    const { data } = await kirim("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: 0, width: lebar, height: tinggi, scale: 1 },
    });
    // Tutup browser dengan sopan biar semua proses anaknya ikut beres.
    await kirim("Browser.close").catch(() => {});
    ws.close();
    return Buffer.from(data, "base64");
  } finally {
    await jeda(500);
    try {
      process.kill(-browser.pid, "SIGTERM");
    } catch {
      // grupnya udah keburu bubar
    }
    rmSync(profil, { recursive: true, force: true });
  }
}

// Dijalanin langsung (npm run og), bukan di-import.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const output = path.join(root, "public", "og-image.png");
  const mentah = await potret({
    url: pathToFileURL(path.join(root, "scripts", "og-image.html")).href,
    lebar: 1200,
    tinggi: 630,
  });

  // sharp ikut terpasang bareng Next.js. Dikompres biar ukurannya tetap
  // kecil: gambar preview yang kegedean kadang nggak dimunculin WhatsApp.
  const { default: sharp } = await import("sharp");
  await sharp(mentah).png({ compressionLevel: 9 }).toFile(output);

  const { width, height } = await sharp(output).metadata();
  const kb = Math.round(statSync(output).size / 1024);
  console.log(`public/og-image.png: ${width}x${height}, ${kb} KB`);
}
