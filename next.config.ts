import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  // Performance optimizations
  compress: true,
  
  // Enable React Server Components optimizations
  experimental: {
    optimizeCss: true,
  },
  
  // Turbopack configuration to silence workspace warnings
  turbopack: {
    root: __dirname
  },
  
  // Server external packages
  serverExternalPackages: ['@prisma/client', 'bcrypt'],
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false, // Fix build errors instead of ignoring them
    tsconfigPath: './tsconfig.json',
  },
  
  // React configuration
  reactStrictMode: true, // Enable strict mode for better development
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "z-cdn.chatglm.cn",
        pathname: "/image-search-mcp/images-ppt/**",
      },
    ],
    // Optimize images for performance
    minimumCacheTTL: 31536000, // Cache images for 1 year
    formats: ['image/avif', 'image/webp'], // Serve modern formats
    qualities: [75, 80, 85], // Allowed quality values for <Image> components
    dangerouslyAllowSVG: true, // Allow SVG optimization
    contentDispositionType: 'inline', // Better caching
    unoptimized: false, // Enable optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon sizes
  },
  
  // Combined headers: static asset caching + security headers
  headers: async () => [
    // Static asset caching
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff2|woff|ttf|eot)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/_next/static/:all*',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    // Security headers
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ],
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
