/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // outputFileTracingRoot pins the root so Vercel doesn't include parent-dir files it doesn't need.
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    // Token Grade rebranded to Trust Discount; old links keep working.
    return [
      { source: "/token-grade", destination: "/trust-discount", permanent: true },
      { source: "/token-grade/:symbol", destination: "/trust-discount/:symbol", permanent: true }
    ];
  }
};

export default nextConfig;
