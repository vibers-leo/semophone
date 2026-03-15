'use client';

import { useEffect } from 'react';
import { InstallPrompt } from '@/components/InstallPrompt';
import { registerServiceWorker } from '@/lib/registerSW';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Service Worker 등록 (Production만)
    registerServiceWorker();
  }, []);

  return (
    <>
      {children}
      <InstallPrompt />
    </>
  );
}
