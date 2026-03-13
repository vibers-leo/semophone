import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-16 px-5 bg-gray-50 border-t border-gray-200">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* 로고 */}
        <div className="mb-8">
          <Image
            src="/landing/logo-header-simple.png"
            alt="세모폰"
            width={100}
            height={32}
            className="opacity-40"
          />
        </div>

        {/* 고객센터 */}
        <div className="mb-10">
          <div className="text-xs text-gray-500 mb-2 font-medium">고객센터</div>
          <div className="text-2xl font-black text-gray-900 mb-4">1234-5678</div>
          <div className="flex flex-col gap-2">
            <Link
              href="https://pf.kakao.com/_xxxxxxxxxx"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FEE500] text-[#000000] rounded-lg text-sm font-bold hover:bg-[#FDD835] transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.7-.6 2.1-.7 2.5 0 .3.1.5.3.6.2.1.4 0 .6-.1.3-.1 3.2-2.1 3.8-2.5.7.1 1.4.2 2.1.2 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
              </svg>
              카카오톡 1:1 상담
            </Link>
            <Link
              href="https://pf.kakao.com/_xxxxxxxxxx/friend"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-[#FEE500] text-[#000000] rounded-lg text-sm font-bold hover:bg-[#FFFEF7] transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.7-.6 2.1-.7 2.5 0 .3.1.5.3.6.2.1.4 0 .6-.1.3-.1 3.2-2.1 3.8-2.5.7.1 1.4.2 2.1.2 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
              </svg>
              친구 추가하고 혜택 받기
            </Link>
          </div>
          <div className="text-xs text-gray-400 mt-3">
            평일 10:00 - 19:00 (주말·공휴일 휴무)
          </div>
        </div>

        {/* 링크 */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 py-6 border-t border-gray-200 mb-6">
          <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            이용약관
          </Link>
          <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 font-semibold transition-colors">
            개인정보처리방침
          </Link>
          <Link href="/stores" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            매장안내
          </Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            문의하기
          </Link>
        </div>

        {/* 회사 정보 */}
        <div className="text-xs text-gray-500 leading-relaxed mb-6">
          <div className="mb-1">상호: 주식회사 승승장구 | 대표: 최준철</div>
          <div className="mb-1">주소: 경기도 부천시 원미구 중동로248번길 31, 901-2호 (중동, 이스트타워 투)</div>
          <div className="mb-1">사업자등록번호: 813-88-01039</div>
          <div className="mb-1">통신판매업신고번호: 2024-서울강남-01234</div>
          <div>이메일: support@semophone.co.kr</div>
        </div>

        {/* SNS */}
        <div className="flex gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#F2C811] hover:text-black transition-all"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://blog.naver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#F2C811] hover:text-black transition-all"
            aria-label="Blog"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#F2C811] hover:text-black transition-all"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            © 2024 세상모든휴대폰. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
