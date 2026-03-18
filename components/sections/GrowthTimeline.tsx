'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

const timelineData: TimelineEvent[] = [
  {
    year: '2020',
    title: '세모폰 창립',
    description: '상승모바일과 승승장구텔레콤의 만남',
    icon: '🚀',
  },
  {
    year: '2021',
    title: '10개 매장 돌파',
    description: '서울·경기 지역 확장',
    icon: '📍',
  },
  {
    year: '2022',
    title: '20개 매장 달성',
    description: '인천 지역 진출',
    icon: '🎯',
  },
  {
    year: '2023',
    title: '30개 매장 돌파',
    description: '전국 네트워크 확대',
    icon: '🌟',
  },
  {
    year: '2024',
    title: '40개 직영매장',
    description: '수도권 최대 규모 달성',
    icon: '👑',
  },
  {
    year: '2026',
    title: '지속적인 확장',
    description: '고객과 함께하는 미래',
    icon: '💡',
  },
];

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {/* 아이콘 */}
        <div className="text-5xl mb-4">{event.icon}</div>

        {/* 연도 */}
        <div className="text-4xl font-black text-brand mb-3">{event.year}</div>

        {/* 제목 */}
        <h3 className="text-2xl font-bold text-dark mb-2">{event.title}</h3>

        {/* 설명 */}
        <p className="text-gray-600">{event.description}</p>
      </motion.div>

      {/* 연결선 (마지막 항목 제외) */}
      {index < timelineData.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 right-0 w-12 h-0.5 bg-brand/30 transform translate-x-full -translate-y-1/2" />
      )}
    </motion.div>
  );
}

export default function GrowthTimeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-6">
            세모폰의 성장 여정
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            고객과 함께 걸어온 길, 그리고 앞으로 나아갈 방향
          </p>
        </motion.div>

        {/* 타임라인 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {timelineData.map((event, index) => (
            <TimelineItem key={event.year} event={event} index={index} />
          ))}
        </div>

        {/* 통계 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-brand rounded-2xl px-12 py-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div>
                <div className="text-5xl font-black text-dark mb-2">6년</div>
                <p className="text-dark font-semibold">성장의 역사</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-dark/20" />
              <div>
                <div className="text-5xl font-black text-dark mb-2">40+</div>
                <p className="text-dark font-semibold">직영 매장</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-dark/20" />
              <div>
                <div className="text-5xl font-black text-dark mb-2">15만+</div>
                <p className="text-dark font-semibold">고객의 선택</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
