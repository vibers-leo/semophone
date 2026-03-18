'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const trustPoints = [
  {
    icon: '/icons/보안.png',
    title: '정품 보증',
    description: '모든 기기는 정품만 취급합니다',
  },
  {
    icon: '/icons/ok.png',
    title: '투명한 가격',
    description: '숨은 비용 없는 명확한 가격 안내',
  },
  {
    icon: '/icons/채팅, 고객센터.png',
    title: '전문 상담',
    description: '1:1 맞춤 상담으로 최적의 선택',
  },
  {
    icon: '/icons/하트.png',
    title: '사후 관리',
    description: '개통 후에도 365일 책임집니다',
  },
];

export default function TrustMinimal() {
  return (
    <section className="bg-gray-50 py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
            마음 편히 <span className="text-brand">믿고 찾을 수 있어요</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            15만 고객이 선택한 이유가 있습니다
          </p>
        </motion.div>

        {/* 신뢰 포인트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4">
                <Image
                  src={point.icon}
                  alt={point.title}
                  width={64}
                  height={64}
                  className="w-full h-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">{point.title}</h3>
              <p className="text-sm text-gray-600">{point.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 이미지 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="relative aspect-[16/9] max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/landing/trust-support.png"
            alt="신뢰할 수 있는 세모폰"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </motion.div>
      </div>
    </section>
  );
}
