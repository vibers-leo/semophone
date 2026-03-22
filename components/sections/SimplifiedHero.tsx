'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 21:9 배너 이미지 (스케치 스타일)
const bannerImages = [
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 10_45AM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 10_47AM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 10_49AM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 10_53AM (1).jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 10_53AM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 10_55AM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 11_19AM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 11_27AM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 12_10PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 12_23PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 12_24PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 12_25PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 12_29PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 12_32PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 12_33PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 12_54PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_16PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_26PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_29PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_31PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_32PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_35PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_37PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_42PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_44PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_55PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_57PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 1_58PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 2_14PM.jpg',
    '/images/semophone_store_banner/Generated Image March 19, 2026 - 2_16PM.jpg',
];

export default function SimplifiedHero() {
  // 항상 랜덤한 이미지로 시작
  const [currentImageIndex, setCurrentImageIndex] = useState(() =>
    Math.floor(Math.random() * bannerImages.length)
  );

  // 자동 이미지 랜덤 전환 (2초마다)
  useEffect(() => {
    if (bannerImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * bannerImages.length);
        } while (newIndex === prev && bannerImages.length > 1);
        return newIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <>
      {/* PC 버전 - 전체 배경 이미지 + 왼쪽 그라데이션 */}
      <section className="hidden lg:block relative w-full h-[60vh] overflow-hidden mt-[72px]">
        {/* 배경 이미지 (가로 100%, 약간 오른쪽으로) */}
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
                className="object-contain"
                style={{ objectPosition: 'right center' }}
                sizes="100vw"
                quality={75}
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
              />
            </div>
          ))}

          {/* 왼쪽 그라데이션 오버레이 (55%까지 확장) */}
          <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-white via-white/95 to-transparent" />
        </div>

        {/* 타이틀 영역 */}
        <div className="relative z-10 h-full flex items-center pl-[12%] pr-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              세모폰
            </h1>

            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              세상의 모든 휴대폰 가격을
              <br />
              <span className="text-brand">혁신합니다</span>
            </p>

            <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-12">
              전국 40개 직영매장에서<br />
              온라인에 없는 가격을 경험하세요
            </p>

            <div className="flex gap-4 items-center">
              <Link href="/about">
                <button
                  style={{ backgroundColor: '#FEE500' }}
                  className="px-8 py-4 text-gray-900 font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  세모폰 소개
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 태블릿 버전 - 768px~1023px */}
      <section className="hidden md:block lg:hidden relative w-full h-[70vh] overflow-hidden mt-[72px]">
        {/* 배경 이미지 (가로 100%, 오른쪽 정렬) */}
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
                className="object-contain"
                style={{ objectPosition: 'right center' }}
                sizes="100vw"
                quality={75}
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
              />
            </div>
          ))}

          {/* 왼쪽 그라데이션 오버레이 (60%까지 확장) */}
          <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-white via-white/95 to-transparent" />
        </div>

        {/* 타이틀 영역 */}
        <div className="relative z-10 h-full flex items-center pl-[12%] pr-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black text-gray-900 mb-6">
              세모폰
            </h1>

            <p className="text-2xl font-bold text-gray-900 mb-4">
              세상의 모든 휴대폰 가격을
              <br />
              <span className="text-brand">혁신합니다</span>
            </p>

            <p className="text-base text-gray-700 mb-12">
              전국 40개 직영매장에서<br />
              온라인에 없는 가격을 경험하세요
            </p>

            <div className="flex gap-4 items-center">
              <Link href="/about">
                <button
                  style={{ backgroundColor: '#FEE500' }}
                  className="px-8 py-4 text-gray-900 font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  세모폰 소개
                </button>
              </Link>
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
                className="object-contain"
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
              전국 40개 직영매장에서 온라인에 없는 가격을 경험하세요
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
