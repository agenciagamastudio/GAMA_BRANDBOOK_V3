import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // === PERFORMANCE OPTIMIZATIONS ===
  compress: true, // Enable gzip compression
  swcMinify: true, // Use SWC minifier (faster than Terser)
  productionBrowserSourceMaps: false, // Disable source maps in production
  poweredByHeader: false, // Remove X-Powered-By header

  // === FONT OPTIMIZATION ===
  optimizeFonts: true,

  // === EXPERIMENTAL PERFORMANCE FEATURES ===
  experimental: {
    optimizePackageImports: ["@/components"], // Tree-shake unused imports
    webVitalsAttribution: ["CLS", "LCP", "FID"],
  },

  // === STATIC GENERATION ===
  staticPageGenerationTimeout: 120,

  // === HEADERS & CACHING ===
  headers: async () => {
    return [
      {
        source: "/(.+)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
