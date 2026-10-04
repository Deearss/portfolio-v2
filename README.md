# deearss: Portfolio v2

Personal portfolio of Haidir Aditya, a fullstack developer from Banjarmasin, Indonesia.
Live at [deearss.netlify.app](https://deearss.netlify.app).

## Stack

- Next.js 16 (App Router, static export), React 19, TypeScript
- Tailwind CSS v4
- Netlify Functions for the contact relay

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in WHATSAPP_PHONE and CONTACT_EMAIL
npm run dev
```

## Scripts

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Dev server on port 3000                       |
| `npm run build` | Static export to `out/` (run before deploying) |
| `npm run lint`  | ESLint                                        |

## Contact relay

The WhatsApp number and email address never ship to the browser. The contact
buttons point to `/go/wa` and `/go/email`; a server-side handler reads
`WHATSAPP_PHONE` and `CONTACT_EMAIL` and answers with a 302 redirect.

The logic lives in `lib/kontak-redirect.ts` and is shared by two entry points:
`netlify/functions/*.mts` in production and `app/go/*/route.dev.ts` during
`npm run dev`.

## Deploy

Netlify builds the `main` branch with `npm run build` and publishes `out/`.
