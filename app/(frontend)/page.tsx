import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { NowSection } from "@/components/sections/NowSection";
import { FeaturedWriting } from "@/components/sections/FeaturedWriting";
import { GardenFeature } from "@/components/sections/GardenFeature";
import { NewsletterBand } from "@/components/sections/NewsletterBand";
import { AboutTeaser } from "@/components/sections/AboutTeaser";

// Fetch data on-demand (not prerendered during build)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <NowSection />
      <FeaturedWriting />
      <GardenFeature />
      <NewsletterBand />
      <AboutTeaser />
    </>
  );
}
