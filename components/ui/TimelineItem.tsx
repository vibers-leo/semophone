'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HistoryEvent } from '@/types/content';

interface TimelineItemProps {
  event: HistoryEvent;
  isLast?: boolean;
}

export default function TimelineItem({ event, isLast }: TimelineItemProps) {
  const isImageIcon = typeof event.icon === 'string' && (event.icon.startsWith('/') || event.icon.endsWith('.png'));

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative flex gap-6 md:gap-8 pb-16 md:pb-20"
    >
      {/* 세로 라인 */}
      {!isLast && (
        <div className="absolute left-7 md:left-8 top-16 md:top-20 bottom-0 w-0.5 bg-gradient-to-b from-brand via-brand/50 to-transparent" />
      )}

      {/* 아이콘 */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-brand to-brand-600 flex items-center justify-center text-3xl md:text-4xl shadow-lg z-10 border-4 border-white overflow-hidden p-2.5"
      >
        {isImageIcon ? (
          <Image 
            src={event.icon} 
            alt="" 
            width={48} 
            height={48} 
            className="w-full h-full object-contain filter brightness-0 invert" 
          />
        ) : (
          event.icon
        )}
      </motion.div>

      {/* 콘텐츠 */}
      <div className="flex-1 pt-1">
        <div className="flex items-baseline gap-3 mb-3">
          <h3 className="text-3xl md:text-4xl font-black text-dark">{event.year}</h3>
          {event.quarter && (
            <span className="text-sm md:text-base font-bold text-brand bg-brand/20 px-3 py-1 rounded-full">
              {event.quarter}
            </span>
          )}
        </div>
        <h4 className="text-xl md:text-2xl font-bold text-dark mb-3">{event.title}</h4>
        <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">{event.description}</p>

        {/* 통계 */}
        {event.stats && (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {event.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white rounded-xl px-4 py-3 md:px-5 md:py-4 shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="text-xs md:text-sm text-gray-500 font-semibold mb-1">{stat.label}</div>
                <div className="text-lg md:text-xl font-black text-dark">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
