'use client';

import Link from 'next/link';

export default function FinalCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
      style={{ zIndex: 9500 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 텍스트 영역 */}
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-black text-gray-900">
              가까운 세모폰 매장을 찾아보세요
            </h3>
            <p className="text-base text-gray-600 mt-1">
              전국 50개 이상의 직영매장에서 온라인에 없는 가격 경험
            </p>
          </div>

          {/* CTA 버튼 */}
          <Link href="/stores">
            <button
              style={{ backgroundColor: '#FEE500' }}
              className="px-8 py-3 text-gray-900 font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
            >
              매장 찾기 →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
