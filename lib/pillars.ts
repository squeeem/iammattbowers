export type Pillar = "building" | "tending" | "enjoying";

export interface PillarMeta {
  slug: Pillar;
  name: string;
  /** one-line definition in Matt's voice */
  blurb: string;
  href: string;
}

export const PILLARS: Record<Pillar, PillarMeta> = {
  building: {
    slug: "building",
    name: "Building",
    blurb:
      "How we're building our dream home, one project at a time — the garden, the beds, and whatever I'm figuring out next. Often on video.",
    href: "/building",
  },
  tending: {
    slug: "tending",
    name: "Tending",
    blurb:
      "A photo record of our family and the space we're making. The unhurried version, not the highlight reel.",
    href: "/tending",
  },
  enjoying: {
    slug: "enjoying",
    name: "Enjoying",
    blurb:
      "The point of all of it — slow mornings, shared meals, and actually being here for what we built.",
    href: "/enjoying",
  },
};

export const PILLAR_ORDER: Pillar[] = ["building", "tending", "enjoying"];
