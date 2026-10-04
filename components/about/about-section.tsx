"use client";

import React from "react";
import { GraduationCap, Code2 } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="education"
      className="scroll-mt-16 py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E3DDD5]"
    >
      {/* Anchor alias for backward compatibility */}
      <span id="about" className="sr-only" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-lg sm:px-18 mb-12 sm:mb-16 mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2D2A28] tracking-tight">
            Education
          </h2>
          <p className="text-sm sm:text-base text-[#7A6F66] mt-3 leading-relaxed">
            Formal academic foundations and hands-on software engineering training.
          </p>
        </div>

        {/* 2-Column Grid Layout: College & Vocational School */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: College / University */}
          <div className="relative bg-white border border-[#E3DDD5] p-6 sm:p-8 rounded-none flex flex-col justify-between">
            {/* Academic Paper Corner Accents */}
            <span className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#B8AEA4] pointer-events-none" aria-hidden="true" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#B8AEA4] pointer-events-none" aria-hidden="true" />
            <span className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#B8AEA4] pointer-events-none" aria-hidden="true" />
            <span className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#B8AEA4] pointer-events-none" aria-hidden="true" />

            <div>
              {/* Academic Paper Header Block */}
              <div className="text-center pb-6 mb-6 border-b border-[#E3DDD5]">
                {/* Track Overline */}
                <div className="items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#8c4b26] mb-4">
                  <GraduationCap className="mx-auto size-14" strokeWidth={1.8} />
                  <span>Higher Education</span>
                </div>

                {/* Title & Institution */}
                <h3 className="text-xl sm:text-2xl font-semibold text-[#2D2A28]/90 tracking-tight">
                  B.S. in Computer Science
                </h3>
                <p className="text-sm font-medium text-[#7A6F66]">
                  Universitas Islam Kalimantan MAB
                </p>
                <p className="text-xs text-[#7A6F66] mt-0.5">
                  Banjarmasin, Indonesia
                </p>
                <p className="text-xs font-semibold tracking-wide text-[#8c4b26] mt-4.5">
                  Active (2024 - Present)
                </p>
              </div>

              {/* Academic Paper Body Paragraphs */}
              <div className="space-y-4">
                <p className="text-justify text-xs sm:text-[13.5px] text-[#7A6F66] leading-relaxed">
                  Currently pursuing an undergraduate degree in Computer Science (Teknik Informatika). Deepening technical rigor in software engineering methodology, data systems, and computational intelligence.
                </p>

                {/* Sub-sections: Memorable Highlights */}
                <div className="space-y-3.5 pl-3.5 sm:pl-4">
                  <div className="relative space-y-1">
                    <span
                      className="absolute -left-3 sm:-left-3.5 top-1.5 w-1.5 h-1.5 rounded-full bg-[#8c4b26]"
                      aria-hidden="true"
                    />
                    <h4 className="text-xs sm:text-sm font-semibold text-[#2D2A28]/90 tracking-tight">
                      Relational Database & OOP Architecture
                    </h4>
                    <p className="text-justify text-xs sm:text-[13px] text-[#7A6F66] leading-relaxed">
                      Hands-on schema normalization, multi-table relationships, indexing strategies, and query optimization, structured alongside clean Object-Oriented Programming patterns and modular separation of concerns.
                    </p>
                  </div>

                  <div className="relative space-y-1">
                    <span
                      className="absolute -left-3 sm:-left-3.5 top-1.5 w-1.5 h-1.5 rounded-full bg-[#8c4b26]"
                      aria-hidden="true"
                    />
                    <h4 className="text-xs sm:text-sm font-semibold text-[#2D2A28]/90 tracking-tight">
                      Applied Statistics & Artificial Intelligence
                    </h4>
                    <p className="text-justify text-xs sm:text-[13px] text-[#7A6F66] leading-relaxed">
                      Active coursework in semesters 4 and 5 focusing on applied statistics, machine learning fundamentals, data modeling, and big data processing pipelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vocational High School (SMK) */}
          <div className="relative bg-white border border-[#E3DDD5] p-6 sm:p-8 rounded-none flex flex-col justify-between">
            {/* Academic Paper Corner Accents */}
            <span className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#B8AEA4] pointer-events-none" aria-hidden="true" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#B8AEA4] pointer-events-none" aria-hidden="true" />
            <span className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#B8AEA4] pointer-events-none" aria-hidden="true" />
            <span className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#B8AEA4] pointer-events-none" aria-hidden="true" />

            <div>
              {/* Academic Paper Header Block */}
              <div className="text-center pb-6 mb-6 border-b border-[#E3DDD5]">
                {/* Track Overline */}
                <div className="items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#8c4b26] mb-4">
                  <Code2 className="mx-auto size-14" strokeWidth={1.8} />
                  <span>Vocational High School</span>
                </div>

                {/* Title & Institution */}
                <h3 className="text-xl sm:text-2xl font-semibold text-[#2D2A28]/90 tracking-tight">
                  Software Engineering (RPL)
                </h3>
                <p className="text-sm font-medium text-[#7A6F66]">
                  SMK Negeri 4 Banjarmasin
                </p>
                <p className="text-xs text-[#7A6F66] mt-0.5">
                  Banjarmasin, Indonesia
                </p>
                <p className="text-xs font-semibold tracking-wide text-[#7A6F66] mt-4.5">
                  Graduated (2021 - 2024)
                </p>
              </div>

              {/* Academic Paper Body Paragraphs */}
              <div className="space-y-4">
                <p className="text-justify text-xs sm:text-[13.5px] text-[#7A6F66] leading-relaxed">
                  Three years of intensive technical training in software engineering fundamentals. Cultivated strong core capabilities in HTML5, native CSS, JavaScript, and PHP with an emphasis on building systems without relying on bloated dependencies.
                </p>

                {/* Sub-sections: Memorable Highlights */}
                <div className="space-y-3.5 pl-3.5 sm:pl-4">
                  <div className="relative space-y-1">
                    <span
                      className="absolute -left-3 sm:-left-3.5 top-1.5 w-1.5 h-1.5 rounded-full bg-[#8c4b26]"
                      aria-hidden="true"
                    />
                    <h4 className="text-xs sm:text-sm font-semibold text-[#2D2A28]/90 tracking-tight">
                      Vocational Competency Exam (UKK)
                    </h4>
                    <p className="text-justify text-xs sm:text-[13px] text-[#7A6F66] leading-relaxed">
                      Built a cashier web application with multi-role accounts (admin and staff), item and customer CRUD, and checkout transactions under strict 3-day offline exam conditions using pure native CSS and PHP, completed entirely without AI assistance.
                    </p>
                  </div>

                  <div className="relative space-y-1">
                    <span
                      className="absolute -left-3 sm:-left-3.5 top-1.5 w-1.5 h-1.5 rounded-full bg-[#8c4b26]"
                      aria-hidden="true"
                    />
                    <h4 className="text-xs sm:text-sm font-semibold text-[#2D2A28]/90 tracking-tight">
                      External Industry Assessment
                    </h4>
                    <p className="text-justify text-xs sm:text-[13px] text-[#7A6F66] leading-relaxed">
                      Successfully cleared the technical evaluation and code audit led by external industry assessors, certifying practical software development proficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
