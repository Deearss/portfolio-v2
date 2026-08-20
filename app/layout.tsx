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
  description: "Portofolio Haidir Aditya. Membantu pembuatan aplikasi web kencang, restrukturisasi Excel, dan otomatisasi sistem digital dengan performa tinggi.",
  keywords: ["Haidir Aditya", "Systems Engineer", "Software Engineer", "Full-Stack Developer", "Next.js", "Shopee WooCommerce Migration", "Excel Data Restructuring"],
  authors: [{ name: "Haidir Aditya" }],
  openGraph: {
    title: "Haidir Aditya — Systems & Software Engineer",
    description: "Portofolio Haidir Aditya. Solusi digital cepat, presisi, dan terstruktur.",
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

