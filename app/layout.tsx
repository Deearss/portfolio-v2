import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Patua_One, PT_Serif } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const patuaOne = Patua_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const ptSerif = PT_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Haidir Aditya — Systems & Software Engineer",
  description: "Portofolio Haidir Aditya. Membantu kamu mempermudah proses input Excel, pembuatan aplikasi web internal ERP, migrasi data e-commerce, hingga translasi kontekstual.",
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
      className={`${plusJakartaSans.variable} ${patuaOne.variable} ${ptSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF9] text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}

