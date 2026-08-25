import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Images configuration for external domains
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      // Add any other image domains you use
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Add more patterns as needed
    ],
  },

  // Enable React strict mode for better development
  reactStrictMode: true,

  // Experimental features (if needed)
  experimental: {
    // optimizeCss: true, // Uncomment if you want to optimize CSS
  },

  // Environment variables that should be available to the browser
  env: {
    // Add public environment variables here
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Redirects configuration
  async redirects() {
    return [
      // Example: redirect old routes to new ones
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Headers configuration for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
