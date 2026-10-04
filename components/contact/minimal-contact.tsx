"use client";

import React from "react";
import Image from "next/image";
import { Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiWhatsapp } from "react-icons/si";

export function MinimalContact() {
  // Pre-filled message, in line with the "Know of a remote opening?" copy below
  const openingMessage = encodeURIComponent(
    "Hi Haidir, I found your portfolio and I'd like to talk about an opening.",
  );
  const directWhatsAppUrl = `/go/wa?text=${openingMessage}`;
  const directEmailUrl = `/go/email?subject=${encodeURIComponent("Job Opportunity")}&body=${openingMessage}`;

  return (
    <section id="contact" className="scroll-mt-16 py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E3DDD5]">
      {/* Anchor for backward compatibility */}
      <span id="kontak" className="sr-only" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        {/* Section Header (same format as Education, Techstack & Featured Projects) */}
        <div className="text-center max-w-lg sm:px-10 mb-12 sm:mb-16 mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2D2A28] tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-[#7A6F66] mt-3 leading-relaxed">
            Ready to join my first development team.
            <br />
            Know of a remote opening? Let&apos;s talk.
          </p>
        </div>

        {/* Primary Direct CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-12">
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-md bg-[#2D2A28] hover:bg-[#403B37] text-[#FAF7F2] font-semibold text-sm sm:text-base transition-all shadow-xs active:scale-95"
          >
            <SiWhatsapp className="w-4 h-4" aria-hidden="true" />
            <span>Message on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={directEmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-md bg-white border border-[#B8AEA4] hover:border-[#7A6F66] hover:bg-[#FAF7F2] text-[#2D2A28] font-semibold text-sm sm:text-base transition-all shadow-xs active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Send an Email</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Professional Profiles Grid (brand icon on the left so visitors know where each card leads) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto text-left">
          <a
            href="https://github.com/Deearss"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white border border-[#E3DDD5] hover:border-[#B8AEA4] hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <SiGithub className="size-6 shrink-0 text-[#2D2A28]" aria-hidden="true" />
              <div>
                <p className="text-xs text-[#7A6F66] font-medium">Repositories &amp; Code</p>
                <p className="text-sm font-bold text-[#2D2A28]">GitHub @Deearss</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 shrink-0 text-[#7A6F66] group-hover:text-[#2D2A28] transition-colors" />
          </a>

          <a
            href="https://www.linkedin.com/in/haidir-aditya-487b44279/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white border border-[#E3DDD5] hover:border-[#B8AEA4] hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <FaLinkedin className="size-6 shrink-0 text-[#2D2A28]" aria-hidden="true" />
              <div>
                <p className="text-xs text-[#7A6F66] font-medium">Career Profile</p>
                <p className="text-sm font-bold text-[#2D2A28]">LinkedIn</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 shrink-0 text-[#7A6F66] group-hover:text-[#2D2A28] transition-colors" />
          </a>

          <a
            href="https://projects.co.id/public/browse_users/view/2eaf56/dier-dieeerrr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white border border-[#E3DDD5] hover:border-[#B8AEA4] hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/footer-image/icon-projectscoid.webp"
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0"
              />
              <div>
                <p className="text-xs text-[#7A6F66] font-medium">Client Reviews &amp; Rating</p>
                <p className="text-sm font-bold text-[#2D2A28]">Projects.co.id</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 shrink-0 text-[#7A6F66] group-hover:text-[#2D2A28] transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
