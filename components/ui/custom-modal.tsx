"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, CheckCircle2, Cpu } from "lucide-react";

export interface ProjectDetailData {
  id: string;
  title: string;
  category: string;
  stack: string[];
  liveUrl: string;
  description: string;
  problem: string;
  solution: string;
  results: string;
  isCaseStudy?: boolean;
}

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetailData | null;
}

export function CustomModal({ isOpen, onClose, project }: CustomModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-md border border-stone-200 shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#E3F2FD] text-[#1565C0]">
                {project.category}
              </span>
              {project.isCaseStudy && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800">
                  Studi Kasus / Case Study
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-1">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-stone-700">
          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1 text-[#1976D2]">
              Ringkasan Projek
            </h4>
            <p className="leading-relaxed">{project.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-stone-50 rounded border border-stone-200/80">
              <h5 className="font-semibold text-xs text-stone-900 mb-1">
                Tantangan / Masalah
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div className="p-3 bg-[#E3F2FD]/40 rounded border border-[#BBDEFB]">
              <h5 className="font-semibold text-xs text-[#1565C0] mb-1">
                Solusi & Eksekusi
              </h5>
              <p className="text-xs text-stone-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2 text-[#1976D2]">
              Teknologi / Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-stone-100 text-stone-700 border border-stone-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded border border-emerald-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-xs text-emerald-900 leading-relaxed">
              <strong className="font-semibold">Hasil Akhir:</strong> {project.results}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-xs font-semibold text-stone-600 hover:bg-stone-200 transition-colors"
          >
            Tutup
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#1976D2] text-white text-xs font-semibold hover:bg-[#1565C0] transition-colors"
            >
              <span>Coba Demo Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
