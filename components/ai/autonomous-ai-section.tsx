"use client";

import React, { useState } from "react";
import { Sparkles, Bot, Zap, ArrowRight, MessageSquare, Check } from "lucide-react";

const CHAT_SIMULATIONS = [
  {
    id: 1,
    clientMessage: "Mas, data produk di Shopee toko saya ada ribuan tapi mau dipindah ke WooCommerce tanpa ada data produk yang hilang...",
    haidirResponse: "Sip, tenang aja. Langsung gue garap pakai skrip otomatisasi. Data ribuan produk bakal terkonversi rapi ke format WooCommerce lengkap dengan variasi dan harganya.",
    duration: "Selesai dalam 1-2 hari",
  },
  {
    id: 2,
    clientMessage: "Saya butuh sistem web ERP manufaktur internal multi-role yang cepat dan bisa langsung dipakai minggu ini...",
    haidirResponse: "Oke, gue petakan kebutuhan role dan alur datanya dulu, habis itu langsung tancap gas bareng AI buat susun database dan antarmukanya.",
    duration: "Keluar versi testing siap pakai minggu depan",
  },
  {
    id: 3,
    clientMessage: "Format tabel Excel keuangan toko kami berantakan banget dan susah dibaca buat laporan bulanan...",
    haidirResponse: "Siap, kirim filenya. Gue rapiin struktur rumus dan penataannya biar otomatis rekap secara bersih.",
    duration: "Selesai di hari yang sama",
  },
];

export function AutonomousAiSection() {
  const [activeChat, setActiveChat] = useState(0);

  return (
    <section id="ai-engineer" className="py-16 bg-stone-100/60 border-b border-stone-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3F2FD] text-[#1565C0] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated AI Section</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-sans">
            Autonomous AI Engineer
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Gue nggak ngerjain tugas secara lambat dan manual. Semua proses gue akselerasi menggunakan perpaduan keahlian sistem dan agen AI tercanggih.
          </p>
        </div>

        {/* AI Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="px-4 py-2.5 rounded-md bg-white border border-stone-200 shadow-xs flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xs">
              C
            </div>
            <div className="text-left">
              <span className="font-bold text-xs text-stone-900 block">Claude Opus 5</span>
              <span className="text-[11px] text-stone-500">Flagship AI Partner</span>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-md bg-white border border-stone-200 shadow-xs flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#1976D2]/10 text-[#1976D2] flex items-center justify-center font-bold text-xs">
              AGY
            </div>
            <div className="text-left">
              <span className="font-bold text-xs text-stone-900 block">Google Antigravity SDK</span>
              <span className="text-[11px] text-stone-500">Model Gemini 3.6 Flash</span>
            </div>
          </div>
        </div>

        {/* Speed Comparison Card */}
        <div className="bg-white rounded-md border border-stone-200 p-6 sm:p-8 shadow-xs mb-12">
          <h3 className="font-bold text-lg text-stone-900 mb-4 text-center">
            Perbandingan Cara Kerja
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Freelancer Biasa */}
            <div className="p-5 bg-stone-50 rounded border border-stone-200">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                Freelancer Biasa
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Kerja manual berhari-hari, stepnya panjang, berisiko miskom dan revisi berulang. Tugas gampang bisa memakan waktu berlarut-larut.
              </p>
            </div>

            {/* Haidir + AI */}
            <div className="p-5 bg-[#E3F2FD]/50 rounded border border-[#BBDEFB]">
              <span className="text-xs font-bold text-[#1565C0] uppercase tracking-wider block mb-2">
                Haidir + Claude & Antigravity
              </span>
              <p className="text-xs sm:text-sm text-stone-900 leading-relaxed font-medium">
                Kamu minta apa, gue langsung tancap gas bareng AI. Bid kemarin, minggu depan sudah kelar. Kalau tugas gampang, bid pagi sore sudah beres!
              </p>
            </div>

          </div>
        </div>

        {/* Simulated Client Inquiry Chat Carousel */}
        <div className="bg-white rounded-md border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-base text-stone-900">
                Simulasi Chat Masuk dari Klien
              </h3>
              <p className="text-xs text-stone-500">
                Contoh bagaimana skenario masalah kamu gue respon dan selesaikan
              </p>
            </div>

            {/* Selector tabs */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded">
              {CHAT_SIMULATIONS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveChat(idx)}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                    idx === activeChat
                      ? "bg-white text-[#1565C0] shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Contoh {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Bubble Interface */}
          <div className="space-y-4 bg-stone-50 p-4 rounded border border-stone-200/80">
            {/* Client Bubble */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-300 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0">
                K
              </div>
              <div className="bg-white p-3.5 rounded-lg border border-stone-200 shadow-2xs max-w-lg">
                <span className="text-[10px] font-bold text-stone-400 block mb-1">Pesan dari Klien</span>
                <p className="text-xs text-stone-800 leading-relaxed font-sans">
                  {CHAT_SIMULATIONS[activeChat].clientMessage}
                </p>
              </div>
            </div>

            {/* Haidir Bubble */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-[#E3F2FD] p-3.5 rounded-lg border border-[#BBDEFB] shadow-2xs max-w-lg text-right">
                <span className="text-[10px] font-bold text-[#1565C0] block mb-1">Respon Haidir</span>
                <p className="text-xs text-stone-900 leading-relaxed font-sans">
                  {CHAT_SIMULATIONS[activeChat].haidirResponse}
                </p>
                <div className="mt-2 text-[11px] font-semibold text-[#1976D2] inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{CHAT_SIMULATIONS[activeChat].duration}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#1976D2] text-white font-bold text-xs flex items-center justify-center shrink-0">
                H
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
