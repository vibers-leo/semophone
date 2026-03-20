'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const storeImages = [
  '/images/지점별 사진/지점별 (1).png',
  '/images/지점별 사진/지점별 (2).png',
  '/images/지점별 사진/지점별 (3).png',
  '/images/지점별 사진/지점별 (4).png',
];

export default function MinimalStats() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % storeImages.length);
    }, 4000); // 4초마다 이미지 변경

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
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden h-[420px] md:h-[500px] lg:h-[550px] flex items-start justify-center bg-white shadow-lg">
              {/* 상단 고정 정렬 - 이미지 높이가 달라도 위치 안 변함 */}
              <Image
                src={storeImages[currentImageIndex]}
                alt={`세모폰 매장 ${currentImageIndex + 1}`}
                width={800}
                height={600}
                className="w-full h-full object-contain object-top"
                style={{ imageOrientation: 'from-image' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={currentImageIndex === 0}
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
              <span className="text-dark">수도권 40개 성지에서<br />
              검증된 신뢰</span>
            </h2>

            <p className="text-base md:text-lg text-dark/80 mb-8 leading-relaxed">
              15만 명이 선택한 세모폰<br />
              가까운 매장에서 최저가를 경험하세요
            </p>

            {/* 통계 그리드 */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { number: '150,000+', label: '누적 개통', icon: '/icons/차트.png' },
                { number: '40+', label: '직영 매장', icon: '/icons/건물.png' },
                { number: '4.8★', label: '만족도', icon: '/icons/ok.png' },
                { number: '365일', label: '사후관리', icon: '/icons/시계.png' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-dark/5"
                >
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={56}
                    height={56}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain mx-auto mb-3"
                  />
                  <div className="text-3xl md:text-4xl font-black text-dark mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-dark/70">
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
