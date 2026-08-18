"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, FileSpreadsheet, ArrowRight, Sparkles } from "lucide-react";

export function ExcelBeforeAfter() {
  const [mode, setMode] = useState<"before" | "after">("after");

  return (
    <div
      className="w-full bg-white rounded-xl border border-stone-300 overflow-hidden text-stone-800 shadow-md"
      style={{ fontFamily: "Calibri, Aptos, 'Segoe UI', sans-serif" }}
    >
      {/* Excel Ribbon Style Header (Green Bar #107C41) */}
      <div className="px-4 py-3 bg-[#107C41] text-white flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-white" />
          <span className="text-xs sm:text-sm font-bold tracking-wide">
            Microsoft Excel — Pembukuan &amp; Stok Toko Sembako
          </span>
        </div>

        {/* Toggle Pills */}
        <div className="flex items-center bg-emerald-900/40 p-1 rounded-lg border border-emerald-500/40 gap-1">
          <button
            onClick={() => setMode("before")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
              mode === "before"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-emerald-100 hover:text-white hover:bg-emerald-800/50"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Sebelum (File Berhamburan)</span>
          </button>

          <button
            onClick={() => setMode("after")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
              mode === "after"
                ? "bg-white text-[#107C41] shadow-xs"
                : "text-emerald-100 hover:text-white hover:bg-emerald-800/50"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sesudah (Dipermak Rapi)</span>
          </button>
        </div>
      </div>

      {/* Simulated Excel Sheet Body */}
      <div className="p-4 sm:p-5 bg-[#F9FAFB]">
        {mode === "before" ? (
          <div className="space-y-3">
            {/* Warning Callout */}
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Format tanggal acak, nama barang tidak standar, rumus #VALUE! akibat teks di kolom jumlah, &amp; tanpa total otomatis.</span>
            </div>

            {/* Messy Excel Grid Simulation (Grocery Store Context) */}
            <div className="overflow-x-auto rounded border border-stone-300 bg-white shadow-2xs">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#F3F4F6] text-stone-600 border-b border-stone-300 text-[11px] font-bold">
                    <th className="w-8 p-1.5 text-center border-r border-stone-300 bg-[#E5E7EB]"></th>
                    <th className="p-2 border-r border-stone-300">A (Tanggal)</th>
                    <th className="p-2 border-r border-stone-300">B (Nama Barang Toko)</th>
                    <th className="p-2 border-r border-stone-300">C (Jumlah)</th>
                    <th className="p-2 border-r border-stone-300">D (Harga Satuan)</th>
                    <th className="p-2">E (Total Omset)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-800">
                  <tr className="bg-white">
                    <td className="p-1.5 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300">1</td>
                    <td className="p-2 border-r border-stone-200 text-rose-600 font-semibold">12/05/26</td>
                    <td className="p-2 border-r border-stone-200 truncate max-w-[140px]">Beras Premium 10kg (karung)</td>
                    <td className="p-2 border-r border-stone-200 text-rose-600">10 karung</td>
                    <td className="p-2 border-r border-stone-200">140000</td>
                    <td className="p-2 font-bold text-rose-600 bg-rose-50 border border-rose-200">
                      #VALUE! (teks &quot;karung&quot; di C1)
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-1.5 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300">2</td>
                    <td className="p-2 border-r border-stone-200 text-amber-700">2026-05-13</td>
                    <td className="p-2 border-r border-stone-200">minyak goreng 2L</td>
                    <td className="p-2 border-r border-stone-200">5</td>
                    <td className="p-2 border-r border-stone-200">Rp 34.000</td>
                    <td className="p-2 font-bold text-stone-900">170000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-1.5 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300">3</td>
                    <td className="p-2 border-r border-stone-200 text-rose-600 font-semibold">May 14th 26</td>
                    <td className="p-2 border-r border-stone-200">gula pasir kristal</td>
                    <td className="p-2 border-r border-stone-200">-</td>
                    <td className="p-2 border-r border-stone-200">17000</td>
                    <td className="p-2 font-bold text-rose-600 bg-rose-50 border border-rose-200">
                      #REF!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Insight */}
            <p className="text-xs text-stone-500 italic">
              *Tampilan lama toko sembako: Data penjualan tercampur dengan satuan teks, omset harian tidak bisa dihitung otomatis, dan stok sering selisih.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Success Callout */}
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-2 font-medium">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-[#107C41]" />
                <span>Stok terstruktur, kalkulasi omset otomatis, Currency Rp, &amp; Rekap Harian instan!</span>
              </div>
              <span className="text-[11px] font-bold bg-[#107C41] text-white px-2.5 py-0.5 rounded shadow-2xs shrink-0">
                Dipermak Rapi
              </span>
            </div>

            {/* Clean KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-bold text-stone-500 block">Total Omset Harian</span>
                <span className="text-base font-bold text-[#107C41]">Rp 1.876.000</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs">
                <span className="text-[11px] font-bold text-stone-500 block">Rekap Stok Toko</span>
                <span className="text-base font-bold text-blue-700">100% Terstruktur</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-stone-500 block">Otomatisasi Formula</span>
                <span className="text-base font-bold text-amber-700">SUMIFS &amp; VLOOKUP</span>
              </div>
            </div>

            {/* Clean Excel Grid Simulation (Toko Sembako Context) */}
            <div className="overflow-x-auto rounded-lg border border-stone-300 bg-white shadow-2xs">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#F3F4F6] text-stone-700 border-b border-stone-300 text-[11px] font-bold">
                    <th className="w-8 p-2 text-center border-r border-stone-300 bg-[#E5E7EB]"></th>
                    <th className="p-2 border-r border-stone-300">Tanggal</th>
                    <th className="p-2 border-r border-stone-300">Nama Barang Sembako</th>
                    <th className="p-2 border-r border-stone-300 text-right">Jumlah (Qty)</th>
                    <th className="p-2 border-r border-stone-300 text-right">Harga Satuan</th>
                    <th className="p-2 text-right">Total Biaya</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-800">
                  <tr className="hover:bg-emerald-50/40 transition-colors bg-white">
                    <td className="p-2 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300">1</td>
                    <td className="p-2 border-r border-stone-200 font-semibold text-[#107C41]">12 Mei 2026</td>
                    <td className="p-2 border-r border-stone-200 font-bold text-stone-900">Beras Premium 10 kg</td>
                    <td className="p-2 border-r border-stone-200 text-right">10 karung</td>
                    <td className="p-2 border-r border-stone-200 text-right">Rp 140.000</td>
                    <td className="p-2 font-bold text-right text-[#107C41] bg-emerald-50/60">Rp 1.400.000</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/40 transition-colors bg-white">
                    <td className="p-2 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300">2</td>
                    <td className="p-2 border-r border-stone-200 font-semibold text-[#107C41]">13 Mei 2026</td>
                    <td className="p-2 border-r border-stone-200 font-bold text-stone-900">Minyak Goreng 2 Liter</td>
                    <td className="p-2 border-r border-stone-200 text-right">5 dus</td>
                    <td className="p-2 border-r border-stone-200 text-right">Rp 34.000</td>
                    <td className="p-2 font-bold text-right text-[#107C41] bg-emerald-50/60">Rp 170.000</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/40 transition-colors bg-white">
                    <td className="p-2 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300">3</td>
                    <td className="p-2 border-r border-stone-200 font-semibold text-[#107C41]">14 Mei 2026</td>
                    <td className="p-2 border-r border-stone-200 font-bold text-stone-900">Gula Pasir 1 kg</td>
                    <td className="p-2 border-r border-stone-200 text-right">18 kg</td>
                    <td className="p-2 border-r border-stone-200 text-right">Rp 17.000</td>
                    <td className="p-2 font-bold text-right text-[#107C41] bg-emerald-50/60">Rp 306.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Note */}
            <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 pt-1 gap-2">
              <span>*Tampilan baru toko sembako: Pemisahan angka &amp; satuan otomatis, omset terekap akurat, &amp; stok terpantau instan.</span>
              <button
                onClick={() => setMode("before")}
                className="text-[#107C41] font-bold hover:underline inline-flex items-center gap-1 text-xs"
              >
                <span>Bandingkan dengan versi lama</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
