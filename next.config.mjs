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
  webpack: (config, { isServer }) => {
    // Payload's Vercel Blob client upload handler transitively imports undici,
    // which needs Node builtins. Externalize it so it's not bundled into the
    // client (we only use server-side uploads, not direct client uploads).
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "@payloadcms/storage-vercel-blob/client": false,
      });
    }

    // Fallback for Node builtins that might still try to load
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      net: false,
      tls: false,
      fs: false,
      stream: false,
      util: false,
      buffer: false,
      os: false,
      worker_threads: false,
      assert: false,
    };

    return config;
  },
};

export default withPayload(nextConfig);
