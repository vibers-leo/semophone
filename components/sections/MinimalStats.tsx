'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const storeImages = [
  '/images/interior/interior-1.jpg',
  '/images/interior/interior-2.jpg',
];

export default function MinimalStats() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % storeImages.length);
    }, 5000); // 5초마다 서서히 이미지 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 50%, #FEE500 100%)',
      }}
    >
      <div className="max-w-[80%] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-10 lg:gap-12 items-center">
          {/* 왼쪽: 이미지 슬라이드쇼 (100% 표시) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lg"
          >
            {storeImages.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={src}
                  alt={`세모폰 매장 실내 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  quality={85}
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}

            {/* 오른쪽 노란 그라데이션 페이드 */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent 50%, rgba(253, 216, 53, 0.3) 75%, rgba(253, 216, 53, 0.7) 90%, #FDD835 100%)',
              }}
            />

            {/* 인디케이터 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {storeImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-dark w-8' : 'bg-dark/50'
                  }`}
                  aria-label={`이미지 ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* 오른쪽: 텍스트 + 통계 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
              <span className="text-dark">수도권 50개 매장에서<br />
              검증된 신뢰</span>
            </h2>

            <p className="text-base md:text-lg text-dark/80 mb-8 leading-relaxed">
              46만명의 고객이 선택한 세모폰<br />
              가까운 매장에서 합리적인 가격 상담을 경험하세요
            </p>

            {/* 통계 그리드 */}
            <div className="grid grid-cols-2 gap-3 md:gap-3.5 lg:gap-4">
              {[
                { number: '380,000+', label: '모바일서비스 누적개통', icon: '/icons/차트.png' },
                { number: '80,000+', label: '인터넷서비스 누적개통', icon: '/icons/건물.png' },
                { number: '월 600+', label: '가전렌탈서비스 월평균', icon: '/icons/ok.png' },
                { number: '4.8/5.0', label: '고객만족도 리뷰 평점', icon: '/icons/시계.png' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-5 md:p-6 lg:p-7 shadow-lg hover:shadow-xl transition-all duration-300 border border-dark/5"
                >
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={56}
                    height={56}
                    className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain mx-auto mb-3"
                  />
                  <div className="text-3xl md:text-[2rem] lg:text-4xl font-black text-dark mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-[0.8125rem] lg:text-sm font-semibold text-dark/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
