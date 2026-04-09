'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 매장 데이터 (플레이스홀더)
const storePlaceholders = [
  { id: 1, name: '세모폰 강남점', region: '서울' },
  { id: 2, name: '세모폰 홍대점', region: '서울' },
  { id: 3, name: '세모폰 수원점', region: '경기' },
  { id: 4, name: '세모폰 부천점', region: '경기' },
  { id: 5, name: '세모폰 인천점', region: '인천' },
  { id: 6, name: '세모폰 분당점', region: '경기' },
];

export default function StoreNetwork() {
  const [mounted, setMounted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section ref={ref} className="relative py-32 px-6 bg-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight" style={{ wordBreak: 'keep-all' }}>
            전국 50개 이상의 직영 매장
          </h2>
          <p className="text-lg md:text-xl text-white/80">
            서울·경기·인천을 연결하는 세모폰 네트워크
          </p>
        </motion.div>

        {/* Swiper 갤러리 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-12"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="store-gallery"
          >
            {storePlaceholders.map((store) => (
              <SwiperSlide key={store.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  {/* 이미지 플레이스홀더 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600" />

                  {/* 오버레이 */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

                  {/* 매장 정보 */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{store.name}</h3>
                    <p className="text-sm opacity-80">{store.region}</p>
                  </div>

                  {/* Hover 효과 */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">자세히 보기 →</span>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/stores">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-brand text-dark font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all"
            >
              전체 매장 보기
            </motion.button>
          </Link>

          <Link href="/stores">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: '#FEE500' }}
              className="px-8 py-4 border-2 border-brand text-dark font-bold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
            >
              가까운 매장 찾기
            </motion.button>
          </Link>
        </motion.div>

        {/* 지역별 매장 수 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-4 md:gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-black text-brand mb-2">18개</div>
            <p className="text-sm text-white/70">서울</p>
          </div>
          <div>
            <div className="text-4xl font-black text-brand mb-2">18개</div>
            <p className="text-sm text-white/70">경기</p>
          </div>
          <div>
            <div className="text-4xl font-black text-brand mb-2">4개</div>
            <p className="text-sm text-white/70">인천</p>
          </div>
        </motion.div>
      </div>

      {/* 스타일 추가 */}
      <style jsx global>{`
        .store-gallery .swiper-button-next,
        .store-gallery .swiper-button-prev {
          color: #FEE500;
        }
        .store-gallery .swiper-pagination-bullet {
          background: #FEE500;
        }
        .store-gallery .swiper-pagination-bullet-active {
          background: #FEE500;
        }
      `}</style>
    </section>
  );
}
