// Logika perantara kontak, dipakai bareng oleh dua pintu masuk:
//
//   produksi     netlify/functions/wa.mts      -> /go/wa
//                netlify/functions/email.mts   -> /go/email
//   pengembangan app/go/wa/route.ts            -> /go/wa
//                app/go/email/route.ts         -> /go/email
//
// Ditaruh di satu berkas supaya dua jalur itu nggak bisa diam-diam beda
// perilaku. Situs ini di-export statis, jadi route handler di app/ cuma
// hidup waktu `next dev`; waktu dideploy, Netlify Function yang ngelayanin
// alamat yang sama persis.
//
// Kenapa harus lewat perantara sama sekali: kalau browser yang nyusun
// `wa.me/<nomor>` atau `mailto:<email>`, dua nilai itu wajib ikut ke bundle
// dan ke repo publik, dan di situ pemanen otomatis manennya.
//
// Yang ini TIDAK menyelesaikan: pengunjung yang beneran mengklik tombolnya
// tetap lihat nomor/email di bilah alamat setelah diarahkan. Memang nggak
// bisa dihindari — WhatsApp dan Gmail butuh alamat tujuan.

export const BATAS_ISI = 1200;
export const BATAS_SUBJEK = 200;

/**
 * Buang karakter kontrol lalu potong di panjang maksimum.
 *
 * Tab (\t), baris baru (\n), dan carriage return (\r) SENGAJA dilewatin.
 * Ketiganya bagian sah dari isi pesan — template WhatsApp dan email pakai
 * baris baru buat misahin paragraf, dan kalau ikut dibuang seluruh pesan
 * nempel jadi satu paragraf. Aman dilewatin karena nilainya selalu
 * di-percent-encode dulu (`%0A`) sebelum masuk header `Location`, jadi
 * nggak bisa dipakai nyuntik header. Sisanya, yang nggak pernah sah di
 * teks manusia, tetap dibuang.
 *
 * Rentangnya disamain sama `sanitizeInput` di lib/sanitize.ts biar dua
 * lapis pembersihan ini nggak beda aturan.
 */
export function bersihin(mentah: string, batas: number): string {
  return mentah
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .slice(0, batas);
}

/** Jawaban 302 yang nggak boleh nyangkut di cache mana pun. */
function arahkan(tujuan: string): Response {
  // Pengaman terakhir. Semua nilai di atas udah di-percent-encode, jadi
  // baris ini mestinya nggak pernah ngubah apa-apa — tapi kalau suatu hari
  // ada jalur baru yang lupa encode, header `Location` tetap nggak bisa
  // dibelah jadi dua.
  const aman = tujuan.replace(/[\r\n]/g, "");

  return new Response(null, {
    status: 302,
    headers: {
      location: aman,
      // Jawaban ini mengandung alamat kontak. Jangan sampai kesimpan di
      // CDN Netlify atau di cache browser pengunjung.
      "cache-control": "no-store, private",
      "referrer-policy": "no-referrer",
    },
  });
}

/** Jawaban kalau environment variable-nya belum disetel. */
function belumDisetel(namaVar: string): Response {
  return new Response(
    `Konfigurasi kontak belum lengkap di server: ${namaVar} belum disetel.\n\n` +
      `Produksi : Netlify -> Site configuration -> Environment variables\n` +
      `Lokal    : salin .env.example jadi .env.local, lalu isi nilainya`,
    { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}

/**
 * `/go/wa?text=...` -> redirect ke wa.me.
 * Nomor diambil dari `WHATSAPP_PHONE`, non-digit dibuang supaya format
 * `+62 812-3456-7890` di dashboard tetap kebaca.
 */
export function tanganiWhatsApp(
  req: Request,
  nomorMentah: string | undefined,
): Response {
  const nomor = (nomorMentah || "").replace(/\D/g, "");
  if (!nomor) return belumDisetel("WHATSAPP_PHONE");

  const teks = bersihin(
    new URL(req.url).searchParams.get("text") || "",
    BATAS_ISI,
  );

  return arahkan(
    teks
      ? `https://wa.me/${nomor}?text=${encodeURIComponent(teks)}`
      : `https://wa.me/${nomor}`,
  );
}

/**
 * `/go/email?subject=...&body=...` -> redirect ke jendela tulis Gmail.
 *
 * Sengaja Gmail web, bukan `mailto:`. Alasannya bukan selera: `mailto:`
 * cuma jalan kalau pengunjung punya klien surat yang kedaftar di
 * perangkatnya, sementara Gmail web jalan di mana saja termasuk HP yang
 * cuma punya peramban.
 */
export function tanganiEmail(
  req: Request,
  emailMentah: string | undefined,
): Response {
  const email = bersihin(emailMentah || "", 254).trim();
  // Pemeriksaan seadanya, cuma buat mastiin nilainya nggak kosong dan
  // nggak bikin URL rusak. Bukan validasi RFC.
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return belumDisetel("CONTACT_EMAIL");
  }

  const q = new URL(req.url).searchParams;
  const subjek = bersihin(q.get("subject") || "", BATAS_SUBJEK);
  const isi = bersihin(q.get("body") || "", BATAS_ISI);

  const tujuan = new URL("https://mail.google.com/mail/");
  tujuan.searchParams.set("view", "cm");
  tujuan.searchParams.set("fs", "1");
  tujuan.searchParams.set("to", email);
  if (subjek) tujuan.searchParams.set("su", subjek);
  if (isi) tujuan.searchParams.set("body", isi);

  return arahkan(tujuan.toString());
}
