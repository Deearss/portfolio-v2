// Pintu masuk PENGEMBANGAN buat /go/wa, biar tombol WhatsApp bisa dites
// pakai `npm run dev` tanpa nunggu deploy.
//
// Route handler ini nggak ikut ke `out/` karena next.config.ts pakai
// `output: "export"`. Waktu dideploy, netlify/functions/wa.mts yang
// ngelayanin alamat yang sama. Dua-duanya manggil fungsi yang sama persis,
// jadi apa yang kamu lihat di lokal itu yang jalan di produksi.
import { tanganiWhatsApp } from "@/lib/kontak-redirect";

export function GET(req: Request): Response {
  return tanganiWhatsApp(req, process.env.WHATSAPP_PHONE);
}
