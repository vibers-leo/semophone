'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 로고 */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-8 w-24 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo/로고_가로단축형.png"
                alt="세모폰"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-base font-semibold transition-colors ${
                pathname === '/'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              세모폰
            </Link>
            <Link
              href="/contact"
              className={`text-base font-semibold transition-colors ${
                pathname === '/contact'
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              문의하기
            </Link>
            <Link
              href="/stores"
              className="bg-brand text-black px-6 py-3 rounded-full text-base font-bold hover:bg-primary-hover transition-all duration-300 hover:shadow-brand"
            >
              성지찾기
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 border-t border-gray-100 mt-2 pt-6">
            <Link
              href="/"
              className={`block py-3 px-4 text-base font-semibold rounded-lg mb-2 ${
                pathname === '/'
                  ? 'text-gray-900 bg-gray-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              세모폰
            </Link>
            <Link
              href="/contact"
              className={`block py-3 px-4 text-base font-semibold rounded-lg mb-2 ${
                pathname === '/contact'
                  ? 'text-gray-900 bg-gray-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              문의하기
            </Link>
            <Link
              href="/stores"
              className="block bg-brand text-black px-6 py-3 rounded-full text-center font-bold hover:bg-primary-hover transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              성지찾기
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
