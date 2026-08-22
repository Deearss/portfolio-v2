"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Code2,
  FolderGit2,
  RefreshCw,
  GitGraph,
  Star,
  Check,
} from "lucide-react";

interface GithubUserData {
  public_repos: number;
  avatar_url: string;
  html_url: string;
  bio: string;
}

const GITHUB_URL = "https://github.com/Deearss";
const PROJECTS_URL =
  "https://projects.co.id/public/browse_users/view/2eaf56/dier-dieeerrr";

// Nama tampilan & handle dikunci di sini, bukan diambil dari API.
// Alasannya: field `name` di profil GitHub bisa berisi apa saja, sedangkan
// permukaan kepercayaan wajib selalu terbaca "Haidir Aditya · @deearss".
const DISPLAY_NAME = "Haidir Aditya";
const DISPLAY_HANDLE = "@deearss";

const FALLBACK_PROFILE: GithubUserData = {
  avatar_url: "/avatar.webp",
  bio: "Systems & Software Engineer",
  public_repos: 80,
  html_url: GITHUB_URL,
};

export function GithubStatsCard() {
  const [userData, setUserData] = useState<GithubUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fetchGithubData = useCallback(async (isManual = false) => {
    if (isManual) {
      setRefreshing(true);
    }
    try {
      const profileRes = await fetch("https://api.github.com/users/Deearss");
      if (profileRes.ok) {
        const data = await profileRes.json();
        setUserData({
          public_repos:
            typeof data.public_repos === "number"
              ? data.public_repos
              : FALLBACK_PROFILE.public_repos,
          avatar_url: data.avatar_url || FALLBACK_PROFILE.avatar_url,
          html_url: data.html_url || FALLBACK_PROFILE.html_url,
          bio: data.bio || FALLBACK_PROFILE.bio,
        });
      } else {
        setUserData(FALLBACK_PROFILE);
      }
    } catch {
      setUserData(FALLBACK_PROFILE);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      await fetchGithubData(false);
      if (!isMounted) return;
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [fetchGithubData]);

  const activeUser = userData || FALLBACK_PROFILE;

  return (
    <div className="w-full max-w-4xl mx-auto my-6 bg-[#0d1117] rounded-xl border border-[#30363d] shadow-[0_8px_40px_rgba(0,0,0,0.45)] overflow-hidden text-left font-sans text-[#c9d1d9]">
      {/* Header Bar - Dark Mode IDE Style */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
          </div>
          <FolderGit2 className="w-4 h-4 text-[#58a6ff]" />
          <span className="text-xs font-semibold font-mono text-[#f0f6fc]">
            Deearss/portfolio-v2
          </span>
        </div>

        <div className="relative group inline-flex items-center">
          <button
            onClick={() => fetchGithubData(true)}
            disabled={refreshing}
            aria-label="Muat ulang data GitHub"
            className="p-1 rounded text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d] transition-all disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#58a6ff]" : ""}`}
            />
          </button>
          <div className="absolute top-full mt-2 right-0 px-2.5 py-1 bg-[#161b22] border border-[#30363d] text-[#f0f6fc] text-[10px] font-mono font-medium rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
            Muat ulang data GitHub
            <div className="absolute bottom-full right-2 border-4 border-transparent border-b-[#30363d]" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-5 flex flex-col gap-3 sm:gap-4">
        {/* Profile Row */}
        <div className="p-3 sm:p-4 bg-[#161b22] rounded-lg border border-[#30363d] flex items-start gap-3 sm:gap-3.5">
          <div className="relative shrink-0">
            {!imgError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={activeUser.avatar_url}
                alt={`Foto profil ${DISPLAY_NAME}`}
                onError={() => setImgError(true)}
                className="size-14 sm:size-20 rounded-xl border-2 border-[#30363d] shadow-xs object-cover bg-[#0d1117]"
              />
            ) : (
              <div className="size-14 sm:size-20 rounded-xl border-2 border-[#30363d] shadow-xs bg-[#388bfd]/20 text-[#58a6ff] font-bold font-mono text-base sm:text-xl flex items-center justify-center">
                D
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#238636] border-2 border-[#161b22] flex items-center justify-center text-white shadow-xs">
              <Check className="w-2.5 h-2.5 stroke-3" />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold text-sm sm:text-base text-[#f0f6fc] truncate">
                {DISPLAY_NAME}
              </p>
              <div className="relative group inline-flex items-center shrink-0">
                <a
                  href={activeUser.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Buka profil GitHub @deearss di tab baru"
                  className="text-[#8b949e] hover:text-[#58a6ff] transition-colors p-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="absolute bottom-full mb-2 right-0 px-2.5 py-1 bg-[#161b22] border border-[#30363d] text-[#f0f6fc] text-[10px] font-mono font-medium rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                  Buka profil GitHub
                  <div className="absolute top-full right-2 border-4 border-transparent border-t-[#30363d]" />
                </div>
              </div>
            </div>

            <p className="text-xs font-semibold text-[#58a6ff]">
              {DISPLAY_HANDLE}
            </p>

            <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed mt-1">
              {activeUser.bio}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {/* Repositori publik — wajib bisa diklik ke daftar repo */}
          <a
            href={`${GITHUB_URL}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka daftar repositori publik @deearss di GitHub"
            className="group p-3 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/60 hover:bg-[#1c2128] transition-all"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
              <FolderGit2 className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
              <span className="truncate">Repositori publik</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0 ml-auto text-[#8b949e] group-hover:text-[#58a6ff] transition-colors" />
            </div>
            <p className="text-xl font-extrabold text-[#f0f6fc] mt-1 font-mono leading-none">
              {loading ? "…" : activeUser.public_repos}
            </p>
          </a>

          {/* Kontribusi — wajib bisa diklik ke GitHub */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cek 1.967 kontribusi setahun terakhir di profil GitHub @deearss"
            className="group p-3 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#3fb950]/60 hover:bg-[#1c2128] transition-all"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
              <GitGraph className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
              <span className="truncate">Kontribusi setahun</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0 ml-auto text-[#8b949e] group-hover:text-[#3fb950] transition-colors" />
            </div>
            <p className="text-xl font-extrabold text-[#3fb950] mt-1 font-mono leading-none">
              1.967
            </p>
          </a>

          {/* Stack utama */}
          <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
              <Code2 className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
              <span>Stack utama</span>
            </div>
            <p className="text-sm font-bold text-[#c9d1d9] mt-1.5 leading-none">
              TypeScript / PHP
            </p>
          </div>

          {/* Ulasan klien — wajib bisa diklik ke projects.co.id */}
          <a
            href={PROJECTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cek ulasan klien bernilai 10,00 dari 10 di profil Projects.co.id"
            className="group p-3 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#e3b341]/60 hover:bg-[#1c2128] transition-all"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
              <Star className="w-3.5 h-3.5 text-[#e3b341] shrink-0" />
              <span className="truncate">Ulasan klien</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0 ml-auto text-[#8b949e] group-hover:text-[#e3b341] transition-colors" />
            </div>
            <p className="text-xl font-extrabold text-[#e3b341] mt-1 font-mono leading-none">
              10,00
              <span className="text-xs font-bold text-[#8b949e]"> / 10</span>
            </p>
          </a>

          {/* Cara kerja — Bareng AI */}
          <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-[#8b949e] truncate">
                Cara kerja
              </p>
              <p className="text-sm font-bold text-[#a371f7] mt-1 leading-none">
                Bareng AI
              </p>
              <p className="text-[10px] text-[#8b949e] mt-1 leading-tight">
                Dibuka dari awal
              </p>
            </div>

            <div className="flex items-center -space-x-2 shrink-0">
              <div className="relative group/claude z-10">
                <div className="w-8 h-8 rounded-full border-2 border-[#161b22] bg-[#0d1117] p-1.5 flex items-center justify-center">
                  <Image
                    src="/claude.webp"
                    alt="Claude AI"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-full mb-2 right-0 px-2 py-0.5 bg-[#0d1117] border border-[#30363d] text-[#f0f6fc] text-[9px] font-mono font-medium rounded-md shadow-xl opacity-0 group-hover/claude:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-40">
                  Claude AI
                  <div className="absolute top-full right-2 border-4 border-transparent border-t-[#30363d]" />
                </div>
              </div>
              <div className="relative group/agy z-0">
                <div className="w-8 h-8 rounded-full border-2 border-[#161b22] bg-white p-1.5 flex items-center justify-center">
                  <Image
                    src="/antigravity.webp"
                    alt="Antigravity AI"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-full mb-2 right-0 px-2 py-0.5 bg-[#0d1117] border border-[#30363d] text-[#f0f6fc] text-[9px] font-mono font-medium rounded-md shadow-xl opacity-0 group-hover/agy:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-40">
                  Antigravity AI
                  <div className="absolute top-full right-2 border-4 border-transparent border-t-[#30363d]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="px-4 py-2.5 bg-[#161b22] border-t border-[#30363d] text-[#8b949e] font-mono text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-center sm:text-left">
          Angka di atas per Agustus 2026. Silakan cek sendiri lewat tautannya.
        </span>
        <a
          href={activeUser.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#58a6ff] hover:text-white font-semibold transition-colors shrink-0"
        >
          <span>github.com/Deearss</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
