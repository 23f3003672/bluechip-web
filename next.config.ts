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
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: "/project/:path*",
        destination: "/projects/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
