import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required to use Web Crypto API in Next.js edge/server contexts
  experimental: {},
};

export default nextConfig;
