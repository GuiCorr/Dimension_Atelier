import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",  para ficar estático
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
