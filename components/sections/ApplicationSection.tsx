'use client';

import { useState } from 'react';
import ApplicationForm from './ApplicationForm';
import Image from 'next/image';

export default function ApplicationSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="bg-dark py-24 px-3 text-center">
        <div className="max-w-container-sm mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">지원 방법</h2>
          <p className="text-white/80 mb-8">
            recruit@semophone.co.kr<br />
            지원서를 작성하여 제출해주세요
          </p>

          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 bg-brand text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-600 transition-all hover:shadow-brand-hover"
          >
            <Image src="/icons/이메일1.png" alt="" width={24} height={24} className="w-6 h-6 object-contain" />
            채용신청 접수하기
          </button>
        </div>
      </section>

      <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
