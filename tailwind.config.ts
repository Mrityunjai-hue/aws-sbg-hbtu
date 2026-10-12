import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backward-compatible tokens for existing components
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        "bg-card": "rgb(var(--color-bg-card) / <alpha-value>)",
        "border-hairline": "rgb(var(--color-border-hairline) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        accent: "var(--primary-accent, #AD5CFF)",
        "accent-hover": "var(--primary-hover, #9C47FF)",

        // Redesign tokens (Option B: Reference Purple + AWS Builder Orange)
        "primary-accent": "var(--primary-accent, #AD5CFF)",
        "aws-orange": "var(--aws-orange, #FF9900)",
        "aws-orange-hover": "var(--aws-orange-hover, #EC7211)",
        "surface-lowest": "var(--surface-lowest, #09090b)",
        "surface-low": "var(--surface-low, #18181b)",
        "surface-container": "var(--surface-container, #27272a)",
        "surface-high": "var(--surface-high, #3f3f46)",
        "surface-highest": "var(--surface-highest, #52525b)",
        outline: "var(--outline-color, #27272a)",
        "outline-variant": "var(--outline-variant-color, #3f3f46)",
        "on-background": "var(--text-color, #f4f4f5)",
        "on-surface-variant": "var(--text-muted, #a1a1aa)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        soft: "4px",
      },
      maxWidth: {
        container: "1280px",
        "7xl": "80rem",
      },
    },
  },
  plugins: [],
};
export default config;
