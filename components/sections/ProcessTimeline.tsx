'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const processSteps = [
  {
    number: '01',
    icon: '/icons/성지찾기.png',
    title: '매장 방문',
    description: '가까운 세모폰 성지를 찾아주세요',
    color: 'bg-yellow-100',
  },
  {
    number: '02',
    icon: '/icons/채팅, 고객센터.png',
    title: '상담 진행',
    description: '전문 상담사와 1:1 맞춤 상담',
    color: 'bg-blue-100',
  },
  {
    number: '03',
    icon: '/icons/카드.png',
    title: '혜택 확인',
    description: '온라인보다 저렴한 최대 지원금 확인',
    color: 'bg-green-100',
  },
  {
    number: '04',
    icon: '/icons/시계.png',
    title: '즉시 개통',
    description: '30분 이내 빠른 개통 완료',
    color: 'bg-purple-100',
  },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-white py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
            간단한 <span className="text-brand">개통 프로세스</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            4단계로 끝나는 빠르고 편리한 휴대폰 개통
          </p>
        </motion.div>

        {/* 타임라인 */}
        <div className="relative">
          {/* 연결선 (데스크톱) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gray-200 z-0"></div>

          {/* 프로세스 스텝 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* 카드 */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-brand transition-all duration-300 hover:shadow-lg">
                  {/* 숫자 배지 */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-5xl font-black text-brand opacity-20">
                      {step.number}
                    </span>
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center`}>
                      <div className="w-12 h-12 relative">
                        <Image
                          src={step.icon}
                          alt={step.title}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-dark mb-2">
                    {step.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* 화살표 (데스크톱) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 -right-3 z-20">
                    <svg className="w-6 h-6 text-brand" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
