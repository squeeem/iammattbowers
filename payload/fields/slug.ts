import type { Field } from "payload";

const slugify = (val: string) =>
  val
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// A slug text field that auto-fills from `sourceField` when left blank.
export const slugField = (sourceField = "title"): Field => ({
  name: "slug",
  type: "text",
  index: true,
  unique: true,
  admin: {
    position: "sidebar",
    description: "URL path segment. Auto-generated from the title if left blank.",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (value) return slugify(value);
        const source = (data?.[sourceField] as string) ?? "";
        return source ? slugify(source) : value;
      },
    ],
  },
});
