/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Keep typed routes disabled to support string-based hrefs throughout the app
    typedRoutes: false,
  },
  output: "standalone",
};

module.exports = nextConfig;
