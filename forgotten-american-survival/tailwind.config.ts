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
          DEFAULT: "#2a2118",
          dark: "#1a1510",
        },
        red: {
          DEFAULT: "#c4782a",
          dark: "#9a5c1e",
        },
        cream: "#ede5d1",
        parchment: {
          DEFAULT: "#d9ceb8",
          dark: "#c4b69a",
        },
        gold: {
          DEFAULT: "#d4a84b",
          light: "#e0bc5a",
        },
        wood: {
          DEFAULT: "#3b2b1d",
          light: "#4a3828",
          dark: "#2a1e14",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(42, 33, 24, 0.25), 0 4px 12px rgba(59, 43, 29, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(42, 33, 24, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
