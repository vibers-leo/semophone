'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner" style={{ maxWidth: '1200px' }}>
        <Link href="/" className="logo relative" style={{ width: '200px', height: '40px', display: 'block' }}>
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴"
        >
          <span></span>
        </button>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 모바일 메뉴 */}
      <nav className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="flex flex-col gap-6 p-8">
          <Link
            href="/#why"
            className="text-xl font-bold text-gray-900 hover:text-[#F2C811] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            세모폰
          </Link>
          <Link
            href="/stores"
            className="text-xl font-bold text-gray-900 hover:text-[#F2C811] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            성지찾기
          </Link>
        </div>
      </nav>
    </header>
  );
}
