"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, Terminal } from "lucide-react";
import { GithubStatsCard } from "../github/github-stats-card";

const ROTATING_SUBHEADLINES = [
  "Membantu kamu mempermudah proses input ribet di Excel jadi lebih gampang.",
  "Membantu kamu menerjemahkan naskah bahasa Inggris ke Indonesia yang tetap kontekstual & nyambung.",
  "Membantu kamu memindahkan ribuan data produk Shopee ke WooCommerce tanpa ada yang hilang.",
  "Membantu kamu merombak website WordPress yang lemot dan berantakan jadi kencang & rapi.",
];

export function RailwayHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_SUBHEADLINES.length);
    }, 20000); // 20 seconds as requested by user
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-16 pb-12 overflow-hidden border-b border-stone-200/60 bg-gradient-to-b from-[#FAFAF9] via-stone-50 to-[#FAFAF9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Brand Icon Badge (No Face Photo) */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1976D2]"></div>
          <span className="text-xs font-semibold text-stone-700">
            Systems & Digital Services Engineer
          </span>
        </div>

        {/* Main Name Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight font-sans mb-4">
          Haidir Aditya
        </h1>

        {/* Rotating Subheadline Text (20s interval) */}
        <div className="w-full max-w-[740px] min-h-[4rem] sm:min-h-[3.5rem] flex items-center justify-center mb-8 px-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-lg sm:text-xl font-medium text-stone-600 leading-relaxed font-sans"
            >
              {ROTATING_SUBHEADLINES[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dual CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#1976D2] text-white font-semibold text-sm hover:bg-[#1565C0] active:scale-95 transition-all shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Diskusi Projek via WhatsApp</span>
          </a>
          <a
            href="#projek"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white border border-stone-200 text-stone-800 font-semibold text-sm hover:bg-stone-100 active:scale-95 transition-all shadow-xs"
          >
            <span>Lihat Portofolio</span>
            <ArrowRight className="w-4 h-4 text-stone-500" />
          </a>
        </div>

        {/* Integrated Realtime GitHub Stats Card */}
        <GithubStatsCard />

      </div>
    </section>
  );
}
