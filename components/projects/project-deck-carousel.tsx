"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  ArrowUpRight,
} from "lucide-react";
import { FaHandPointer } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
}

interface ProjectItem {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  techList: TechItem[];
  image: string;
  liveUrl: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "ac",
    num: "01",
    title: "AC Service Landing Page",
    shortDesc:
      "Commercial AC service platform built with Next.js, TypeScript & Tailwind CSS.",
    longDesc:
      "Engineered as a high-performance web platform tailored for B2B air conditioning installation, scheduled maintenance contracts, and corporate facility service requests. Features an instant multi-parameter quote calculator, structured appointment dispatch, and mobile-first ergonomics.",
    techList: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    image: "/showcase/ac.webp",
    liveUrl: "https://demo-jasa-ac.netlify.app",
  },
  {
    id: "wedding",
    num: "02",
    title: "Wedding Organizer Landing Page",
    shortDesc:
      "Wedding organizer landing page built with Next.js, TypeScript & Tailwind CSS.",
    longDesc:
      "Crafted for an exclusive wedding atelier, this web platform combines aesthetic elegance with responsive client acquisition workflows. Features dynamic wedding package tier calculators, curated vendor coordination portfolios, and direct consultation scheduling.",
    techList: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    image: "/showcase/wedding.webp",
    liveUrl: "https://demo-wedding-organizer.netlify.app",
  },
  {
    id: "es-batu",
    num: "03",
    title: "Ice Supply Landing Page",
    shortDesc:
      "B2B crystal ice supply and logistics portal built with Next.js, TypeScript & Tailwind CSS.",
    longDesc:
      "Developed to streamline daily order fulfilment for commercial ice supplies across restaurants, coffee chains, and hospitality venues. Features recurring subscription tiering, bulk volume logistics calculations, and direct replenishment tracking.",
    techList: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    image: "/showcase/es-batu.webp",
    liveUrl: "https://demo-es-batu.netlify.app",
  },
];

export function ProjectDeckCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );

  // Drag physics refs (avoid re-renders during 60fps drag)
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const checkScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const card = scrollContainerRef.current
      .firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 420;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), PROJECTS.length - 1));
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollState();
    container.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);

    return () => {
      container.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedProject(null);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedProject]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    isDownRef.current = true;
    hasDraggedRef.current = false;
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
    lastXRef.current = e.pageX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !scrollContainerRef.current) return;
    e.preventDefault();

    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = x - startXRef.current;

    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }

    container.scrollLeft = scrollLeftRef.current - walk;

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 10) {
      velocityRef.current = (e.pageX - lastXRef.current) / dt;
      lastXRef.current = e.pageX;
      lastTimeRef.current = now;
    }
  };

  const endDrag = useCallback(() => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setIsDragging(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";

    const container = scrollContainerRef.current;
    if (!container) return;

    const card = container.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 420;
    const currentScroll = container.scrollLeft;

    let targetIndex = Math.round(currentScroll / cardWidth);

    if (velocityRef.current < -0.2) {
      targetIndex = Math.min(targetIndex + 1, PROJECTS.length - 1);
    } else if (velocityRef.current > 0.2) {
      targetIndex = Math.max(targetIndex - 1, 0);
    }

    container.scrollTo({
      left: targetIndex * cardWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  }, []);

  // Global mouseup listener to ensure grabbing cursor resets cleanly even outside container
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDownRef.current) {
        endDrag();
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [endDrag]);

  const scrollByDirection = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const card = scrollContainerRef.current
      .firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 420;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    let nextIndex =
      direction === "left"
        ? Math.floor(currentScroll / cardWidth) - 1
        : Math.ceil(currentScroll / cardWidth) + 1;

    nextIndex = Math.min(Math.max(nextIndex, 0), PROJECTS.length - 1);

    scrollContainerRef.current.scrollTo({
      left: nextIndex * cardWidth,
      behavior: "smooth",
    });
  };

  const scrollToProject = (index: number) => {
    if (!scrollContainerRef.current) return;
    const card = scrollContainerRef.current
      .firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : 420;

    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  const handleCardClick = (project: ProjectItem) => {
    if (!hasDraggedRef.current) {
      setSelectedProject(project);
    }
  };

  return (
    <section
      id="work"
      className="scroll-mt-16 sm:scroll-mt-20 py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E3DDD5] overflow-hidden"
    >
      {/* Anchor for backward compatibility */}
      <span id="projek" className="sr-only" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Main Section Header (Padding & Max-Width Parity with Techstack) */}
        <div className="text-center max-w-lg sm:px-10 mb-12 sm:mb-16 mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2D2A28] tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-[#7A6F66] mt-3 leading-relaxed max-sm:px-4">
            <span className="sm:hidden">
              Fast, responsive web applications with live previews you can try.
            </span>
            <span className="hidden sm:inline">
              Functional web applications engineered for speed, cross-device
              responsiveness, and real-time live preview.
            </span>
          </p>
        </div>

        {/* Navigation & Interaction Controls (Stacked Vertically: Explanation on Top, Bare Arrow Buttons on Bottom) */}
        <div className="flex flex-col items-center text-center mt-10 sm:mt-14 mb-2 sm:mb-4 max-w-2xl mx-auto px-4">
          {/* Bare Minimalist Arrow Controls (No white circle wrapper, borderless, shadowless) */}
          <div className="flex items-center justify-center gap-6 mt-3">
            <button
              onClick={() => scrollByDirection("left")}
              disabled={!canScrollLeft}
              aria-label="Previous Project"
              className={`p-1.5 transition-colors cursor-pointer ${
                canScrollLeft
                  ? "text-[#2D2A28] hover:text-[#8c4b26] active:scale-90"
                  : "text-[#B8AEA4] cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => scrollByDirection("right")}
              disabled={!canScrollRight}
              aria-label="Next Project"
              className={`p-1.5 transition-colors cursor-pointer ${
                canScrollRight
                  ? "text-[#2D2A28] hover:text-[#8c4b26] active:scale-90"
                  : "text-[#B8AEA4] cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Drag & Scroll Track */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          className={`flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 select-none touch-pan-x touch-pan-y overscroll-x-contain ${
            isDragging
              ? "cursor-grabbing scroll-auto snap-none"
              : "cursor-grab scroll-smooth snap-x snap-mandatory"
          } scrollbar-none [&::-webkit-scrollbar]:hidden`}
        >
          {PROJECTS.map((project) => {
            return (
              <div
                key={project.id}
                onClick={() => handleCardClick(project)}
                className={`w-[84vw] shadow-lg shadow-black/5 p-2 max-w-[340px] sm:max-w-none sm:w-[420px] md:w-[450px] lg:w-[470px] shrink-0 snap-start bg-white rounded-2xl border border-[#E3DDD5] hover:border-[#B8AEA4] transition-colors duration-300 flex flex-col justify-between overflow-hidden group ${
                  isDragging ? "cursor-grabbing select-none" : "cursor-pointer"
                }`}
              >
                <div>
                  {/* 1. Gambar Projek (Screenshot Preview Frame with Dark Overlay & Centered Pointer) */}
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-4 bg-[#FAF7F2]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={480}
                      height={300}
                      className="w-full h-full opacity-85 object-cover object-top pointer-events-none"
                      draggable={false}
                      loading="lazy"
                    />

                    {/* Dark Overlay & Pure Centered Hand Pointer Icon + Helper Cue (Pure Fade-in / Fade-out, Zero Scaling) */}
                    <div className="absolute inset-0 bg-[#1F1C1B]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center gap-2">
                      <FaHandPointer
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md"
                        aria-hidden="true"
                      />
                      <span className="text-[11px] sm:text-xs font-semibold text-white/95 tracking-wide drop-shadow-md">
                        Click to view details
                      </span>
                    </div>
                  </div>

                  {/* 2. Judul Projek (Centered) */}
                  <div className="text-center mb-1 px-4 sm:px-6">
                    <h3 className="font-semibold text-sm sm:text-[1.1rem] text-[#2D2A28] group-hover:text-[#8c4b26] transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* 3. Deskripsi Singkat Terkait Projek & Techstack */}
                  <p className="text-center text-[0.65rem] sm:text-[0.8rem] text-[#7A6F66] leading-relaxed mb-4 px-8 sm:px-16">
                    {project.shortDesc}
                  </p>
                </div>

                {/* 4. Kumpulan Teks Techstack Berlogo (Minimalis dengan Efek Hover, Tanpa Border) */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-2 mt-2 py-2 px-4 sm:px-6">
                  {project.techList.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 text-xs text-[#7A6F66] hover:text-[#2D2A28] transition-colors cursor-default group/tech"
                      >
                        <Icon
                          className="size-4 text-[#B8AEA4] group-hover/tech:text-[#8c4b26] transition-colors shrink-0"
                          aria-hidden="true"
                        />
                        {/* <span className="font-medium tracking-tight">
                          {tech.name}
                        </span> */}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {PROJECTS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToProject(dotIdx)}
              aria-label={`Go to Project ${dotIdx + 1}`}
              className="p-1.5 cursor-pointer inline-flex items-center justify-center"
            >
              <span
                className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 ${
                  activeIndex === dotIdx
                    ? "w-6 sm:w-8 bg-[#2D2A28]"
                    : "w-1.5 sm:w-2 bg-[#B8AEA4] hover:bg-[#7A6F66]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Project Detail Modal Dialog (Clean Solid Backdrop & Selectable Text) */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2D2A28]/60 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white border border-[#E3DDD5] rounded-2xl shadow-xl overflow-hidden my-auto select-text"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 bg-[#FAF7F2] border-b border-[#E3DDD5] flex items-center justify-between gap-4">
              <div>
                <h3
                  id="modal-project-title"
                  className="text-lg sm:text-xl max-sm:pr-10 font-semibold text-[#2D2A28] tracking-tight leading-snug"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details modal"
                className="p-1 text-[#7A6F66] hover:text-[#2D2A28] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5">
              {/* Full Image Preview (Plain Square, No Decoration) */}
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={640}
                height={400}
                className="w-full h-auto block"
                priority
              />

              {/* In-depth Narrative (Selectable Text) */}
              <div className="mb-10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6F66] mb-1">
                  About the Project
                </h4>
                <p className="text-sm sm:text-[0.9rem] text-[#2D2A28] text-justify leading-relaxed">
                  {selectedProject.longDesc}
                </p>
              </div>

              {/* Tech Stack List */}
              <div className="mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A6F66] mb-1">
                  Technologies &amp; Libraries
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject.techList.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1 mr-2.5 py-1 text-xs font-medium text-[#2D2A28]"
                      >
                        <Icon
                          className="w-3.5 h-3.5 text-[#8c4b26]"
                          aria-hidden="true"
                        />
                        <span>{tech.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer with Direct Live Demo CTA */}
            <div className="px-5 sm:px-6 py-3 bg-[#FAF7F2] border-t border-[#E3DDD5] flex items-center justify-between gap-3">
              <span className="text-xs text-[#7A6F66] hidden sm:inline">
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E3DDD5] font-mono text-[10px]">
                  Esc
                </kbd>{" "}
                to close
              </span>

              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-[#2D2A28] hover:bg-[#403B37] text-[#FAF7F2] font-semibold text-xs transition-all active:scale-95 ml-auto"
              >
                <span>Open Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
