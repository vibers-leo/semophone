'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ExperienceItemProps {
  title: string;
  description: string[];
  delay: number;
  reverse?: boolean;
}

function ExperienceItem({ title, description, delay, reverse = false }: ExperienceItemProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* 이미지 */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
        className={reverse ? 'lg:order-2' : ''}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* 이미지 플레이스홀더 */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500" />

          {/* 오버레이 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/50 text-2xl font-bold">
              {title} 이미지
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 텍스트 */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
        className={reverse ? 'lg:order-1' : ''}
      >
        <h3 className="text-3xl md:text-4xl font-black text-dark mb-6">
          {title}
        </h3>
        <div className="space-y-4">
          {description.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: delay + 0.4 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-brand rounded-full flex items-center justify-center mt-1">
                <svg
                  className="w-4 h-4 text-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CustomerExperience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-6">
            세모폰에서만 경험할 수 있는 것
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            고객의 만족이 우리의 성장입니다
          </p>
        </motion.div>

        <div className="space-y-32">
          <ExperienceItem
            title="1:1 전문 상담"
            description={[
              '10년 이상 경력의 전문 상담사가 직접 응대합니다',
              '고객의 사용 패턴에 맞는 최적의 요금제를 제안합니다',
              '투명한 가격 정책으로 숨겨진 비용이 없습니다',
              '합리적인 가격으로 최고의 만족을 드립니다',
            ]}
            delay={0}
          />

          <ExperienceItem
            title="쾌적한 매장 환경"
            description={[
              '최신 기기를 직접 체험할 수 있는 전시 공간',
              '편안한 대기 공간과 친절한 서비스',
              '깨끗하고 현대적인 인테리어',
              '주차 편의시설 완비 (매장별 상이)',
            ]}
            delay={0.2}
            reverse
          />
        </div>
      </div>
    </section>
  );
}
