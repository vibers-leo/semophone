'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactModal from './ContactModal';

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <footer className="py-16 px-5 pb-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* 2단 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* 왼쪽: 로고 + 회사 정보 */}
          <div>
            {/* 로고 */}
            <div className="mb-8">
              <Image
                src="/landing/logo-header-simple.png"
                alt="세모폰"
                width={120}
                height={38}
                className="opacity-40"
              />
            </div>

            {/* 회사 정보 */}
            <div className="text-sm text-gray-600 leading-relaxed space-y-2">
              <div>
                <span className="font-semibold text-gray-900">상호:</span> 주식회사 승승장구
              </div>
              <div>
                <span className="font-semibold text-gray-900">대표:</span> 최준철
              </div>
              <div>
                <span className="font-semibold text-gray-900">주소:</span><br />
                경기도 부천시 원미구 중동로248번길 31, 901-2호<br />
                (중동, 이스트타워 투)
              </div>
              <div>
                <span className="font-semibold text-gray-900">사업자등록번호:</span> 813-88-01039
              </div>
              <div>
                <span className="font-semibold text-gray-900">이메일:</span> support@semophone.co.kr
              </div>
            </div>
          </div>

          {/* 오른쪽: 고객센터 + 링크 */}
          <div className="md:text-right md:pt-8">
            {/* 고객센터 */}
            <div className="mb-12">
              <div className="text-sm text-gray-500 mb-2 font-medium">고객센터</div>
              <div className="text-2xl md:text-3xl font-black text-gray-900 mb-4">0507-1489-2274</div>
              <Link
                href="https://pf.kakao.com/_MvxaTn/chat"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FEE500] text-[#000000] rounded-full text-sm font-bold hover:bg-[#FDD835] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full max-w-xs md:ml-auto"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.7-.6 2.1-.7 2.5 0 .3.1.5.3.6.2.1.4 0 .6-.1.3-.1 3.2-2.1 3.8-2.5.7.1 1.4.2 2.1.2 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
                </svg>
                카카오톡 1:1 상담
              </Link>
              <div className="text-sm text-gray-400 mt-3">
                평일 10:00 - 19:00 (주말·공휴일 휴무)
              </div>
            </div>

            {/* 링크 */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-6 md:justify-end">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 font-semibold transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/stores" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                매장안내
              </Link>
              {/* 모바일 - 모달 버튼 */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="md:hidden text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                문의하기
              </button>
              {/* PC - 페이지 링크 */}
              <Link
                href="/partnership"
                className="hidden md:inline-flex text-sm text-gray-600 hover:text-gray-900 transition-colors items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                문의하기
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-10">
          <p className="text-sm text-gray-400">
            © 2026 세모폰. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
