'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { haptics } from '@/lib/haptics';
import { useScrollLock } from '@/hooks/useScrollLock';

// MenuItem 컴포넌트
interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  secondary?: boolean;
}

function MenuItem({ href, icon, label, onClick, secondary = false }: MenuItemProps) {
  return (
    <div>
      <Link
        href={href}
        onClick={() => {
          haptics.light();
          onClick();
        }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all active:scale-95 ${
          secondary
            ? 'text-gray-600 hover:bg-gray-100'
            : 'text-gray-900 hover:bg-brand/10 hover:text-brand font-semibold'
        }`}
      >
        <div className={secondary ? 'text-gray-400' : 'text-brand'}>
          {icon}
        </div>
        <span className="text-base">{label}</span>
      </Link>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 스크롤 잠금 (useScrollLock 훅 사용)
  useScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [mobileMenuOpen]);

  // Modal 열림 감지하여 메뉴 자동 닫기
  useEffect(() => {
    const handleModalOpen = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('modalOpen', handleModalOpen);
    return () => window.removeEventListener('modalOpen', handleModalOpen);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const logos = [
    { src: '/images/logo/로고_가로단축형.png', width: 150, height: 40 },
    { src: '/images/logo/로고_가로나열형.png', width: 200, height: 40 }
  ];

  return (
    <>
      <header className={`header z-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner max-w-container-xl">
          <Link href="/" className="logo relative w-[200px] h-10 block">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt="세모폰"
                width={logo.width}
                height={logo.height}
                className="absolute left-0 top-0 transition-opacity duration-1000"
                style={{
                  opacity: currentLogo === index ? 1 : 0,
                }}
              />
            ))}
          </Link>
          <nav className="nav-desktop" style={{ gap: '2rem' }}>
            <Link href="/#why" className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors">
              세모폰
            </Link>
            <Link
              href="/stores"
              className="px-6 py-2.5 bg-[#F2C811] text-black rounded-full text-base font-bold hover:bg-[#D4AD00] transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              성지찾기
            </Link>
          </nav>
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => {
              haptics.light();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="메뉴"
          >
            <span></span>
          </button>
        </div>
      </header>

      {/* 전체 화면 슬라이드 메뉴 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 z-menu-overlay"
              onClick={() => {
                haptics.light();
                setMobileMenuOpen(false);
              }}
            />

            {/* 슬라이드 패널 */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-white shadow-2xl overflow-y-auto z-menu-panel"
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => {
                  haptics.light();
                  setMobileMenuOpen(false);
                }}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900/10 hover:bg-gray-900/20 transition-colors"
                aria-label="메뉴 닫기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 메뉴 콘텐츠 */}
              <div className="flex flex-col p-8 pt-20 h-full">
                {/* 메인 메뉴 */}
                <div className="flex flex-col gap-2">
                  <MenuItem
                    href="/#why"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                    label="세모폰 소개"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MenuItem
                    href="/stores"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                    label="성지 찾기"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MenuItem
                    href="/#why"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    }
                    label="혜택"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MenuItem
                    href="/contact"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                    label="문의하기"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>

                {/* 구분선 */}
                <div className="my-6 border-t border-gray-300" />

                {/* 하위 메뉴 */}
                <div className="flex flex-col gap-2">
                  <MenuItem
                    href="/terms"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                    label="이용약관"
                    onClick={() => setMobileMenuOpen(false)}
                    secondary
                  />
                  <MenuItem
                    href="/privacy"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                    label="개인정보처리방침"
                    onClick={() => setMobileMenuOpen(false)}
                    secondary
                  />
                  <MenuItem
                    href="/contact"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                    label="고객센터"
                    onClick={() => setMobileMenuOpen(false)}
                    secondary
                  />
                </div>

                {/* 버전 정보 */}
                <div className="mt-auto pt-8 text-center">
                  <p className="text-xs text-gray-400">버전 1.0.0</p>
                  <p className="text-xs text-gray-400 mt-1">© 2024 세모폰</p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
