import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@hugeicons/core-free-icons", "@icons-pack/react-simple-icons"],
  },
};

export default nextConfig;
