'use client';

import { useEffect } from 'react';
import ContactForm from './ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7F0] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-900/10 hover:bg-gray-900/20 transition-colors"
          aria-label="닫기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 모달 헤더 */}
        <div className="pt-12 pb-8 px-6 text-center border-b border-gray-200">
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            문의를 남겨주시면 빠르게 연락드리겠습니다
          </p>
        </div>

        {/* 모달 본문 */}
        <div className="p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
