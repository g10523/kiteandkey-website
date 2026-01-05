import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["Cormorant Garamond", "Georgia", "serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0B1020",
        mist: "#F7F8FC",
        fog: "#E6E8F0",

        kite: {
          DEFAULT: "#5E5574",
          light: "#D9CFF2",
          dark: "#3E4A6F",
        },

        // Additional lavender palette for articles
        lavender: {
          deep: "#5E5574",
          mid: "#7D7491",
          soft: "#B8B0C9",
          pale: "#E8E4F0",
          whisper: "#F7F5FA",
        },
      },
      boxShadow: {
        soft: "0 10px 40px rgba(11,16,32,0.18)",
        glass: "0 4px 24px rgba(94, 85, 116, 0.08)",
        "glass-lg": "0 8px 32px rgba(94, 85, 116, 0.12)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
      },
      typography: {
        article: {
          css: {
            "--tw-prose-body": "#4A4358",
            "--tw-prose-headings": "#2D2640",
            "--tw-prose-links": "#5E5574",
            "--tw-prose-bold": "#2D2640",
            "--tw-prose-quotes": "#5E5574",
            maxWidth: "65ch",
          },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-delayed": "float-delayed 7s ease-in-out infinite 2s",
        "gradient-x": "gradient-x 8s ease infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-30px) translateX(10px)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-25px) translateX(-15px)" },
        },
        "gradient-x": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;