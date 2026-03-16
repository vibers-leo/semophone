'use client';

import Badge from '@/components/ui/Badge';
import { BentoGrid } from '@/components/layouts/BentoGrid';
import BenefitCard from '@/components/ui/BenefitCard';
import { SwipeableCards } from '@/components/ui/SwipeableCards';
import { useBenefits } from '@/hooks/useBenefits';

export default function WhySection() {
  const { benefits, loading, error } = useBenefits();

  // 로딩 중이거나 데이터가 없으면 기본 데이터 사용
  const defaultBenefits = [
    {
      icon: '💰',
      title: '지원금 최대로!',
      description: '성지에서만 가능한 최대 지원금'
    },
    {
      icon: '🤝',
      title: '단통법 폐지!',
      description: '지원금 제한없는 자유로운 개통'
    },
    {
      icon: '⚡',
      title: '즉시 개통',
      description: '30분 내 빠른 개통 완료'
    },
    {
      icon: '🛡️',
      title: '365일 사후관리',
      description: '개통 후에도 끝까지 책임'
    },
  ];

  const displayBenefits = loading || error || benefits.length === 0 ? defaultBenefits : benefits;

  return (
    <section className="bg-white py-24 px-3 text-center">
      <div className="max-w-container-sm md:max-w-container-md mx-auto">
        <h2 className="section-title fade-in">
          온라인엔 없는 가격,<br className="md:hidden" /> 성지에서만 가능한 상담
        </h2>
        <p className="section-desc fade-in fade-in-d1 mb-12">
          직접 찾아오신 분께 드리는 특별한 조건.<br />
          매월 2,000명이 그 차이를 경험합니다.
        </p>

        {/* Benefits */}
        <div className="flex items-center justify-center gap-2 mb-9 fade-in">
          <Badge variant="dark">세모폰에만 있어요!</Badge>
        </div>

        {/* 모바일: 스와이프 가능한 카드, 데스크톱: 그리드 */}
        <div className="md:hidden">
          <SwipeableCards>
            {displayBenefits.map((item, i) => (
              <BenefitCard
                key={i}
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={i * 0.1}
              />
            ))}
          </SwipeableCards>
        </div>

        <div className="hidden md:block">
          <BentoGrid className="grid-cols-2 lg:grid-cols-4 auto-rows-auto">
            {displayBenefits.map((item, i) => (
              <BenefitCard
                key={i}
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={i * 0.1}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
