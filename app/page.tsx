'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [counter, setCounter] = useState(0);
  const [trustBarAnimated, setTrustBarAnimated] = useState(false);
  const [galleryParallax, setGalleryParallax] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  // Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      const splash = document.getElementById('splash');
      if (splash) {
        splash.classList.add('fade-out');
        setTimeout(() => setShowSplash(false), 500);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sticky CTA
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCta(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Trust Bar Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !trustBarAnimated) {
          setTrustBarAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (trustRef.current) {
      observer.observe(trustRef.current);
    }

    return () => observer.disconnect();
  }, [trustBarAnimated]);

  // Counter Animation
  useEffect(() => {
    let current = 0;
    const target = 150000;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCounter(target);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, []);

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Gallery Parallax
  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const parallaxValue = Math.max(0, Math.min(1, scrollProgress)) * 30;
        setGalleryParallax(parallaxValue);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Loading Splash */}
      {showSplash && (
        <div className="splash" id="splash">
          <Image
            src="/landing/logo-full.png"
            alt="세모폰"
            width={100}
            height={100}
            className="splash-logo"
          />
          <span className="splash-text">세상모든휴대폰</span>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Hero Banner - Full Width */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* 배경 이미지 */}
        <Image
          src="/landing/semo_banner_bg.png"
          alt="세모폰 배경"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={100}
        />

        {/* 타이틀 이미지 오버레이 */}
        <div className="absolute inset-0 flex items-center justify-start px-5 md:px-12 lg:px-20">
          <div className="relative w-full max-w-xl md:max-w-2xl">
            <Image
              src="/landing/semo_banner_title.png"
              alt="세모폰 - 수도권 40개 매장, 휴대폰 성지"
              width={900}
              height={300}
              className="w-full h-auto"
              priority
              sizes="(max-width: 768px) 75vw, (max-width: 1024px) 60vw, 800px"
            />
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse"></div>
          </div>
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Hero Text + Stats Combined Section */}
      <section className="bg-gradient-to-b from-[#FFFDF0] via-white to-[#1A1A1A] py-24 md:py-28 px-5 text-center">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          {/* Hero Text */}
          <div className="mb-16 mt-8">
            <div className="hero-subtitle fade-in mb-4">수도권 40개 매장, 휴대폰 성지</div>
            <h1 className="hero-title fade-in fade-in-d1 mb-6">
              직접 오시면 <span className="em">가격이 다릅니다</span>
            </h1>
            <Link
              href="/stores"
              className="inline-block px-10 py-4 bg-[#F2C811] text-black rounded-full text-lg font-bold hover:bg-[#D4AD00] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 fade-in fade-in-d2"
            >
              가까운 성지 찾기
            </Link>
          </div>

          {/* Stats */}
          <div className="pt-16 pb-8">
            <div className="stats-label fade-in text-white/50">누적 개통 고객 수</div>
            <div className="stats-big-num fade-in fade-in-d1 text-white">
              <span className="yellow">{counter.toLocaleString()}</span>명<span className="yellow">+</span>
            </div>

            <div className="stats-row mt-8">
              <div className="stat-card fade-in">
                <div className="stat-num text-white">40<span className="unit">+</span></div>
                <div className="stat-label text-white/40">수도권 직영 매장</div>
              </div>
              <div className="stat-card fade-in fade-in-d1">
                <div className="stat-num text-white">4.8<span className="unit">★</span></div>
                <div className="stat-label text-white/40">고객 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why 성지 */}
      <section className="bg-white py-24 px-5 text-center">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <h2 className="section-title fade-in">
            온라인엔 없는 가격, 성지에서만 가능한 상담
          </h2>
          <p className="section-desc fade-in fade-in-d1">
            직접 찾아오신 분께 드리는 특별한 조건.<br />
            매월 2,000명이 그 차이를 경험합니다.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white px-5 pb-24">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="flex items-center justify-center gap-2 mb-9 fade-in">
            <div className="px-5 py-2 rounded-full bg-[#1A1A1A] text-white text-sm font-bold">성지의 차이</div>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { icon: '💰', text: '지원금 최대로 받고 싶다면, 성지!' },
              { icon: '🤝', text: '단통법 폐지! 지원금 제한없는 성지' },
              { icon: '⚡', text: '30분 내 즉시 개통 완료' },
              { icon: '🛡️', text: '개통 후에도 365일 사후관리' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-gray-100 rounded-2xl hover:bg-[#FFFDF0] hover:translate-x-1 transition-all fade-in"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                  {item.icon}
                </div>
                <div className="text-[15px] font-semibold leading-snug">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section ref={trustRef} className="py-24 px-5 bg-[#FAF7F0] text-center">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <h2 className="section-title fade-in">
            마음 놓고 이용하세요, 안심 사후관리
          </h2>
          <p className="section-desc fade-in fade-in-d1 mb-12">
            세모폰은 개통 후에도 끝까지 책임집니다.
          </p>

          <div className="mb-9">
            <div className="flex justify-between items-center mb-3">
              <div className="px-3 py-1 bg-[#FFF8DC] rounded-lg text-base font-bold">고객만족도</div>
              <div className="text-[28px] font-black text-[#D4AD00]">96%</div>
            </div>
            <div className="h-5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-[#F2C811] to-[#D4AD00] rounded-full transition-all duration-[1500ms] ${
                  trustBarAnimated ? 'w-[96%]' : 'w-0'
                }`}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl text-center">
              <div className="text-[28px] font-black">
                365<span className="text-[#F2C811]">일</span>
              </div>
              <div className="text-[13px] text-gray-500 font-medium">사후관리</div>
            </div>
            <div className="p-5 bg-white rounded-2xl text-center">
              <div className="text-[28px] font-black">
                <span className="text-[#F2C811]">40</span>+
              </div>
              <div className="text-[13px] text-gray-500 font-medium">수리/상담 거점</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={galleryRef} className="py-32 px-5 bg-[#1A1A1A] text-center overflow-hidden">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="text-[36px] md:text-[42px] font-black text-white leading-tight mb-16">
            수도권 어디서든 세모폰이 가까이
          </h2>

          <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
            <div className="relative w-full aspect-square">
              <Image
                src="/landing/stores-collage.png"
                alt="매장"
                fill
                className="object-cover"
                style={{
                  transform: `translateY(-${galleryParallax}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-5 bg-white text-center">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <Image
            src="/landing/logo-full.png"
            alt="세모폰"
            width={64}
            height={64}
            className="mx-auto mb-6"
          />
          <h2 className="text-[32px] md:text-[40px] font-black leading-snug mb-4">
            단 한 명의 고객도 <span className="text-[#F2C811]">손해보지 않도록</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-500 mb-10 leading-relaxed">
            숨은 비용 없이 투명하게, 정직하게<br />
            세모폰의 약속입니다
          </p>
          <Link
            href="/stores"
            className="inline-block px-12 py-4 bg-[#1A1A1A] text-white rounded-full text-lg font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            가까운 매장 찾기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Sticky CTA */}
      <div className={`sticky-cta ${showStickyCta ? 'visible' : ''}`}>
        <Link href="/stores" className="sticky-cta-btn">
          가까운 성지 찾기
        </Link>
      </div>
    </>
  );
}
