"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { GithubStatsCard } from "../github/github-stats-card";

const ROTATING_PHRASES = [
  "mempermudah proses input ribet di Excel jadi lebih gampang.",
  "menerjemahkan naskah bahasa Inggris ke Indonesia yang tetap kontekstual & nyambung.",
  "memindahkan ribuan data produk Shopee ke WooCommerce tanpa ada yang hilang.",
  "merombak website WordPress yang lemot dan berantakan jadi kencang & rapi.",
];

export function RailwayHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = ROTATING_PHRASES[phraseIndex];

    if (!isDeleting && displayedText === currentFullText) {
      // Pause at full text for 3.5 seconds before erasing
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }

    // Typing speed: 25ms forward, 12ms backspace
    const speed = isDeleting ? 12 : 25;
    const timer = setTimeout(() => {
      if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
      } else {
        setDisplayedText((prev) =>
          isDeleting
            ? currentFullText.substring(0, prev.length - 1)
            : currentFullText.substring(0, prev.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <section className="relative pt-16 pb-12 overflow-hidden border-b border-stone-200/60 bg-gradient-to-b from-[#FAFAF9] via-stone-50 to-[#FAFAF9]">
      {/* Dynamic Keyframe for Top-to-Bottom Moving Dots */}
      <style jsx global>{`
        @keyframes moveDotsDown {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 22px;
          }
        }
      `}</style>

      {/* Background Dot Grid Matrix Overlay with Top-to-Bottom Infinite Scroll */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `radial-gradient(#d6d3d1 1.25px, transparent 1.25px)`,
          backgroundSize: "22px 22px",
          animation: "moveDotsDown 1.2s linear infinite",
          maskImage: "radial-gradient(ellipse at 50% 35%, black 45%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 35%, black 45%, transparent 85%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Main Name Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight font-sans mb-2">
          Haidir Aditya
        </h1>

        {/* Profession Subtitle */}
        <p className="text-lg sm:text-2xl font-bold text-[#1565C0] tracking-tight mb-6">
          Systems & Software Engineer
        </p>

        {/* Realtime Typewriter Subheadline (Fixed 2-line height) */}
        <div className="w-full max-w-[720px] h-[3.75rem] sm:h-[3.25rem] flex items-center justify-center mb-6 px-2">
          <p className="text-base sm:text-lg font-medium text-stone-600 leading-relaxed font-sans">
            <span className="font-bold text-stone-900">Membantu kamu </span>
            <span className="text-stone-700">{displayedText}</span>
            <span className="inline-block w-[2px] h-4.5 ml-0.5 bg-[#1565C0] animate-pulse align-middle" />
          </p>
        </div>

        {/* Dual CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#1976D2] text-white font-semibold text-sm hover:bg-[#1565C0] active:scale-95 transition-all shadow-xs"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.67-1.616-.919-2.212-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Diskusi Projek via WhatsApp</span>
          </a>
          <a
            href="#projek"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white border border-stone-200 text-stone-800 font-semibold text-sm hover:bg-stone-100 active:scale-95 transition-all shadow-xs"
          >
            <span>Lihat Portofolio</span>
            <ArrowDown className="w-4 h-4 text-stone-500" />
          </a>
        </div>

        {/* Integrated Realtime GitHub Stats Card */}
        <GithubStatsCard />

      </div>
    </section>
  );
}
