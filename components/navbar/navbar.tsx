"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, FolderGit2, Workflow, MessageSquare } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuToggling, setIsMenuToggling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsScrolled(scrollPos > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuToggling(true);
    setMobileMenuOpen((prev) => !prev);
    setTimeout(() => setIsMenuToggling(false), 200);
  };

  const closeMobileMenu = () => {
    if (!mobileMenuOpen) return;
    setIsMenuToggling(true);
    setMobileMenuOpen(false);
    setTimeout(() => setIsMenuToggling(false), 200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuToggling(true);
        setMobileMenuOpen(false);
        setTimeout(() => setIsMenuToggling(false), 200);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const shouldTransition = !mobileMenuOpen && !isMenuToggling;

  return (
    <>
      <header
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Scroll Background Layer (ONLY animates fade in/out on scroll) */}
        <div
          className={`absolute inset-0 h-15 sm:h-16 pointer-events-none -z-10 ${
            shouldTransition
              ? "transition-[background-color,border-color,box-shadow] duration-300"
              : "transition-none"
          } ${
            isScrolled
              ? "bg-[#FAFAF9]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs"
              : "bg-transparent border-b border-transparent"
          }`}
        />

        {/* Mobile Open Menu Header Background (instant, zero transition delay) */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-0 h-15 sm:h-16 bg-[#FAFAF9] border-b border-stone-200 -z-10 md:hidden" />
        )}
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
              className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full object-cover shadow-2xs shrink-0 ${
                shouldTransition ? "transition-colors duration-300" : "transition-none"
              } ${
                isScrolled || mobileMenuOpen ? "border border-stone-200" : "border border-[#30363d]"
              }`}
            />
            <div className="flex flex-col text-left min-w-0">
              <span
                className={`font-bold text-xs sm:text-sm tracking-tight leading-tight truncate nav-brand-title ${
                  shouldTransition ? "transition-colors duration-300" : "transition-none"
                } ${
                  isScrolled || mobileMenuOpen
                    ? "text-stone-900 group-hover:text-[#1f6feb]"
                    : "text-white group-hover:text-[#58a6ff]"
                }`}
              >
                Haidir Aditya
              </span>
              <span
                className={`text-[10px] sm:text-[11px] font-medium leading-tight truncate nav-brand-subtitle ${
                  shouldTransition ? "transition-colors duration-300" : "transition-none"
                } ${
                  isScrolled || mobileMenuOpen ? "text-stone-600" : "text-[#58a6ff]"
                }`}
              >
                Systems &amp; Software Engineer
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-6 text-xs font-semibold ${
              shouldTransition ? "transition-colors duration-300" : "transition-none"
            } ${
              isScrolled ? "text-stone-600" : "text-stone-300"
            }`}
          >
            <a
              href="#projek"
              className={`nav-desktop-link ${
                shouldTransition ? "transition-colors duration-300" : "transition-none"
              } ${
                isScrolled ? "hover:text-[#1f6feb]" : "hover:text-white"
              }`}
            >
              Kerjaan
            </a>
            <a
              href="#workflow"
              className={`nav-desktop-link ${
                shouldTransition ? "transition-colors duration-300" : "transition-none"
              } ${
                isScrolled ? "hover:text-[#1f6feb]" : "hover:text-white"
              }`}
            >
              Cara Kerja
            </a>
            <a
              href="#kontak"
              className={`nav-desktop-link ${
                shouldTransition ? "transition-colors duration-300" : "transition-none"
              } ${
                isScrolled ? "hover:text-[#1f6feb]" : "hover:text-white"
              }`}
            >
              Kontak
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
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden p-2 rounded-lg nav-hamburger ${
                shouldTransition ? "transition-colors duration-300" : "transition-none"
              } ${
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
                <span>Kerjaan</span>
              </a>
              <a
                href="#workflow"
                onClick={closeMobileMenu}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-stone-100/80 active:bg-stone-200/60 hover:text-[#1976D2] transition-colors group"
              >
                <Workflow className="w-4 h-4 text-stone-400 group-hover:text-[#1976D2] transition-colors shrink-0" />
                <span>Cara &amp; Alur Kerja</span>
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
