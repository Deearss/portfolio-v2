"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle2, ShieldCheck, Mail } from "lucide-react";

export function WhatsappForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Pembuatan App Web / ERP Internal");
  const [budget, setBudget] = useState("< Rp 1 Juta");
  const [message, setMessage] = useState("");

  const formattedName = name.trim() || "[Nama Kamu]";
  const formattedTopic = topic.trim() || "[Topik Projek]";
  const formattedBudget = budget.trim() || "[Budget]";
  const formattedMessage = message.trim() || "[Isi Pesan Klien]";

  const fullText = `Halo Haidir, nama saya ${formattedName}. Saya ingin berkonsultasi mengenai ${formattedTopic} dengan budget sekitar ${formattedBudget}. Pesan: ${formattedMessage}`;

  const handleSendWa = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(fullText);
    window.open(`https://wa.me/NOMOR-WA-DIHAPUS-DARI-RIWAYAT?text=${encodedText}`, "_blank");
  };

  return (
    <section id="kontak" className="py-16 bg-white border-b border-stone-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-[#E3F2FD] text-[#1565C0] text-xs font-bold uppercase tracking-wider">
            Diskusi Langsung
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-sans mt-3">
            Konsultasikan Tugas Kamu ke Haidir
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Isi form simpel di bawah ini. Kamu bisa lihat langsung draf pesan WhatsApp sebelum dikirim.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left: Input Form */}
          <form onSubmit={handleSendWa} className="space-y-4 p-6 bg-[#FAFAF9] rounded-md border border-stone-200 shadow-xs">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Nama Kamu
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Prasetyo"
                className="w-full px-3.5 py-2.5 bg-white rounded border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Topik / Jenis Pekerjaan
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2] transition-colors"
              >
                <option value="Pembuatan App Web / ERP Internal">Pembuatan App Web / ERP Internal</option>
                <option value="Migrasi Data Shopee ke WooCommerce">Migrasi Data Shopee ke WooCommerce</option>
                <option value="Perapihan / Restrukturisasi Excel">Perapihan / Restrukturisasi Excel</option>
                <option value="Translasi Inggris ke Indonesia">Translasi Inggris ke Indonesia (Kontekstual)</option>
                <option value="Refactoring / Permak Website WordPress">Refactoring / Permak Website WordPress</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Estimasi Budget Projek
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white rounded border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2] transition-colors"
              >
                <option value="< Rp 1 Juta">&lt; Rp 1 Juta</option>
                <option value="Rp 1 - 3 Juta">Rp 1 - 3 Juta</option>
                <option value="Rp 3 - 5 Juta">Rp 3 - 5 Juta</option>
                <option value="> Rp 5 Juta">&gt; Rp 5 Juta</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Isi Pesan / Detail Tugas
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Jelaskan kebutuhan kamu secara ringkas..."
                className="w-full px-3.5 py-2.5 bg-white rounded border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#1976D2] focus:ring-1 focus:ring-[#1976D2] transition-colors resize-none"
              />
            </div>

            {/* Inline Reassurance Notice */}
            <div className="p-3 bg-[#E3F2FD]/50 rounded border border-[#BBDEFB] flex items-start gap-2 text-xs text-[#1565C0]">
              <ShieldCheck className="w-4 h-4 text-[#1976D2] shrink-0 mt-0.5" />
              <p className="leading-snug">
                Tenang, mencet tombol ini NGGAK LANGSUNG NGIRIM PESAN ke WhatsApp Haidir. Teks pesan hanya akan ditempel otomatis di chat bar WhatsApp kamu (082353358245), dan kamu masih bisa mengedit atau membatalkannya kapan saja sebelum menekan tombol Send di WA.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-[#1976D2] text-white font-bold text-xs hover:bg-[#1565C0] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buka Draf Pesan di WhatsApp →</span>
            </button>
          </form>

          {/* Right: Live Preview UI Card */}
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50/80 rounded-md border border-emerald-200">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    WA
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-emerald-950">
                      Preview Pesan WhatsApp
                    </h4>
                    <p className="text-[10px] text-emerald-700">Tampilan Realtime Draf Pesan Kamu</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-900">
                  082353358245
                </span>
              </div>

              {/* WhatsApp Simulated Chat Bubble */}
              <div className="p-4 bg-white rounded-lg border border-emerald-200/80 shadow-2xs space-y-2">
                <div className="text-xs text-stone-800 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                  {fullText}
                </div>
                <div className="text-[10px] text-stone-400 text-right font-mono pt-1">
                  Siap dikirim di chat bar WA
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-md border border-stone-200 text-xs text-stone-600 space-y-2">
              <h5 className="font-bold text-stone-900 text-xs">Atau kirim via Email langsung:</h5>
              <p>Email resmi: <a href="mailto:kontak-dihapus@contoh.invalid" className="font-semibold text-[#1976D2] hover:underline">kontak-dihapus@contoh.invalid</a></p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
