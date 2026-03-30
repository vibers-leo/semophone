'use client';

import { useState, useEffect, forwardRef } from 'react';
import Image from 'next/image';

const HeroBanner = forwardRef<HTMLElement>((props, ref) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-play (5초마다 자동 전환)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="hero-banner relative aspect-[16/9] lg:h-[815px] lg:aspect-auto overflow-hidden mt-[56px] md:mt-[72px]">
      {/* 슬라이드 배너 */}
      <div className="relative w-full h-full">
        {/* Banner 1 - 실제 매장 사진 */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentBanner === 0 ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src="/images/semophone_store_banner/banner-real-1.jpg"
            alt="세모폰 매장 1"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Banner 2 - 실제 매장 사진 */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentBanner === 1 ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src="/images/semophone_store_banner/banner-real-2.jpg"
            alt="세모폰 매장 2"
            fill
            className="object-cover object-center"
            loading="lazy"
            sizes="100vw"
            quality={90}
          />
        </div>
      </div>

      {/* 좌측 화살표 */}
      <button
        onClick={() => setCurrentBanner(currentBanner === 0 ? 1 : 0)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:scale-110 transition-all z-10"
        aria-label="이전 배너"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 우측 화살표 */}
      <button
        onClick={() => setCurrentBanner(currentBanner === 1 ? 0 : 1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:scale-110 transition-all z-10"
        aria-label="다음 배너"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <button
          onClick={() => setCurrentBanner(0)}
          className={`w-1.5 h-1.5 rounded-full transition-all ${currentBanner === 0 ? 'bg-white w-6' : 'bg-white/50'}`}
          aria-label="배너 1"
        />
        <button
          onClick={() => setCurrentBanner(1)}
          className={`w-1.5 h-1.5 rounded-full transition-all ${currentBanner === 1 ? 'bg-white w-6' : 'bg-white/50'}`}
          aria-label="배너 2"
        />
      </div>
    </section>
  );
});

HeroBanner.displayName = 'HeroBanner';

export default HeroBanner;
