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
        accent: "var(--primary-accent, #10B981)",
        "accent-hover": "var(--primary-hover, #059669)",

        // Black + Emerald Green Matrix Architecture tokens
        "primary-accent": "var(--primary-accent, #10B981)",
        "aws-orange": "var(--aws-orange, #FF9900)",
        "aws-orange-hover": "var(--aws-orange-hover, #EC7211)",
        "surface-lowest": "var(--surface-lowest, #050706)",
        "surface-low": "var(--surface-low, #0c120e)",
        "surface-container": "var(--surface-container, #121c16)",
        "surface-high": "var(--surface-high, #19271e)",
        "surface-highest": "var(--surface-highest, #22362b)",
        outline: "var(--outline-color, #1a2a20)",
        "outline-variant": "var(--outline-variant-color, #274031)",
        "on-background": "var(--text-color, #f8fafc)",
        "on-surface-variant": "var(--text-muted, #94a3b8)",
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
