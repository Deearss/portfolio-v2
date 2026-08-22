"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAFAF9]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Badge */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group transition-transform active:scale-95 text-left"
          aria-label="Kembali ke atas"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://avatars.githubusercontent.com/u/111673708?v=4"
            alt="Foto profil Haidir Aditya"
            className={`w-8 h-8 rounded-md object-cover shadow-xs group-hover:scale-105 transition-all ${
              isScrolled ? "border border-stone-200" : "border border-[#30363d]"
            }`}
          />
          <div className="flex flex-col text-left">
            <span
              className={`font-bold text-sm tracking-tight leading-none transition-colors ${
                isScrolled
                  ? "text-stone-900 group-hover:text-[#1f6feb]"
                  : "text-white group-hover:text-[#58a6ff]"
              }`}
            >
              Haidir Aditya <span className="font-semibold opacity-70">· @deearss</span>
            </span>
            <span
              className={`text-[11px] font-medium leading-tight transition-colors ${
                isScrolled ? "text-stone-500" : "text-[#58a6ff]"
              }`}
            >
              Systems &amp; Software Engineer
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-6 text-xs font-semibold transition-colors ${
            isScrolled ? "text-stone-600" : "text-stone-300"
          }`}
        >
          <a
            href="#projek"
            className={
              isScrolled ? "hover:text-[#1f6feb] transition-colors" : "hover:text-white transition-colors"
            }
          >
            Kerjaan
          </a>
          <a
            href="#workflow"
            className={
              isScrolled ? "hover:text-[#1f6feb] transition-colors" : "hover:text-white transition-colors"
            }
          >
            Cara Kerja
          </a>
          <a
            href="#kontak"
            className={
              isScrolled ? "hover:text-[#1f6feb] transition-colors" : "hover:text-white transition-colors"
            }
          >
            Kontak
          </a>
        </nav>

        {/* Direct Contact Button */}
        <a
          href="#kontak"
          aria-label="Diskusi Projek (Buka Form Kontak)"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#1f6feb] text-white hover:bg-[#388bfd] active:scale-95 transition-all shadow-xs"
        >
          <span>Diskusi Projek</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}
