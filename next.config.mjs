import { withPayload } from "@payloadcms/next/withPayload";

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
  // Payload's Vercel Blob client handler transitively pulls in the server
  // logger (pino → worker_threads). Stop the browser bundle from resolving
  // Node-only builtins it never actually runs.
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      worker_threads: false,
    };
    return config;
  },
};

export default withPayload(nextConfig);
