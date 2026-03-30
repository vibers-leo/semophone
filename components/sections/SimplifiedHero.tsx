'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 실제 매장 사진 2장
const bannerImages = [
    '/images/semophone_store_banner/banner-real-1.jpg',
    '/images/semophone_store_banner/banner-real-2.jpg',
];

export default function SimplifiedHero() {
  // 항상 랜덤한 이미지로 시작
  const [currentImageIndex, setCurrentImageIndex] = useState(() =>
    Math.floor(Math.random() * bannerImages.length)
  );

  // 자동 이미지 전환 (5초마다 서서히)
  useEffect(() => {
    if (bannerImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <>
      {/* PC / 태블릿 버전 - 최대 80vh, 이미지 자연 비율 */}
      <section className="hidden md:block relative w-full overflow-hidden mt-[72px]" style={{ maxHeight: '80vh' }}>
        <div className="relative w-full">
          {/* 이미지 슬라이드쇼 - 첫 이미지가 레이아웃 기준, 나머지 absolute */}
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`transition-opacity duration-1000 ${index !== 0 ? 'absolute inset-0' : ''}`}
              style={{ opacity: index === currentImageIndex ? 1 : 0 }}
            >
              <Image
                src={image}
                alt="세모폰 매장"
                width={1280}
                height={783}
                className="w-full h-auto block"
                sizes="100vw"
                quality={90}
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
                style={{ objectPosition: 'center center' }}
              />
            </div>
          ))}

          {/* 왼쪽 그라데이션 오버레이 */}
          <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none" />

          {/* 타이틀 영역 */}
          <div className="absolute inset-0 z-10 flex items-center pl-[8%] lg:pl-[12%] pr-8 lg:pr-16">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 lg:mb-6">
                세모폰
              </h1>

              <p className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                세상의 모든 휴대폰 가격을
                <br />
                <span className="text-brand">혁신합니다</span>
              </p>

              <p className="text-sm md:text-base lg:text-xl text-gray-700 mb-8 lg:mb-12">
                전국 50개 직영매장에서<br />
                온라인에 없는 가격을 경험하세요
              </p>

              <div className="flex gap-4 items-center">
                <Link href="/about">
                  <button
                    style={{ backgroundColor: '#FEE500' }}
                    className="px-6 md:px-8 py-3 md:py-4 text-gray-900 font-bold text-base md:text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    세모폰 소개
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 모바일 버전 - 전체 배경 이미지 + 하단 버튼 */}
      <section className="md:hidden relative w-full h-[85vh] overflow-hidden mt-[56px]">
        {/* 배경 이미지 (가로 100%, 중앙 정렬) */}
        <div className="absolute inset-0">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: index === currentImageIndex ? 1 : 0,
              }}
            >
              <Image
                src={image}
                alt="세모폰 매장"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 58%' }}
                sizes="100vw"
                quality={75}
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
              />
            </div>
          ))}

          {/* 상단 그라데이션 오버레이 */}
          <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white via-white/95 to-transparent" />

          {/* 하단 그라데이션 오버레이 */}
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-white via-white/95 to-transparent" />
        </div>

        {/* 타이틀 영역 */}
        <div className="relative z-10 h-full flex flex-col items-center px-8 py-8 text-center">
          {/* 상단 타이틀 */}
          <div className="pt-4 flex-shrink-0">
            <h1 className="text-4xl font-black text-gray-900 mb-3">
              세모폰
            </h1>

            <p className="text-2xl font-bold text-gray-900 mb-2">
              세상의 모든 휴대폰 가격을
              <br />
              <span className="text-brand">혁신합니다</span>
            </p>

            <p className="text-sm text-gray-600">
              전국 50개 직영매장에서 온라인에 없는 가격을 경험하세요
            </p>
          </div>

          {/* 중간 여백 */}
          <div className="flex-grow" />

          {/* 하단 버튼 */}
          <div className="w-full max-w-sm pb-12 mt-6 flex-shrink-0">
            <Link href="/about" className="w-full">
              <button
                style={{ backgroundColor: '#FEE500' }}
                className="w-full px-6 py-3 text-gray-900 font-bold text-base rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                세모폰 소개
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
