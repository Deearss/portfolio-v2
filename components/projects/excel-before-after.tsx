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
      <div className="px-3.5 py-3 sm:px-4 bg-[#107C41] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
          <span className="text-xs sm:text-sm font-bold tracking-wide leading-tight">
            Microsoft Excel — Pembukuan &amp; Stok Sembako
          </span>
        </div>

        {/* Toggle Pills */}
        <div className="w-full sm:w-auto grid grid-cols-2 sm:flex items-center bg-emerald-950/60 p-1 rounded-xl border border-emerald-500/40 gap-1">
          <button
            onClick={() => setMode("before")}
            className={`w-full sm:w-auto px-2 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
              mode === "before"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-emerald-100 hover:text-white hover:bg-emerald-800/50"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              <span className="sm:hidden">Sebelum (Acak)</span>
              <span className="hidden sm:inline">Sebelum (Berhamburan)</span>
            </span>
          </button>

          <button
            onClick={() => setMode("after")}
            className={`w-full sm:w-auto px-2 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
              mode === "after"
                ? "bg-white text-[#107C41] shadow-xs"
                : "text-emerald-100 hover:text-white hover:bg-emerald-800/50"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              <span className="sm:hidden">Sesudah (Rapi)</span>
              <span className="hidden sm:inline">Sesudah (Dipermak Rapi)</span>
            </span>
          </button>
        </div>
      </div>

      {/* Simulated Excel Sheet Body */}
      <div className="p-4 sm:p-5 bg-[#F9FAFB]">
        {mode === "before" ? (
          <div className="space-y-4">
            {/* Warning Callout */}
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Format acak, teks bercampur angka, formula error, &amp; data berhamburan.</span>
            </div>

            {/* Simulated Raw Messy Table */}
            <div className="border border-stone-300 rounded-lg overflow-x-auto shadow-2xs bg-white excel-scrollbar">
              <table className="w-full text-xs text-stone-700 font-mono border-collapse min-w-[620px] whitespace-nowrap">
                <thead>
                  <tr className="bg-[#F3F4F6] text-stone-600 border-b border-stone-300">
                    <th scope="col" className="w-10 p-2 text-center border-r border-stone-300">#</th>
                    <th scope="col" className="px-3 py-2 text-left border-r border-stone-300">Tgl_Jual</th>
                    <th scope="col" className="px-3 py-2 text-left border-r border-stone-300">Nama Item</th>
                    <th scope="col" className="px-3 py-2 text-left border-r border-stone-300">Qty (Bermasalah)</th>
                    <th scope="col" className="px-3 py-2 text-left border-r border-stone-300">Harga Satuan</th>
                    <th scope="col" className="px-3 py-2 text-left">Total (Error)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-stone-200">
                    <td className="p-2 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300">1</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-rose-600 font-semibold">12-05-2026</td>
                    <td className="px-3 py-2 border-r border-stone-200 font-medium">Beras Ramos Setra</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-amber-700">10 karung</td>
                    <td className="px-3 py-2 border-r border-stone-200">140000</td>
                    <td className="px-3 py-2 font-bold text-rose-600 bg-rose-50 border border-rose-200">
                      #VALUE! (teks &quot;karung&quot; di C1)
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-stone-200">
                    <td className="p-2 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300">2</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-amber-700">2026-05-13</td>
                    <td className="px-3 py-2 border-r border-stone-200 font-medium">Minyak Goreng 2L</td>
                    <td className="px-3 py-2 border-r border-stone-200">5</td>
                    <td className="px-3 py-2 border-r border-stone-200">Rp 34.000</td>
                    <td className="px-3 py-2 font-bold text-stone-900">170000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-2 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300">3</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-rose-600 font-semibold">May 14th 26</td>
                    <td className="px-3 py-2 border-r border-stone-200 font-medium">Gula Pasir 1 kg</td>
                    <td className="px-3 py-2 border-r border-stone-200">-</td>
                    <td className="px-3 py-2 border-r border-stone-200">17000</td>
                    <td className="px-3 py-2 font-bold text-rose-600 bg-rose-50 border border-rose-200">
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
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 shrink-0 text-[#107C41]" />
              <span>Stok terstruktur, kalkulasi omset otomatis, Currency Rp, &amp; Rekap Harian instan!</span>
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
                <span className="text-[11px] font-bold text-stone-500 block">Status Validasi Data</span>
                <span className="text-base font-bold text-[#047857]">Zero Error</span>
              </div>
            </div>

            {/* Clean Professional Modern Table */}
            <div className="border border-stone-200 rounded-lg overflow-x-auto shadow-xs bg-white excel-scrollbar">
              <table className="w-full text-xs text-stone-800 font-sans border-collapse min-w-[620px] whitespace-nowrap">
                <thead>
                  <tr className="bg-[#107C41] text-white font-semibold">
                    <th scope="col" className="w-10 p-2 text-center border-r border-emerald-600/50 bg-[#0c6133]">#</th>
                    <th scope="col" className="px-3 py-2 text-left border-r border-emerald-600/50">Tanggal Transaksi</th>
                    <th scope="col" className="px-3 py-2 text-left border-r border-emerald-600/50">Nama Produk</th>
                    <th scope="col" className="px-3 py-2 text-right border-r border-emerald-600/50">Qty Terjual</th>
                    <th scope="col" className="px-3 py-2 text-right border-r border-emerald-600/50">Harga Satuan</th>
                    <th scope="col" className="px-3 py-2 text-right">Subtotal Omset</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="bg-white border-b border-stone-100 hover:bg-stone-50">
                    <td className="p-2 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300 font-sans">1</td>
                    <td className="px-3 py-2 border-r border-stone-200 font-semibold text-[#107C41]">12 Mei 2026</td>
                    <td className="px-3 py-2 border-r border-stone-200 font-bold text-stone-900">Beras Ramos Setra</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-right">10 Sak (25kg)</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-right">Rp 140.000</td>
                    <td className="px-3 py-2 font-bold text-right text-[#107C41] bg-emerald-50/60">Rp 1.400.000</td>
                  </tr>
                  <tr className="bg-stone-50/50 border-b border-stone-100 hover:bg-stone-50">
                    <td className="p-2 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300 font-sans">2</td>
                    <td className="px-3 py-2 border-r border-stone-200 font-semibold text-[#107C41]">13 Mei 2026</td>
                    <td className="px-3 py-2 border-r border-stone-200 font-bold text-stone-900">Minyak Goreng 2L</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-right">5 Pouch</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-right">Rp 34.000</td>
                    <td className="px-3 py-2 font-bold text-right text-[#107C41] bg-emerald-50/60">Rp 170.000</td>
                  </tr>
                  <tr className="bg-white hover:bg-stone-50">
                    <td className="p-2 text-center font-bold text-stone-500 bg-[#F3F4F6] border-r border-stone-300 font-sans">3</td>
                    <td className="px-3 py-2 border-r border-stone-200 font-semibold text-[#107C41]">14 Mei 2026</td>
                    <td className="px-3 py-2 border-r border-stone-200 font-bold text-stone-900">Gula Pasir 1 kg</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-right">18 kg</td>
                    <td className="px-3 py-2 border-r border-stone-200 text-right">Rp 17.000</td>
                    <td className="px-3 py-2 font-bold text-right text-[#107C41] bg-emerald-50/60">Rp 306.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Note */}
            <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 pt-1 gap-2">
              <span>*Tampilan baru toko sembako: Pemisahan angka &amp; satuan otomatis, omset terekap akurat, &amp; stok terpantau instan.</span>
              <button
                onClick={() => setMode("before")}
                className="text-[#107C41] font-bold hover:underline inline-flex items-center gap-1 text-xs cursor-pointer"
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
