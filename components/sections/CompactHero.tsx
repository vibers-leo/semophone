'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { forwardRef } from 'react';

/**
 * Compact Hero - 모바일 앱 최적화 버전
 * app.semophone.co.kr에서만 표시
 * 높이: 40vh, 핵심 메시지 + CTA만
 */
const CompactHero = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className="relative h-[40vh] min-h-[320px] max-h-[480px] overflow-hidden mt-[56px] md:mt-[72px]"
      style={{
        background: 'linear-gradient(135deg, #F2C811 0%, #D4AD00 50%, #F2C811 100%)',
      }}
    >
      {/* 배경 패턴 (선택) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* 콘텐츠 */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="space-y-4"
        >
          {/* 메인 타이틀 */}
          <h1 className="text-4xl md:text-[2.75rem] lg:text-5xl font-black text-dark leading-tight">
            세상의 모든<br />
            휴대폰 가격을 내리다
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-lg md:text-lg lg:text-xl text-dark/80 font-semibold">
            전국 40+ 매장, 최저가 보장
          </p>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pt-4"
          >
            <Link
              href="/stores"
              className="inline-flex items-center gap-2 bg-dark text-white px-7 py-3.5 md:px-8 md:py-4 lg:px-9 lg:py-4.5 rounded-full text-base md:text-lg lg:text-xl font-bold shadow-strong hover:shadow-brand-hover hover:scale-105 transition-all active:scale-95"
            >
              <svg className="w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              가까운 매장 찾기
            </Link>
          </motion.div>
        </motion.div>

        {/* 스크롤 힌트 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-dark/60"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

CompactHero.displayName = 'CompactHero';

export default CompactHero;
