"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  ArrowUpRight,
  FileSpreadsheet,
} from "lucide-react";

interface TimesheetPage {
  src: string;
  label: string;
  tabTitle: string;
  w: number;
  h: number;
  alt: string;
  badge: string;
}

const TIMESHEET_PAGES: TimesheetPage[] = [
  {
    src: "/timesheet-kapal/report.webp",
    label: "Halaman 1 (Report Jadi)",
    tabTitle: "Report Jadi",
    badge: "Ringkasan Eksekutif",
    w: 1400,
    h: 1396,
    alt: "Halaman report timesheet: ringkasan cargo, performa tiap crane, durasi tiap cargo hold, penyebab stop, dan dua grafik",
  },
  {
    src: "/timesheet-kapal/audit.webp",
    label: "Halaman 2 (Tab Audit Waktu)",
    tabTitle: "Tab Audit Waktu",
    badge: "Audit & Validasi Baris",
    w: 1400,
    h: 1036,
    alt: "Tab audit waktu: rincian tiap jam yang belum tercatat, lengkap dengan nomor baris timesheet asalnya",
  },
];

export function TimesheetHorizontalGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag physics refs
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const hasMovedRef = useRef(false);

  const checkScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const firstCard = scrollContainerRef.current.firstElementChild as HTMLElement | null;
    const cardStep = firstCard ? firstCard.offsetWidth + 16 : 800;
    const index = Math.round(scrollLeft / cardStep);
    setActiveIndex(Math.min(Math.max(index, 0), TIMESHEET_PAGES.length - 1));
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

  // Smooth Drag Handlers (Matches general-workflow mechanics)
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    isDownRef.current = true;
    hasMovedRef.current = false;
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

    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }

    container.scrollLeft = scrollLeftRef.current - walk;

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

    const firstCard = container.firstElementChild as HTMLElement | null;
    const cardStep = firstCard ? firstCard.offsetWidth + 16 : 800;
    const currentScroll = container.scrollLeft;

    let targetIndex = Math.round(currentScroll / cardStep);

    if (velocityRef.current < -0.2) {
      targetIndex = Math.min(targetIndex + 1, TIMESHEET_PAGES.length - 1);
    } else if (velocityRef.current > 0.2) {
      targetIndex = Math.max(targetIndex - 1, 0);
    }

    container.scrollTo({
      left: targetIndex * cardStep,
      behavior: "smooth",
    });
  }, []);

  const scrollToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const targetCard = scrollContainerRef.current.children[index] as HTMLElement | undefined;
    if (targetCard) {
      scrollContainerRef.current.scrollTo({
        left: targetCard.offsetLeft - scrollContainerRef.current.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const scrollByDirection = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const nextIdx = direction === "left" ? activeIndex - 1 : activeIndex + 1;
    scrollToSlide(Math.min(Math.max(nextIdx, 0), TIMESHEET_PAGES.length - 1));
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Horizontal Carousel Header Controls */}
      <div className="flex items-center justify-between gap-2 bg-stone-100/80 p-1.5 sm:p-2.5 rounded-xl border border-stone-200">
        {/* Left: Helper Text (Desktop) + Segmented Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-500 font-medium shrink-0">
            <MoveHorizontal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>Geser lembar report</span>
          </div>

          {/* Segmented Control Pill */}
          <div className="flex items-center bg-stone-200/70 p-0.5 sm:p-1 rounded-lg gap-0.5 shrink-0">
            {TIMESHEET_PAGES.map((page, idx) => (
              <button
                key={page.src}
                onClick={() => scrollToSlide(idx)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeIndex === idx
                    ? "bg-[#1565C0] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-300/50"
                }`}
              >
                {page.tabTitle}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Navigation Arrows */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={() => scrollByDirection("left")}
            disabled={!canScrollLeft}
            aria-label="Halaman Sebelumnya"
            className={`p-1.5 sm:p-2 rounded-full border border-stone-200 bg-white shadow-xs transition-all ${
              canScrollLeft
                ? "text-stone-700 hover:bg-stone-50 hover:border-stone-300 active:scale-95 cursor-pointer"
                : "text-stone-300 opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => scrollByDirection("right")}
            disabled={!canScrollRight}
            aria-label="Halaman Selanjutnya"
            className={`p-1.5 sm:p-2 rounded-full border border-stone-200 bg-white shadow-xs transition-all ${
              canScrollRight
                ? "text-stone-700 hover:bg-stone-50 hover:border-stone-300 active:scale-95 cursor-pointer"
                : "text-stone-300 opacity-40 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        className={`flex items-start gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 select-none touch-pan-x touch-pan-y overscroll-x-contain ${
          isDragging
            ? "cursor-grabbing scroll-auto snap-none"
            : "cursor-grab scroll-smooth snap-x snap-mandatory"
        } scrollbar-none [&::-webkit-scrollbar]:hidden`}
      >
        {TIMESHEET_PAGES.map((peraga) => (
          <div
            key={peraga.src}
            className="w-[92%] sm:w-[86%] lg:w-235 shrink-0 snap-start rounded-xl border border-stone-300 bg-white shadow-md overflow-hidden h-fit self-start"
          >
            {/* Top Bar of Sheet */}
            <div className="px-3 sm:px-4 py-2.5 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#1565C0] shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-stone-800">
                  {peraga.label}
                </span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-700 font-medium">
                  {peraga.badge}
                </span>
              </div>
              <a
                href={peraga.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka ${peraga.label} dalam ukuran penuh`}
                onClick={(e) => {
                  if (hasMovedRef.current) {
                    e.preventDefault();
                  }
                }}
                className="text-[11px] font-bold text-[#1565C0] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Buka ukuran penuh</span>
                <ArrowUpRight className="w-3 h-3 shrink-0" />
              </a>
            </div>

            {/* Sheet Preview Image */}
            <div className="relative bg-stone-50 overflow-hidden">
              <Image
                src={peraga.src}
                alt={peraga.alt}
                width={peraga.w}
                height={peraga.h}
                draggable={false}
                className="w-full h-auto object-contain pointer-events-none select-none"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
