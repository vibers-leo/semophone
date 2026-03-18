'use client';

import { Store } from '@/data/stores';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipe } from '@/hooks/useSwipe';
import { haptics } from '@/lib/haptics';

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
            className="relative bg-white w-full md:max-w-2xl md:rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden rounded-t-3xl md:rounded-b-3xl z-modal"
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

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* 이미지 갤러리 */}
          <div className="relative w-full aspect-[16/9] bg-gray-900 overflow-hidden flex-shrink-0">
          {/* 메인 이미지 */}
          <Image
            src={images[currentImageIndex]}
            alt={`${store.name} 사진 ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            style={{ imageOrientation: 'from-image' }}
          />

          {/* 이미지 네비게이션 (여러 이미지가 있을 때만) */}
          {hasMultipleImages && (
            <>
              {/* 이전 버튼 */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                aria-label="이전 사진"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* 다음 버튼 */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                aria-label="다음 사진"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* 이미지 인디케이터 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`사진 ${index + 1}로 이동`}
                  />
                ))}
              </div>

              {/* 이미지 카운터 */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>

          {/* 매장 정보 */}
          <div className="p-4 md:p-6">
            {/* 헤더 */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 flex-1">
                  {store.name}
                </h2>
                <div className="px-3 py-1 bg-brand/10 rounded-full">
                  <span className="text-sm font-bold text-gray-700">{store.region}</span>
                </div>
              </div>
            </div>

            {/* 정보 섹션 */}
            <div className="space-y-4 mb-6">
              {/* 주소 */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-xs font-semibold text-gray-500 mb-1">주소</div>
                  <div className="text-sm font-medium text-gray-900 leading-relaxed">
                    {store.address}
                  </div>
                </div>
              </div>

              {/* 전화번호 */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-xs font-semibold text-gray-500 mb-1">전화번호</div>
                  <div className="text-base font-bold text-gray-900">
                    {store.phone}
                  </div>
                </div>
              </div>

              {/* 영업시간 */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-xs font-semibold text-gray-500 mb-1">영업시간</div>
                  <div className="text-sm font-medium text-gray-900">
                    평일 10:00 - 19:00<br />
                    <span className="text-xs text-gray-500">주말·공휴일 휴무</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 랜드마크 정보 */}
            {store.landmark && (
              <div className="flex items-start gap-3 bg-brand/5 p-4 rounded-xl border-l-4 border-brand mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                  <Image
                    src="/icons/지도핀.png"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-xs font-semibold text-brand mb-1">주변 랜드마크</div>
                  <div className="text-sm font-medium text-gray-900 leading-relaxed">
                    {store.landmark}
                  </div>
                </div>
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="space-y-2 pt-4 pb-safe-bottom border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2">
                {/* 전화하기 */}
                <a
                  href={`tel:${store.phone}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-brand text-black rounded-xl font-bold text-sm hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  전화 상담
                </a>

                {/* 카톡상담하기 */}
                <a
                  href={store.kakaoLink || 'https://pf.kakao.com/_xoxoxoxo'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FEE500] text-black rounded-xl font-bold text-sm hover:bg-[#FDD835] hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.8 1.8 5.2 4.5 6.6-.2.7-.6 2.5-.7 2.8-.1.4 0 .4.2.3.2-.1 2.5-1.7 3.2-2.2.6.1 1.2.2 1.8.2 5.523 0 10-3.477 10-7.8S17.523 3 12 3zm-3.5 10.5c-.4 0-.8-.3-.8-.8v-3.5h-.9c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h3.4c.4 0 .8.3.8.8s-.3.8-.8.8h-.9v3.5c0 .5-.3.8-.8.8zm4.5 0c-.4 0-.8-.3-.8-.8v-4.9c0-.4.3-.8.8-.8s.8.3.8.8v4.9c0 .5-.4.8-.8.8zm4.2 0c-.3 0-.5-.1-.7-.3l-1.8-2.4v2c0 .4-.3.8-.8.8s-.8-.3-.8-.8v-4.9c0-.4.3-.8.8-.8.3 0 .5.1.7.3l1.8 2.4v-2c0-.4.3-.8.8-.8s.8.3.8.8v4.9c0 .5-.4.8-.8.8z"/>
                  </svg>
                  카톡상담
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* 네이버 플레이스 */}
                <a
                  href={store.link || `https://map.naver.com/v5/search/${encodeURIComponent(store.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  상세정보
                </a>

                {/* 길찾기 */}
                <a
                  href={`https://map.naver.com/v5/directions/-/-/${store.lng},${store.lat},${encodeURIComponent(store.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#03C75A] text-white rounded-xl font-bold text-sm hover:bg-[#02b350] hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  길찾기
                </a>
              </div>
            </div>
          </div>
        </div>

          {/* 드래그 인디케이터 (모바일만) */}
          <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full z-30" />
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
