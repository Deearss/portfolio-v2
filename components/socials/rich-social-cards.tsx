"use client";

import React, { useState } from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";


export function RichSocialCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="sosmed" className="py-16 bg-[#FAFAF9] border-b border-stone-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-sans">
            Temukan Haidir di Platform Resmi
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Jejak karier profesional dan histori portofolio publik.
          </p>
        </div>

        {/* 2 Social Cards Grid (LinkedIn & Projects.co.id) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">

          {/* Card 2: LinkedIn */}
          <div
            className="relative h-full flex flex-col"
            onMouseEnter={() => setHoveredCard("linkedin")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <a
              href="https://www.linkedin.com/in/haidir-aditya-487b44279/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full bg-white rounded-md border border-stone-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Top Bar */}
              <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/footer-image/icon-linkedin.svg"
                      alt="LinkedIn"
                      className="w-10 h-10 object-contain rounded-md"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1">
                      Haidir Aditya
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1976D2]" />
                    </h4>
                    <p className="text-[11px] text-stone-500">LinkedIn Professional</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#1976D2] text-white text-xs font-semibold rounded group-hover:bg-[#1565C0] transition-colors flex items-center gap-1 shrink-0">
                  <span>Profil</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>

              {/* Bio */}
              <div className="p-5 bg-white flex-1 flex flex-col justify-start">
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  Profil resmi karier profesional, latar belakang pendidikan Computer Science, dan riwayat projek.
                </p>
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
            className="relative h-full flex flex-col"
            onMouseEnter={() => setHoveredCard("projects")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <a
              href="https://projects.co.id/public/browse_users/view/2eaf56/dier-dieeerrr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full bg-white rounded-md border border-stone-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Top Bar */}
              <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/footer-image/icon-projectscoid.svg"
                      alt="Projects.co.id"
                      className="w-10 h-10 object-contain rounded-md"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1">
                      dier-dieeerrr
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1976D2]" />
                    </h4>
                    <p className="text-[11px] text-stone-500">Projects.co.id</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#1976D2] text-white text-xs font-semibold rounded group-hover:bg-[#1565C0] transition-colors flex items-center gap-1 shrink-0">
                  <span>Profil</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>

              {/* Bio */}
              <div className="p-5 bg-white flex-1 flex flex-col justify-start">
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  Profil resmi akun freelancer, rekam jejak penyelesaian projek, dan histori ulasan rating klien.
                </p>
              </div>
            </a>

            {/* Custom Brand Kit Tooltip Preview */}
            {hoveredCard === "projects" && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-30 px-3 py-1.5 bg-stone-900 text-white text-xs rounded shadow-md pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95">
                Lihat profil lengkap Haidir di Projects.co.id ↗
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
