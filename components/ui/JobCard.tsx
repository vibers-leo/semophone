'use client';

import { useState } from 'react';
import { JobOpening as ContentJobOpening } from '@/types/content';
import { JobOpening as FirestoreJobOpening } from '@/types/firestore';
import { BentoCard, BentoCardContent } from './BentoCard';

interface JobCardProps {
  job: ContentJobOpening | FirestoreJobOpening;
}

export default function JobCard({ job }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <BentoCard hover onClick={() => setIsExpanded(!isExpanded)}>
      <BentoCardContent className="p-6">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📍 {job.location}</span>
              <span>•</span>
              <span>{job.type}</span>
            </div>
          </div>
          <svg
            className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* 확장 콘텐츠 */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {/* 자격요건 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-2">자격요건</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            {/* 우대사항 */}
            {job.preferred && (
              <div>
                <h4 className="font-bold text-gray-900 mb-2">우대사항</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {job.preferred.map((pref, i) => (
                    <li key={i}>{pref}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 업무 내용 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-2">업무 내용</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </BentoCardContent>
    </BentoCard>
  );
}
