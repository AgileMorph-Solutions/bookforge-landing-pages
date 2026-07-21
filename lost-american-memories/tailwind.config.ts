import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1a2b44",
          dark: "#111a2e",
        },
        red: {
          DEFAULT: "#8b1d1d",
          dark: "#6d1414",
        },
        cream: "#f2e7d5",
        parchment: {
          DEFAULT: "#e8d9c5",
          dark: "#d4c4ad",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#e0bc4a",
        },
        wood: {
          DEFAULT: "#5c3d2e",
          light: "#6b4a35",
          dark: "#4a3025",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(26, 43, 68, 0.25), 0 4px 12px rgba(92, 61, 46, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(26, 43, 68, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
