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
          DEFAULT: "#041525",
          dark: "#020c18",
        },
        red: {
          DEFAULT: "#8b6914",
          dark: "#6b5010",
        },
        cream: "#f2e8d8",
        parchment: {
          DEFAULT: "#eddbbf",
          dark: "#d4c4a8",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#e0bc4a",
        },
        wood: {
          DEFAULT: "#5c3d2e",
          light: "#6b4a35",
          dark: "#3b2b1d",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(4, 21, 37, 0.25), 0 4px 12px rgba(92, 61, 46, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(4, 21, 37, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
