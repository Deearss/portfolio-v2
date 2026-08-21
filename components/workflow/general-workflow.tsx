"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Search,
  Compass,
  Zap,
  MessageCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  ArrowRight,
} from "lucide-react";

interface WorkflowStep {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  image: string;
  highlight: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    num: "01",
    title: "Cari Tau Klien Maunya Apa",
    desc: "Diskusi mendalam mengenai kebutuhan, fitur utama, preferensi desain, dan target penyelesaian projek agar hasil tepat sasaran.",
    icon: Search,
    image: "/roadmap-image/alur-1.webp",
    highlight: "Konsultasi & Discovery",
  },
  {
    num: "02",
    title: "Pilih Solusi Terbaik Buat Masalah Klien",
    desc: "Menentukan arsitektur sistem, stack teknologi yang efisien, estimasi biaya hemat (anti-boncos), dan roadmap pengerjaan yang jelas.",
    icon: Compass,
    image: "/roadmap-image/alur-2.webp",
    highlight: "Solusi & Strategi",
  },
  {
    num: "03",
    title: "Eksekusi Kilat Bareng AI",
    desc: "Pengembangan kode secara cepat dan presisi menggunakan workflow AI engineering mutakhir, clean code, serta performa tinggi.",
    icon: Zap,
    image: "/roadmap-image/alur-3.webp",
    highlight: "AI-Powered Coding",
  },
  {
    num: "04",
    title: "Tanya Klien Udah Pas Atau Belum",
    desc: "Uji coba fungsional, demo live ke klien, dan penyesuaian iteratif berdasarkan feedback langsung sampai kamu benar-benar puas.",
    icon: MessageCircle,
    image: "/roadmap-image/alur-4.webp",
    highlight: "Review & Validasi",
  },
  {
    num: "05",
    title: "Beres, Hasil Rapi Siap Pakai",
    desc: "Penyerahan source code bersih, dokumentasi lengkap, panduan deployment, dan dukungan awal agar projek langsung siap go-live.",
    icon: CheckCircle2,
    image: "/roadmap-image/alur-5.webp",
    highlight: "Delivery & Serah Terima",
  },
];

export function GeneralWorkflow() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag physics refs (avoid re-renders during 60fps drag)
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const checkScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    // Calculate active card index based on scroll position
    const card = scrollContainerRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 420;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), WORKFLOW_STEPS.length - 1));
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollState();
    container.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);

    return () => {
      container.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  // Smooth Drag Handlers (Desktop Mouse Dragging)
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    isDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !scrollContainerRef.current) return;
    e.preventDefault();

    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = x - startXRef.current;
    container.scrollLeft = scrollLeftRef.current - walk;

    // Calculate drag velocity for momentum release
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 10) {
      velocityRef.current = (e.pageX - lastXRef.current) / dt;
      lastXRef.current = e.pageX;
      lastTimeRef.current = now;
    }
  };

  const endDrag = useCallback(() => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setIsDragging(false);

    const container = scrollContainerRef.current;
    if (!container) return;

    // Smooth snap to target card with momentum
    const card = container.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 420;
    const currentScroll = container.scrollLeft;

    let targetIndex = Math.round(currentScroll / cardWidth);

    // Apply flick velocity to advance or go back
    if (velocityRef.current < -0.2) {
      targetIndex = Math.min(targetIndex + 1, WORKFLOW_STEPS.length - 1);
    } else if (velocityRef.current > 0.2) {
      targetIndex = Math.max(targetIndex - 1, 0);
    }

    container.scrollTo({
      left: targetIndex * cardWidth,
      behavior: "smooth",
    });
  }, []);

  const scrollByDirection = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const card = scrollContainerRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 420;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    let nextIndex = direction === "left"
      ? Math.floor(currentScroll / cardWidth) - 1
      : Math.ceil(currentScroll / cardWidth) + 1;

    nextIndex = Math.min(Math.max(nextIndex, 0), WORKFLOW_STEPS.length - 1);

    scrollContainerRef.current.scrollTo({
      left: nextIndex * cardWidth,
      behavior: "smooth",
    });
  };

  const scrollToStep = (index: number) => {
    if (!scrollContainerRef.current) return;
    const card = scrollContainerRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 420;

    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="workflow" className="scroll-mt-16 sm:scroll-mt-20 py-14 sm:py-16 bg-[#FAFAF9] border-b border-stone-200/60 overflow-hidden font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-3.5 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 font-sans text-balance">
            Gimana Cara Saya Ngerjain Tugasmu?
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1.5 sm:mt-2 text-balance">
            Alur simpel, terstruktur, dan transparan dari pertama kali konsultasi hingga serah terima hasil.
          </p>
        </div>

        {/* Carousel Navigation Top Controls (Visible on all screens) */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-stone-500 font-medium">
            <MoveHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 animate-pulse shrink-0" />
            <span>Geser atau seret layar untuk menjelajah alur</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => scrollByDirection("left")}
              disabled={!canScrollLeft}
              aria-label="Langkah Sebelumnya"
              className={`p-2 sm:p-2.5 rounded-full border border-stone-200 bg-white shadow-xs transition-all ${
                canScrollLeft
                  ? "text-stone-700 hover:bg-stone-100 hover:border-stone-300 active:scale-95 cursor-pointer"
                  : "text-stone-300 opacity-50 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => scrollByDirection("right")}
              disabled={!canScrollRight}
              aria-label="Langkah Selanjutnya"
              className={`p-2 sm:p-2.5 rounded-full border border-stone-200 bg-white shadow-xs transition-all ${
                canScrollRight
                  ? "text-stone-700 hover:bg-stone-100 hover:border-stone-300 active:scale-95 cursor-pointer"
                  : "text-stone-300 opacity-50 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Full-Width Smooth Native Draggable Carousel Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          className={`flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 select-none touch-pan-x overscroll-x-contain ${
            isDragging
              ? "cursor-grabbing scroll-auto snap-none"
              : "cursor-grab scroll-smooth snap-x snap-mandatory"
          } [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                className="w-[82vw] max-w-[320px] sm:max-w-none sm:w-[400px] md:w-[420px] lg:w-[440px] shrink-0 snap-start bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 sm:p-6 group"
              >
                <div>
                  {/* Top Bar: Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#E3F2FD] text-[#1565C0] text-[10px] sm:text-xs font-bold leading-none border border-blue-100 shadow-2xs">
                        Langkah {step.num}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500">
                        {step.highlight}
                      </span>
                    </div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-center text-[#1976D2] group-hover:bg-[#E3F2FD] transition-colors shrink-0">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  {/* Illustration Container (Responsive Height for Ergonomic Proportions) */}
                  <div className="w-full h-52 sm:h-80 rounded-xl mb-3 sm:mb-4 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={400}
                      height={400}
                      className={`w-full h-full object-contain pointer-events-none ${
                        idx === 1 || idx === 4 ? "scale-[0.95] translate-y-2" : "scale-[0.95] translate-y-0.5"
                      } ${idx === 0 ? "scale-[0.95]! -translate-y-3!" : ""}`}
                      draggable={false}
                      loading="lazy"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-sm sm:text-lg lg:text-xl text-stone-900 mb-1.5 sm:mb-2 leading-snug group-hover:text-[#1565C0] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] sm:text-xs text-stone-500 font-medium">
                  <span>Tahap {idx + 1} dari {WORKFLOW_STEPS.length}</span>
                  <span className={`font-semibold inline-flex items-center gap-1.5 ${isActive ? "text-[#1976D2]" : "text-stone-600"}`}>
                    {idx === WORKFLOW_STEPS.length - 1 ? (
                      <>
                        <span>Selesai</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </>
                    ) : (
                      <>
                        <span>Lanjut</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1 mt-3 sm:mt-4">
          {WORKFLOW_STEPS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToStep(dotIdx)}
              aria-label={`Buka Langkah ${dotIdx + 1}`}
              className="p-2 cursor-pointer inline-flex items-center justify-center min-w-[28px] min-h-[28px]"
            >
              <span
                className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 ${
                  activeIndex === dotIdx
                    ? "w-6 sm:w-8 bg-[#1976D2]"
                    : "w-1.5 sm:w-2 bg-stone-300 hover:bg-stone-400"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
