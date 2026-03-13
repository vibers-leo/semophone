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
          <div className="text-2xl font-black text-gray-900 mb-4">0507-1489-2274</div>
          <Link
            href="https://pf.kakao.com/_MvxaTn"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FEE500] text-[#000000] rounded-full text-sm font-bold hover:bg-[#FDD835] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full max-w-xs"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.7-.6 2.1-.7 2.5 0 .3.1.5.3.6.2.1.4 0 .6-.1.3-.1 3.2-2.1 3.8-2.5.7.1 1.4.2 2.1.2 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>
            </svg>
            카카오톡 1:1 상담
          </Link>
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
          <div>이메일: support@semophone.co.kr</div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            © 2026 세모폰. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
