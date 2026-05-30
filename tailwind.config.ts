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
        gama: {
          primary: "#88CE11",
          "primary-dim": "rgba(136, 206, 17, 0.15)",
          "primary-glow": "rgba(136, 206, 17, 0.35)",
          bg: "#161616",
          surface: "#272727",
          "surface-2": "#1f1f1f",
          "surface-3": "#303030",
          border: "rgba(255,255,255,0.10)",
          "border-green": "rgba(136, 206, 17, 0.25)",
          text: "#FFFFFF",
          "text-secondary": "#A1A1AA",
          "text-muted": "#71717A",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#E11D48",
          info: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      backgroundColor: {
        "token-bg": "var(--color-bg)",
        "token-surface": "var(--color-surface)",
        "token-surface-2": "var(--color-surface-2)",
        "token-surface-3": "var(--color-surface-3)",
      },
      textColor: {
        "token-primary": "var(--color-primary)",
        "token-text": "var(--color-text)",
        "token-secondary": "var(--color-text-secondary)",
        "token-muted": "var(--color-text-muted)",
      },
      borderColor: {
        "token-border": "var(--color-border)",
        "token-border-green": "var(--color-border-green)",
      },
      backdropBlur: {
        sm: "var(--glass-blur-sm)",
        DEFAULT: "var(--glass-blur)",
        lg: "var(--glass-blur-lg)",
        xl: "64px",
      },
      boxShadow: {
        "elevation-1": "var(--shadow-elevation-1)",
        "elevation-2": "var(--shadow-elevation-2)",
        "elevation-3": "var(--shadow-elevation-3)",
        contact: "var(--shadow-contact)",
        "glow-sm": "var(--glow-primary-sm)",
        "glow-md": "var(--glow-primary-md)",
        "glow-lg": "var(--glow-primary-lg)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-green": "pulseGreen 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
