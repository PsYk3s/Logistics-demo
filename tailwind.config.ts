import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "rgb(var(--color-bg) / <alpha-value>)",
          panel: "rgb(var(--color-bg-panel) / <alpha-value>)",
          raised: "rgb(var(--color-bg-raised) / <alpha-value>)",
          border: "rgb(var(--color-bg-border) / <alpha-value>)",
        },
        fg: {
          DEFAULT: "rgb(var(--color-fg) / <alpha-value>)",
          muted: "rgb(var(--color-fg-muted) / <alpha-value>)",
          dim: "rgb(var(--color-fg-dim) / <alpha-value>)",
        },
        accent: {
          blue: "rgb(var(--color-accent-blue) / <alpha-value>)",
          cyan: "rgb(var(--color-accent-cyan) / <alpha-value>)",
          purple: "rgb(var(--color-accent-purple) / <alpha-value>)",
          magenta: "rgb(var(--color-accent-magenta) / <alpha-value>)",
        },
        status: {
          critical: "rgb(var(--color-status-critical) / <alpha-value>)",
          warning: "rgb(var(--color-status-warning) / <alpha-value>)",
          normal: "rgb(var(--color-status-normal) / <alpha-value>)",
          resolved: "rgb(var(--color-status-resolved) / <alpha-value>)",
          info: "rgb(var(--color-status-info) / <alpha-value>)",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 12px rgba(122,162,247,0.35)",
        "glow-critical": "0 0 14px rgba(247,118,142,0.55)",
        "glow-warning": "0 0 14px rgba(224,175,104,0.4)",
      },
      keyframes: {
        "pulse-critical": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 4px rgba(247,118,142,0.6)" },
          "50%": { opacity: "0.55", boxShadow: "0 0 16px rgba(247,118,142,0.9)" },
        },
        "pulse-live": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-critical": "pulse-critical 1.6s ease-in-out infinite",
        "pulse-live": "pulse-live 2s ease-in-out infinite",
        "slide-in": "slide-in 0.35s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
