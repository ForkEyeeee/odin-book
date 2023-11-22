/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/for-you/?page=1',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
