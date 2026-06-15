import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        sand: "var(--sand)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        accent: "var(--accent)",
        "accent-deep": "var(--accent-deep)",
        line: "var(--line)",
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
      },
      fontSize: {
        // deliberate scale, not Tailwind defaults end to end
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1.0625rem", { lineHeight: "1.65" }],
        lg: ["1.125rem", { lineHeight: "1.65" }],
        xl: ["1.5rem", { lineHeight: "1.3" }],
        "2xl": ["1.875rem", { lineHeight: "1.15" }],
        "3xl": ["2.5rem", { lineHeight: "1.08" }],
        "4xl": ["3.25rem", { lineHeight: "1.02" }],
        "5xl": ["4.25rem", { lineHeight: "1.0" }],
      },
      maxWidth: {
        hub: "1200px",
        prose: "68ch",
      },
      borderRadius: {
        card: "18px",
        image: "16px",
      },
      boxShadow: {
        soft: "0 18px 40px -24px rgba(27, 26, 23, 0.22)",
        "soft-sm": "0 6px 18px -12px rgba(27, 26, 23, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
