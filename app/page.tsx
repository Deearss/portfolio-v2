import React from "react";
import { Navbar } from "@/components/navbar/navbar";
import { RailwayHero } from "@/components/hero/railway-hero";
import { ProjectDeckCarousel } from "@/components/projects/project-deck-carousel";
import { GeneralWorkflow } from "@/components/workflow/general-workflow";
import { PriceAnchor } from "@/components/pricing/price-anchor";
import { RichSocialCards } from "@/components/socials/rich-social-cards";
import { WhatsappForm } from "@/components/contact/whatsapp-form";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9]">
      <Navbar />
      <main className="flex-1">
        <RailwayHero />
        <ProjectDeckCarousel />
        <GeneralWorkflow />
        <PriceAnchor />
        <RichSocialCards />
        <WhatsappForm />
      </main>
      <Footer />
    </div>
  );
}
