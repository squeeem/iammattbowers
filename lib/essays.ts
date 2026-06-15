import { Pillar } from "./pillars";
import { IMAGES } from "./images";

export interface EssayMeta {
  slug: string;
  title: string;
  pillar: Pillar;
  date: string; // ISO
  excerpt: string;
  readingTime: string;
  cover?: string;
}

// Placeholder stream until the MDX pipeline lands (build step 4).
// Real essays will be loaded from content/essays/*.mdx with typed frontmatter.
export const ESSAYS: EssayMeta[] = [
  {
    slug: "ten-beds-one-weekend",
    title: "Ten raised beds in one weekend (and what I'd redo)",
    pillar: "building",
    date: "2026-06-07",
    excerpt:
      "The full build of the garden beds — layout, soil math, the cuts I got wrong, and the video walkthrough.",
    readingTime: "8 min",
    cover: IMAGES.writingBuilding,
  },
  {
    slug: "a-saturday-in-the-yard",
    title: "A Saturday in the yard",
    pillar: "tending",
    date: "2026-05-31",
    excerpt:
      "A few photos from an ordinary weekend — the kids, the dirt, the half-finished projects we love anyway.",
    readingTime: "2 min",
    cover: IMAGES.writingTending,
  },
  {
    slug: "on-not-checking-the-phone",
    title: "On not checking the phone first",
    pillar: "enjoying",
    date: "2026-05-24",
    excerpt:
      "A small change to the first ten minutes of the day, and what it did to the rest of it.",
    readingTime: "4 min",
    cover: IMAGES.writingEnjoying,
  },
];
