'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MinimalHero() {
  return (
    <section className="relative bg-white pt-32 pb-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* 배경 패턴 (옅은 노란색) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 왼쪽: 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-block px-4 py-2 bg-brand/10 rounded-full mb-6">
              <span className="text-sm font-bold text-dark">수도권 40개 매장</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              직접 오시면<br />
              <span className="text-brand">가격이 다릅니다</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              세상의 모든 휴대폰, 세모폰에서<br />
              온라인에 없는 가격을 경험하세요
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/stores"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand text-black rounded-full text-lg font-bold hover:bg-brand-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                가까운 성지 찾기
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand text-dark rounded-full text-lg font-bold hover:bg-brand-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                문의하기
              </Link>
            </div>
          </motion.div>

          {/* 오른쪽: 이미지 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* 메인 아이콘 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/icons/세모폰 기본 매장찾기.png"
                  alt="세모폰"
                  width={400}
                  height={400}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>

              {/* 플로팅 아이콘들 */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-20 h-20"
              >
                <Image
                  src="/icons/선물.png"
                  alt="혜택"
                  width={80}
                  height={80}
                  className="drop-shadow-lg"
                />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-20 h-20"
              >
                <Image
                  src="/icons/지도핀.png"
                  alt="매장"
                  width={80}
                  height={80}
                  className="drop-shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 하단 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '150,000+', label: '누적 개통 고객' },
            { number: '40+', label: '수도권 직영 매장' },
            { number: '4.8★', label: '고객 만족도' },
            { number: '365일', label: '사후 관리' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-dark mb-2">{stat.number}</div>
              <div className="text-sm md:text-base text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
