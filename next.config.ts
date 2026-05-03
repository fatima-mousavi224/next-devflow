import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["pino", "pino-pretty"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // دامنه گیت‌هاب
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // دامنه گوگل (برای لاگین گوگل)
        port: '',
        pathname: '/a/**',
      },
    ],
  },
};

export default nextConfig;
