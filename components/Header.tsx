'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드 마운트 확인
  useEffect(() => {
    setMounted(true);
  }, []);

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
      <header
        className={`header ${scrolled ? 'scrolled' : ''}`}
        style={{ zIndex: 9000 }}
      >
        <div className="header-inner max-w-7xl">
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
            <Link
              href="/"
              className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              세모폰
            </Link>
            <Link
              href="/history"
              className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              히스토리
            </Link>
            <Link
              href="/careers"
              className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              채용정보
            </Link>
            <Link
              href="/stores"
              className="px-6 py-2.5 text-black rounded-full text-base font-bold transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: '#FEE500' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDD835'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE500'}
            >
              매장찾기
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

      {/* 전체 화면 슬라이드 메뉴 - Portal로 body에 직접 렌더링 */}
      {mounted && mobileMenuOpen && createPortal(
        <>
          {/* 오버레이 - 투명 (클릭 영역만) */}
          <div
            className="fixed inset-0"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99999,
              backgroundColor: 'transparent',
            }}
            onClick={() => {
              haptics.light();
              setMobileMenuOpen(false);
            }}
          />

          {/* 슬라이드 패널 */}
          <nav
            className="fixed right-0 top-0 h-full w-[280px] bg-white shadow-2xl overflow-y-auto"
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              height: '100vh',
              zIndex: 100000,
              transform: 'translateX(0)',
            }}
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
                    href="/"
                    icon={
                      <Image src="/icons/건물.png" alt="세모폰" width={20} height={20} className="w-5 h-5 object-contain" />
                    }
                    label="세모폰"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MenuItem
                    href="/history"
                    icon={
                      <Image src="/icons/시계.png" alt="히스토리" width={20} height={20} className="w-5 h-5 object-contain" />
                    }
                    label="히스토리"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MenuItem
                    href="/careers"
                    icon={
                      <Image src="/icons/사람들2.png" alt="채용정보" width={20} height={20} className="w-5 h-5 object-contain" />
                    }
                    label="채용정보"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MenuItem
                    href="/stores"
                    icon={
                      <Image src="/icons/지도핀.png" alt="매장찾기" width={20} height={20} className="w-5 h-5 object-contain" />
                    }
                    label="매장찾기"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>

                {/* 구분선 */}
                <div className="my-6 border-t border-gray-300" />

                {/* 하위 메뉴 - 매우 작게 */}
                <div className="flex flex-col gap-0.5">
                  <Link
                    href="/terms"
                    onClick={() => {
                      haptics.light();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                  >
                    <Image src="/icons/빈페이지.png" alt="" width={10} height={10} className="w-2.5 h-2.5 object-contain" />
                    이용약관
                  </Link>
                  <Link
                    href="/privacy"
                    onClick={() => {
                      haptics.light();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                  >
                    <Image src="/icons/빈 방패.png" alt="" width={10} height={10} className="w-2.5 h-2.5 object-contain" />
                    개인정보처리방침
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => {
                      haptics.light();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-all"
                  >
                    <Image src="/icons/채팅, 고객센터.png" alt="" width={10} height={10} className="w-2.5 h-2.5 object-contain" />
                    고객센터
                  </Link>
                </div>

                {/* 버전 정보 */}
                <div className="mt-auto pt-8 text-center">
                  <p className="text-xs text-gray-400">버전 1.0.0</p>
                  <p className="text-xs text-gray-400 mt-1">© 2024 세모폰</p>
                </div>
              </div>
          </nav>
        </>,
        document.body
      )}
    </>
  );
}
