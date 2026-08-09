"use client";

import React from "react";
import Link from "next/link";
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
            Systems & Digital Services Engineer · Target Domain: <span className="text-[#64B5F6]">my.id</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Deearss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/haidir-aditya-487b44279/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://projects.co.id/user/my_profile/portofolio/2eaf56/dier-dieeerrr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-white transition-colors"
          >
            Projects.co.id
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors ml-2"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
