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
          DEFAULT: "#1c1410",
          dark: "#0e0a08",
        },
        red: {
          DEFAULT: "#b8952e",
          dark: "#8f7424",
        },
        cream: "#e8dcc8",
        parchment: {
          DEFAULT: "#d4c4a8",
          dark: "#b8a888",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#d4b85c",
        },
        wood: {
          DEFAULT: "#2a1c14",
          light: "#3a2c20",
          dark: "#1a100c",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(28, 20, 16, 0.25), 0 4px 12px rgba(42, 28, 20, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(28, 20, 16, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
