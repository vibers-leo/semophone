'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useBenefits } from '@/hooks/useBenefits';

const defaultBenefits = [
  {
    id: '1',
    icon: '/icons/태그, 할인.png',
    title: '지원금 최대로',
    description: '매장에서만 가능한 최대 지원금으로 더 저렴하게',
  },
  {
    id: '2',
    icon: '/icons/ok.png',
    title: '단통법 폐지',
    description: '지원금 제한 없는 자유로운 개통',
  },
  {
    id: '3',
    icon: '/icons/시계.png',
    title: '즉시 개통',
    description: '30분 내 빠른 개통 완료',
  },
  {
    id: '4',
    icon: '/icons/보안.png',
    title: '365일 사후관리',
    description: '개통 후에도 끝까지 책임',
  },
];

export default function IconBenefits() {
  const { benefits: firestoreBenefits, loading } = useBenefits();

  // Firestore 데이터가 있으면 사용, 없으면 기본 데이터 사용
  const benefits = firestoreBenefits.length > 0 ? firestoreBenefits : defaultBenefits;

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
            왜 <span className="text-brand">세모폰</span>인가요?
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            40개 직영 매장에서 제공하는 특별한 혜택
          </p>
        </motion.div>

        {/* 혜택 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const iconSrc = typeof benefit.icon === 'string' && benefit.icon.startsWith('/')
              ? benefit.icon
              : `/icons/${benefit.icon || '전화.png'}`;

            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* 아이콘 */}
                <div className="w-20 h-20 mb-6 mx-auto relative">
                  <Image
                    src={iconSrc}
                    alt={benefit.title}
                    width={80}
                    height={80}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* 제목 */}
                <h3 className="text-xl font-bold text-dark mb-3 text-center">
                  {benefit.title}
                </h3>

                {/* 설명 */}
                <p className="text-gray-600 text-center leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
