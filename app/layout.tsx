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
  title: "Haidir Aditya — Systems & Software Engineer",
  description: "Kerjaan manual yang berantakan, saya ubah jadi sistem yang jalan sendiri. Data, dokumen, dan aplikasi web \u2014 hasilnya bisa kamu cek sendiri.",
  keywords: ["Haidir Aditya", "deearss", "Systems Engineer", "Software Engineer", "Freelance Indonesia", "Next.js", "Otomatisasi Excel", "Restrukturisasi Pembukuan"],
  authors: [{ name: "Haidir Aditya" }],
  openGraph: {
    title: "Haidir Aditya — Systems & Software Engineer",
    description: "Kerjaan manual yang berantakan, saya ubah jadi sistem yang jalan sendiri. Data, dokumen, dan aplikasi web.",
    url: "https://my.id",
    siteName: "Haidir Aditya Portfolio",
    type: "website",
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

