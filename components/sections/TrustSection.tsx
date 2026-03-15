'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import StatCard from '@/components/ui/StatCard';
import { BentoGrid } from '@/components/layouts/BentoGrid';

const TrustSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-24 px-3 bg-[#FAF7F0] text-center">
      <div className="max-w-container-sm md:max-w-container-md mx-auto">
        <h2 className="section-title fade-in">
          마음 편히 물어보세요,<br className="md:hidden" /> 믿고 찾을 수 있어요
        </h2>
        <p className="section-desc fade-in fade-in-d1 mb-12">
          세모폰은 개통 후에도 끝까지 책임집니다.
        </p>

        <BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-[180px] mb-12">
          <StatCard value="365" unit="일" label="사후관리" useBento delay={0} />
          <StatCard value="40" unit="+" label="수도권 성지" useBento delay={0.1} />
          <StatCard value="4.8" unit="★" label="고객 만족도" useBento delay={0.2} />
        </BentoGrid>

        {/* 이미지 */}
        <div className="max-w-2xl mx-auto">
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/landing/trust-support.png"
              alt="마음 편히 물어보세요, 믿고 찾을 수 있어요"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              quality={75}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

TrustSection.displayName = 'TrustSection';

export default TrustSection;
