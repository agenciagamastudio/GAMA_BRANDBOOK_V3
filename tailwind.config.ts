import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // All colors from CSS variables in globals.css (single source of truth)
        primary: "var(--color-primary)",
        "primary-dim": "var(--color-primary-dim)",
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        "border-green": "var(--color-border-green)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },

      /* === DEPTH SYSTEM === */
      zIndex: {
        "depth-1": "var(--depth-layer-1)",
        "depth-2": "var(--depth-layer-2)",
        "depth-3": "var(--depth-layer-3)",
        "depth-4": "var(--depth-layer-4)",
      },

      /* === GLASS MATERIAL === */
      backdropBlur: {
        sm: "var(--glass-blur-sm)",
        DEFAULT: "var(--glass-blur)",
        lg: "var(--glass-blur-lg)",
        xl: "64px",
        liquid: "var(--liquid-glass-blur)",
      },
      backgroundColor: {
        "glass-surface": "var(--glass-surface)",
        "glass-surface-hover": "var(--glass-surface-hover)",
        "glass-subtle": "var(--glass-bg-2)",
        "liquid-glass": "var(--liquid-glass-surface)",
      },
      borderColor: {
        "glass-border": "var(--glass-border)",
        "glass-highlight": "var(--glass-highlight)",
      },

      /* === VOLUMETRIC LIGHTING === */
      backgroundImage: {
        "vol-light": "radial-gradient(circle at 30% 20%, var(--vol-light-color), transparent 65%)",
        "vol-glow": "radial-gradient(circle at center, var(--vol-light-color), transparent 70%)",
      },

      /* === SHADOWS & GLOWS === */
      boxShadow: {
        /* Volumetric Shadows (Elevation) */
        "elevation-1": "var(--shadow-elevation-1)",
        "elevation-2": "var(--shadow-elevation-2)",
        "elevation-3": "var(--shadow-elevation-3)",
        contact: "var(--shadow-contact)",
        /* Emissive Glow (Bloom) */
        "glow-sm": "var(--glow-primary-sm)",
        "glow-md": "var(--glow-primary-md)",
        "glow-lg": "var(--glow-primary-lg)",
        "glow-white-sm": "var(--glow-white-sm)",
        "glow-white-md": "var(--glow-white-md)",
      },

      /* === MOTION (CINEMATIC EASING + DURATIONS) === */
      transitionTimingFunction: {
        cinematic: "var(--motion-easing-cinematic)",
      },
      transitionDuration: {
        "motion-fast": "var(--motion-duration-fast)",
        "motion-normal": "var(--motion-duration-normal)",
        "motion-slow": "var(--motion-duration-slow)",
      },

      /* === ANIMATIONS === */
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-green": "pulseGreen 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "liquid-refraction": "liquid-refraction 200ms ease-out",
        "volumetric-pulse": "volumetric-pulse 4s ease-in-out infinite",
        "volumetric-rotate": "volumetric-rotate 8s linear infinite",
        "illumination-pulse": "illumination-pulse 3s ease-in-out infinite",
        "dust-float": "dustFloat 4s ease-out infinite",
        "blob-float": "blobFloat 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
