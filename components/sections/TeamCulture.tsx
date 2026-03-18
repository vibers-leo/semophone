'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export default function TeamCulture() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-dark text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* 이미지 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="relative mb-16"
        >
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            {/* 이미지 플레이스홀더 */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-yellow-600" />

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black/40" />

            {/* 이미지 라벨 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/50 text-2xl font-bold">
                팀 회의 이미지
              </span>
            </div>
          </div>
        </motion.div>

        {/* 콘텐츠 */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-8"
          >
            함께 성장하는 세모폰 팀
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-4 text-brand text-xl font-bold mb-6">
              <span>전문성</span>
              <span>·</span>
              <span>협력</span>
              <span>·</span>
              <span>혁신</span>
            </div>
          </motion.div>

          {/* 인용구 */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative"
          >
            <div className="text-6xl text-brand opacity-50 mb-4">"</div>
            <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-8">
              우리는 단순히 휴대폰을 파는 것이 아니라,
              <br className="hidden md:block" />
              고객의 디지털 라이프를 혁신합니다
            </p>
            <div className="text-6xl text-brand opacity-50">"</div>
          </motion.blockquote>

          {/* 팀 특징 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-12"
          >
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">전문성</h3>
              <p className="text-sm text-white/70">
                10년 이상의 경력을 가진 전문가들이 함께합니다
              </p>
            </div>

            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">팀워크</h3>
              <p className="text-sm text-white/70">
                서로 협력하며 최고의 서비스를 만듭니다
              </p>
            </div>

            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">성장</h3>
              <p className="text-sm text-white/70">
                개인과 회사가 함께 성장하는 문화를 만듭니다
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Link href="/careers">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-brand text-dark font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all"
              >
                채용정보 보기
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
