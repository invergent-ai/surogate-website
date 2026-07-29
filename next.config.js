import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Pin the workspace root - the functions/ subfolder has its own
  // package-lock.json (separate Cloud Functions deploy target, not part of
  // this app), which otherwise confuses Next's auto-detection and breaks
  // static export page-data collection.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
