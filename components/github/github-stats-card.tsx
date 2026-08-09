"use client";

import React, { useEffect, useState } from "react";
import { GitCommit, Star, Code, Activity, ExternalLink } from "lucide-react";


interface GithubUserData {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  login: string;
  bio: string;
}

export function GithubStatsCard() {
  const [userData, setUserData] = useState<GithubUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Deearss")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-5 bg-white rounded-md border border-stone-200 shadow-xs text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-md bg-stone-100 border border-stone-200 p-1 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-stone-900 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-stone-900">
                GitHub Realtime Activity
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E3F2FD] text-[#1565C0]">
                @Deearss
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Statistik repositori & aktivitas commit publik secara realtime
            </p>
          </div>
        </div>

        <a
          href="https://github.com/Deearss"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1565C0] hover:underline"
        >
          <span>Buka Profil GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="p-3 bg-stone-50 rounded border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
            <GitCommit className="w-3.5 h-3.5 text-[#1976D2]" />
            <span>Public Repos</span>
          </div>
          <p className="text-lg font-bold text-stone-900 mt-1">
            {loading ? "..." : userData?.public_repos ?? 18}
          </p>
        </div>

        <div className="p-3 bg-stone-50 rounded border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
            <Code className="w-3.5 h-3.5 text-[#1976D2]" />
            <span>Top Stack</span>
          </div>
          <p className="text-sm font-bold text-stone-900 mt-1">
            TypeScript / TSX
          </p>
        </div>

        <div className="p-3 bg-stone-50 rounded border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
            <Star className="w-3.5 h-3.5 text-amber-500" />
            <span>Activity Status</span>
          </div>
          <p className="text-xs font-bold text-stone-900 mt-1">
            Active Commits
          </p>
        </div>

        <div className="p-3 bg-stone-50 rounded border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Augmented</span>
          </div>
          <p className="text-xs font-bold text-emerald-800 mt-1">
            Fast Execution
          </p>
        </div>
      </div>

      {/* Realtime GitHub Streak / Stats SVG Embed */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Siap mengeksekusi projekan baru</span>
        </div>
        <span className="text-[11px] text-stone-400">
          Terintegrasi langsung dari GitHub API
        </span>
      </div>
    </div>
  );
}
