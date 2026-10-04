"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  MapPin,
  Phone,
  Mail,
  Rocket,
} from "lucide-react";

export function RailwayHero() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 bg-[#FAF7F2] text-[#2D2A28] border-b border-[#E3DDD5] overflow-hidden"
    >

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Identity, Headline, Tagline, and Action CTAs (Centered on mobile, left-aligned on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center text-center sm:items-start sm:text-left">
            {/* Remote Work Status (Text + Rocket Icon) */}
            <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-semibold text-[#7A6F66] mb-4 sm:mb-5">
              <Rocket className="w-4 h-4 text-[#7A6F66] shrink-0" strokeWidth={2} />
              <span className="leading-none">Available for Remote Work</span>
            </div>

            {/* Primary Headline in Source Serif 4 */}
            <h1 className="text-3xl sm:text-5xl md:text-5xl font-semibold text-[#2D2A28] leading-[1.16] tracking-tight mb-2">
              Hi, I&apos;m{" "}
              <span className="relative inline-block text-[#2D2A28]">
                Haidir Aditya
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-0.5 sm:-bottom-1 w-full h-[2px] bg-[#B8AEA4] rounded-full animate-underline-expand pointer-events-none"
                />
              </span>
            </h1>

            {/* Professional Role */}
            <h2 className="text-xl sm:text-2xl font-semibold text-[#7A6F66] mb-4 sm:mb-5 tracking-tight">
              Fullstack Developer
            </h2>

            {/* Selected Tagline */}
            <p className="text-[0.85rem] sm:text-[0.98rem] text-[#7A6F66] leading-relaxed mb-7 max-w-xl font-medium">
              I build scalable web apps with a{" "}
              <strong className="text-[#2D2A28] font-semibold">
                rigorous Definition of Done
              </strong>{" "}
              and{" "}
              <strong className="text-[#2D2A28] font-semibold">
                clean systems architecture
              </strong>
              . Powered by modern AI tools daily.
            </p>

            {/* Three Main Action Buttons */}
            <div className="flex flex-wrap sm:items-center gap-3 sm:gap-3.5 mb-6 w-full sm:w-auto">
              <a
                href="#work"
                onClick={(e) => scrollTo(e, "work")}
                className="order-2 flex-1 sm:flex-initial sm:order-1 sm:w-auto inline-flex items-center justify-center gap-2 px-0 sm:px-6 py-2 sm:py-2.5 rounded-md bg-[#2D2A28] hover:bg-[#403B37] text-[#FAF7F2] font-semibold text-[0.8rem] sm:text-[0.88rem] transition-all shadow-xs active:scale-95"
              >
                <span>View My Work</span>
                <ArrowDown className="size-3.5 sm:size-4" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "contact")}
                className="order-3 flex-1 sm:flex-initial sm:order-2 sm:w-auto inline-flex items-center justify-center gap-2 px-0 sm:px-6 py-2 sm:py-2.5 rounded-md bg-white border border-[#B8AEA4] hover:border-[#2D2A28] hover:bg-neutral-50 hover:shadow-xs text-[#2D2A28] font-semibold text-[0.8rem] sm:text-[0.88rem] transition-all active:scale-95"
              >
                <span>Get In Touch</span>
                <ArrowDown className="size-3.5 sm:size-4" />
              </a>

              <a
                href="/cv-haidir-aditya.pdf"
                download="CV-Haidir-Aditya.pdf"
                className="order-1 w-full sm:order-3 sm:w-auto mb-2.5 sm:mb-0 inline-flex items-center justify-center gap-2 px-0 sm:px-6 py-2 sm:py-2.5 rounded-md bg-[#e49a4c] hover:bg-[#d88d3e] text-[#2D2A28] border border-[#d88d3e] font-semibold text-[0.8rem] sm:text-[0.88rem] transition-all shadow-xs active:scale-95"
              >
                <Download className="size-3.5 sm:size-4 text-[#2D2A28]" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Three Quick Social and Direct Contact Icons (Borderless, Centered on mobile) */}
            <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
              <a
                href="https://github.com/Deearss"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Haidir Aditya GitHub Profile"
                className="text-[#7A6F66] hover:text-[#2D2A28] p-1.5 sm:-ml-1.5 rounded-md transition-colors active:scale-95 inline-flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/haidir-aditya-487b44279/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Haidir Aditya LinkedIn Profile"
                className="text-[#7A6F66] hover:text-[#2D2A28] p-1.5 rounded-md transition-colors active:scale-95 inline-flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                </svg>
              </a>

              <a
                href="/go/email"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send Email to Haidir Aditya"
                className="text-[#7A6F66] hover:text-[#2D2A28] p-1.5 rounded-md transition-colors active:scale-95 inline-flex items-center justify-center"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* Right Column: Chibi Profile Card (Anthropic Warm Pebble Aesthetic) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px] sm:max-w-[360px] bg-white border border-[#E3DDD5] rounded-2xl p-5 sm:p-6 shadow-xs">
              {/* Card Header: Career Status (Text + Rocket Icon) */}
              <div className="flex justify-center mb-0 relative -top-9 py-2 mx-20 bg-[#2D2A28] rounded-2xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold  text-white">
                  <Rocket className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  <span className="leading-none">Open to Work</span>
                </div>
              </div>

              {/* Clean Chibi Avatar (No Border) */}
              <div className="border-[#E3DDD5] w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 p-0 overflow-hidden flex items-center justify-center">
                <Image
                  src="/avatar-chibi.webp"
                  alt="Haidir Aditya Chibi Avatar"
                  width={360}
                  height={360}
                  priority
                  className="w-full h-full object-cover relative"
                />
              </div>

              {/* Name & Title */}
              <div className="text-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#2D2A28] leading-tight">
                  Haidir Aditya
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6F66] font-medium mt-0.5">
                  Fullstack Developer
                </p>
              </div>

              {/* Subtle Divider */}
              <div className="border-t border-[#E3DDD5] my-3.5" />

              {/* Protected Contact Rows (Anti-Scrape Bot) */}
              <div className="space-y-2.5 text-left text-xs sm:text-sm">
                {/* Location */}
                <div className="flex items-center gap-2.5 text-[#2D2A28]">
                  <MapPin className="w-4 h-4 text-[#7A6F66] shrink-0" />
                  <span className="font-medium">Banjarmasin, Indonesia</span>
                </div>

                {/* WhatsApp Protected */}
                <div className="flex items-center gap-2.5 text-[#2D2A28]">
                  <Phone className="w-4 h-4 text-[#7A6F66] shrink-0" />
                  <a
                    href="/go/wa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#2D2A28] hover:text-[#10B981] inline-flex items-center gap-1 transition-colors group"
                  >
                    <span>+62 (WhatsApp Direct)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#7A6F66] group-hover:text-[#10B981] transition-colors" />
                  </a>
                </div>

                {/* Email Protected */}
                <div className="flex items-center gap-2.5 text-[#2D2A28]">
                  <Mail className="w-4 h-4 text-[#7A6F66] shrink-0" />
                  <a
                    href="/go/email"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#2D2A28] hover:text-[#2563EB] inline-flex items-center gap-1 transition-colors group"
                  >
                    <span>Email (Direct Gateway)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#7A6F66] group-hover:text-[#2563EB] transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
