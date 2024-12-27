/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all image sources (use with caution)
      },
    ],
  },
};

export default nextConfig;
