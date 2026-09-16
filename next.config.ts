import type { NextConfig } from "next";

const extraAllowedDevOrigins = (process.env.NEXT_PUBLIC_ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  // Allow LAN/dev access so HMR and internal dev assets work over local IPs.
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.29.76", ...extraAllowedDevOrigins],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
