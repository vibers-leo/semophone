'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MinimalCTA() {
  return (
    <section className="bg-white py-32 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* 아이콘 */}
          <div className="w-24 h-24 mx-auto mb-8">
            <Image
              src="/icons/세모폰 기본 매장찾기.png"
              alt="매장 찾기"
              width={96}
              height={96}
              className="w-full h-auto"
            />
          </div>

          {/* 제목 */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-6 leading-tight">
            단 한 명의 고객도<br />
            <span className="text-brand">손해보지 않도록</span>
          </h2>

          {/* 부제목 */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            숨은 비용 없이 투명하게, 정직하게<br className="hidden sm:block" />
            세모폰의 약속입니다
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stores"
              className="inline-flex items-center justify-center px-10 py-5 bg-brand text-black rounded-full text-lg font-bold hover:bg-brand-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              가까운 성지 찾기
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="tel:1544-0000"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-dark border-2 border-dark rounded-full text-lg font-bold hover:bg-dark hover:text-white transition-all"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              전화 상담하기
            </Link>
          </div>

          {/* 신뢰 배지 */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: '/icons/보안.png', text: '정품 보증' },
                { icon: '/icons/ok.png', text: '투명한 가격' },
                { icon: '/icons/채팅, 고객센터.png', text: '전문 상담' },
                { icon: '/icons/하트.png', text: '365일 케어' },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={badge.icon}
                      alt={badge.text}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
