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
  const [currentImageIndex, setCurrentImageIndex] = useState(() =>
    Math.floor(Math.random() * bannerImages.length)
  );

  useEffect(() => {
    if (bannerImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const copies = [
    {
      title: <>매월 4,000명의 고객이<br /><span className="text-brand">왜 세모폰을 선택했을까요?</span></>,
      titleMobile: <>매월 4,000명의 고객이<br /><span className="text-brand">왜 세모폰을 선택했을까요?</span></>,
      sub: <>전국 50개 직영점에서<br />불필요한 조건 없는 휴대폰 구매를 경험하세요</>,
    },
    {
      title: <>휴대폰 판매점의 새로운 기준<br /><span className="text-brand">세모폰이 제시합니다</span></>,
      titleMobile: <>휴대폰 판매점의 새로운 기준<br /><span className="text-brand">세모폰이 제시합니다</span></>,
      sub: <>전국 50개 직영점에서<br />불필요한 조건 없는 휴대폰 구매를 경험하세요</>,
    },
  ];
  const copy = copies[currentImageIndex] ?? copies[0];

  return (
    <>
      {/* PC / 태블릿 버전 — 75vh, 이미지 오른쪽 60% + 왼쪽 텍스트 */}
      <section
        className="hidden md:block relative w-full overflow-hidden mt-[72px]"
        style={{ height: '80vh' }}
      >
        {/* 이미지 — 오른쪽 58% (42vw~100vw), 세로 잘림 허용 */}
        <div className="absolute right-0 top-0 bottom-0 w-[58%]">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: index === currentImageIndex ? 1 : 0 }}
            >
              <Image
                src={image}
                alt="세모폰 매장"
                fill
                className="object-cover object-center"
                sizes="55vw"
                quality={90}
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* 그라데이션 — 0~42vw 흰색, 42~52vw 자연 페이드 (이미지 왼쪽 라인 커버) */}
        <div
          className="absolute inset-y-0 left-0 w-[54%] pointer-events-none"
          style={{ background: 'linear-gradient(to right, white 0%, white 84%, transparent 100%)' }}
        />

        {/* 타이틀 영역 — 세로 가운데 정렬 */}
        <div className="relative z-10 h-full flex items-center pl-[8%] lg:pl-[12%] pr-8 lg:pr-16">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-3 lg:mb-5 transition-opacity duration-700" style={{ wordBreak: 'keep-all' }}>
              {copy.title}
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-8 lg:mb-12 transition-opacity duration-700">
              {copy.sub}
            </p>

            <div className="flex gap-4 items-center">
              <Link href="/about">
                <button
                  style={{ backgroundColor: '#FEE500' }}
                  className="px-6 md:px-8 py-3.5 md:py-4 text-gray-900 font-bold text-base md:text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  세모폰 소개
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 모바일 버전 */}
      <section className="md:hidden relative w-full overflow-hidden mt-[56px] bg-gray-900" style={{ minHeight: '85dvh' }}>
        {/* 배경 이미지 — 전체 꽉참 + 어두운 배경 폴백 */}
        <div className="absolute inset-0">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: index === currentImageIndex ? 1 : 0 }}
            >
              <Image
                src={image}
                alt="세모폰 매장"
                fill
                className="object-cover"
                style={{ objectPosition: 'center center' }}
                sizes="100vw"
                quality={80}
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
              />
            </div>
          ))}
          {/* 상단 텍스트 가독성용 그라데이션 */}
          <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/60 to-transparent" />
          {/* 하단 CTA 가독성용 */}
          <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="relative z-10 min-h-[85dvh] flex flex-col px-6 py-8 text-center">
          {/* 상단 텍스트 */}
          <div className="pt-4">
            <h1 className="text-4xl font-black text-white drop-shadow-lg mb-3">세모폰</h1>
            <p className="text-xl font-bold text-white drop-shadow-md transition-opacity duration-700 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
              {copy.titleMobile}
            </p>
          </div>
          <div className="flex-grow" />
          {/* 하단 CTA */}
          <div className="w-full max-w-sm mx-auto pb-10">
            <p className="text-base text-white/90 drop-shadow mb-5 leading-relaxed">
              {copy.sub}
            </p>
            <Link href="/about" className="w-full">
              <button
                style={{ backgroundColor: '#FEE500' }}
                className="w-full px-6 py-4 text-gray-900 font-black text-lg rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
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
