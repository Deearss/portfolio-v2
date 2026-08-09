"use client";

import React from "react";
import { Search, Compass, Zap, MessageCircle, CheckCircle2 } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "Cari Tau Klien Maunya Apa",
    desc: "Bukan cuma sekadar baca brief awal, tapi gue tanyakan detail konteks masalahnya sampai benar-benar paham akar masalahnya.",
    icon: Search,
  },
  {
    num: "02",
    title: "Pilih Solusi Terbaik Buat Masalah Klien",
    desc: "Gue bedah beberapa opsi alur pengerjaan yang paling hemat waktu dan biaya, lalu kita sepakati solusi mana yang mau dieksekusi.",
    icon: Compass,
  },
  {
    num: "03",
    title: "Eksekusi Kilat Bareng AI",
    desc: "Gue langsung tancap gas menggunakan tools modern dan agen AI otonom tercanggih untuk menyelesaikan tugas dengan presisi tinggi.",
    icon: Zap,
  },
  {
    num: "04",
    title: "Tanya Klien Udah Pas Atau Belum",
    desc: "Hasil awal langsung gue perlihatkan ke kamu. Kalo ada yang kurang sreg, tinggal minta perbaiki dan gue sesuaikan langsung.",
    icon: MessageCircle,
  },
  {
    num: "05",
    title: "Beres, Hasil Rapi Siap Pakai",
    desc: "Tugas selesai tanpa menyisakan masalah baru. Semua data, aplikasi, atau naskah langsung siap kamu gunakan.",
    icon: CheckCircle2,
  },
];

export function GeneralWorkflow() {
  return (
    <section id="workflow" className="py-16 bg-[#FAFAF9] border-b border-stone-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-[#E3F2FD] text-[#1565C0] text-xs font-bold uppercase tracking-wider">
            Alur Pengerjaan Projek
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-sans mt-3">
            Gimana Cara Gue Ngerjain Tugas Kamu?
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Alur simpel dan langsung to-the-point dari pertama kali kamu kontak sampai tugas selesai.
          </p>
        </div>

        {/* 5-Step Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white rounded-md border border-stone-200 shadow-xs flex flex-col justify-between hover:border-[#BBDEFB] hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-[#1976D2] font-mono">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center text-stone-700">
                      <Icon className="w-4 h-4 text-[#1976D2]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-stone-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
