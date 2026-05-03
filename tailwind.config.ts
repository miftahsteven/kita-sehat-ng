import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0098b0",
          50: "#e6f7fa",
          100: "#cceff5",
          200: "#99dfeb",
          300: "#66cfe1",
          400: "#33bfd7",
          500: "#0098b0",
          600: "#007a8d",
          700: "#005b6a",
          800: "#003d46",
          900: "#001e23",
        },
        secondary: {
          DEFAULT: "#103174",
          50: "#e8ebf4",
          100: "#d1d7e9",
          200: "#a3afd3",
          300: "#7587bd",
          400: "#475fa7",
          500: "#103174",
          600: "#0d275d",
          700: "#0a1d46",
          800: "#06132e",
          900: "#030a17",
        },
        accent: {
          DEFAULT: "#2596be",
          50: "#eaf6fb",
          100: "#d5ecf7",
          200: "#aad9ef",
          300: "#80c6e7",
          400: "#55b3df",
          500: "#2596be",
          600: "#1e7898",
          700: "#165a72",
          800: "#0f3c4c",
          900: "#071e26",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 24px 0 rgba(0, 0, 0, 0.14)",
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
