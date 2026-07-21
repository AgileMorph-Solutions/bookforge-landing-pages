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
          DEFAULT: "#0a1628",
          dark: "#050b14",
        },
        red: {
          DEFAULT: "#00b4e4",
          dark: "#0090b8",
        },
        cream: "#e8eef5",
        parchment: {
          DEFAULT: "#d5dde8",
          dark: "#b8c4d4",
        },
        gold: {
          DEFAULT: "#5ec8e8",
          light: "#7ed4f0",
        },
        wood: {
          DEFAULT: "#121c2e",
          light: "#1a2840",
          dark: "#0a1018",
        },
      },
      fontFamily: {
        display: ["var(--font-roboto-slab)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        book: "0 12px 40px rgba(10, 22, 40, 0.25), 0 4px 12px rgba(18, 28, 46, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px rgba(10, 22, 40, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
