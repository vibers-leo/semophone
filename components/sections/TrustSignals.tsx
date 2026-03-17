'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

const trustBadges: TrustBadge[] = [
  {
    icon: '✓',
    title: '정품 보증',
    description: '100% 정품만을 취급합니다',
  },
  {
    icon: '✓',
    title: '투명한 가격',
    description: '숨겨진 비용이 없습니다',
  },
  {
    icon: '✓',
    title: '전문 상담',
    description: '10년 경력 전문가가 함께합니다',
  },
  {
    icon: '✓',
    title: '365일 케어',
    description: '구매 후에도 책임집니다',
  },
];

interface Review {
  author: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    author: '김**',
    content: '직접 가서 봤는데 정말 친절하고 가격도 합리적이었어요. 온라인보다 훨씬 저렴하게 구매했습니다!',
    rating: 5,
  },
  {
    author: '이**',
    content: '상담사분이 제 사용 패턴에 맞는 요금제를 추천해주셔서 매달 통신비가 절반으로 줄었어요.',
    rating: 5,
  },
  {
    author: '박**',
    content: '다른 매장들과 비교해봤는데 세모폰이 가장 투명하고 믿을 수 있었습니다. 강추!',
    rating: 5,
  },
];

function TrustBadgeCard({ badge, delay }: { badge: TrustBadge; delay: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <motion.div
        whileHover={{ y: -5 }}
        className="flex flex-col items-center"
      >
        {/* 체크마크 애니메이션 */}
        <motion.div
          animate={inView ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-3xl font-black text-dark mb-4 shadow-lg"
        >
          {badge.icon}
        </motion.div>
        <h3 className="text-xl font-bold text-dark mb-2">{badge.title}</h3>
        <p className="text-gray-600">{badge.description}</p>
      </motion.div>
    </motion.div>
  );
}

function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      {/* 별점 */}
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <span key={i} className="text-brand text-xl">★</span>
        ))}
      </div>

      {/* 후기 내용 */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        "{review.content}"
      </p>

      {/* 작성자 */}
      <p className="text-sm text-gray-500 font-medium">- {review.author} 고객</p>
    </motion.div>
  );
}

export default function TrustSignals() {
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
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-6">
            고객이 선택한 이유
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            신뢰와 만족을 최우선으로 생각합니다
          </p>
        </motion.div>

        {/* 신뢰 배지 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {trustBadges.map((badge, index) => (
            <TrustBadgeCard key={badge.title} badge={badge} delay={index * 0.1} />
          ))}
        </div>

        {/* 고객 후기 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-dark text-center mb-12">
            고객 후기
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} delay={0.6 + index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* 통계 요약 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-gray-100 rounded-2xl px-12 py-6">
            <div>
              <div className="text-4xl font-black text-brand mb-1">4.8★</div>
              <p className="text-sm text-gray-600">평균 평점</p>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <div className="text-4xl font-black text-brand mb-1">98%</div>
              <p className="text-sm text-gray-600">재방문율</p>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <div className="text-4xl font-black text-brand mb-1">5,200+</div>
              <p className="text-sm text-gray-600">리뷰 수</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
