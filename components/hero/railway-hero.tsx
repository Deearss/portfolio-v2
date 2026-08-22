"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import { GithubStatsCard } from "../github/github-stats-card";

export function RailwayHero() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 bg-[#0d1117] text-white border-b border-[#30363d]">
      <div id="top-sentinel" className="absolute top-0 left-0 w-full h-2 pointer-events-none opacity-0" aria-hidden="true" />
      <div className="relative z-10 max-w-5xl mx-auto px-3.5 sm:px-6 flex flex-col items-center text-center">
        {/* Main Name Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-sans mb-1.5 sm:mb-2">
          Haidir Aditya
        </h1>

        {/* Profession Subtitle in Vibrant Primary Blue */}
        <p className="text-base sm:text-xl md:text-2xl font-bold text-[#58a6ff] tracking-tight mb-3 sm:mb-4">
          Systems &amp; Software Engineer
        </p>

        {/* Static Concise Value Proposition */}
        <p className="max-w-2xl text-sm sm:text-lg font-bold text-white leading-snug font-sans mb-2.5 sm:mb-3 px-2">
          Kerjaan manual yang berantakan, saya ubah jadi sistem yang jalan sendiri.
        </p>
        <p className="max-w-xl text-xs sm:text-base text-stone-300 leading-relaxed font-sans mb-6 sm:mb-8 px-2">
          Data, dokumen, dan aplikasi web. Hasilnya saya serahkan bareng cara ngeceknya, jadi kamu nggak perlu percaya begitu saja.
        </p>

        {/* Dual CTA Buttons */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-10">
          <a
            href="#kontak"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("switch-contact-tab", { detail: "whatsapp" })
              );
            }}
            aria-label="Diskusi Projek via WhatsApp (Buka Form Kontak)"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-[#1f6feb] hover:bg-[#388bfd] text-white font-bold text-xs sm:text-sm active:scale-95 transition-all shadow-md"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.67-1.616-.919-2.212-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Diskusi Projek via WhatsApp</span>
          </a>
          <a
            href="#projek"
            aria-label="Lihat kerjaan saya"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-stone-200 font-semibold text-xs sm:text-sm active:scale-95 transition-all shadow-xs"
          >
            <span>Lihat Kerjaan Saya</span>
            <ArrowDown className="w-4 h-4 text-stone-400" />
          </a>
        </div>

        {/* Integrated Realtime GitHub Stats Card */}
        <GithubStatsCard />
      </div>
    </section>
  );
}
