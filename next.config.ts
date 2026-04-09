import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 개발 모드에서 캐시 최소화 (항상 최신 코드 반영)
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // 정적 페이지 생성 비활성화 (개발 중)
  experimental: {
    // Turbopack은 기본적으로 빠른 리프레시 제공
  },
  // www → apex 301 리다이렉트
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://semophone.co.kr/:path*',
        permanent: true,
        has: [{ type: 'host', value: 'www.semophone.co.kr' }],
      },
    ];
  },

  // 캐시 무효화 헤더 (모바일 캐시 방지)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
