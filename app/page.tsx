import React from "react";
import { Navbar } from "@/components/navbar/navbar";
import { RailwayHero } from "@/components/hero/railway-hero";
import { AboutSection } from "@/components/about/about-section";
import { SkillsSection } from "@/components/skills/skills-section";
import { ProjectDeckCarousel } from "@/components/projects/project-deck-carousel";
import { AiWorkflowSection } from "@/components/ai/ai-workflow-section";
import { MinimalContact } from "@/components/contact/minimal-contact";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2A28]">
      <Navbar />
      <main className="flex-1">
        <RailwayHero />
        <AboutSection />
        <SkillsSection />
        <ProjectDeckCarousel />
        <AiWorkflowSection />
        <MinimalContact />
      </main>
      <Footer />
    </div>
  );
}
