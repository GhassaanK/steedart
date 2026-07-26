import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/jtuehjzg/image/upload/**",
        search: "",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
