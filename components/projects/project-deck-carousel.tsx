"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen, Layers } from "lucide-react";
import { CustomModal, ProjectDetailData } from "../ui/custom-modal";

const PROJECTS_DATA: ProjectDetailData[] = [
  {
    id: "1",
    title: "Direktori Spesifikasi Ponsel",
    category: "Dynamic Web Application",
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Netlify"],
    liveUrl: "https://demo-spek-hp.netlify.app",
    description: "Platform pencarian & perbandingan spesifikasi smartphone terlengkap dengan integrasi database Supabase.",
    problem: "Informasi spesifikasi ponsel seringkali tersebar di banyak tempat dan sulit dibandingkan secara cepat.",
    solution: "Merancang web app interaktif berbasis Next.js dengan pencarian instan dan filter spesifikasi cepat.",
    results: "Navigasi pencarian ponsel responsif dengan waktu muat halaman di bawah 1 detik di Netlify.",
  },
  {
    id: "2",
    title: "Screen Timer (AOA Eye Strain Tool)",
    category: "Utility Web App",
    stack: ["JavaScript", "HTML5", "CSS3", "Netlify"],
    liveUrl: "https://screentimer.netlify.app",
    description: "Aplikasi pengingat waktu istirahat mata interaktif untuk mencegah kelelahan mata (eye strain) saat bekerja di depan layar komputer.",
    problem: "Pekerja digital sering lupa mengistirahatkan mata setelah berjam-jam menatap layar monitor.",
    solution: "Bikin timer otomatis dengan audio visual reminder berdasarkan metode 20-20-20 rule.",
    results: "Tools dapat dipakai langsung tanpa install software tambahan.",
  },
  {
    id: "3",
    title: "Cardio Timer (HIIT Movement Companion)",
    category: "Fitness Utility",
    stack: ["JavaScript", "CSS Animations", "Netlify"],
    liveUrl: "https://cardiotimer.netlify.app",
    description: "Aplikasi penunjuk interval waktu latihan fisik 5 gerakan olahraga kardio dengan indikator audio dan progres.",
    problem: "Olahraga mandiri butuh penunjuk waktu latihan & istirahat yang jelas tanpa perlu memegang HP terus-menerus.",
    solution: "Mengembangkan timer interval HIIT dengan tampilan kontras tinggi dan isyarat audio.",
    results: "Memudahkan eksekusi gerakan kardio secara presisi sesuai durasi yang diatur.",
  },
  {
    id: "4",
    title: "Landing Page Jasa Print 24 Jam",
    category: "Business Landing Page",
    stack: ["Next.js", "Tailwind CSS", "Kalkulator WhatsApp"],
    liveUrl: "https://demo-print-murah.netlify.app",
    description: "Landing page jasa percetakan dokumen & banner dengan kalkulator estimasi harga instan yang terintegrasi ke WhatsApp.",
    problem: "Calon pelanggan jasa print sering ragu karena tidak tahu perkiraan total biaya sebelum menghubungi toko.",
    solution: "Menyediakan form estimasi harga otomatis yang dapat dikirim langsung ke WhatsApp penjual.",
    results: "Tingkat konversi pesan masuk dari calon pembeli meningkat karena harga sudah transparan.",
  },
  {
    id: "5",
    title: "Landing Page Wedding & Event Organizer",
    category: "Commercial Landing Page",
    stack: ["Next.js", "Tailwind CSS", "Responsive UI"],
    liveUrl: "https://demo-wedding-organizer.netlify.app",
    description: "Website promosi paket nikahan & event organizer dengan galeri visual menarik dan penataan informasi paket yang rapi.",
    problem: "Paket pernikahan memiliki banyak pilihan fleksibel yang rumit dijabarkan dalam bentukbrosur gambar statis.",
    solution: "Merancang antarmuka bersih dengan layout katalog interaktif dan tombol konsultasi cepat.",
    results: "Pengunjung dapat memilih paket acara secara langsung dari HP.",
  },
  {
    id: "6",
    title: "Landing Page Jasa AC Skala Proyek",
    category: "Services Showcase",
    stack: ["Astro", "Tailwind CSS", "Netlify"],
    liveUrl: "https://demo-jasa-ac.netlify.app",
    description: "Landing page penawaran layanan instalasi & perawatan pendingin ruangan (AC) untuk gedung dan kantor.",
    problem: "Penyedia jasa AC butuh portofolio terpercaya untuk menjangkau klien korporat dan kontraktor.",
    solution: "Membangun website statis ultra-cepat berbasis Astro dengan pengenalan tim dan alur kerja.",
    results: "Kecepatan load 100/100 di Google Lighthouse.",
  },
  {
    id: "7",
    title: "Landing Page Langganan Es Batu",
    category: "B2B Subscription Page",
    stack: ["Astro", "Tailwind CSS", "Netlify"],
    liveUrl: "https://demo-es-batu.netlify.app",
    description: "Website pemasaran layanan suplai es batu kristal harian untuk kafe, restoran, dan UMKM kuliner.",
    problem: "Pemilik kafe butuh pasokan es batu konsisten tanpa takut kehabisan stok saat jam sibuk.",
    solution: "Membuat penawaran langganan mingguan/bulanan dengan tombol pemesanan rutin ke penyuplai.",
    results: "Struktur informasi ringkas dan mudah dipahami pemilik usaha kuliner.",
  },
  {
    id: "8",
    title: "Riset Kelayakan Aplikasi Antrean Online RSUD",
    category: "Case Study & Feasibility Research",
    stack: ["Astro", "Tailwind CSS", "UX Case Study"],
    liveUrl: "https://studi-kasus-antrean.netlify.app",
    isCaseStudy: true,
    description: "Studi kasus dan riset analisis kebutuhan aplikasi sistem antrean pasien digital di rumah sakit daerah.",
    problem: "Antrean fisik di poliklinik RSUD sering menumpuk dari subuh akibat alur registrasi yang panjang.",
    solution: "Merumuskan rekomendasi arsitektur sistem registrasi mandiri dan estimasi waktu panggil antrean.",
    results: "Dokumentasi riset kelayakan lengkap dengan gambaran UX flow calon pengguna.",
  },
];

export function ProjectDeckCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDetailData | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === PROJECTS_DATA.length - 1 ? 0 : prev + 1));
  };

  const currentProject = PROJECTS_DATA[currentIndex];

  return (
    <section id="projek" className="py-16 bg-stone-100/60 border-b border-stone-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1565C0] uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Dedicated Project Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-sans">
              8 Projek Pilihan Haidir Aditya
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Setiap projek mendapat ruang khusus lengkap dengan rincian masalah, solusi, dan link demo langsung.
            </p>
          </div>

          {/* Navigation Controls with Stemmed Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-md bg-white border border-stone-200 text-stone-700 hover:bg-[#E3F2FD] hover:text-[#1565C0] hover:border-[#BBDEFB] active:scale-95 transition-all shadow-xs"
              aria-label="Projek sebelumnya"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-stone-600 px-2">
              {currentIndex + 1} / {PROJECTS_DATA.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-md bg-white border border-stone-200 text-stone-700 hover:bg-[#E3F2FD] hover:text-[#1565C0] hover:border-[#BBDEFB] active:scale-95 transition-all shadow-xs"
              aria-label="Projek berikutnya"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dedicated Slide Card */}
        <div className="bg-white rounded-md border border-stone-200 shadow-sm overflow-hidden p-6 sm:p-8 transition-all">
          <div className="flex flex-col md:flex-row items-start gap-6">
            
            {/* Project Details Left */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded bg-[#E3F2FD] text-[#1565C0]">
                  {currentProject.category}
                </span>
                {currentProject.isCaseStudy && (
                  <span className="px-2.5 py-1 text-xs font-bold rounded bg-amber-100 text-amber-800">
                    Studi Kasus / Case Study
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-sans">
                {currentProject.title}
              </h3>

              <p className="text-sm text-stone-600 leading-relaxed">
                {currentProject.description}
              </p>

              {/* Problem & Solution Snippet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-stone-50 rounded border border-stone-200/80">
                  <span className="text-[11px] font-bold text-stone-500 block mb-0.5">Tantangan Klien</span>
                  <p className="text-xs text-stone-700">{currentProject.problem}</p>
                </div>
                <div className="p-3 bg-[#E3F2FD]/30 rounded border border-[#BBDEFB]/60">
                  <span className="text-[11px] font-bold text-[#1565C0] block mb-0.5">Solusi Haidir</span>
                  <p className="text-xs text-stone-700">{currentProject.solution}</p>
                </div>
              </div>

              {/* Stack Badges */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-stone-500 block mb-2">Teknologi & Alat</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium rounded bg-stone-100 text-stone-700 border border-stone-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-100">
                <button
                  onClick={() => setSelectedProject(currentProject)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 active:scale-95 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Lihat Detail Case Study</span>
                </button>

                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#1976D2] text-white text-xs font-semibold hover:bg-[#1565C0] active:scale-95 transition-all shadow-xs"
                  >
                    <span>Coba Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {PROJECTS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-6 bg-[#1976D2]" : "w-2 bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`Ke projek ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Case Study Custom Brand Kit Modal */}
      <CustomModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
}
