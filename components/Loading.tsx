'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image
            src="/images/logo/기본로고.png"
            alt="세모폰 로고"
            fill
            className="object-contain animate-pulse"
            priority
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-brand rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-brand rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-brand rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="mt-4 text-gray-600 text-lg">로딩 중...</p>
      </div>
    </div>
  );
}
