import type { CollectionConfig } from "payload";

// General media — covers, in-body images, project galleries.
// Storage handled by the Vercel Blob plugin (see payload.config.ts).
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    // Vercel Blob serves the file; Payload generates these sizes on upload.
    imageSizes: [
      { name: "thumb", width: 480 },
      { name: "card", width: 900 },
      { name: "wide", width: 1600 },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the image for screen readers + SEO." },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
