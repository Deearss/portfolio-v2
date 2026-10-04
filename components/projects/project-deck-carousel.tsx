"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ExternalLink,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
    title: "Commercial HVAC & AC Service Platform",
    shortTitle: "HVAC Services",
    category: "Services Showcase",
    image: "/showcase/ac.webp",
    liveUrl: "https://demo-jasa-ac.netlify.app",
    tilt: "-rotate-8 sm:-translate-x-[200px] md:-translate-x-[260px] scale-[0.92] sm:scale-95 hover:-rotate-2 hover:-translate-y-3 hover:scale-105",
    zIndex: 10,
  },
  {
    id: "wedding",
    title: "Boutique Wedding Organizer Landing Page",
    shortTitle: "Wedding",
    category: "Commercial Showcase",
    image: "/showcase/wedding.webp",
    liveUrl: "https://demo-wedding-organizer.netlify.app",
    tilt: "rotate-0 z-20 scale-105 sm:scale-110 shadow-lg hover:-translate-y-3 hover:scale-115",
    zIndex: 20,
  },
  {
    id: "es-batu",
    title: "Crystal Ice Supply & B2B Subscription",
    shortTitle: "Crystal Ice B2B",
    category: "B2B Subscription",
    image: "/showcase/es-batu.webp",
    liveUrl: "https://demo-es-batu.netlify.app",
    tilt: "rotate-8 sm:translate-x-[200px] md:translate-x-[260px] scale-[0.92] sm:scale-95 hover:rotate-2 hover:-translate-y-3 hover:scale-105",
    zIndex: 10,
  },
];

export function ProjectDeckCarousel() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(1);
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
    <section id="work" className="scroll-mt-16 py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E3DDD5] overflow-hidden">
      {/* Anchor for backward compatibility */}
      <span id="projek" className="sr-only" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Main Section Header */}
        <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#7A6F66] mb-2">
            Featured Works &amp; Demonstrations
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#2D2A28] tracking-tight">
            Selected Web Projects
          </h2>
          <p className="text-sm sm:text-base text-[#7A6F66] mt-3 leading-relaxed max-w-xl mx-auto">
            Functional web applications engineered for speed, cross-device responsiveness, and real-time live preview.
          </p>
        </div>

        {/* MOBILE ONLY VIEW (< 640px): Smooth Sliding Touch Carousel */}
        <div className="block sm:hidden mb-12">
          {/* Segmented Selector Tabs */}
          <div className="flex items-center justify-between bg-[#E3DDD5]/70 p-1 mb-4 gap-1 rounded-lg border border-[#E3DDD5]">
            {FAN_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => scrollToMobileCard(idx)}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeMobileIndex === idx
                    ? "bg-[#2D2A28] text-[#FAF7F2] shadow-xs"
                    : "text-[#7A6F66] hover:text-[#2D2A28]"
                }`}
              >
                {card.shortTitle}
              </button>
            ))}
          </div>

          {/* Sliding Carousel Track */}
          <div
            ref={mobileSliderRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto gap-3 snap-x snap-mandatory scroll-smooth pb-1 overscroll-x-contain touch-pan-x scrollbar-none [&::-webkit-scrollbar]:hidden"
          >
            {FAN_CARDS.map((card, idx) => (
              <div
                key={card.id}
                className="w-full shrink-0 snap-center bg-white border border-[#E3DDD5] rounded-xl shadow-xs overflow-hidden"
              >
                {/* Header Bar */}
                <div className="px-3.5 py-2.5 bg-[#FAF7F2] border-b border-[#E3DDD5] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8AEA4] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7A6F66] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D2A28] inline-block" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#7A6F66] truncate max-w-44">
                    {card.title}
                  </span>
                  <a
                    href={card.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2D2A28] hover:text-[#7A6F66] p-1 transition-colors"
                    aria-label={`Open Live Demo for ${card.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Screenshot Preview */}
                <div className="relative aspect-16/10 bg-[#FAF7F2] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={360}
                    height={225}
                    className="w-full h-full object-cover object-top"
                    priority={idx === 1}
                    loading={idx === 1 ? undefined : "lazy"}
                  />
                </div>

                {/* Footer Strip with Direct CTA */}
                <div className="px-3.5 py-2.5 bg-white flex items-center justify-between gap-2 border-t border-[#E3DDD5]">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-[#2D2A28] block truncate">
                      {card.title}
                    </span>
                    <span className="text-[10px] text-[#7A6F66] block font-semibold">
                      {card.category}
                    </span>
                  </div>
                  <a
                    href={card.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open Live Demo for ${card.title}`}
                    className="px-3 py-1.5 rounded-md bg-[#2D2A28] hover:bg-[#403B37] text-[#FAF7F2] text-xs font-semibold shrink-0 inline-flex items-center gap-1 transition-all shadow-xs active:scale-95"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center justify-between mt-3 text-xs text-[#7A6F66] px-1">
            <button
              onClick={() =>
                scrollToMobileCard(
                  (activeMobileIndex - 1 + FAN_CARDS.length) % FAN_CARDS.length
                )
              }
              aria-label="Previous Project"
              className="p-2 rounded-md bg-white border border-[#E3DDD5] hover:border-[#B8AEA4] text-[#2D2A28] active:scale-95 cursor-pointer min-w-9 min-h-9 flex items-center justify-center shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {FAN_CARDS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToMobileCard(dotIdx)}
                  aria-label={`View Project ${dotIdx + 1}`}
                  className="p-1 cursor-pointer"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-200 ${
                      activeMobileIndex === dotIdx ? "w-6 bg-[#2D2A28]" : "w-2 bg-[#B8AEA4]"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                scrollToMobileCard((activeMobileIndex + 1) % FAN_CARDS.length)
              }
              aria-label="Next Project"
              className="p-2 rounded-md bg-white border border-[#E3DDD5] hover:border-[#B8AEA4] text-[#2D2A28] active:scale-95 cursor-pointer min-w-9 min-h-9 flex items-center justify-center shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* DESKTOP VIEW (>= 640px): Anthropic-style Interactive Fanned Cards */}
        <div className="hidden sm:block">
          <div className="relative h-[480px] md:h-[530px] flex items-center justify-center">
            <div className="relative w-[340px] md:w-[380px] h-[240px] md:h-[260px] flex items-center justify-center">
              {FAN_CARDS.map((card) => {
                const isHovered = hoveredCardId === card.id;
                const isAnyHovered = hoveredCardId !== null;

                return (
                  <div
                    key={card.id}
                    onMouseEnter={() => setHoveredCardId(card.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={`absolute cursor-pointer transition-all duration-300 ease-out origin-bottom ${card.tilt}`}
                    style={{
                      zIndex: isHovered ? 50 : isAnyHovered ? card.zIndex : card.zIndex,
                    }}
                  >
                    <div className="w-[340px] md:w-[380px] bg-white border border-[#E3DDD5] rounded-xl shadow-xs hover:border-[#B8AEA4] hover:shadow-lg transition-all overflow-hidden group">
                      {/* Browser Window Header */}
                      <div className="px-3.5 py-2.5 bg-[#FAF7F2] border-b border-[#E3DDD5] flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#B8AEA4] inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#7A6F66] inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#2D2A28] inline-block" />
                        </div>
                        <span className="text-[11px] font-semibold text-[#7A6F66] truncate max-w-48">
                          {card.title}
                        </span>
                        <a
                          href={card.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#2D2A28] hover:text-[#7A6F66] transition-colors"
                          aria-label={`Open Live Demo for ${card.title}`}
                          title="Open Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Screenshot Preview */}
                      <div className="relative aspect-16/10 bg-[#FAF7F2] overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          width={380}
                          height={238}
                          className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>

                      {/* Footer Strip */}
                      <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-[#E3DDD5]">
                        <span className="text-xs font-bold text-[#2D2A28] truncate">
                          {card.title}
                        </span>
                        <a
                          href={card.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open Live Demo for ${card.title}`}
                          className="px-3 py-1.5 rounded-md bg-[#2D2A28] hover:bg-[#403B37] text-[#FAF7F2] text-xs font-semibold shrink-0 inline-flex items-center gap-1 shadow-xs active:scale-95 transition-all"
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

          {/* Quick Demo Links Pill List */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            {FAN_CARDS.map((card) => (
              <a
                key={card.id}
                href={card.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white border border-[#E3DDD5] text-[#2D2A28] text-xs font-semibold shadow-xs hover:border-[#B8AEA4] hover:bg-[#FAF7F2] active:scale-95 transition-all inline-flex items-center gap-1.5"
              >
                <span>{card.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7A6F66]" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
