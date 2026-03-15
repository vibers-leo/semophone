'use client';

import { motion } from 'framer-motion';
import { BentoCard, BentoCardContent } from './BentoCard';

interface BenefitCardProps {
  icon: string;
  title: string;
  description?: string;
  className?: string;
  delay?: number;
}

/**
 * 혜택 카드 컴포넌트 (벤토 그리드용)
 */
export default function BenefitCard({ icon, title, description, className, delay = 0 }: BenefitCardProps) {
  return (
    <BentoCard className={className} hover>
      <BentoCardContent className="flex flex-col items-start justify-center h-full p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.5 }}
          className="w-full"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-brand/10 flex items-center justify-center text-2xl md:text-3xl mb-3">
            {icon}
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600">
              {description}
            </p>
          )}
        </motion.div>
      </BentoCardContent>
    </BentoCard>
  );
}
