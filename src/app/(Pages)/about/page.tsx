"use client";

import { AboutHero } from "./components/AboutHero";
import { StatsSection } from "./components/StatsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { TeamSection } from "./components/TeamSection";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900 ">
      <AboutHero />
      <StatsSection />
      <FeaturesSection />
      <TeamSection />
    </main>
  );
}
