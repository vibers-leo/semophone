'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';
import { useScrollLock } from '@/hooks/useScrollLock';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // 스크롤 잠금 (useScrollLock 훅 사용)
  useScrollLock(isOpen);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Modal 열림 이벤트 발송 (Header 메뉴 닫기용)
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent('modalOpen'));
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-modal-backdrop flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl z-modal"
            onClick={(e) => e.stopPropagation()}
          >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-900/10 hover:bg-gray-900/20 transition-colors"
          aria-label="닫기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 모달 헤더 */}
        <div className="pt-10 pb-6 px-6 text-center border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-black mb-1">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-xs md:text-sm text-gray-600">
            문의를 남겨주시면 빠르게 연락드리겠습니다
          </p>
        </div>

        {/* 모달 본문 */}
        <div className="p-6 pb-safe-bottom">
          <ContactForm compact />
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
