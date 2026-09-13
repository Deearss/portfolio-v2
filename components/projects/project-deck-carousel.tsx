"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ExcelBeforeAfter } from "./excel-before-after";
import { TimesheetHorizontalGallery } from "./timesheet-horizontal-gallery";

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
        <div className="mb-20 sm:mb-28 text-center max-w-3xl mx-auto px-2 sm:px-0">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 tracking-tight text-balance">
            Saya Bisa Bantu Apa?
          </h2>
          <p className="text-sm sm:text-lg text-stone-600 mt-2 sm:mt-3 leading-relaxed text-balance">
            Rangkuman proyek otomatisasi spreadsheet dan aplikasi web yang bisa langsung kamu uji.
          </p>
        </div>

        <div className="space-y-32 sm:space-y-48">

          {/* ========================================================================= */}
          {/* ITEM 1: Demo Landing Page buatan sendiri (Adaptive Dual-Layout) */}
          {/* ========================================================================= */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center max-w-2xl mx-auto border-b border-stone-200/80 pb-3 sm:pb-4 px-2">
              <h3 className="text-xl sm:text-3xl font-extrabold text-stone-900 text-balance">
                Demo Standar Landing Page
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 sm:mt-2.5 leading-relaxed text-balance max-w-lg mx-auto">
                Tiga contoh usaha ini fiktif, tapi kodenya nyata, aktif online, responsif, dan muat di bawah satu detik. Buka dan uji sendiri.
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
                className="flex overflow-x-auto gap-3 snap-x snap-mandatory scroll-smooth pb-1 overscroll-x-contain touch-pan-x scrollbar-none [&::-webkit-scrollbar]:hidden"
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
                      <span className="text-[10px] font-mono text-stone-300 truncate max-w-42.5">
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
                    <div className="relative aspect-16/10 bg-stone-950 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={360}
                        height={225}
                        className="w-full h-full object-cover object-top"
                        priority={idx === 1}
                        loading={idx === 1 ? undefined : "lazy"}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent opacity-50" />
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
                  className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 active:scale-95 shadow-2xs cursor-pointer min-w-9 min-h-9 flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {FAN_CARDS.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => scrollToMobileCard(dotIdx)}
                      aria-label={`Lihat Projek ${dotIdx + 1}`}
                      className="p-2 cursor-pointer inline-flex items-center justify-center min-w-7 min-h-7"
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
                  className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 active:scale-95 shadow-2xs cursor-pointer min-w-9 min-h-9 flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* DESKTOP ONLY VIEW (>= 640px): Fanned Out Floating Cards (Kipas Tangan 3D) */}
            <div className="hidden sm:block">
              <div className="relative pt-6 pb-12 px-4 flex items-center justify-center min-h-115">
                <div className="relative w-full max-w-4xl flex items-center justify-center">
                  {FAN_CARDS.map((card) => {
                    const isHovered = hoveredCardId === card.id;
                    return (
                      <div
                        key={card.id}
                        onMouseEnter={() => setHoveredCardId(card.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                        className={`absolute w-75 md:w-85 transition-all duration-300 ease-out transform cursor-pointer ${card.tilt} ${
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
                            <span className="text-[10px] font-mono text-stone-400 truncate max-w-40">
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
                          <div className="relative aspect-16/10 bg-stone-950 overflow-hidden">
                            <Image
                              src={card.image}
                              alt={card.title}
                              width={340}
                              height={212}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
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
          {/* ITEM 2: Kerjaan Berbayar: Report Timesheet Bongkar Muat Kapal */}
          {/* ========================================================================= */}
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center max-w-2xl mx-auto border-b border-stone-200/80 pb-3 sm:pb-4 px-2">
              <h3 className="text-xl sm:text-3xl font-extrabold text-stone-900 text-balance">
                Timesheet Bongkar Muat Kapal
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 sm:mt-2.5 leading-relaxed text-balance max-w-lg mx-auto">
                Mengubah puluhan baris jam kerja mentah jadi ringkasan tiap crane dan palka, lengkap dengan audit pelacak jam hilang.
              </p>
            </div>

            {/* Peraga: lembar REPORT dan tab AUDIT WAKTU (Horizontal Smooth Scroll) */}
            <TimesheetHorizontalGallery />

            <p className="text-center text-xs sm:text-sm text-orange-600 font-medium px-6 sm:px-0 text-balance">
              Data pada contoh di atas disamarkan untuk menjaga kerahasiaan berkas klien.
            </p>
          </div>
          
          {/* ========================================================================= */}
          {/* ITEM 3: Demo Pembukuan Excel buatan sendiri */}
          {/* ========================================================================= */}
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center max-w-2xl mx-auto border-b border-stone-200/80 pb-3 sm:pb-4 px-2">
              <h3 className="text-xl sm:text-3xl font-extrabold text-stone-900 text-balance">
                Otomatisasi Pembukuan Toko
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 sm:mt-2.5 leading-relaxed text-balance max-w-lg mx-auto">
                Angkanya simulasi dan tokonya fiktif. Membandingkan alur hitung manual tiap malam dengan kalkulasi otomatis.
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
