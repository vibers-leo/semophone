'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export default function FinalCTA() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax 배경 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* 배경 이미지 플레이스홀더 */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600" />

        {/* 블러 오버레이 */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/50" />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* 메인 카피 */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6"
          >
            지금 가장 가까운
            <br />
            <span className="text-brand">세모폰 매장</span>을
            <br />
            찾아보세요
          </motion.h2>

          {/* 서브 카피 */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-12"
          >
            온라인에 없는 특별한 가격을 직접 경험하세요
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/stores">
              <motion.button
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 10px 40px rgba(254, 229, 0, 0.3)',
                    '0 20px 60px rgba(254, 229, 0, 0.5)',
                    '0 10px 40px rgba(254, 229, 0, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-brand text-dark font-black text-2xl rounded-full shadow-2xl hover:shadow-3xl transition-all overflow-hidden"
              >
                {/* 버튼 배경 애니메이션 */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* 버튼 텍스트 */}
                <span className="relative z-10 flex items-center gap-3">
                  매장 찾기
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* 추가 정보 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-white/80"
          >
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-semibold">전국 40개 직영매장</span>
            </div>

            <div className="hidden md:block w-px h-6 bg-white/30" />

            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">평일 10:00 - 21:00</span>
            </div>

            <div className="hidden md:block w-px h-6 bg-white/30" />

            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-semibold">전문 상담 가능</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 데코레이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}
