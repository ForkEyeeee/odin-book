/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/for-you',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com', 'cdn.discordapp.com'],
  },
};

module.exports = nextConfig;
