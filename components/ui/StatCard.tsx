'use client';

import { motion } from 'framer-motion';
import { BentoCard, BentoCardContent } from './BentoCard';

interface StatCardProps {
  value: string | number;
  label: string;
  unit?: string;
  highlight?: boolean; // 하이라이트 색상 적용 (기존 호환성)
  className?: string;
  delay?: number;
  useBento?: boolean; // 벤토 카드 스타일 사용 여부 (기본: false, 기존 호환성)
}

/**
 * 통계 카드 컴포넌트
 * useBento=true: 벤토 그리드용 카드 스타일
 * useBento=false: 기존 간단한 카드 스타일 (TrustSection 등에서 사용)
 */
export default function StatCard({
  value,
  label,
  unit,
  highlight = false,
  className = '',
  delay = 0,
  useBento = false
}: StatCardProps) {
  // 기존 간단한 카드 스타일 (useBento=false)
  if (!useBento) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className={`p-8 md:p-10 bg-white rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all border border-gray-100 ${className}`}
      >
        <div className="text-4xl md:text-5xl font-black text-dark mb-3 tracking-tight">
          <span className={highlight ? 'text-brand' : ''}>{value}</span>
          {unit && <span className="text-brand ml-1">{unit}</span>}
        </div>
        <div className="text-sm md:text-base text-gray-600 font-semibold">{label}</div>
      </motion.div>
    );
  }

  // 벤토 그리드 스타일 (useBento=true)
  return (
    <BentoCard className={className} gradient hover>
      <BentoCardContent className="flex flex-col items-center justify-center h-full">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay, duration: 0.5 }}
        >
          <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            <span className={highlight ? 'text-brand' : ''}>{value}</span>
            {unit && !highlight && <span className="text-brand text-3xl md:text-4xl ml-1">{unit}</span>}
            {unit && highlight && <span className="text-3xl md:text-4xl ml-1">{unit}</span>}
          </div>
          <div className="text-sm md:text-base text-gray-600 font-semibold">
            {label}
          </div>
        </motion.div>
      </BentoCardContent>
    </BentoCard>
  );
}
