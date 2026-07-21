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
          DEFAULT: "#2d4a27",
          dark: "#1e331c",
        },
        red: {
          DEFAULT: "#5c7a3a",
          dark: "#45602c",
        },
        cream: "#f4f0e6",
        parchment: {
          DEFAULT: "#e8e2d4",
          dark: "#d4cdb8",
        },
        gold: {
          DEFAULT: "#c4a35a",
          light: "#d4b86a",
        },
        wood: {
          DEFAULT: "#6b4a35",
          light: "#7a5840",
          dark: "#543828",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(45, 74, 39, 0.25), 0 4px 12px rgba(107, 74, 53, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(45, 74, 39, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
