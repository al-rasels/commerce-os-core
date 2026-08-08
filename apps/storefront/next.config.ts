import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone server output for containerized deploys (apps/storefront/Dockerfile).
  output: "standalone",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
