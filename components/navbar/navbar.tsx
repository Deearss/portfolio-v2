"use client";

import React, { useState, useEffect } from "react";
import { Menu, UserPlus, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsScrolled(scrollPos > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMobileMenu();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        data-scrolled={isScrolled ? "true" : "false"}
        className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F2] border-b border-[#E3DDD5] transition-colors duration-200"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Brand Name (Minimalist Editorial Typography) */}
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, "about")}
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D2A28] hover:text-[#7A6F66] transition-colors select-none"
            aria-label="Deearss Home"
          >
            Deearss
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="text-xs font-semibold uppercase tracking-widest text-[#7A6F66] hover:text-[#2D2A28] transition-colors"
            >
              ABOUT
            </a>
            <a
              href="#skills"
              onClick={(e) => scrollToSection(e, "skills")}
              className="text-xs font-semibold uppercase tracking-widest text-[#7A6F66] hover:text-[#2D2A28] transition-colors"
            >
              SKILLS
            </a>
            <a
              href="#work"
              onClick={(e) => scrollToSection(e, "work")}
              className="text-xs font-semibold uppercase tracking-widest text-[#7A6F66] hover:text-[#2D2A28] transition-colors"
            >
              WORK
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="text-xs font-semibold uppercase tracking-widest text-[#7A6F66] hover:text-[#2D2A28] transition-colors"
            >
              CONTACT
            </a>
          </nav>

          {/* Right Action: Minimalist CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-md bg-[#2D2A28] hover:bg-[#403B37] text-[#FAF7F2] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xs active:scale-95 select-none leading-none"
            >
              <UserPlus className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
              <span className="leading-none">HIRE ME</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-[#2D2A28] hover:bg-[#E3DDD5]/60 rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#E3DDD5] shadow-sm px-6 py-4">
            <nav className="flex flex-col gap-3 font-medium text-xs uppercase tracking-wider text-[#2D2A28]">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, "about")}
                className="py-1 text-[#7A6F66] hover:text-[#2D2A28] transition-colors"
              >
                ABOUT
              </a>
              <a
                href="#skills"
                onClick={(e) => scrollToSection(e, "skills")}
                className="py-1 text-[#7A6F66] hover:text-[#2D2A28] transition-colors"
              >
                SKILLS
              </a>
              <a
                href="#work"
                onClick={(e) => scrollToSection(e, "work")}
                className="py-1 text-[#7A6F66] hover:text-[#2D2A28] transition-colors"
              >
                WORK
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="py-1 text-[#7A6F66] hover:text-[#2D2A28] transition-colors"
              >
                CONTACT
              </a>

              <div className="pt-3 border-t border-[#E3DDD5] mt-1">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#2D2A28] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider active:scale-95 transition-all text-center leading-none"
                >
                  <UserPlus className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  <span className="leading-none">HIRE ME</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Subtle Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 top-16 bg-black/20 z-40 md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}
