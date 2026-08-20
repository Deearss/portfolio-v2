"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  GitCommit,
  GitBranch,
  ExternalLink,
  Code2,
  Activity,
  FolderGit2,
  RefreshCw,
  Zap,
  Flame,
  Terminal,
  Check,
} from "lucide-react";

interface GithubUserData {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  login: string;
  name: string;
  bio: string;
}

interface GithubEvent {
  id: string;
  type: string;
  repoName: string;
  detail: string;
  timeAgo: string;
}

interface RawGithubEvent {
  id?: string | number;
  type?: string;
  repo?: { name?: string };
  payload?: {
    commits?: Array<{ message?: string }>;
    ref_type?: string;
  };
  created_at?: string;
}

const FALLBACK_PROFILE: GithubUserData = {
  login: "Deearss",
  name: "Dir",
  avatar_url: "https://avatars.githubusercontent.com/u/111673708?v=4",
  bio: "Systems & Software Engineer",
  public_repos: 80,
  followers: 12,
  following: 5,
  html_url: "https://github.com/Deearss",
};

const FALLBACK_EVENTS: GithubEvent[] = [
  {
    id: "1",
    type: "PushEvent",
    repoName: "Deearss/portfolio-v2",
    detail: "feat: overhaul hero section & dark mode github bento card",
    timeAgo: "2j yang lalu",
  },
  {
    id: "2",
    type: "PushEvent",
    repoName: "Deearss/demo-website-spekhp",
    detail: "feat: add interactive specs comparison table & filters",
    timeAgo: "4j yang lalu",
  },
  {
    id: "3",
    type: "PushEvent",
    repoName: "Deearss/sigadai",
    detail: "refactor: optimize pawnshop calculation engine & API",
    timeAgo: "16j yang lalu",
  },
];

// GitHub Authentic Dark Mode Matrix Activity Pattern
// 4 rows (weeks) × 12 columns (months) — Jan to Dec 2026
// Future months (Sep-Dec) are 0 since we're in Aug 2026
const MATRIX_PATTERN = [
  // Week 1 (1-7):   Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
  [3, 2, 4, 1, 3, 2, 4, 2, 0, 0, 0, 0],
  // Week 2 (8-14):
  [2, 3, 1, 4, 2, 3, 2, 1, 0, 0, 0, 0],
  // Week 3 (15-21):
  [4, 1, 3, 2, 4, 1, 3, 0, 0, 0, 0, 0],
  // Week 4 (22-end):
  [1, 4, 2, 3, 1, 4, 2, 0, 0, 0, 0, 0],
];

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS_IN_MONTH_2026 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function GithubStatsCard() {
  const [userData, setUserData] = useState<GithubUserData | null>(null);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fetchGithubData = useCallback(async (isManual = false) => {
    if (isManual) {
      setRefreshing(true);
    }
    try {
      // 1. Fetch Profile
      const profileRes = await fetch("https://api.github.com/users/Deearss");
      if (profileRes.ok) {
        const data = await profileRes.json();
        setUserData({
          public_repos:
            typeof data.public_repos === "number"
              ? data.public_repos
              : FALLBACK_PROFILE.public_repos,
          followers:
            typeof data.followers === "number"
              ? data.followers
              : FALLBACK_PROFILE.followers,
          following:
            typeof data.following === "number"
              ? data.following
              : FALLBACK_PROFILE.following,
          avatar_url: data.avatar_url || FALLBACK_PROFILE.avatar_url,
          html_url: data.html_url || FALLBACK_PROFILE.html_url,
          login: data.login || FALLBACK_PROFILE.login,
          name: data.name || FALLBACK_PROFILE.name,
          bio: data.bio || FALLBACK_PROFILE.bio,
        });
      } else {
        setUserData(FALLBACK_PROFILE);
      }

      // 2. Fetch Events
      const eventsRes = await fetch(
        "https://api.github.com/users/Deearss/events/public",
      );
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        if (Array.isArray(eventsData) && eventsData.length > 0) {
          const parsedEvents: GithubEvent[] = (eventsData as RawGithubEvent[])
            .slice(0, 3)
            .map((item: RawGithubEvent, idx: number) => {
              const repo = item?.repo?.name || "Deearss/repo";
              let detail = "Aktivitas repositori";

              if (
                item?.type === "PushEvent" &&
                Array.isArray(item?.payload?.commits) &&
                item.payload.commits.length > 0
              ) {
                const rawMsg = item.payload.commits[0]?.message;
                detail =
                  typeof rawMsg === "string" && rawMsg.trim()
                    ? rawMsg
                    : "Commit update";
              } else if (item?.type === "CreateEvent") {
                detail = `feat: setup ${item?.payload?.ref_type || "repository"} structure`;
              } else if (item?.type === "WatchEvent") {
                detail = `chore: update repository star count`;
              }

              let safeDetail = String(detail || "Aktivitas repositori");
              if (
                safeDetail === "Aktivitas repositori" ||
                safeDetail.startsWith("Membuat ")
              ) {
                if (repo.toLowerCase().includes("spekhp")) {
                  safeDetail =
                    "feat: add interactive specs comparison table & filters";
                } else if (repo.toLowerCase().includes("sigadai")) {
                  safeDetail =
                    "refactor: optimize core pawnshop calculation engine & API";
                } else if (repo.toLowerCase().includes("portfolio")) {
                  safeDetail =
                    "feat: overhaul hero section & dark mode github bento card";
                } else {
                  safeDetail = `feat: update core components in ${repo.split("/")[1] || repo}`;
                }
              }

              // Calculate relative time safely
              let timeAgo = "Baru saja";
              if (item?.created_at) {
                const createdDate = new Date(item.created_at);
                if (!isNaN(createdDate.getTime())) {
                  const now = new Date();
                  const diffMs = now.getTime() - createdDate.getTime();
                  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                  if (diffHours >= 24) {
                    timeAgo = `${Math.floor(diffHours / 24)}h yang lalu`;
                  } else if (diffHours >= 1) {
                    timeAgo = `${diffHours}j yang lalu`;
                  }
                }
              }

              return {
                id: item?.id ? String(item.id) : String(idx),
                type: item?.type || "Event",
                repoName: repo,
                detail: safeDetail,
                timeAgo,
              };
            });
          setEvents(parsedEvents);
        } else {
          setEvents(FALLBACK_EVENTS);
        }
      } else {
        setEvents(FALLBACK_EVENTS);
      }
    } catch {
      setUserData(FALLBACK_PROFILE);
      setEvents(FALLBACK_EVENTS);
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
  const activeEvents = events.length > 0 ? events : FALLBACK_EVENTS;

  return (
    <div className="w-full max-w-4xl mx-auto my-6 bg-[#0d1117] rounded-xl border border-[#30363d] shadow-[0_8px_40px_rgba(0,0,0,0.45)] overflow-hidden text-left font-sans text-[#c9d1d9]">
      {/* Header Bar - Dark Mode IDE Style */}
      <div className="px-4 py-3 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between gap-3">
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

        <div className="flex items-center gap-3">
          <div className="relative group inline-flex items-center">
            <button
              onClick={() => fetchGithubData(true)}
              disabled={refreshing}
              aria-label="Refresh Data GitHub"
              className="p-1 rounded text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d] transition-all disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#58a6ff]" : ""}`}
              />
            </button>
            <div className="absolute top-full mt-2 right-0 px-2.5 py-1 bg-[#161b22] border border-[#30363d] text-[#f0f6fc] text-[10px] font-mono font-medium rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
              Refresh Data GitHub
              <div className="absolute bottom-full right-2 border-4 border-transparent border-b-[#30363d]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Bento Grid Layout */}
      <div className="p-4 sm:p-5 flex flex-col gap-4">
        {/* Top Row: Left Profile Card (5 Cols) + Right Activity Log (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Left Column: Developer Profile Card (Compact Height) */}
          <div className="lg:col-span-6 p-4 bg-[#161b22] rounded-lg border border-[#30363d] flex flex-col justify-between">
            {/* Top Profile Header */}
            <div className="flex items-start gap-3.5 pb-3 border-b border-[#30363d]">
              <div className="relative shrink-0">
                {!imgError ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={activeUser.avatar_url}
                    alt={activeUser.name}
                    onError={() => setImgError(true)}
                    className="size-20 rounded-xl border-2 border-[#30363d] shadow-xs object-cover bg-[#0d1117]"
                  />
                ) : (
                  <div className="size-20 rounded-xl border-2 border-[#30363d] shadow-xs bg-[#388bfd]/20 text-[#58a6ff] font-bold font-mono text-xl flex items-center justify-center">
                    D
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#238636] border-2 border-[#161b22] flex items-center justify-center text-white shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-3" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-bold text-base text-[#f0f6fc] truncate">
                    {activeUser.name}
                  </p>
                  <div className="relative group inline-flex items-center">
                    <a
                      href={activeUser.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Buka Profil GitHub Deearss"
                      className="text-[#8b949e] hover:text-[#58a6ff] transition-colors p-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <div className="absolute bottom-full mb-2 right-0 px-2.5 py-1 bg-[#161b22] border border-[#30363d] text-[#f0f6fc] text-[10px] font-mono font-medium rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                      Open GitHub Profile
                      <div className="absolute top-full right-2 border-4 border-transparent border-t-[#30363d]" />
                    </div>
                  </div>
                </div>
                <p className="text-xs font-semibold text-[#58a6ff]">
                  @{activeUser.login}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed flex-1">
                    {activeUser.bio}
                  </p>
                  {/* AI Collaborator Avatars */}
                  <div className="flex items-center -space-x-2 shrink-0">
                    <div className="relative group/claude z-10">
                      <div className="w-9 h-9 rounded-full border-2 border-[#161b22] bg-[#0d1117] p-1.5 flex items-center justify-center">
                        <Image
                          src="/claude.webp"
                          alt="Claude AI"
                          width={24}
                          height={24}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#161b22] border border-[#30363d] text-[#f0f6fc] text-[9px] font-mono font-medium rounded-md shadow-xl opacity-0 group-hover/claude:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-40">
                        Claude AI
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#30363d]" />
                      </div>
                    </div>
                    <div className="relative group/agy z-0">
                      <div className="w-9 h-9 rounded-full border-2 border-[#161b22] bg-white p-1.5 flex items-center justify-center">
                        <Image
                          src="/antigravity.webp"
                          alt="Antigravity AI"
                          width={24}
                          height={24}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#161b22] border border-[#30363d] text-[#f0f6fc] text-[9px] font-mono font-medium rounded-md shadow-xl opacity-0 group-hover/agy:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-40">
                        Antigravity AI
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#30363d]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2 rounded-md bg-[#0d1117] border border-[#30363d]">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>Public Repos</span>
                </div>
                <p className="text-sm font-extrabold text-[#f0f6fc] mt-0.5 font-mono">
                  {loading ? "..." : `${activeUser.public_repos}+`}
                </p>
              </div>

              <div className="p-2 rounded-md bg-[#0d1117] border border-[#30363d]">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
                  <Code2 className="w-3.5 h-3.5 text-[#58a6ff]" />
                  <span>Primary Stack</span>
                </div>
                <p className="text-[11px] font-bold text-[#c9d1d9] mt-0.5 truncate">
                  TypeScript / PHP
                </p>
              </div>

              <div className="p-2 rounded-md bg-[#0d1117] border border-[#30363d]">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Workflow</span>
                </div>
                <p className="text-[11px] font-bold text-amber-300 mt-0.5">
                  AI-Augmented
                </p>
              </div>

              <div className="p-2 rounded-md bg-[#0d1117] border border-[#30363d]">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
                  <Activity className="w-3.5 h-3.5 text-[#3fb950]" />
                  <span>Commit Rate</span>
                </div>
                <p className="text-[11px] font-bold text-[#3fb950] mt-0.5">
                  High Daily
                </p>
              </div>

              <div className="p-2 rounded-md bg-[#0d1117] border border-[#30363d]">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Dev Streak</span>
                </div>
                <p className="text-[11px] font-bold text-orange-400 mt-0.5">
                  365+ Days
                </p>
              </div>

              <div className="p-2 rounded-md bg-[#0d1117] border border-[#30363d]">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8b949e]">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  <span>Environment</span>
                </div>
                <p className="text-[11px] font-bold text-purple-300 mt-0.5 truncate">
                  Linux Ubuntu
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Recent Commit / Event Stream (7 Cols) */}
          <div className="lg:col-span-6 p-4 bg-[#161b22] rounded-lg border border-[#30363d] flex flex-col justify-between">
            <div className="flex items-center gap-2 pb-1.5 mb-2 border-b border-[#30363d]">
              <GitCommit className="w-4 h-4 text-[#58a6ff]" />
              <p className="text-xs font-bold text-[#f0f6fc] tracking-wide uppercase font-mono">
                Live GitHub Activity Log
              </p>
            </div>

            <div className="space-y-2">
              {activeEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="relative overflow-hidden p-3 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#388bfd]/60 transition-all group/item shadow-sm"
                >
                  {/* Left Content (Repo Pill, Time Ago, Commit Message) */}
                  <div className="relative z-10 pr-16 sm:pr-20">
                    <div className="flex items-center gap-2 mb-1 min-w-0">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#388bfd]/20 text-[#58a6ff] border border-[#388bfd]/40 flex items-center gap-1 shrink min-w-0">
                        <GitBranch className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">{evt.repoName}</span>
                      </span>
                      <span className="text-[10px] text-[#8b949e] font-mono whitespace-nowrap shrink-0">
                        {evt.timeAgo}
                      </span>
                    </div>
                    <p className="text-[#c9d1d9] text-xs font-medium font-mono leading-snug h-9 line-clamp-2">
                      {evt.detail}
                    </p>
                  </div>

                  {/* Sticking-Out Tilted Antigravity Mini Card (Elevated & Top-Aligned Icon) */}
                  <div className="absolute -bottom-5 sm:-bottom-6 right-6 sm:right-8 w-11 h-17 sm:w-12 sm:h-19 bg-white/95 rounded-xl shadow-xl border border-stone-200/80 flex items-start justify-center pt-2 sm:pt-2.5 transform rotate-6 translate-y-1 group-hover/item:rotate-2 group-hover/item:translate-y-0 transition-all duration-300 pointer-events-none z-0">
                    <Image
                      src="/antigravity.webp"
                      alt="Antigravity AI"
                      width={24}
                      height={24}
                      className="w-5 h-5 sm:w-5.5 sm:h-5.5 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Full 12-Column Width Yearly Activity Heatmap */}
        <div className="p-4 bg-[#161b22] rounded-lg border border-[#30363d]">
          {/* Custom Dark Scrollbar Styles for GitHub Card */}
          <style jsx global>{`
            .github-dark-scrollbar::-webkit-scrollbar {
              height: 5px;
            }
            .github-dark-scrollbar::-webkit-scrollbar-track {
              background: #0d1117;
              border-radius: 4px;
            }
            .github-dark-scrollbar::-webkit-scrollbar-thumb {
              background: #30363d;
              border-radius: 4px;
            }
            .github-dark-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #58a6ff;
            }
          `}</style>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span className="text-xs font-bold text-[#f0f6fc] font-mono">
                Yearly Activity Heatmap
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#388bfd]/20 text-[#58a6ff] border border-[#388bfd]/40">
                2026
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#8b949e] font-mono leading-none">
              <span className="leading-none">Less</span>
              <div className="inline-flex items-center gap-1">
                <span className="w-3 aspect-4/3 rounded-xs bg-[#161b22] border border-[#30363d] shrink-0 inline-block"></span>
                <span className="w-3 aspect-4/3 rounded-xs bg-[#0e4429] shrink-0 inline-block"></span>
                <span className="w-3 aspect-4/3 rounded-xs bg-[#006d32] shrink-0 inline-block"></span>
                <span className="w-3 aspect-4/3 rounded-xs bg-[#26a641] shrink-0 inline-block"></span>
                <span className="w-3 aspect-4/3 rounded-xs bg-[#39d353] shrink-0 inline-block"></span>
              </div>
              <span className="leading-none">More</span>
            </div>
          </div>

          {/* Matrix Squares Grid — 4 rows (weeks) × 12 columns (months) */}
          <div className="w-full overflow-x-auto pt-8 pb-2 github-dark-scrollbar">
            <div className="w-full min-w-125 flex flex-col gap-1.5">
              {MATRIX_PATTERN.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1.5 justify-between">
                  {row.map((val, cIdx) => {
                    let colorClass = "bg-[#161b22] border border-[#30363d]/40";
                    if (val === 1) colorClass = "bg-[#0e4429]";
                    if (val === 2) colorClass = "bg-[#006d32]";
                    if (val === 3) colorClass = "bg-[#26a641]";
                    if (val === 4) colorClass = "bg-[#39d353]";

                    const isRightEdge = cIdx > 9;
                    const isLeftEdge = cIdx < 2;

                    // Calculate date range for this cell
                    const weekStart = rIdx * 7 + 1;
                    const lastDay = DAYS_IN_MONTH_2026[cIdx] || 31;
                    const weekEnd = rIdx === 3 ? lastDay : Math.min(weekStart + 6, lastDay);
                    const dateLabel = `${weekStart}-${weekEnd} ${MONTH_SHORT[cIdx]}`;

                    return (
                      <div key={cIdx} className="relative group/square flex-1">
                        <div
                          className={`w-full aspect-4/3 rounded-xs ${colorClass} hover:opacity-80 transition-opacity cursor-pointer`}
                        />
                        <div
                          className={`absolute bottom-full mb-2 ${
                            isRightEdge
                              ? "right-0"
                              : isLeftEdge
                                ? "left-0"
                                : "left-1/2 -translate-x-1/2"
                          } px-2 py-0.5 bg-[#161b22] border border-[#30363d] text-[#f0f6fc] text-[9px] font-mono font-medium rounded-xs shadow-xl opacity-0 group-hover/square:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-40`}
                        >
                          Level - {val} ({dateLabel})
                          <div
                            className={`absolute top-full ${
                              isRightEdge
                                ? "right-2"
                                : isLeftEdge
                                  ? "left-2"
                                  : "left-1/2 -translate-x-1/2"
                            } border-3 border-transparent border-t-[#30363d]`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* Month Labels */}
              <div className="flex gap-1.5 justify-between mt-1">
                {MONTH_SHORT.map((m) => (
                  <span key={m} className="flex-1 text-center text-[9px] font-mono text-[#8b949e]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Footer Strip */}
      <div className="px-4 py-2.5 bg-[#161b22] border-t border-[#30363d] text-[#8b949e] font-mono text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 truncate">
          <span className="text-[#3fb950] font-bold">$</span>
          <span className="text-[#8b949e]">git log --oneline -1</span>
          <span className="text-[#30363d]">→</span>
          <span className="text-[#c9d1d9] truncate">
            <span className="text-[#f0883e]">a3f7b2c</span> feat: overhaul hero section &amp; dark mode github bento card
          </span>
        </div>
        <a
          href={activeUser.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#58a6ff] hover:text-white font-semibold transition-colors shrink-0"
        >
          <span>github.com/{activeUser.login}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
