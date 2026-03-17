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
};

export default nextConfig;
