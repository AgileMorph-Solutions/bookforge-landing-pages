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
          DEFAULT: "#1e2a4a",
          dark: "#121a30",
        },
        red: {
          DEFAULT: "#c41e3a",
          dark: "#9a1730",
        },
        cream: "#f7f1e6",
        parchment: {
          DEFAULT: "#ebe3d4",
          dark: "#d6ccb8",
        },
        gold: {
          DEFAULT: "#b8952e",
          light: "#d0ae45",
        },
        wood: {
          DEFAULT: "#6b5340",
          light: "#7a634e",
          dark: "#544030",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(30, 42, 74, 0.25), 0 4px 12px rgba(107, 83, 64, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(30, 42, 74, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
