import type { CollectionConfig } from "payload";

// TENDING pillar — photo portfolio of family + space. Each Photo IS an image
// upload with a caption and date; the /tending page renders them as a gallery.
export const Photos: CollectionConfig = {
  slug: "photos",
  labels: { singular: "Photo", plural: "Photos" },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "caption",
    defaultColumns: ["caption", "date", "album"],
    description: "Tending — the photo gallery of family + our space.",
  },
  upload: {
    imageSizes: [
      { name: "thumb", width: 600 },
      { name: "full", width: 2000 },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the photo for screen readers + SEO." },
    },
    { name: "caption", type: "text" },
    {
      name: "date",
      type: "date",
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar" },
    },
    {
      name: "album",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Optional grouping label (e.g. 'Spring 2026').",
      },
    },
  ],
};
