import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deearss.netlify.app"),
  title: "Haidir Aditya — Systems & Software Engineer",
  description:
    "Kerjaan manual yang berantakan, saya ubah jadi sistem yang jalan sendiri. Data, dokumen, dan aplikasi web \u2014 hasilnya bisa kamu cek sendiri, bukan yang harus kamu percaya begitu saja.",
  keywords: [
    "Haidir Aditya",
    "deearss",
    "Systems Engineer",
    "Software Engineer",
    "Freelance Indonesia",
    "Next.js",
    "Otomatisasi Excel",
    "Restrukturisasi Pembukuan",
    "Web Performance Optimization",
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
    title: "Haidir Aditya — Systems & Software Engineer",
    description:
      "Kerjaan manual yang berantakan, saya ubah jadi sistem yang jalan sendiri. Data, dokumen, dan aplikasi web.",
    url: "https://deearss.netlify.app",
    siteName: "Haidir Aditya — Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Haidir Aditya — Systems & Software Engineer Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haidir Aditya — Systems & Software Engineer",
    description:
      "Membantu pembuatan aplikasi web kencang, restrukturisasi Excel, dan otomatisasi sistem digital dengan performa tinggi.",
    images: ["/og-image.png"],
    creator: "@Deearss",
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
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF9] text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}

