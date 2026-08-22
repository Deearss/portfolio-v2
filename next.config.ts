import type { NextConfig } from "next";

// Perantara kontak di app/go/ harus dinamis: tujuannya disusun per
// permintaan. Tapi `output: "export"` nolak route handler `GET` apa pun
// yang nggak `force-static`, dan larangan itu berlaku di `next dev` juga.
//
// Dua penyesuaian di bawah bikin perantara itu hidup pas ngoding tanpa
// ngubah hasil deploy sedikit pun:
//
//   1. `output: "export"` cuma dipasang waktu build produksi.
//   2. Berkasnya dinamai `route.dev.ts`, dan akhiran itu cuma didaftarin
//      sebagai berkas route waktu `next dev`. Waktu build, berkasnya nggak
//      dikenali sama sekali jadi nggak ikut diekspor.
//
// Di produksi, netlify/functions/ yang ngelayanin alamat yang sama persis,
// manggil fungsi yang sama di lib/kontak-redirect.ts.
//
// Konsekuensi yang perlu diingat: karena `output: "export"` nggak aktif
// waktu ngoding, `next dev` nggak akan negur kalau ada fitur lain yang
// sebenernya nggak kompatibel sama static export. `npm run build` tetap
// negur, jadi jalanin itu sebelum deploy.
const modePengembangan = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  ...(modePengembangan ? {} : { output: "export" as const }),
  images: {
    unoptimized: true,
  },
  pageExtensions: modePengembangan
    ? ["tsx", "ts", "jsx", "js", "dev.ts"]
    : ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;
