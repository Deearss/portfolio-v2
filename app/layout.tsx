import type { Metadata } from "next";
import { Cactus_Classical_Serif, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const cactusClassicalSerif = Cactus_Classical_Serif({
  variable: "--font-cactus",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Teks link preview (WhatsApp, LinkedIn, X) nyontek hero di
// components/hero/railway-hero.tsx dan ikut kecetak di banner
// scripts/og-image.html. Ubah salah satu, samain semuanya, lalu render ulang
// bannernya: npm run og
const TITLE = "Haidir Aditya | Fullstack Developer";
const DESCRIPTION =
  "I build scalable web apps with a rigorous Definition of Done and clean systems architecture. Powered by modern AI tools daily.";
// Naikin angka `v` tiap og-image.png dirender ulang, biar WhatsApp & sosmed
// ngambil banner baru, bukan banner lama yang udah mereka simpan.
const OG_IMAGE = "/og-image.png?v=2";

export const metadata: Metadata = {
  metadataBase: new URL("https://deearss.netlify.app"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Haidir Aditya",
    "deearss",
    "Fullstack Developer",
    "Web Developer",
    "Remote Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Laravel",
    "Indonesia",
  ],
  authors: [{ name: "Haidir Aditya", url: "https://github.com/Deearss" }],
  creator: "Haidir Aditya",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://deearss.netlify.app",
    siteName: "Haidir Aditya Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Haidir Aditya | Fullstack Developer Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cactusClassicalSerif.variable} ${sourceSerif4.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#2D2A28]">
        {children}
      </body>
    </html>
  );
}

