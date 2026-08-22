import React from "react";
import { FileSpreadsheet, Globe, Clock, Ban, ArrowUpRight } from "lucide-react";

interface PriceTier {
  id: string;
  price: string;
  icon: React.ElementType;
  // Batas tiap janji ditulis di dalam kalimatnya sendiri ("satu file", "satu
  // landing page"). Tanpa batas itu, angka tetap yang ketemu janji tanpa
  // batas bakal didatengin orang bawa berkas 5.000 baris sambil nunjuk web ini.
  promise: string;
  detail: string;
}

const PRICE_TIERS: PriceTier[] = [
  {
    id: "excel",
    price: "Mulai Rp 250.000",
    icon: FileSpreadsheet,
    promise: "Satu file Excel berhenti bikin kamu ngitung manual tiap malam.",
    detail:
      "Rumusnya konsisten, kolomnya nggak lari, rekapnya jalan tiap nambah baris.",
  },
  {
    id: "landing",
    price: "Mulai Rp 500.000",
    icon: Globe,
    promise: "Satu landing page online, siap dipakai jualan.",
    detail: "Muat di bawah satu detik, rapi di HP.",
  },
];

export function PriceAnchor() {
  return (
    <section
      id="harga"
      className="py-16 bg-white border-b border-stone-200/60 font-sans"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Kira-Kira Berapa?
          </h2>
          <p className="text-stone-600 text-sm mt-2 leading-relaxed">
            Porsi tiap kerjaan beda, jadi nggak ada harga mati. Tapi kamu berhak
            tahu kelasnya sebelum ngajak ngobrol.
          </p>
        </div>

        {/* Dua titik mulai */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {PRICE_TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className="p-5 rounded-lg bg-[#FAFAF9] border border-stone-200 shadow-xs flex flex-col"
              >
                <Icon
                  className="w-6 h-6 text-[#2196F3] mb-3 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1565C0] tracking-tight mb-2">
                  {tier.price}
                </h3>
                <p className="text-sm font-semibold text-stone-800 leading-snug mb-1.5">
                  {tier.promise}
                </p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {tier.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Durasi & sifat angkanya */}
        <div className="p-4 rounded-lg bg-[#E3F2FD] border border-[#BBDEFB] mb-4 flex items-start gap-3">
          <Clock
            className="w-5 h-5 text-[#1565C0] shrink-0 mt-0.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Kebanyakan projek selesai{" "}
            <span className="font-bold text-stone-900">2 sampai 7 hari kerja</span>.
            Angka di atas titik mulai, bukan tarif tetap. Begitu saya lihat berkas
            kamu, saya kasih angka pasti \u2014 dan angka itu nggak berubah di tengah
            jalan.
          </p>
        </div>

        {/* Batas jasa */}
        <div className="p-4 rounded-lg bg-stone-100 border border-stone-200 flex items-start gap-3">
          <Ban
            className="w-5 h-5 text-stone-500 shrink-0 mt-0.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            <span className="font-bold text-stone-900">Yang saya nggak ambil:</span>{" "}
            datang ke lokasi, ngajar atau presentasi live, dan dokumen hukum atau
            pajak. Bukan nggak bisa \u2014 hasilnya nggak bisa saya verifikasi sendiri,
            dan saya nggak mau nyerahin yang saya nggak yakin.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="#kontak"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 active:scale-95 transition-all shadow-sm"
          >
            <span>Ceritain Tugas Kamu, Nanti Saya Kasih Angka Pastinya</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
