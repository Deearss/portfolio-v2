// Pintu masuk PENGEMBANGAN buat /go/email. Lihat catatan di
// app/go/wa/route.ts — polanya sama.
import { tanganiEmail } from "@/lib/kontak-redirect";

export function GET(req: Request): Response {
  return tanganiEmail(req, process.env.CONTACT_EMAIL);
}
