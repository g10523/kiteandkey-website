/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: 'https://kite-academy-lms.vercel.app/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
