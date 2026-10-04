"use client";

import React from "react";
import Image from "next/image";
import {
  Code2,
  Server,
  Database,
  Terminal,
  Network,
  ArrowLeftRight,
  ShieldCheck,
  Gauge,
  Table2,
  Layers,
  Webhook,
} from "lucide-react";
import {
  SiNextdotjs,
  SiAstro,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiUbuntu,
  SiGit,
  SiGithub,
  SiCloudflare,
  SiVercel,
  SiNetlify,
} from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

interface SkillPillar {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  title: string;
  avatar: string;
  items: TechItem[];
}

const SKILL_PILLARS: SkillPillar[] = [
  {
    icon: Code2,
    title: "Frontend",
    avatar: "/avatar-chibi-frontend.webp",
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Astro.js", icon: SiAstro },
      { name: "React.js", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML5 & CSS3", icon: SiHtml5 },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    avatar: "/avatar-chibi-backend.webp",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PHP", icon: SiPhp },
      { name: "Laravel", icon: SiLaravel },
      { name: "RESTful API", icon: Network },
      { name: "Route & Middleware", icon: ArrowLeftRight },
      { name: "Schema Validation", icon: ShieldCheck },
      { name: "Webhook", icon: Webhook },
    ],
  },
  {
    icon: Database,
    title: "Databases",
    avatar: "/avatar-chibi-databases.webp",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "SQLite", icon: SiSqlite },
      { name: "Relational Schema", icon: Table2 },
      { name: "Query Optimization", icon: Gauge },
      { name: "Database Indexing", icon: Layers },
    ],
  },
  {
    icon: Terminal,
    title: "DevOps",
    avatar: "/avatar-chibi-devops.webp",
    items: [
      { name: "Linux Ubuntu", icon: SiUbuntu },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "SSH", icon: Terminal },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-16 py-16 sm:py-24 bg-[#EAE2D5] border-y border-[#DDD5C7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-lg sm:px-10 mb-12 sm:mb-16 mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2D2A28] tracking-tight">
            Techstack
          </h2>
          {/* Darker than the usual #7A6F66: on this #EAE2D5 background it only reaches 3.8:1 (WCAG AA needs 4.5:1) */}
          <p className="text-sm sm:text-base text-[#655B53] mt-3 leading-relaxed">
            Core technologies and engineering tools used to build modern web applications.
          </p>
        </div>

        {/* 4 Cards Grid: 2 cols on mobile/tablet, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2.5 sm:gap-x-3 gap-y-12 sm:gap-y-14 lg:gap-y-3 items-stretch">
          {SKILL_PILLARS.map((pillar) => {
            const PillarIcon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="relative pt-14 sm:pt-[70px] flex flex-col group"
              >
                {/* Brand Chibi Avatar Peeking from Behind the Card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 z-0 pointer-events-none select-none transition-transform duration-300 group-hover:-translate-y-2.5">
                  <Image
                    src={pillar.avatar}
                    alt={`${pillar.title} Avatar`}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Paper Card Body in front of Avatar */}
                <div className="relative z-10 bg-[#FAF7F2] border border-[#DDD5C7] rounded-none p-3 sm:p-5 hover:border-[#B8AEA4] transition-colors flex-1 flex flex-col">
                  {/* Paper Card Header */}
                  <div className="border-b border-[#EAE2D5] pb-2 sm:pb-2.5 mb-2.5 sm:mb-3.5">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <PillarIcon aria-hidden="true" className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#2D2A28]" />
                      <h3 className="text-xs sm:text-base font-bold text-[#2D2A28] tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  {/* Tech Items in Single Column Inside Paper Card */}
                  <div className="flex flex-col gap-2 sm:gap-3.5">
                    {pillar.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-1.5 sm:gap-2.5 group/item py-0.5"
                        >
                          <ItemIcon aria-hidden="true" className="w-3.5 h-3.5 sm:w-[17px] sm:h-[17px] text-[#7A6F66] group-hover/item:text-[#8c4b26] transition-colors shrink-0" />
                          <span className="text-[11px] sm:text-[13px] font-medium text-[#2D2A28] group-hover/item:text-[#8c4b26] transition-colors whitespace-nowrap">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
