"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ArrowUpRight,
  BadgeCheck,
} from "lucide-react";
import { ExcelBeforeAfter } from "./excel-before-after";

interface FannedCardItem {
  id: string;
  title: string;
  category: string;
  image: string;
  liveUrl: string;
  tilt: string;
  zIndex: number;
}

const FAN_CARDS: FannedCardItem[] = [
  {
    id: "ac",
    title: "Landing Page Jasa AC Skala Proyek",
    category: "Services Showcase",
    image: "/showcase/ac.webp",
    liveUrl: "https://demo-jasa-ac.netlify.app",
    tilt: "-rotate-8 -translate-x-[130px] sm:-translate-x-[200px] md:-translate-x-[260px] scale-[0.92] sm:scale-95 hover:-rotate-2 hover:-translate-y-3 hover:scale-105",
    zIndex: 10,
  },
  {
    id: "wedding",
    title: "Landing Page Wedding Organizer",
    category: "Commercial Showcase",
    image: "/showcase/wedding.webp",
    liveUrl: "https://demo-wedding-organizer.netlify.app",
    tilt: "rotate-0 z-20 scale-105 sm:scale-110 shadow-2xl hover:-translate-y-3 hover:scale-115",
    zIndex: 20,
  },
  {
    id: "es-batu",
    title: "Landing Page Langganan Es Batu Kristal",
    category: "B2B Subscription",
    image: "/showcase/es-batu.webp",
    liveUrl: "https://demo-es-batu.netlify.app",
    tilt: "rotate-8 translate-x-[130px] sm:translate-x-[200px] md:translate-x-[260px] scale-[0.92] sm:scale-95 hover:rotate-2 hover:-translate-y-3 hover:scale-105",
    zIndex: 10,
  },
];

export function ProjectDeckCarousel() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <section id="projek" className="py-20 bg-[#FAFAF9] border-b border-stone-200/60 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Section Title Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Saya Bisa Bantu Apa?
          </h2>
          <p className="text-base text-stone-600 mt-3 leading-relaxed">
            Dua rak di bawah ini beda status, dan saya pisahin sengaja. Rak pertama kerjaan yang sudah dibayar orang. Rak kedua demo yang saya bikin sendiri buat nunjukin standar kerja saya.
          </p>
        </div>

        <div className="space-y-24">

          {/* ========================================================================= */}
          {/* ITEM 1: Kerjaan Berbayar — Report Timesheet Bongkar Muat Kapal */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-[#1565C0] uppercase tracking-wider">
                    01. Kerjaan Berbayar
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8F5E9] border border-emerald-200 text-[10px] font-bold text-[#2E7D32] uppercase tracking-wide">
                    <BadgeCheck className="w-3 h-3 shrink-0" />
                    <span>Sudah dibayar lunas</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Report Timesheet Bongkar Muat Kapal
                </h3>
              </div>
            </div>

            {/* Narasi: Masalah — Solusi — Bukti */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white border border-stone-200 shadow-xs">
                <p className="text-xs font-bold text-stone-900 mb-1.5">Masalahnya.</p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Timesheet bongkar muat kapal itu puluhan baris catatan jam mentah. Buat nagih ke pihak lain, jam yang hilang harus ketahuan sampai ke barisnya, bukan cuma totalnya. Selama masih dihitung manual, selisih beberapa jam gampang lolos.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-stone-200 shadow-xs">
                <p className="text-xs font-bold text-stone-900 mb-1.5">Yang saya bangun.</p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Satu berkas Excel yang narik timesheet mentah jadi report jadi: jam operasi per crane, per palka, dan satu tab audit yang nunjukin tiap jam yang nggak tercatat lengkap sama nomor barisnya. Kamu nggak perlu percaya angkanya, tab auditnya yang buktiin.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#E3F2FD] border border-[#BBDEFB] shadow-xs flex flex-col">
                <p className="text-xs font-bold text-stone-900 mb-1.5">Buktinya.</p>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed flex-1">
                  Projek ini saya kerjain lewat projects.co.id dan sudah dibayar lunas. Ada satu ulasan bernilai 10,00 di profil saya. Silakan baca sendiri di sana, jangan percaya kutipan saya.
                </p>
                <a
                  href="https://projects.co.id/public/browse_users/view/2eaf56/dier-dieeerrr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Cek ulasan klien bernilai 10,00 di profil Projects.co.id"
                  className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#1976D2] text-white text-xs font-bold hover:bg-[#1565C0] active:scale-95 transition-all shadow-xs"
                >
                  <span>Cek Ulasannya di projects.co.id</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Peraga: halaman REPORT & tab AUDIT WAKTU */}
            <div className="space-y-4">
              <div className="rounded-xl border border-stone-300 bg-white shadow-md overflow-hidden">
                <div className="px-4 py-2.5 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] sm:text-xs font-bold text-stone-700">
                    Halaman 1 — Report jadi
                  </span>
                  <a
                    href="/timesheet-kapal/report.webp"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Buka peraga halaman report dalam ukuran penuh"
                    className="text-[11px] font-bold text-[#1565C0] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Buka ukuran penuh</span>
                    <ArrowUpRight className="w-3 h-3 shrink-0" />
                  </a>
                </div>
                <Image
                  src="/timesheet-kapal/report.webp"
                  alt="Halaman report timesheet: ringkasan cargo, performa tiap crane, durasi tiap cargo hold, penyebab stop, dan dua grafik"
                  width={1400}
                  height={1396}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              <div className="rounded-xl border border-stone-300 bg-white shadow-md overflow-hidden">
                <div className="px-4 py-2.5 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] sm:text-xs font-bold text-stone-700">
                    Halaman 2 — Tab audit waktu
                  </span>
                  <a
                    href="/timesheet-kapal/audit.webp"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Buka peraga tab audit waktu dalam ukuran penuh"
                    className="text-[11px] font-bold text-[#1565C0] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Buka ukuran penuh</span>
                    <ArrowUpRight className="w-3 h-3 shrink-0" />
                  </a>
                </div>
                <Image
                  src="/timesheet-kapal/audit.webp"
                  alt="Tab audit waktu: rincian tiap jam yang belum tercatat, lengkap dengan nomor baris timesheet asalnya"
                  width={1400}
                  height={1036}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-stone-100 border border-stone-200">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                <span className="font-bold text-stone-900">Catatan.</span>{" "}
                Peraga di atas bukan berkas klien saya. Ini templat yang sama, saya isi ulang pakai data pelayaran karangan. Berkas klien nggak akan pernah saya pajang di mana pun, punya kamu juga nanti begitu.
              </p>
            </div>
          </div>


          {/* ========================================================================= */}
          {/* ITEM 2: Demo Landing Page buatan sendiri (Fanned Floating Cards Layout) */}
          {/* ========================================================================= */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
              <div>
                <span className="text-xs font-bold text-[#1565C0] uppercase tracking-wider block mb-1">
                  02. Demo Buatan Sendiri
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Landing Page buatan Haidir
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md">
                Koleksi website landing page dengan desain responsif, load instan di bawah 1 detik, dan antarmuka profesional.
              </p>
            </div>

            {/* Fanned Out Floating Cards (Kipas Tangan Style) */}
            <div className="relative pt-6 pb-12 px-4 flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
              <div className="relative w-full max-w-4xl flex items-center justify-center">
                {FAN_CARDS.map((card) => {
                  const isHovered = hoveredCardId === card.id;
                  return (
                    <div
                      key={card.id}
                      onMouseEnter={() => setHoveredCardId(card.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      className={`absolute w-[220px] sm:w-[300px] md:w-[340px] transition-all duration-300 ease-out transform cursor-pointer ${card.tilt} ${
                        isHovered ? "z-40 scale-105 shadow-2xl" : ""
                      }`}
                      style={{ zIndex: isHovered ? 40 : card.zIndex }}
                    >
                      <div className="bg-stone-900 rounded-xl border border-stone-700/80 shadow-xl overflow-hidden group">
                        {/* Browser Window Header Bar */}
                        <div className="px-3.5 py-2 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                          </div>
                          <span className="text-[10px] font-mono text-stone-400 truncate max-w-[160px]">
                            {card.title}
                          </span>
                          <a
                            href={card.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#42A5F5] hover:text-white p-1 transition-colors"
                            aria-label={`Buka Live Demo ${card.title}`}
                            title="Buka Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Screenshot Preview Image */}
                        <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
                          <Image
                            src={card.image}
                            alt={card.title}
                            width={340}
                            height={212}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                        </div>

                        {/* Footer Strip */}
                        <div className="p-3 bg-stone-900 flex items-center justify-between gap-2 border-t border-stone-800">
                          <span className="text-[11px] font-semibold text-stone-200 truncate">
                            {card.title}
                          </span>
                          <a
                            href={card.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Live Demo ${card.title}`}
                            className="px-2.5 py-1 rounded bg-[#1976D2] hover:bg-[#1565C0] text-white text-[11px] font-bold shrink-0 inline-flex items-center gap-1 transition-all"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Demo Links Pill List below Fan Cards */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {FAN_CARDS.map((card) => (
                <a
                  key={card.id}
                  href={card.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-[#E3F2FD] hover:text-[#1565C0] hover:border-[#BBDEFB] transition-all shadow-xs inline-flex items-center gap-1.5"
                >
                  <span>{card.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                </a>
              ))}
            </div>
          </div>


          {/* ========================================================================= */}
          {/* ITEM 3: Demo Pembukuan Excel buatan sendiri */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  03. Demo Buatan Sendiri
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  Rapikan &amp; Permak File Excel
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md">
                Mengubah file pembukuan &amp; stok toko sembako yang berhamburan menjadi sistem data yang teratur, otomatis, dan gampang digunakan.
              </p>
            </div>

            {/* Interactive Before vs After Component */}
            <div>
              <ExcelBeforeAfter />
            </div>

            <div className="flex justify-end">
              <a
                href="#kontak"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 active:scale-95 transition-all shadow-sm"
              >
                <span>Konsultasi Rapikan Excel</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
