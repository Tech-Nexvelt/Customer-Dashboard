"use client";
import React from "react";
import HeroSection from "@/components/marketing/HeroSection";
import StatsSection from "@/components/marketing/StatsSection";
import HowItWorks from "@/components/marketing/HowItWorks";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import PricingSection from "@/components/marketing/PricingSection";
import Testimonials from "@/components/marketing/Testimonials";
import CTASection from "@/components/marketing/CTASection";

export default function MarketingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <FeatureGrid />
      <PricingSection />
      <Testimonials />
      <CTASection />
    </div>
  );
}
