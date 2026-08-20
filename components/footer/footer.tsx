"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 bg-stone-900 text-stone-300 text-xs border-t border-stone-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div>
          <p className="font-bold text-stone-100 text-sm">Haidir Aditya</p>
          <p className="text-stone-400 mt-0.5">
            Systems &amp; Software Engineer
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-8">
          {/* GitHub */}
          <div className="relative group flex items-center justify-center">
            <a
              href="https://github.com/Deearss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center py-1"
              aria-label="Kunjungi Profil GitHub Haidir Aditya"
            >
              <Image
                src="/footer-image/longicon-github.webp"
                alt="GitHub"
                width={80}
                height={20}
                className="h-4 sm:h-4.5 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-200"
                loading="lazy"
              />
            </a>
            <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-10 transition-all duration-200 z-30">
              <div className="relative px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-800/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                GitHub
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800" />
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="relative group flex items-center justify-center">
            <a
              href="https://www.linkedin.com/in/haidir-aditya-487b44279/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center py-1"
              aria-label="Kunjungi Profil LinkedIn Haidir Aditya"
            >
              <Image
                src="/footer-image/longicon-linkedin.webp"
                alt="LinkedIn"
                width={80}
                height={20}
                className="h-4 sm:h-4.5 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-200"
                loading="lazy"
              />
            </a>
            <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-10 transition-all duration-200 z-30">
              <div className="relative px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-800/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                LinkedIn
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800" />
              </div>
            </div>
          </div>

          {/* Projects.co.id */}
          <div className="relative group flex items-center justify-center">
            <a
              href="https://projects.co.id/public/browse_users/view/2eaf56/dier-dieeerrr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center py-1"
              aria-label="Kunjungi Profil Projects.co.id Haidir Aditya"
            >
              <Image
                src="/footer-image/longicon-projectscoid.webp"
                alt="Projects.co.id"
                width={95}
                height={20}
                className="h-4 sm:h-4.5 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-200"
                loading="lazy"
              />
            </a>
            <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-10 transition-all duration-200 z-30">
              <div className="relative px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-800/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                Projects.co.id
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800" />
              </div>
            </div>
          </div>

          {/* Scroll to Top */}
          <div className="relative group flex items-center justify-center ml-2">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 transition-all cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-10 transition-all duration-200 z-30">
              <div className="relative px-2.5 py-1 text-[11px] font-semibold text-stone-100 bg-stone-800/95 border border-stone-700 rounded-md shadow-xl whitespace-nowrap">
                Kembali ke atas
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-800" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
