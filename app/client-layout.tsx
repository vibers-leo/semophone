'use client';

import { useEffect, useState } from 'react';
import { InstallPrompt } from '@/components/InstallPrompt';
import MobileNav from '@/components/MobileNav';
import { PageTransition } from '@/components/PageTransition';
import { registerServiceWorker } from '@/lib/registerSW';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isAppDomain, setIsAppDomain] = useState(false);

  useEffect(() => {
    // Service Worker 등록 (Production만)
    registerServiceWorker();

    // 도메인 체크: app.semophone.co.kr인지 확인
    const hostname = window.location.hostname;
    const isApp = hostname.includes('app.semophone.co.kr') || hostname === 'localhost';
    setIsAppDomain(isApp);

    // 메인 도메인에서 모바일 접속 시 app 도메인으로 리다이렉트
    if (!isApp && hostname.includes('semophone.co.kr')) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      if (isMobile) {
        // 모바일이면 app 도메인으로 리다이렉트
        // www.semophone.co.kr → app.semophone.co.kr
        // semophone.co.kr → app.semophone.co.kr
        const appUrl = window.location.href
          .replace('www.semophone.co.kr', 'app.semophone.co.kr')
          .replace(/^(https?:\/\/)semophone\.co\.kr/, '$1app.semophone.co.kr');
        window.location.href = appUrl;
      }
    }
  }, []);

  return (
    <>
      <PageTransition>{children}</PageTransition>
      {/* app 도메인에서만 MobileNav 표시 */}
      {isAppDomain && <MobileNav />}
      {/* app 도메인에서만 InstallPrompt 표시 */}
      {isAppDomain && <InstallPrompt />}
    </>
  );
}
