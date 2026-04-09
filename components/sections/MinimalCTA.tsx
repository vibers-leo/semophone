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
          transition={{ duration: 0.3 }}
        >
          {/* 제목 */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-6 leading-tight tracking-tight" style={{ wordBreak: 'keep-all' }}>
            복잡하고 숨겨진 조건 없이,<br />
            <span className="text-brand">선택은 넓고 · 과정은 쉽게</span>
          </h2>

          {/* 부제목 */}
          <p className="text-xl md:text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
            전문적인 고객맞춤 컨설팅을 제공합니다
          </p>

          {/* CTA 버튼 */}
          <div className="flex justify-center">
            <Link
              href="/stores"
              className="inline-flex items-center justify-center px-8 py-4 md:px-9 md:py-4.5 lg:px-10 lg:py-5 text-black rounded-full text-base md:text-lg lg:text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: '#FEE500' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDD835'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE500'}
            >
              가까운 매장 찾기
              <svg className="ml-2 w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* 신뢰 배지 */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
              {[
                { icon: '/icons/chat-support.png', text: '고객 맞춤 상담' },
                { icon: '/icons/보안.png', text: '안심보험 1억원 가입' },
                { icon: '/icons/ok.png', text: '전매장 개인정보\n교육 이수완료' },
                { icon: '/icons/시계.png', text: '365일 연중무휴' },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 relative">
                    <Image
                      src={badge.icon}
                      alt={badge.text}
                      width={72}
                      height={72}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm md:text-base lg:text-base font-bold text-gray-800 whitespace-pre-line text-center leading-snug">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
