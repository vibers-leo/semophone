'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CinematicHero() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

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
    <section className="relative h-screen w-full overflow-hidden mt-[56px] md:mt-[72px]">
      {/* Parallax 배경 이미지 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* 이미지 플레이스홀더 - 나중에 실제 이미지로 교체 */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500" />

          {/* 오버레이 */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl"
        >
          {/* 로고/브랜드명 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6"
          >
            세모폰
          </motion.h1>

          {/* 메인 카피 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            세상의 모든 휴대폰 가격을
            <br />
            혁신합니다
          </motion.p>

          {/* 서브 카피 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-white/90 mb-12"
          >
            전국 40개 직영매장에서 온라인에 없는 가격을 경험하세요
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/stores">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-dark font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all"
              >
                가까운 성지 찾기 →
              </motion.button>
            </Link>

            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-dark transition-all"
              >
                세모폰 소개
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 스크롤 다운 인디케이터 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-white/70"
          >
            <span className="text-sm font-medium">SCROLL DOWN</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
