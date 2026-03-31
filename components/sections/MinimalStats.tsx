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
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 모바일: 이미지 상단 full-width */}
      <div className="md:hidden relative w-full h-56 overflow-hidden">
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
              sizes="100vw"
              quality={80}
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FEE500] to-transparent" />
      </div>

      <section
        className="relative overflow-hidden py-12 md:py-24"
        style={{
          background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 50%, #FEE500 100%)',
        }}
      >
        {/* PC/태블릿: 이미지 왼쪽 절반 absolute */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[55%]">
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
                sizes="55vw"
                quality={85}
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
          <div
            className="absolute inset-y-0 right-0 w-[50%] pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent 0%, rgba(253,228,0,0.5) 50%, rgba(253,216,53,0.85) 80%, #FDD835 100%)',
            }}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {storeImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-dark w-8' : 'bg-dark/50 w-2'
                }`}
                aria-label={`이미지 ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 콘텐츠 레이어 */}
        <div className="relative z-10 max-w-[90%] md:max-w-[80%] mx-auto">
          <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
            {/* PC placeholder */}
            <div className="hidden md:block" style={{ minHeight: '420px' }} />

            {/* 텍스트 + 통계 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4 leading-tight tracking-tight text-center" style={{ wordBreak: 'keep-all' }}>
                <span className="text-dark">수도권 50개 매장에서<br />
                검증된 신뢰</span>
              </h2>

              <p className="text-sm md:text-lg text-dark/80 mb-6 md:mb-8 leading-relaxed text-center" style={{ wordBreak: 'keep-all' }}>
                46만명의 고객이 선택한 세모폰<br />
                가까운 매장에서 합리적인 가격 상담을 경험하세요
              </p>

              {/* 통계 그리드 */}
              <div className="grid grid-cols-2 gap-3 md:gap-3.5 lg:gap-4">
                {[
                  { number: '380,000+', label: '모바일서비스 누적개통', icon: '/icons/차트.png' },
                  { number: '80,000+', label: '인터넷서비스 누적개통', icon: '/icons/건물.png' },
                  { number: '월 600+', label: '가전렌탈서비스 월평균', icon: '/icons/ok.png' },
                  { number: '4.8/5.0', label: '고객만족도 리뷰 평점', icon: '/icons/하트.png' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-7 shadow-lg hover:shadow-xl transition-all duration-300 border border-dark/5 text-center"
                  >
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={72}
                      height={72}
                      className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain mx-auto mb-2 md:mb-3"
                    />
                    <div className="text-2xl md:text-[2rem] lg:text-4xl font-black text-dark mb-1 md:mb-2 tracking-tight">
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
    </>
  );
}
