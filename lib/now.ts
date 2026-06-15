import { Pillar } from "./pillars";

export interface NowNote {
  pillar: Pillar;
  text: string;
}

// The signature "right now" element — three short notes, one per pillar.
// Update this one file to keep the homepage current. Placeholder copy —
// swap for Matt's real updates (voice docs pending).
export const NOW_NOTES: NowNote[] = [
  {
    pillar: "building",
    text: "Rebuilding how I plan a week. Fewer inputs, one priority a day, and a hard stop at dinner.",
  },
  {
    pillar: "tending",
    text: "Hardening off the tomato starts on the porch. Two trays survived the late frost; one didn't.",
  },
  {
    pillar: "enjoying",
    text: "Leaving the phone inside for the first coffee. The yard sounds different at 6am than I expected.",
  },
];

// Updated by hand; shown as "as of" on the Now block.
export const NOW_UPDATED = "2026-06-14";
