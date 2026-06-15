import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";

// ENJOYING pillar — the blog. Native posts + recipes render on-site;
// linkposts click straight out to Substack (etc.) with an ↗ indicator.
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Post", plural: "Posts" },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "status", "date"],
    description: "Enjoying — blog posts, recipes, and outbound links.",
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "type",
      type: "select",
      defaultValue: "native",
      required: true,
      options: [
        { label: "Native post", value: "native" },
        { label: "Linkpost (outbound)", value: "linkpost" },
        { label: "Recipe", value: "recipe" },
      ],
      admin: { position: "sidebar" },
    },
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
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      // shown only for linkposts
      name: "externalUrl",
      type: "text",
      admin: {
        description: "Where the linkpost points (e.g. a Substack article).",
        condition: (data) => data?.type === "linkpost",
      },
    },
    {
      // native posts + recipes render this on-site
      name: "body",
      type: "richText",
      admin: {
        condition: (data) => data?.type !== "linkpost",
      },
    },
    {
      name: "recipe",
      type: "group",
      admin: { condition: (data) => data?.type === "recipe" },
      fields: [
        { name: "servings", type: "text" },
        { name: "totalTime", type: "text" },
        {
          name: "ingredients",
          type: "array",
          fields: [{ name: "item", type: "text", required: true }],
        },
      ],
    },
  ],
};
