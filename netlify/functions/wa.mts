// Pintu masuk PRODUKSI buat /go/wa. Logikanya di lib/kontak-redirect.ts,
// dipakai bareng sama pintu masuk pengembangan di app/go/wa/route.ts.
import { tanganiWhatsApp } from "../../lib/kontak-redirect";

const arahkanKeWhatsApp = async (req: Request): Promise<Response> =>
  tanganiWhatsApp(req, process.env.WHATSAPP_PHONE);

export default arahkanKeWhatsApp;

export const config = { path: "/go/wa" };
