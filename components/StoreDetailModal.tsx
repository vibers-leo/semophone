'use client';

import { Store } from '@/data/stores';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipe } from '@/hooks/useSwipe';
import { haptics } from '@/lib/haptics';
import StoreActionButtons from './StoreActionButtons';

interface StoreDetailModalProps {
  store: Store | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreDetailModal({ store, isOpen, onClose }: StoreDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 스와이프로 모달 닫기
  const swipeHandlers = useSwipe({
    onSwipeDown: () => {
      haptics.light();
      onClose();
    },
    threshold: 100,
  });

  // Modal 열림 이벤트 발송 (Header 메뉴 닫기용)
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent('modalOpen'));
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !store) return null;

  // 이미지 배열 (없으면 기본 로고 사용)
  const images = store.images && store.images.length > 0
    ? store.images
    : ['/images/logo/기본로고.png'];

  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-modal-backdrop flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white w-full md:max-w-xl lg:max-w-4xl md:rounded-3xl shadow-2xl max-h-[92vh] overflow-hidden rounded-t-3xl md:rounded-b-3xl z-modal"
            onClick={(e) => e.stopPropagation()}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragStart={swipeHandlers.handleDragStart}
            onDragEnd={swipeHandlers.handleDragEnd}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors z-20 backdrop-blur-sm"
          aria-label="닫기"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 드래그 인디케이터 (모바일만) */}
        <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full z-30" />

        {/* PC: 좌우 2열 / 모바일·태블릿: 1열 스크롤 */}
        <div className="flex flex-col lg:flex-row lg:max-h-[85vh]">

          {/* 왼쪽 / 위: 이미지 갤러리 */}
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:w-[48%] lg:flex-shrink-0 bg-gray-100 overflow-hidden lg:rounded-tl-3xl lg:rounded-bl-3xl">
            {/* 메인 이미지 */}
            <Image
              src={images[currentImageIndex]}
              alt={`${store.name} 사진 ${currentImageIndex + 1}`}
              fill
              className="object-cover object-center"
              style={{ imageOrientation: 'from-image' }}
              sizes="(max-width: 1024px) 100vw, 48vw"
              quality={70}
              loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
              priority={currentImageIndex === 0}
            />

            {/* 이미지 네비게이션 (여러 이미지가 있을 때만) */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                  aria-label="이전 사진"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                  aria-label="다음 사진"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:scale-125'
                      }`}
                      aria-label={`사진 ${index + 1}로 이동`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* 오른쪽 / 아래: 매장 정보 (PC에서 독립 스크롤) */}
          <div className="flex-1 overflow-y-auto max-h-[50vh] lg:max-h-[85vh] p-4 md:p-5 lg:p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* 헤더 */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 flex-1">
                  {store.name}
                </h2>
                <div className="px-3 py-1 bg-brand/10 rounded-full flex-shrink-0">
                  <span className="text-sm font-bold text-gray-700">{store.region}</span>
                </div>
              </div>
            </div>

            {/* 정보 섹션 */}
            <div className="space-y-2.5 mb-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-xs font-bold text-gray-500 mb-2">주소</div>
                <div className="text-sm font-medium text-gray-900 leading-relaxed break-words">
                  {store.address}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-xs font-bold text-gray-500 mb-2">전화번호</div>
                <div className="text-base font-bold text-gray-900">
                  {store.phone}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-xs font-bold text-gray-500 mb-2">영업시간</div>
                <div className="text-sm font-medium text-gray-900">
                  평일 10:00 - 19:00<br />
                  <span className="text-xs text-gray-500">주말·공휴일 휴무</span>
                </div>
              </div>
            </div>

            {/* 랜드마크 */}
            {store.landmark && (
              <div className="bg-brand/10 p-4 rounded-xl border-l-4 border-brand mb-4">
                <div className="text-xs font-bold text-brand mb-2">오시는 길</div>
                <div className="text-sm font-medium text-gray-900 leading-relaxed break-words">
                  {store.landmark}
                </div>
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="pt-4 pb-safe-bottom border-t border-gray-200">
              <StoreActionButtons
                store={store}
                variant="modal"
                onStoreInfoClick={() => {
                  const link = store.link || `https://map.naver.com/v5/search/${encodeURIComponent(store.name)}`;
                  window.open(link, '_blank');
                }}
              />
            </div>
          </div>
        </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
