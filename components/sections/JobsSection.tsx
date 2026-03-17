'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// 상시 채용 더미 데이터
const permanentJob = {
  id: 'permanent',
  title: '매장 직원 (상시 채용)',
  department: '매장 운영팀',
  location: '서울/경기/인천',
  type: '정규직',
  description: '수도권 40개 매장에서 함께 일할 열정적인 분을 찾습니다.',
  requirements: [
    '고객 응대에 능숙하신 분',
    '휴대폰 및 통신 업계에 관심 있으신 분',
    '성실하고 책임감 있으신 분',
  ],
  benefits: [
    '4대 보험 완비',
    '인센티브 제도',
    '교육 지원',
    '유연 근무',
  ],
};

export default function JobsSection() {
  return (
    <section className="bg-gray-50 py-24 px-3">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">채용공고</h2>
        <p className="text-center text-gray-600 mb-12">
          세모폰과 함께 성장할 인재를 기다립니다
        </p>

        {/* 상시 채용 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            {/* 상시 채용 배지 */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-4 py-2 bg-brand text-dark text-sm font-bold rounded-full">
                상시 채용
              </span>
              <span className="text-sm text-gray-500">{permanentJob.location}</span>
            </div>

            {/* 제목 */}
            <h3 className="text-2xl md:text-3xl font-black text-dark mb-3">
              {permanentJob.title}
            </h3>

            {/* 부서 & 고용형태 */}
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
              <span>📋 {permanentJob.department}</span>
              <span>•</span>
              <span>💼 {permanentJob.type}</span>
            </div>

            {/* 설명 */}
            <p className="text-base md:text-lg text-dark/80 mb-8 leading-relaxed">
              {permanentJob.description}
            </p>

            {/* 요구사항 */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-dark mb-4">✅ 지원 자격</h4>
              <ul className="space-y-2">
                {permanentJob.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-brand mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 혜택 */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-dark mb-4">🎁 복리후생</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {permanentJob.benefits.map((benefit, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg px-4 py-3 text-center text-sm font-semibold text-dark">
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* 지원 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  // 지원 모달 열기 (ApplicationSection에서 처리)
                  const event = new CustomEvent('openApplicationForm', {
                    detail: { jobTitle: permanentJob.title }
                  });
                  window.dispatchEvent(event);
                }}
                className="flex-1 bg-brand text-dark text-center px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                지원하기
              </button>
              <Link
                href="/contact"
                className="flex-1 bg-white text-dark text-center px-8 py-4 rounded-full text-lg font-bold border-2 border-dark hover:bg-dark hover:text-white transition-all"
              >
                문의하기
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 추가 안내 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>지원서는 접수 후 검토하여 개별 연락드립니다.</p>
        </div>
      </div>
    </section>
  );
}
