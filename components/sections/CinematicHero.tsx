'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CinematicHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden mt-[56px] md:mt-[72px]">
      {/* 배경 */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6">
            세모폰
          </h1>

          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            세상의 모든 휴대폰 가격을
            <br />
            혁신합니다
          </p>

          <p className="text-lg md:text-xl text-white/90 mb-12">
            전국 40개 직영매장에서 온라인에 없는 가격을 경험하세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
