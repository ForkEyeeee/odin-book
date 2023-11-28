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
};

module.exports = nextConfig;
