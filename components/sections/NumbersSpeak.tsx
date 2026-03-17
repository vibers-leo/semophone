'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface NumberCardProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function NumberCard({ value, suffix, label, delay }: NumberCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <div className="text-5xl md:text-6xl font-black text-brand mb-4">
          {inView && (
            <CountUp
              start={0}
              end={value}
              duration={2.5}
              separator=","
              suffix={suffix}
            />
          )}
        </div>
        <p className="text-lg md:text-xl font-semibold text-dark">{label}</p>
      </motion.div>
    </motion.div>
  );
}

export default function NumbersSpeak() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-6">
            숫자로 증명하는 세모폰
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            고객의 신뢰로 만들어진 성장의 기록
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <NumberCard value={150000} suffix="+" label="누적 고객" delay={0} />
          <NumberCard value={40} suffix="+" label="전국 직영매장" delay={0.1} />
          <NumberCard value={4.8} suffix="★" label="고객 만족도" delay={0.2} />
          <NumberCard value={365} suffix="일" label="사후관리" delay={0.3} />
        </div>

        {/* 부가 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 leading-relaxed">
            2020년부터 현재까지, 15만 명 이상의 고객이 세모폰을 선택했습니다.
            <br className="hidden md:block" />
            전국 40개 직영매장에서 일관된 서비스 품질과 합리적인 가격을 보장합니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
