import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Brush,
  CircleCheck,
  CodeXml,
  Flag,
  ListChecks,
  Palette,
  Scale,
} from "lucide-react";

interface WorkItem {
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  title: string;
  desc: string;
}

const MY_PART: WorkItem[] = [
  {
    icon: Flag,
    title: "What done means",
    desc: "I set the basic Definition of Done for every project. AI fills in the detailed checklist.",
  },
  {
    icon: Palette,
    title: "How it looks and feels",
    desc: "The style is always my call, down to the colors and fonts of this site.",
  },
  {
    icon: Scale,
    title: "Whether it's worth building",
    desc: "Business logic and risk stay with me. AI can't tell when an idea will drain my wallet and my sanity.",
  },
];

const AI_PART: WorkItem[] = [
  {
    icon: CodeXml,
    title: "Writing the code",
    desc: "Claude Code and Antigravity write most of it. I steer, test, and send it back when it's wrong.",
  },
  {
    icon: ListChecks,
    title: "The detailed checklists",
    desc: "Breaking my Definition of Done into small steps that can each be checked.",
  },
  {
    icon: Brush,
    title: "Drawing what I can't",
    desc: "Canva AI, Gemini, and ChatGPT make the images. I add small touch-ups.",
  },
];

const DEFINITION_OF_DONE = [
  "It looks right on desktop and on my phone.",
  "Type check, lint, and build all pass.",
  "Every claim matches the real thing.",
  "My closest friends run out of critiques.",
];

const AVATAR_STEPS = [
  {
    tool: "Canva AI",
    avatars: [
      { src: "/avatar-chibi.webp", alt: "Color chibi avatar" },
      { src: "/avatar-chibi-databases.webp", alt: "Black-and-white chibi avatar" },
    ],
  },
  {
    tool: "Antigravity",
    avatars: [
      { src: "/avatar-chibi-frontend.webp", alt: "Chibi avatar wearing a beret" },
      { src: "/avatar-chibi-backend.webp", alt: "Chibi avatar wearing a headset" },
      { src: "/avatar-chibi-devops.webp", alt: "Chibi avatar wearing a work cap" },
    ],
  },
];

function WorkCard({ label, items }: { label: string; items: WorkItem[] }) {
  return (
    <div className="relative bg-[#2D2A28] border border-[#3D3A37] p-6 sm:p-8">
      {/* Academic Paper Corner Accents (same as the Education cards) */}
      <span className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#7A6F66] pointer-events-none" aria-hidden="true" />
      <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#7A6F66] pointer-events-none" aria-hidden="true" />
      <span className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#7A6F66] pointer-events-none" aria-hidden="true" />
      <span className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#7A6F66] pointer-events-none" aria-hidden="true" />

      <h3 className="text-xs font-bold uppercase tracking-widest text-[#c48b6d] mb-5 sm:mb-6">
        {label}
      </h3>

      <ul className="space-y-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title} className="flex items-start gap-3.5">
              <Icon className="size-5 mt-0.5 shrink-0 text-[#c48b6d]" strokeWidth={1.8} aria-hidden="true" />
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-semibold text-[#FAF7F2] tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-[13.5px] text-[#B8AEA4] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AiWorkflowSection() {
  return (
    <section id="ai" className="scroll-mt-16 py-16 sm:py-24 bg-[#1F1C1B] text-[#E3DDD5]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header (same format as the other sections, inverted for the dark background) */}
        <div className="text-center max-w-lg sm:px-10 mb-12 sm:mb-16 mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#FAF7F2] tracking-tight">
            Working with AI
          </h2>
          <p className="text-sm sm:text-base text-[#B8AEA4] mt-3 leading-relaxed">
            AI writes most of my code these days.
            <br />
            I decide what to build and when it&apos;s done.
          </p>
        </div>

        {/* My part vs AI's part */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <WorkCard label="My part" items={MY_PART} />
          <WorkCard label="AI's part" items={AI_PART} />
        </div>

        {/* Definition of Done (the proof behind the hero tagline) */}
        <div className="mt-4 sm:mt-6 bg-[#2D2A28] border border-[#3D3A37] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-5">
            <h3 className="text-lg sm:text-xl font-semibold text-[#FAF7F2] tracking-tight">
              My Definition of Done
            </h3>
            <p className="text-xs sm:text-sm text-[#B8AEA4]">
              Nothing goes public until all four are true.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {DEFINITION_OF_DONE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#E3DDD5]">
                <CircleCheck className="size-4 mt-0.5 shrink-0 text-[#c48b6d]" strokeWidth={1.8} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Receipts */}
        <h3 className="mt-12 sm:mt-16 mb-4 sm:mb-5 text-center text-xs font-bold uppercase tracking-widest text-[#c48b6d]">
          Receipts
        </h3>

        {/* Receipt 1: the chibi avatars */}
        <div className="bg-[#2D2A28] border border-[#3D3A37] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-2 space-y-2">
            <h4 className="text-base sm:text-lg font-semibold text-[#FAF7F2] tracking-tight">
              The chibi avatars
            </h4>
            <p className="text-xs sm:text-[13.5px] text-[#B8AEA4] leading-relaxed">
              I can&apos;t draw. Canva AI turned a photo of my face into a chibi, which I made into a color and a black-and-white version. Antigravity then gave the black-and-white one a beret, a headset, and a work cap for the Techstack cards.
            </p>
          </div>

          {/* Stacked on phones (arrow points down), side by side from sm up */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {AVATAR_STEPS.map((step, stepIdx) => (
              <React.Fragment key={step.tool}>
                {stepIdx > 0 && (
                  <ArrowRight className="size-4 text-[#7A6F66] shrink-0 rotate-90 sm:rotate-0" aria-hidden="true" />
                )}
                <figure className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    {step.avatars.map((avatar) => (
                      <div key={avatar.src} className="bg-white p-1 rounded-md">
                        <Image
                          src={avatar.src}
                          alt={avatar.alt}
                          width={72}
                          height={72}
                          className="size-12 sm:size-16 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                  <figcaption className="text-xs text-[#B8AEA4]">{step.tool}</figcaption>
                </figure>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Receipts 2 & 3 */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-[#2D2A28] border border-[#3D3A37] p-6 sm:p-8 space-y-2">
            <h4 className="text-base sm:text-lg font-semibold text-[#FAF7F2] tracking-tight">
              This website and the demos
            </h4>
            <p className="text-xs sm:text-[13.5px] text-[#B8AEA4] leading-relaxed">
              I redesigned this site in three days with Antigravity, then refined it with Claude Code. The three demo landing pages in Featured Projects were built with Claude Code too.
            </p>
            <a
              href="https://github.com/Deearss/portfolio-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 pt-1 text-xs sm:text-sm font-semibold text-[#c48b6d] hover:text-[#FAF7F2] underline underline-offset-4 transition-colors"
            >
              View the source on GitHub
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="bg-[#2D2A28] border border-[#3D3A37] p-6 sm:p-8 space-y-2">
            <h4 className="text-base sm:text-lg font-semibold text-[#FAF7F2] tracking-tight">
              When AI got it wrong
            </h4>
            <p className="text-xs sm:text-[13.5px] text-[#B8AEA4] leading-relaxed">
              During the redesign, AI described features my demos didn&apos;t have and labeled two Astro sites as Next.js. Checking every claim against the live demos caught it before it went public.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
