'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { haptics } from '@/lib/haptics';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: '홈',
    },
    {
      href: '/stores',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: '성지찾기',
    },
    {
      href: '/#why',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      label: '혜택',
    },
    {
      href: '/contact',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: '문의',
    },
  ];

  const handleNavClick = () => {
    haptics.light();
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-bottom-nav shadow-[0_-2px_16px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-4 h-16 pb-safe-bottom">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="relative flex flex-col items-center justify-center h-full"
            >
              {/* 탭 애니메이션 */}
              <motion.div
                className="flex flex-col items-center justify-center gap-0.5"
                whileTap={{ scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {/* 아이콘 - 활성화시 bounce */}
                <motion.div
                  className={`transition-all duration-200 ${
                    isActive ? 'text-brand' : 'text-gray-400'
                  }`}
                  animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>

                {/* 라벨 */}
                <span
                  className={`text-[11px] font-semibold transition-all duration-200 ${
                    isActive ? 'text-brand' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>

              {/* Active 인디케이터 (상단 라인) */}
              {isActive && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-brand rounded-full"
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
