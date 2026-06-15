import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { NowSection } from "@/components/sections/NowSection";
import { FeaturedWriting } from "@/components/sections/FeaturedWriting";
import { GardenFeature } from "@/components/sections/GardenFeature";
import { NewsletterBand } from "@/components/sections/NewsletterBand";
import { AboutTeaser } from "@/components/sections/AboutTeaser";

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
