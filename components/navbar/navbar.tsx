"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, FolderGit2, Workflow, Share2, MessageSquare } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        window.scrollY ||
        document.body.scrollTop ||
        0;
      const scrolled = scrollPos > 10;
      setIsScrolled(scrolled);
      const navEl = document.getElementById("main-navbar");
      if (navEl) {
        if (scrolled) {
          navEl.setAttribute("data-scrolled", "true");
        } else {
          navEl.removeAttribute("data-scrolled");
        }
      }
    };

    handleScroll();

    let observer: IntersectionObserver | null = null;
    const sentinel = document.getElementById("top-sentinel");
    if (sentinel && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          const scrolled = !entry.isIntersecting;
          setIsScrolled(scrolled);
          const navEl = document.getElementById("main-navbar");
          if (navEl) {
            if (scrolled) {
              navEl.setAttribute("data-scrolled", "true");
            } else {
              navEl.removeAttribute("data-scrolled");
            }
          }
        },
        { threshold: [0, 0.5, 1], rootMargin: "-10px 0px 0px 0px" }
      );
      observer.observe(sentinel);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? "bg-[#FAFAF9]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-15 sm:h-16 flex items-center justify-between gap-3">
          {/* Brand Badge */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              closeMobileMenu();
            }}
            className="flex items-center gap-2.5 group transition-transform active:scale-95 text-left min-w-0 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.webp"
              alt="Haidir Aditya"
              width={34}
              height={34}
              className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full object-cover shadow-2xs transition-colors shrink-0 ${
                isScrolled || mobileMenuOpen ? "border border-stone-200" : "border border-[#30363d]"
              }`}
            />
            <div className="flex flex-col text-left min-w-0">
              <span
                className={`font-bold text-xs sm:text-sm tracking-tight leading-tight truncate transition-colors nav-brand-title ${
                  isScrolled || mobileMenuOpen
                    ? "text-stone-900 group-hover:text-[#1f6feb]"
                    : "text-white group-hover:text-[#58a6ff]"
                }`}
              >
                Haidir Aditya
              </span>
              <span
                className={`text-[10px] sm:text-[11px] font-medium leading-tight truncate transition-colors nav-brand-subtitle ${
                  isScrolled || mobileMenuOpen ? "text-stone-600" : "text-[#58a6ff]"
                }`}
              >
                Systems &amp; Software Engineer
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-6 text-xs font-semibold transition-colors ${
              isScrolled ? "text-stone-600" : "text-stone-300"
            }`}
          >
            <a
              href="#projek"
              className={`nav-desktop-link transition-colors ${
                isScrolled ? "hover:text-[#1f6feb]" : "hover:text-white"
              }`}
            >
              Portofolio
            </a>
            <a
              href="#workflow"
              className={`nav-desktop-link transition-colors ${
                isScrolled ? "hover:text-[#1f6feb]" : "hover:text-white"
              }`}
            >
              Cara Kerja
            </a>
            <a
              href="#sosmed"
              className={`nav-desktop-link transition-colors ${
                isScrolled ? "hover:text-[#1f6feb]" : "hover:text-white"
              }`}
            >
              Sosial Media
            </a>
          </nav>

          {/* Right Actions: Desktop Direct Contact Button + Mobile Hamburger Button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop-only Direct Contact Button */}
            <a
              href="#kontak"
              onClick={() => {
                closeMobileMenu();
                window.dispatchEvent(
                  new CustomEvent("switch-contact-tab", { detail: "whatsapp" })
                );
              }}
              aria-label="Diskusi Projek (Buka Form Kontak)"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#1f6feb] text-white hover:bg-[#388bfd] active:scale-95 transition-all shadow-xs"
            >
              <span>Diskusi Projek</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden p-2 rounded-lg transition-colors nav-hamburger ${
                isScrolled || mobileMenuOpen
                  ? "text-stone-800 hover:bg-stone-200/60 active:bg-stone-200"
                  : "text-stone-200 hover:text-white hover:bg-white/10 active:bg-white/20"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAFAF9] border-b border-stone-200 shadow-xl animate-in slide-in-from-top-2 duration-200 font-sans">
            <nav className="px-3.5 py-3 flex flex-col gap-1 text-xs font-semibold text-stone-700">
              <a
                href="#projek"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-100/80 active:bg-stone-200/60 hover:text-[#1976D2] transition-colors group"
              >
                <FolderGit2 className="w-4 h-4 text-stone-400 group-hover:text-[#1976D2] transition-colors shrink-0" />
                <span>Portofolio Projek</span>
              </a>
              <a
                href="#workflow"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-100/80 active:bg-stone-200/60 hover:text-[#1976D2] transition-colors group"
              >
                <Workflow className="w-4 h-4 text-stone-400 group-hover:text-[#1976D2] transition-colors shrink-0" />
                <span>Cara &amp; Alur Kerja</span>
              </a>
              <a
                href="#sosmed"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-100/80 active:bg-stone-200/60 hover:text-[#1976D2] transition-colors group"
              >
                <Share2 className="w-4 h-4 text-stone-400 group-hover:text-[#1976D2] transition-colors shrink-0" />
                <span>Platform Resmi</span>
              </a>

              {/* Mobile Contact CTA Button */}
              <div className="pt-2 border-t border-stone-200/80 mt-1">
                <a
                  href="#kontak"
                  onClick={() => {
                    closeMobileMenu();
                    window.dispatchEvent(
                      new CustomEvent("switch-contact-tab", { detail: "whatsapp" })
                    );
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#1f6feb] hover:bg-[#388bfd] text-white font-bold text-xs shadow-xs transition-all active:scale-95 text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>Diskusi Projek Sekarang</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Dimmed Backdrop Overlay to Close on Outside Click */}
      {mobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 top-15 sm:top-16 bg-black/40 backdrop-blur-2xs z-40 md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}
    </>
  );
}
