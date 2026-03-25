'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  region: string;
  subRegions: string[];
  selectedRegion: string;
  selectedSubRegion: string;
  expandedRegion: string | null;
  onRegionClick: (region: string) => void;
  onSubRegionClick: (subRegion: string) => void;
  onToggle: (region: string | null) => void;
}

export function RegionAccordion({
  region,
  subRegions,
  selectedRegion,
  selectedSubRegion,
  expandedRegion,
  onRegionClick,
  onSubRegionClick,
  onToggle
}: Props) {
  const isExpanded = expandedRegion === region;
  const isSelected = selectedRegion === region;

  return (
    <div className="space-y-2">
      {/* 대분류 버튼 */}
      <motion.button
        onClick={() => {
          onRegionClick(region);
          onSubRegionClick('전체');
          onToggle(isExpanded ? null : region);
        }}
        className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
          isSelected
            ? 'bg-brand text-black'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <span>{region}</span>
          <span className="text-sm">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </motion.button>

      {/* 소분류 Accordion */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pl-4 space-y-2 overflow-hidden"
          >
            {subRegions.map((sub) => (
              <motion.button
                key={sub}
                onClick={() => onSubRegionClick(sub)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSubRegion === sub && isSelected
                    ? 'bg-brand/20 text-brand border-2 border-brand'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {sub}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
