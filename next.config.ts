import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["cep-energie.com"],
  serverExternalPackages: ["sharp"],
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["cep-energie.com"],
    },
  },
  async redirects() {
    return [
      {
        source: "/waermepumpen-rechner",
        destination: "/energie-rechner",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
