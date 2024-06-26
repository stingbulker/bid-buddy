import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pub-9eb7d6563cb4445a816137f166d4ead4.r2.dev",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
