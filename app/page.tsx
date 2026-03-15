'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/sections/HeroBanner';
import CompactHero from '@/components/sections/CompactHero';
import WhySection from '@/components/sections/WhySection';
import TrustSection from '@/components/sections/TrustSection';

// Dynamic imports for performance
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'));
const ContactForm = dynamic(() => import('@/components/ContactForm'));

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [counter, setCounter] = useState(0);
  const [trustBarAnimated, setTrustBarAnimated] = useState(false);
  const [isAppDomain, setIsAppDomain] = useState(false);

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

  // App 도메인 체크
  useEffect(() => {
    const hostname = window.location.hostname;
    setIsAppDomain(hostname.includes('app.semophone.co.kr') || hostname === 'localhost');
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

  return (
    <>
      {/* Loading Splash */}
      {showSplash && (
        <div className="splash" id="splash">
          <Image
            src="/landing/logo-full.png"
            alt="세모폰"
            width={180}
            height={180}
            className="splash-logo"
            priority
          />
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Hero Banner - app 도메인에서는 CompactHero */}
      {isAppDomain ? (
        <CompactHero ref={heroRef} />
      ) : (
        <HeroBanner ref={heroRef} />
      )}

      {/* Why 성지 + Benefits */}
      <WhySection />

      {/* Hero Text + Stats Combined Section */}
      <section className="bg-[#1A1A1A] py-24 md:py-28 px-3 text-center">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          {/* Hero Text */}
          <div className="mb-16 mt-8">
            <h1 className="hero-title fade-in fade-in-d1 mb-6">
              <span className="em">직접 오시면 가격이 다릅니다</span>
            </h1>
            <div className="hero-subtitle fade-in mb-4">수도권 휴대폰 성지 세모폰입니다</div>
            <Link
              href="/stores"
              className="inline-block px-10 py-4 bg-[#F2C811] text-black rounded-full text-lg font-bold hover:bg-brand-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 fade-in fade-in-d2"
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

      {/* Trust */}
      <TrustSection ref={trustRef} />

      {/* Gallery */}
      <GallerySection ref={galleryRef} />

      {/* Final CTA */}
      <section className="py-32 px-3 bg-white text-center">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <h2 className="text-[32px] md:text-[40px] font-black leading-snug mb-4">
            단 한 명의 고객도<br className="md:hidden" /> <span className="text-brand">손해보지 않도록</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-gray-500 mb-10 leading-relaxed">
            숨은 비용 없이 투명하게, 정직하게<br />
            세모폰의 약속입니다
          </p>

          {/* 이미지 */}
          <div className="max-w-2xl mx-auto">
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/landing/no-loss-customer.png"
                alt="단 한 명의 고객도 손해보지 않도록"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                quality={75}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Hidden */}
      <section className="hidden py-16 md:py-24 lg:py-32 px-0 bg-[#FAF7F0] text-center">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-black leading-snug mb-2 md:mb-4 px-5">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-500 mb-8 md:mb-12 leading-relaxed px-5">
            문의를 남겨주시면 빠르게 연락드리겠습니다<br />
            전화 상담도 환영합니다
          </p>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Sticky CTA */}
      <div className={`sticky-cta ${showStickyCta ? 'visible' : ''} ${isAppDomain ? 'sticky-cta-with-nav' : ''}`}>
        <Link href="/stores" className="sticky-cta-btn">
          가까운 성지 찾기
        </Link>
      </div>
    </>
  );
}
