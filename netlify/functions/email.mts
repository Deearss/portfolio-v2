// Pintu masuk PRODUKSI buat /go/email. Logikanya di lib/kontak-redirect.ts,
// dipakai bareng sama pintu masuk pengembangan di app/go/email/route.ts.
import { tanganiEmail } from "../../lib/kontak-redirect";

const arahkanKeEmail = async (req: Request): Promise<Response> =>
  tanganiEmail(req, process.env.CONTACT_EMAIL);

export default arahkanKeEmail;

export const config = { path: "/go/email" };
