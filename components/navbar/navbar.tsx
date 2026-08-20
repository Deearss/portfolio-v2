"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-stone-200/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Badge */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://avatars.githubusercontent.com/u/111673708?v=4"
            alt="Haidir Aditya Avatar"
            className="w-8 h-8 rounded-md border border-stone-200 object-cover shadow-xs group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm text-stone-900 tracking-tight leading-none group-hover:text-[#1565C0] transition-colors">
              Haidir Aditya
            </span>
            <span className="text-[11px] font-medium text-stone-500 leading-tight">
              Systems & Software Engineer
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
          <a href="#projek" className="hover:text-[#1565C0] transition-colors">
            Portofolio
          </a>
          <a href="#workflow" className="hover:text-[#1565C0] transition-colors">
            Cara Kerja
          </a>
          <a href="#sosmed" className="hover:text-[#1565C0] transition-colors">
            Sosial Media
          </a>
        </nav>

        {/* Direct Contact Button */}
        <a
          href="#kontak"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#1976D2] text-white text-xs font-semibold hover:bg-[#1565C0] active:scale-95 transition-all shadow-xs"
        >
          <span>Diskusi Projek</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}
