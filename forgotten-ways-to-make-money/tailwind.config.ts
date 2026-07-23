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
          DEFAULT: "#3b2b1d",
          dark: "#241910",
        },
        red: {
          DEFAULT: "#4f797b",
          dark: "#3a5c5e",
        },
        cream: "#f4f0e6",
        parchment: {
          DEFAULT: "#e8e2d4",
          dark: "#bdb092",
        },
        gold: {
          DEFAULT: "#a67c52",
          light: "#c09a6a",
        },
        wood: {
          DEFAULT: "#5c4030",
          light: "#6e4e3a",
          dark: "#3a281c",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(59, 43, 29, 0.25), 0 4px 12px rgba(92, 64, 48, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(59, 43, 29, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
