/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://116.62.230.9:4000/api/:path*',
      },
      {
        source: '/doctorPhotos/:path*',
        destination: 'http://116.62.230.9:4000/doctorPhotos/:path*',
      },

    ];
  },
};

module.exports = nextConfig;
