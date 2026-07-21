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
          DEFAULT: "#7a1f2e",
          dark: "#5c1622",
        },
        cream: "#f0e6d4",
        parchment: {
          DEFAULT: "#e0d4c0",
          dark: "#cbbfa8",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#e0bc4a",
        },
        wood: {
          DEFAULT: "#4a3428",
          light: "#5a4435",
          dark: "#3a281c",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(26, 43, 68, 0.25), 0 4px 12px rgba(74, 52, 40, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(26, 43, 68, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
