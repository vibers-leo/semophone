'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface BenefitCardProps {
  icon: string;
  title: string;
  description?: string;
  className?: string;
  delay?: number;
}

/**
 * 혜택 카드 컴포넌트 (개선된 디자인)
 */
export default function BenefitCard({ icon, title, description, className, delay = 0 }: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${className || ''}`}
    >
      {/* 아이콘 */}
      <div className="mb-6">
        {icon.startsWith('/') ? (
          <Image
            src={icon}
            alt={title}
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        ) : (
          <div className="text-5xl">{icon}</div>
        )}
      </div>

      {/* 제목 */}
      <h3 className="text-xl font-bold text-dark mb-3 leading-tight">
        {title}
      </h3>

      {/* 설명 */}
      {description && (
        <p className="text-sm text-dark/60 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
