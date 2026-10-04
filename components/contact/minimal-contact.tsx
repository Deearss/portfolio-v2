"use client";

import React from "react";
import { MessageSquare, Mail, ExternalLink, ArrowUpRight } from "lucide-react";

export function MinimalContact() {
  const directWhatsAppUrl = "/go/wa?text=Hi%20Haidir,%20I'd%20like%20to%20discuss%20a%20project.";
  const directEmailUrl = "/go/email?subject=Project%20Inquiry&body=Hi%20Haidir,%20I'd%20like%20to%20discuss%20a%20project.";

  return (
    <section id="contact" className="scroll-mt-16 py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E3DDD5]">
      {/* Anchor for backward compatibility */}
      <span id="kontak" className="sr-only" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#7A6F66] mb-2">
          Get In Touch
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#2D2A28] tracking-tight mb-4">
          Start a Conversation
        </h2>
        <p className="text-sm sm:text-base text-[#7A6F66] leading-relaxed max-w-xl mx-auto mb-10">
          Available for fullstack web development, system architecture, and technical consulting.
        </p>

        {/* Primary Direct CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-12">
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-md bg-[#2D2A28] hover:bg-[#403B37] text-[#FAF7F2] font-semibold text-sm sm:text-base transition-all shadow-xs active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={directEmailUrl}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-md bg-white border border-[#B8AEA4] hover:border-[#7A6F66] hover:bg-[#FAF7F2] text-[#2D2A28] font-semibold text-sm sm:text-base transition-all shadow-xs active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Send an Email</span>
          </a>
        </div>

        {/* Professional Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto text-left">
          <a
            href="https://github.com/Deearss"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white border border-[#E3DDD5] hover:border-[#B8AEA4] hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-xs text-[#7A6F66] font-medium">Repositories &amp; Code</p>
              <p className="text-sm font-bold text-[#2D2A28]">GitHub @Deearss</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#7A6F66] group-hover:text-[#2D2A28] transition-colors" />
          </a>

          <a
            href="https://www.linkedin.com/in/haidir-aditya-487b44279/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white border border-[#E3DDD5] hover:border-[#B8AEA4] hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-xs text-[#7A6F66] font-medium">Career Profile</p>
              <p className="text-sm font-bold text-[#2D2A28]">LinkedIn</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#7A6F66] group-hover:text-[#2D2A28] transition-colors" />
          </a>

          <a
            href="https://projects.co.id/public/browse_users/view/2eaf56/dier-dieeerrr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg bg-white border border-[#E3DDD5] hover:border-[#B8AEA4] hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-xs text-[#7A6F66] font-medium">Client Reviews &amp; Rating</p>
              <p className="text-sm font-bold text-[#2D2A28]">Projects.co.id</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#7A6F66] group-hover:text-[#2D2A28] transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
