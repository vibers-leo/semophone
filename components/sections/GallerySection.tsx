'use client';

import { forwardRef, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipe } from '@/hooks/useSwipe';
import { haptics } from '@/lib/haptics';

const galleryImages = [
  { src: '/landing/stores-collage.png', alt: '매장 전경' },
  { src: '/landing/banner1.png', alt: '세모폰 배너 1' },
  { src: '/landing/banner3.png', alt: '세모폰 배너 2' },
];

const GallerySection = forwardRef<HTMLElement>((props, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    haptics.light();
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevImage = useCallback(() => {
    haptics.light();
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const swipeHandlers = useSwipe({
    onSwipeLeft: nextImage,
    onSwipeRight: prevImage,
    threshold: 50,
  });

  return (
    <section ref={ref} className="py-32 px-3 bg-dark text-center overflow-hidden">
      <div className="max-w-[600px] mx-auto">
        <h2 className="text-[36px] md:text-[42px] font-black text-white leading-tight mb-16">
          수도권 어디서든<br className="md:hidden" /> 세모폰이 가까이
        </h2>

        <div className="relative rounded-xl overflow-hidden border border-white/20 shadow-2xl">
          {/* 이미지 슬라이더 */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={swipeHandlers.handleDragStart}
            onDragEnd={swipeHandlers.handleDragEnd}
            className="relative w-full aspect-square cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'pan-y' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative w-full h-full"
              >
                <Image
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={currentIndex === 0}
                  quality={85}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* 네비게이션 버튼 */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm z-10"
                aria-label="이전 이미지"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm z-10"
                aria-label="다음 이미지"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* 이미지 인디케이터 */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    haptics.light();
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-brand w-6'
                      : 'bg-white/50 hover:bg-white/75 w-2'
                  }`}
                  aria-label={`이미지 ${index + 1}로 이동`}
                />
              ))}
            </div>
          )}

          {/* 이미지 카운터 */}
          {galleryImages.length > 1 && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 text-white text-sm font-medium rounded-full backdrop-blur-sm z-10">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

GallerySection.displayName = 'GallerySection';

export default GallerySection;
