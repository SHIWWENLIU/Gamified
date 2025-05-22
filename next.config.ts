import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];
    
    return config;
  },
};

export default nextConfig;
