import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

// BUILDING pillar — portfolio of home projects. Each project gets its own
// detail page at /building/[slug].
export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Project", plural: "Projects" },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "date", "featured"],
    description: "Building — home projects, documented one at a time.",
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Surface on the homepage." },
    },
    {
      name: "date",
      type: "date",
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar" },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: { description: "1–2 sentence summary for cards + meta." },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "youtubeUrl",
      type: "text",
      admin: { description: "Optional YouTube video to embed on the project page." },
    },
    {
      name: "body",
      type: "richText",
      admin: { description: "The full write-up of the project." },
    },
    {
      name: "gallery",
      type: "array",
      labels: { singular: "Image", plural: "Gallery images" },
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    {
      name: "links",
      type: "array",
      labels: { singular: "Link", plural: "Promo / resource links" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
  ],
};
