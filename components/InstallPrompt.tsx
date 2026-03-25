'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { haptics } from '@/lib/haptics';

/**
 * PWA 설치 프롬프트 배너
 * "홈 화면에 추가" 안내
 */
export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 이미 dismiss했는지 확인
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) return;

    // beforeinstallprompt 이벤트 리스너
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // 5초 후 프롬프트 표시
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    haptics.medium();
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    haptics.light();
    localStorage.setItem('pwa-install-dismissed', 'true');
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:w-96 z-sticky-cta"
          style={{ marginBottom: 'var(--safe-bottom)' }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-brand">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-brand rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  홈 화면에 추가하기
                </h3>
                <p className="text-sm text-gray-600 leading-snug mb-3">
                  세모폰 앱을 홈 화면에 추가하고<br />
                  더 빠르게 접속하세요!
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="flex-1 bg-brand text-black px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-600 transition-all active:scale-95"
                  >
                    추가하기
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2.5 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-100 transition-all active:scale-95"
                  >
                    나중에
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
