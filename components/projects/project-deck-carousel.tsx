"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { ExcelBeforeAfter } from "./excel-before-after";

interface FannedCardItem {
  id: string;
  title: string;
  shortTitle: string;
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
    shortTitle: "Jasa AC",
    category: "Services Showcase",
    image: "/showcase/ac.webp",
    liveUrl: "https://demo-jasa-ac.netlify.app",
    tilt: "-rotate-8 sm:-translate-x-[200px] md:-translate-x-[260px] scale-[0.92] sm:scale-95 hover:-rotate-2 hover:-translate-y-3 hover:scale-105",
    zIndex: 10,
  },
  {
    id: "wedding",
    title: "Landing Page Wedding Organizer",
    shortTitle: "Wedding",
    category: "Commercial Showcase",
    image: "/showcase/wedding.webp",
    liveUrl: "https://demo-wedding-organizer.netlify.app",
    tilt: "rotate-0 z-20 scale-105 sm:scale-110 shadow-2xl hover:-translate-y-3 hover:scale-115",
    zIndex: 20,
  },
  {
    id: "es-batu",
    title: "Landing Page Langganan Es Batu Kristal",
    shortTitle: "Es Batu Kristal",
    category: "B2B Subscription",
    image: "/showcase/es-batu.webp",
    liveUrl: "https://demo-es-batu.netlify.app",
    tilt: "rotate-8 sm:translate-x-[200px] md:translate-x-[260px] scale-[0.92] sm:scale-95 hover:rotate-2 hover:-translate-y-3 hover:scale-105",
    zIndex: 10,
  },
];

export function ProjectDeckCarousel() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(1); // default wedding
  const mobileSliderRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef<boolean>(false);

  const scrollToMobileCard = (index: number) => {
    setActiveMobileIndex(index);
    const container = mobileSliderRef.current;
    if (container) {
      isProgrammaticScroll.current = true;
      const targetChild = container.children[index] as HTMLElement | undefined;
      if (targetChild) {
        container.scrollTo({
          left: targetChild.offsetLeft,
          behavior: "smooth",
        });
      }
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 400);
    }
  };

  const handleMobileScroll = () => {
    if (isProgrammaticScroll.current) return;
    const container = mobileSliderRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const newIndex = Math.round(scrollLeft / (cardWidth || 1));
    if (newIndex >= 0 && newIndex < FAN_CARDS.length && newIndex !== activeMobileIndex) {
      setActiveMobileIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = mobileSliderRef.current;
    if (container && container.children[1]) {
      const weddingCard = container.children[1] as HTMLElement;
      container.scrollTo({
        left: weddingCard.offsetLeft,
        behavior: "instant",
      });
    }
  }, []);

  return (
    <section id="projek" className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-20 bg-[#FAFAF9] border-b border-stone-200/60 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
        
        {/* Main Section Title Header */}
        <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto px-2 sm:px-0">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight text-balance">
            Saya Bisa Bantu Apa?
          </h2>
          <p className="text-xs sm:text-base text-stone-600 mt-2 sm:mt-3 leading-relaxed text-balance">
            Rak pertama kerjaan yang sudah dibayar orang. Sisanya demo yang saya bikin sendiri buat nunjukin standar kerja saya.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-24">

          {/* ========================================================================= */}
          {/* ITEM 1: Kerjaan Berbayar — Report Timesheet Bongkar Muat Kapal */}
          {/* ========================================================================= */}
          <div className="space-y-4 sm:space-y-6">
            <div className="border-b border-stone-200/80 pb-3 sm:pb-4 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1 sm:mb-1.5">
                <span className="text-[11px] sm:text-xs font-bold text-[#1565C0] uppercase tracking-wider">
                  01. Kerjaan Berbayar
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8F5E9] border border-emerald-200 text-[10px] font-bold text-[#2E7D32] uppercase tracking-wide">
                  <BadgeCheck className="w-3 h-3 shrink-0" />
                  <span>Sudah dibayar lunas</span>
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-stone-900 text-balance">
                Report Timesheet Bongkar Muat Kapal
              </h3>
            </div>

            {/* Narasi: Masalah — Yang saya bangun — Buktinya */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-stone-200 shadow-xs">
                <p className="text-xs font-bold text-stone-900 mb-1.5">Masalahnya.</p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Timesheet bongkar muat itu puluhan baris jam mentah. Buat nagih, jam yang hilang harus ketahuan sampai ke barisnya. Dihitung manual, selisih beberapa jam gampang lolos.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-stone-200 shadow-xs">
                <p className="text-xs font-bold text-stone-900 mb-1.5">Yang saya bangun.</p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Satu file Excel: timesheet mentah masuk, report keluar. Jam operasi per crane, per palka, plus tab audit yang nunjukin tiap jam hilang sampai ke nomor barisnya.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-lg bg-[#E3F2FD] border border-[#BBDEFB] shadow-xs flex flex-col">
                <p className="text-xs font-bold text-stone-900 mb-1.5">Buktinya.</p>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed flex-1">
                  Dikerjain lewat projects.co.id, sudah dibayar lunas, dapat ulasan 10,00. Jangan percaya kutipan saya \u2014 baca sendiri di sana.
                </p>
                <a
                  href="https://projects.co.id/public/browse_users/view/2eaf56/dier-dieeerrr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Cek ulasan klien bernilai 10,00 di profil Projects.co.id"
                  className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1976D2] text-white text-xs font-bold hover:bg-[#1565C0] active:scale-95 transition-all shadow-xs"
                >
                  <span>Cek Ulasannya di projects.co.id</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Peraga: halaman REPORT & tab AUDIT WAKTU */}
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  src: "/timesheet-kapal/report.webp",
                  label: "Halaman 1 — Report jadi",
                  w: 1400,
                  h: 1396,
                  alt: "Halaman report timesheet: ringkasan cargo, performa tiap crane, durasi tiap cargo hold, penyebab stop, dan dua grafik",
                },
                {
                  src: "/timesheet-kapal/audit.webp",
                  label: "Halaman 2 — Tab audit waktu",
                  w: 1400,
                  h: 1036,
                  alt: "Tab audit waktu: rincian tiap jam yang belum tercatat, lengkap dengan nomor baris timesheet asalnya",
                },
              ].map((peraga) => (
                <div
                  key={peraga.src}
                  className="rounded-xl border border-stone-300 bg-white shadow-md overflow-hidden"
                >
                  <div className="px-3 sm:px-4 py-2.5 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] sm:text-xs font-bold text-stone-700">
                      {peraga.label}
                    </span>
                    <a
                      href={peraga.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Buka ${peraga.label} dalam ukuran penuh`}
                      className="text-[11px] font-bold text-[#1565C0] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Buka ukuran penuh</span>
                      <ArrowUpRight className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                  <Image
                    src={peraga.src}
                    alt={peraga.alt}
                    width={peraga.w}
                    height={peraga.h}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="p-3.5 sm:p-4 rounded-lg bg-stone-100 border border-stone-200">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                <span className="font-bold text-stone-900">Catatan.</span>{" "}
                Peraga di atas bukan berkas klien saya \u2014 templat yang sama, diisi ulang pakai data karangan. Berkas klien nggak akan pernah saya pajang, punya kamu juga nanti begitu.
              </p>
            </div>
          </div>
          
          {/* ========================================================================= */}
          {/* ITEM 2: Demo Landing Page buatan sendiri (Adaptive Dual-Layout) */}
          {/* ========================================================================= */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 border-b border-stone-200/80 pb-3 sm:pb-4 text-center sm:text-left">
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-0.5 sm:mb-1">
                  02. Demo Buatan Sendiri
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-stone-900 text-balance">
                  Landing Page yang Saya Bikin buat Nunjukin Standar
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto sm:mx-0 text-balance">
                Tiga usahanya fiktif, saya karang sendiri. Kodenya nggak: ketiganya beneran online, responsif, dan muat di bawah satu detik. Buka dan uji sendiri.
              </p>
            </div>

            {/* MOBILE ONLY VIEW (< 640px): Interactive Touch Card Deck with Smooth Sliding Carousel */}
            <div className="block sm:hidden">
              {/* Segmented Project Selector Tabs */}
              <div className="flex items-center justify-between bg-stone-200/70 p-1 rounded-xl mb-4 gap-1">
                {FAN_CARDS.map((card, idx) => (
                  <button
                    key={card.id}
                    onClick={() => scrollToMobileCard(idx)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeMobileIndex === idx
                        ? "bg-[#1565C0] text-white shadow-xs"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
                    }`}
                  >
                    {card.shortTitle}
                  </button>
                ))}
              </div>

              {/* Smooth Sliding Carousel Track */}
              <div
                ref={mobileSliderRef}
                onScroll={handleMobileScroll}
                className="flex overflow-x-auto gap-3 snap-x snap-mandatory scroll-smooth pb-1 overscroll-x-contain touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {FAN_CARDS.map((card, idx) => (
                  <div
                    key={card.id}
                    className="w-full shrink-0 snap-center bg-stone-900 rounded-xl border border-stone-700/80 shadow-xl overflow-hidden"
                  >
                    {/* Browser Window Header Bar */}
                    <div className="px-3 py-2 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      </div>
                      <span className="text-[10px] font-mono text-stone-300 truncate max-w-[170px]">
                        {card.title}
                      </span>
                      <a
                        href={card.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#42A5F5] hover:text-white p-1 transition-colors"
                        aria-label={`Buka Live Demo ${card.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Screenshot Preview Image */}
                    <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={360}
                        height={225}
                        className="w-full h-full object-cover object-top"
                        priority={idx === 1}
                        loading={idx === 1 ? undefined : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-50" />
                    </div>

                    {/* Footer Strip with Direct CTA */}
                    <div className="px-3 py-2 bg-stone-900 flex items-center justify-between gap-2 border-t border-stone-800">
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-stone-100 block truncate">
                          {card.title}
                        </span>
                        <span className="text-[9.5px] text-stone-400 block font-mono">
                          {card.category}
                        </span>
                      </div>
                      <a
                        href={card.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Buka Demo ${card.title}`}
                        className="px-2.5 py-1 rounded-md bg-[#1976D2] hover:bg-[#1565C0] text-white text-[11px] font-bold shrink-0 inline-flex items-center gap-1 transition-all shadow-2xs active:scale-95 cursor-pointer"
                      >
                        <span>Buka Demo</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Carousel Controls & Gesture Cue */}
              <div className="flex items-center justify-between mt-3 text-xs text-stone-500 px-1">
                <button
                  onClick={() =>
                    scrollToMobileCard(
                      (activeMobileIndex - 1 + FAN_CARDS.length) % FAN_CARDS.length
                    )
                  }
                  aria-label="Projek Sebelumnya"
                  className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 active:scale-95 shadow-2xs cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {FAN_CARDS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => scrollToMobileCard(dotIdx)}
                      aria-label={`Lihat Projek ${dotIdx + 1}`}
                      className="p-2 cursor-pointer inline-flex items-center justify-center min-w-[28px] min-h-[28px]"
                    >
                      <span
                        className={`h-2 rounded-full transition-all duration-200 ${
                          activeMobileIndex === dotIdx ? "w-6 bg-[#1565C0]" : "w-2 bg-stone-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    scrollToMobileCard((activeMobileIndex + 1) % FAN_CARDS.length)
                  }
                  aria-label="Projek Selanjutnya"
                  className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 active:scale-95 shadow-2xs cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* DESKTOP ONLY VIEW (>= 640px): Fanned Out Floating Cards (Kipas Tangan 3D) */}
            <div className="hidden sm:block">
              <div className="relative pt-6 pb-12 px-4 flex items-center justify-center min-h-[460px]">
                <div className="relative w-full max-w-4xl flex items-center justify-center">
                  {FAN_CARDS.map((card) => {
                    const isHovered = hoveredCardId === card.id;
                    return (
                      <div
                        key={card.id}
                        onMouseEnter={() => setHoveredCardId(card.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                        className={`absolute w-[300px] md:w-[340px] transition-all duration-300 ease-out transform cursor-pointer ${card.tilt} ${
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
          </div>

          {/* ========================================================================= */}
          {/* ITEM 3: Demo Pembukuan Excel buatan sendiri */}
          {/* ========================================================================= */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 border-b border-stone-200/80 pb-3 sm:pb-4 text-center sm:text-left">
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-0.5 sm:mb-1">
                  03. Demo Buatan Sendiri
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-stone-900 text-balance">
                  Pembukuan Toko yang Berhenti Dihitung Manual
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto sm:mx-0 text-balance">
                Angkanya karangan saya, tokonya nggak ada. Yang saya tunjukin bukan omsetnya, tapi bedanya: kiri dijumlah manual tiap malam, kanan ngitung sendiri.
              </p>
            </div>

            {/* Interactive Before vs After Component */}
            <div>
              <ExcelBeforeAfter />
            </div>

            <div className="flex justify-end">
              <a
                href="#kontak"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 active:scale-95 transition-all shadow-sm"
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
