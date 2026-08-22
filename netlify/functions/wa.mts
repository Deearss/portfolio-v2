// Perantara WhatsApp.
//
// Kenapa ada: situs ini di-export statis, jadi kalau tombol WA langsung
// nyusun URL `wa.me/<nomor>` di browser, nomornya wajib ikut ke bundle dan
// ke repo publik. Fungsi ini mindahin penyusunan URL itu ke sisi server —
// nomornya cuma hidup di environment variable Netlify, dan browser nggak
// pernah nerima nomornya sampai dia beneran diarahkan ke WhatsApp.
//
// Yang ini TIDAK menyelesaikan: siapa pun yang klik tombolnya tetap lihat
// nomornya di bilah alamat setelah diarahkan. Yang dicegat cuma pemanen
// otomatis yang cuma baca HTML/JS halaman.

const BATAS_TEKS = 1200;

// Karakter kontrol (termasuk CR dan LF) harus dibuang sebelum nilainya
// nempel di header Location, kalau nggak bisa dipakai nyuntik header.
function bersihin(mentah: string): string {
  return mentah.replace(/[\u0000-\u001F\u007F]/g, "").slice(0, BATAS_TEKS);
}

const arahkanKeWhatsApp = async (req: Request): Promise<Response> => {
  const nomor = (process.env.WHATSAPP_PHONE || "").replace(/\D/g, "");

  if (!nomor) {
    return new Response(
      "Nomor WhatsApp belum disetel di server. Isi WHATSAPP_PHONE di Netlify → Site configuration → Environment variables.",
      { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }

  const teks = bersihin(new URL(req.url).searchParams.get("text") || "");
  const tujuan = teks
    ? `https://wa.me/${nomor}?text=${encodeURIComponent(teks)}`
    : `https://wa.me/${nomor}`;

  return new Response(null, {
    status: 302,
    headers: {
      location: tujuan,
      // Jawaban ini mengandung nomor. Jangan sampai nyangkut di cache CDN
      // Netlify atau di cache browser pengunjung.
      "cache-control": "no-store, private",
      "referrer-policy": "no-referrer",
    },
  });
};

export default arahkanKeWhatsApp;

export const config = { path: "/go/wa" };
