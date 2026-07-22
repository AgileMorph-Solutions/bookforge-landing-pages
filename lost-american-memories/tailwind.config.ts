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
        // Sampled from Lost American Memories cookbook cover art
        navy: {
          DEFAULT: "#1a2b44",
          dark: "#121c2e",
        },
        red: {
          DEFAULT: "#8b1a1a",
          dark: "#6b1212",
          container: "#8b1a1a",
        },
        cream: "#ede4d0",
        parchment: {
          DEFAULT: "#e8d9c3",
          dark: "#d4c4a8",
        },
        gold: {
          DEFAULT: "#b8953e",
          light: "#d4b45c",
        },
        wood: {
          DEFAULT: "#5c4030",
          light: "#6e4e3a",
          dark: "#3f2c20",
        },
        ink: "#1a1510",
      },
      fontFamily: {
        display: ["var(--font-libre-caslon)", "Georgia", "serif"],
        body: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        book: "0 14px 36px rgba(26, 43, 68, 0.28), 0 4px 12px rgba(92, 64, 48, 0.2)",
        vintage: "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 16px rgba(26, 43, 68, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
