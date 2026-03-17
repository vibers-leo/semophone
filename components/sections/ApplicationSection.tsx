'use client';

import { useState, useEffect } from 'react';
import ApplicationForm from './ApplicationForm';
import Image from 'next/image';

export default function ApplicationSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    // 채용공고 카드에서 "지원하기" 클릭 시 이벤트 리스너
    const handleOpenForm = (event: any) => {
      const title = event.detail?.jobTitle;
      setJobTitle(title);
      setIsFormOpen(true);
    };

    window.addEventListener('openApplicationForm', handleOpenForm);
    return () => window.removeEventListener('openApplicationForm', handleOpenForm);
  }, []);

  return (
    <>
      <section className="bg-dark py-24 px-3 text-center" id="application">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">지원 방법</h2>
          <p className="text-white/80 mb-8">
            recruit@semophone.co.kr<br />
            지원서를 작성하여 제출해주세요
          </p>

          <button
            onClick={() => {
              setJobTitle(undefined);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-brand text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-600 transition-all hover:shadow-brand-hover"
          >
            <Image src="/icons/이메일1.png" alt="" width={24} height={24} className="w-6 h-6 object-contain" />
            채용신청 접수하기
          </button>
        </div>
      </section>

      <ApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        jobTitle={jobTitle}
      />
    </>
  );
}
