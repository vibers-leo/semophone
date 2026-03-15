'use client';

import { useEffect } from 'react';
import { InstallPrompt } from '@/components/InstallPrompt';
import MobileNav from '@/components/MobileNav';
import { PageTransition } from '@/components/PageTransition';
import { registerServiceWorker } from '@/lib/registerSW';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Service Worker 등록 (Production만)
    registerServiceWorker();
  }, []);

  return (
    <>
      <PageTransition>
        {children}
      </PageTransition>
      <MobileNav />
      <InstallPrompt />
    </>
  );
}
