"use client";

import React, { useState } from "react";
import { ExternalLink, CheckCircle2, Globe } from "lucide-react";


export function RichSocialCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="sosmed" className="py-16 bg-[#FAFAF9] border-b border-stone-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-[#E3F2FD] text-[#1565C0] text-xs font-bold uppercase tracking-wider">
            Koneksi & Sosial Media
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-sans mt-3">
            Temukan Haidir di Platform Resmi
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Aktivitas pengerjaan kode, jejak karier profesional, dan histori portofolio publik.
          </p>
        </div>

        {/* 3 Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: GitHub */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredCard("github")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <a
              href="https://github.com/Deearss"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-md border border-stone-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Top Bar */}
              <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-stone-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1">
                      Deearss
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1976D2]" />
                    </h4>
                    <p className="text-[11px] text-stone-500">GitHub Open Source</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#1976D2] text-white text-xs font-semibold rounded group-hover:bg-[#1565C0] transition-colors flex items-center gap-1">
                  <span>Profil</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>

              {/* Bio */}
              <div className="p-4 bg-white">
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  Repositori terbuka, eksperimen Next.js App Router, dan commit rutin pengerjaan projek digital.
                </p>
              </div>

              {/* Activity Grid */}
              <div className="grid grid-cols-3 gap-1 px-4 pb-4">
                <div className="p-2 bg-stone-50 rounded border border-stone-200/80 text-center">
                  <span className="text-[10px] text-stone-400 block">Status</span>
                  <span className="text-xs font-bold text-emerald-700">Active</span>
                </div>
                <div className="p-2 bg-stone-50 rounded border border-stone-200/80 text-center">
                  <span className="text-[10px] text-stone-400 block">Repos</span>
                  <span className="text-xs font-bold text-stone-900">18 Public</span>
                </div>
                <div className="p-2 bg-stone-50 rounded border border-stone-200/80 text-center">
                  <span className="text-[10px] text-stone-400 block">Host</span>
                  <span className="text-xs font-bold text-[#1565C0]">Netlify</span>
                </div>
              </div>
            </a>

            {/* Custom Brand Kit Tooltip Preview */}
            {hoveredCard === "github" && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-30 px-3 py-1.5 bg-stone-900 text-white text-xs rounded shadow-md pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95">
                Lihat repositori & commit publik Haidir di GitHub ↗
              </div>
            )}
          </div>

          {/* Card 2: LinkedIn */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredCard("linkedin")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <a
              href="https://www.linkedin.com/in/haidir-aditya-487b44279/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-md border border-stone-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Top Bar */}
              <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#0A66C2] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1">
                      Haidir Aditya
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1976D2]" />
                    </h4>
                    <p className="text-[11px] text-stone-500">LinkedIn Professional</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#1976D2] text-white text-xs font-semibold rounded group-hover:bg-[#1565C0] transition-colors flex items-center gap-1">
                  <span>Profil</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>

              {/* Bio */}
              <div className="p-4 bg-white">
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  Profil resmi karier profesional, latar belakang pendidikan Computer Science, dan riwayat projek.
                </p>
              </div>

              {/* Activity Grid */}
              <div className="grid grid-cols-3 gap-1 px-4 pb-4">
                <div className="p-2 bg-stone-50 rounded border border-stone-200/80 text-center">
                  <span className="text-[10px] text-stone-400 block">Role</span>
                  <span className="text-xs font-bold text-stone-900">Engineer</span>
                </div>
                <div className="p-2 bg-stone-50 rounded border border-stone-200/80 text-center">
                  <span className="text-[10px] text-stone-400 block">Networking</span>
                  <span className="text-xs font-bold text-[#1565C0]">Professional</span>
                </div>
                <div className="p-2 bg-stone-50 rounded border border-stone-200/80 text-center">
                  <span className="text-[10px] text-stone-400 block">Foto Profil</span>
                  <span className="text-xs font-bold text-emerald-700">Tersedia</span>
                </div>
              </div>
            </a>

            {/* Custom Brand Kit Tooltip Preview */}
            {hoveredCard === "linkedin" && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-30 px-3 py-1.5 bg-stone-900 text-white text-xs rounded shadow-md pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95">
                Lihat foto & profil lengkap Haidir di LinkedIn ↗
              </div>
            )}
          </div>

          {/* Card 3: Projects.co.id */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredCard("projects")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <a
              href="https://projects.co.id/user/my_profile/portofolio/2eaf56/dier-dieeerrr"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-md border border-stone-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Top Bar */}
              <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#2E7D32] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1">
                      dier-dieeerrr
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1976D2]" />
                    </h4>
                    <p className="text-[11px] text-stone-500">Projects.co.id</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#1976D2] text-white text-xs font-semibold rounded group-hover:bg-[#1565C0] transition-colors flex items-center gap-1">
                  <span>Portofolio</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>

              {/* Bio */}
              <div className="p-4 bg-white">
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  Kumpulan rincian 8 portofolio projek nyata yang sudah dikerjakan beserta penilaian dari klien.
                </p>
              </div>

              {/* Activity Grid */}
              <div className="grid grid-cols-3 gap-1 px-4 pb-4">
                <div className="p-2 bg-stone-50 rounded border border-stone-200/80 text-center">
                  <span className="text-[10px] text-stone-400 block">Projek</span>
                  <span className="text-xs font-bold text-stone-900">8 Items</span>
                </div>
                <div className="p-2 bg-stone-50 rounded border border-stone-200/80 text-center">
                  <span className="text-[10px] text-stone-400 block">Verified</span>
                  <span className="text-xs font-bold text-emerald-700">Official</span>
                </div>
                <div className="p-2 bg-stone-50 rounded border border-stone-200/80 text-center">
                  <span className="text-[10px] text-stone-400 block">Rating</span>
                  <span className="text-xs font-bold text-amber-600">Terpercaya</span>
                </div>
              </div>
            </a>

            {/* Custom Brand Kit Tooltip Preview */}
            {hoveredCard === "projects" && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-30 px-3 py-1.5 bg-stone-900 text-white text-xs rounded shadow-md pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95">
                Buka daftar portofolio Haidir di Projects.co.id ↗
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
