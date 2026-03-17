'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CinematicHero from '@/components/sections/CinematicHero';
import VisionStatement from '@/components/sections/VisionStatement';
import NumbersSpeak from '@/components/sections/NumbersSpeak';
import StoreNetwork from '@/components/sections/StoreNetwork';
import CustomerExperience from '@/components/sections/CustomerExperience';
import TeamCulture from '@/components/sections/TeamCulture';
import GrowthTimeline from '@/components/sections/GrowthTimeline';
import TrustSignals from '@/components/sections/TrustSignals';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [isAppDomain, setIsAppDomain] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

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

      {/* 본문 - stacking context 격리 */}
      <main id="main-content" style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
        {/* 1. 전체 화면 Cinematic Hero */}
        <div ref={heroRef}>
          <CinematicHero />
        </div>

        {/* 2. 비전 선언 */}
        <VisionStatement />

        {/* 3. 숫자로 증명 (Count-up 애니메이션) */}
        <NumbersSpeak />

        {/* 4. 전국 매장 네트워크 (Horizontal Scroll) */}
        <StoreNetwork />

        {/* 5. 고객 경험 (Split Screen) */}
        <CustomerExperience />

        {/* 6. 팀과 문화 (Parallax) */}
        <TeamCulture />

        {/* 7. 성장 여정 (Timeline) */}
        <GrowthTimeline />

        {/* 8. 신뢰 신호 (고객 후기) */}
        <TrustSignals />

        {/* 9. 최종 CTA (Parallax Background) */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky CTA */}
      <div className={`sticky-cta z-sticky-cta ${showStickyCta ? 'visible' : ''} ${isAppDomain ? 'sticky-cta-with-nav' : ''}`}>
        <Link href="/stores" className="sticky-cta-btn">
          가까운 성지 찾기
        </Link>
      </div>
    </>
  );
}
