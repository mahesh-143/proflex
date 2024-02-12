/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "uploadthing.com",
      },
    ],
  },
};

module.exports = nextConfig;
