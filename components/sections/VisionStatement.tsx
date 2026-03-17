'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function VisionStatement() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section ref={ref} className="relative py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto text-center"
      >
        {/* 로고 */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.div
            animate={inView ? { rotate: 360, scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="inline-block"
          >
            <Image
              src="/icons/세모폰 기본 매장찾기.png"
              alt="세모폰 로고"
              width={120}
              height={120}
              className="mx-auto"
            />
          </motion.div>
        </motion.div>

        {/* 미션 선언 */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-8 leading-tight"
        >
          우리는 정직한 가격과
          <br />
          투명한 서비스로
          <br />
          <span className="text-brand">대한민국 휴대폰 시장을</span>
          <br />
          선도합니다
        </motion.h2>

        {/* 핵심 가치 */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-5xl font-black text-brand mb-4">40+</div>
            <p className="text-lg font-semibold text-dark">전국 최대 규모 직영망</p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="text-5xl font-black text-brand mb-4">BEST</div>
            <p className="text-lg font-semibold text-dark">온라인보다 저렴한 오프라인</p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <div className="text-5xl font-black text-brand mb-4">15만+</div>
            <p className="text-lg font-semibold text-dark">고객의 선택</p>
          </motion.div>
        </motion.div>

        {/* 부가 설명 */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 mt-16 leading-relaxed"
        >
          2020년부터 지금까지, 세모폰은 고객과의 신뢰를 최우선으로
          <br className="hidden md:block" />
          합리적인 가격과 전문적인 서비스를 제공해왔습니다.
        </motion.p>
      </motion.div>
    </section>
  );
}
