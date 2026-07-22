import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Keep local PDF assets out of the serverless bundle (Docker image size).
  // Production downloads should use Vercel Blob via BLOB_READ_WRITE_TOKEN.
  outputFileTracingExcludes: {
    "*": ["./assets/**/*"],
  },
};

export default nextConfig;
