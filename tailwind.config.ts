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
        brand: {
          blue: "#0066FF",
          "blue-hover": "#0052CC",
          "blue-light": "#EFF6FF",
          "blue-subtle": "#E6F0FF",
          navy: "#0B132B",
          dark: "#0F172A",
          slate: "#1E293B",
          muted: "#64748B",
          light: "#F8FAFC",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 12px 32px -4px rgba(15, 23, 42, 0.12)",
        floating: "0 20px 40px -10px rgba(0, 102, 255, 0.18)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
