/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // outputFileTracingRoot pins the root so Vercel doesn't include parent-dir files it doesn't need.
  outputFileTracingRoot: process.cwd()
};

export default nextConfig;
