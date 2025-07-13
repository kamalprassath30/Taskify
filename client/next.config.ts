import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "avatars.githubusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ This disables ESLint errors during Vercel build
  },
};

export default nextConfig;
