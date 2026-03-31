'use client';

import { useState, useRef } from 'react';
import { uploadResumeFile } from '@/lib/firebase/storage';

type ModalType = 'apply' | 'inquiry' | null;

interface FormState {
  name: string;
  phone: string;
  region: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: '', phone: '', region: '', message: '' };

export default function CareersApplySection() {
  const [modal, setModal] = useState<ModalType>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openModal = (type: ModalType) => {
    setModal(type);
    setForm(INITIAL_FORM);
    setSubmitted(false);
    setResumeFile(null);
    setResumeError('');
  };

  const closeModal = () => {
    setModal(null);
    setSubmitted(false);
    setResumeFile(null);
    setResumeError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeError('');
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      setResumeError('PDF 또는 Word 파일만 첨부 가능합니다.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setResumeError('파일 크기는 10MB 이하여야 합니다.');
      return;
    }
    setResumeFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // 이력서 업로드 (채용지원 + 파일 있는 경우)
      let resumeUrl = '';
      let resumeFileName = '';
      const ncpResumeUrl = '';
      if (modal === 'apply' && resumeFile) {
        resumeFileName = resumeFile.name;
        resumeUrl = await uploadResumeFile(form.name, resumeFile);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: modal === 'apply'
            ? `[채용 지원서]\n희망 근무 지역: ${form.region || '미기재'}\n\n추가 메시지: ${form.message || '없음'}`
            : form.message,
          type: modal === 'apply' ? 'job_application' : 'job_inquiry',
          storeName: modal === 'apply' ? '채용접수' : '채용문의',
          resumeUrl,
          resumeFileName,
          ncpResumeUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || '오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-white py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Open positions</p>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight"
              style={{ wordBreak: 'keep-all' }}
            >
              모집 분야
            </h2>
          </div>

          {/* 모집 포지션 카드 */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* 카드 헤더 */}
            <div className="px-6 py-5 border-b border-gray-100" style={{ backgroundColor: '#FEE500' }}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">판매사</h3>
                  <p className="text-sm text-gray-700 mt-0.5">매장 운영팀 · 정규직 · 상시채용</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-sm text-gray-700">
                  <span className="bg-gray-900/10 px-3 py-1 rounded-full text-xs font-bold">서울</span>
                  <span className="bg-gray-900/10 px-3 py-1 rounded-full text-xs font-bold">경기</span>
                  <span className="bg-gray-900/10 px-3 py-1 rounded-full text-xs font-bold">인천</span>
                </div>
              </div>
            </div>

            {/* 카드 본문 */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
                {/* 업무내용 */}
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">업무내용</p>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {['고객응대', '판매', '매장관리', '고객관리'].map(t => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 자격요건 */}
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">자격요건</p>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {['성별 · 학력 · 경력 무관', '서비스 · 영업마인드'].map(t => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 우대사항 */}
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">우대사항</p>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {['유사업무 경험', '인근 거주', '밝은 성격', '장기근속 가능자'].map(t => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openModal('apply')}
                  className="flex-1 py-4 rounded-full text-base font-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
                  style={{ backgroundColor: '#FEE500', color: '#09090b' }}
                >
                  접수하기
                </button>
                <button
                  onClick={() => openModal('inquiry')}
                  className="flex-1 py-4 rounded-full text-base font-bold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  채용 문의하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 모달 */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 배경 */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* 모달 패널 */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 max-h-[90dvh] overflow-y-auto">
            {/* 닫기 */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              aria-label="닫기"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              /* 완료 상태 */
              <div className="text-center py-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: '#FEE500' }}
                >
                  <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  {modal === 'apply' ? '지원서가 접수되었습니다' : '문의가 접수되었습니다'}
                </h3>
                <p className="text-gray-500 text-sm mb-8" style={{ wordBreak: 'keep-all' }}>
                  빠른 시일 내에 연락드리겠습니다.
                </p>
                <button
                  onClick={closeModal}
                  className="w-full py-3.5 rounded-full font-bold text-gray-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: '#FEE500' }}
                >
                  확인
                </button>
              </div>
            ) : (
              /* 폼 */
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 헤더 */}
                <div className="mb-6">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold text-gray-900 mb-3"
                    style={{ backgroundColor: '#FEE500' }}
                  >
                    {modal === 'apply' ? '채용 지원' : '채용 문의'}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight" style={{ wordBreak: 'keep-all' }}>
                    {modal === 'apply' ? '지원서 접수하기' : '채용 관련 문의'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1" style={{ wordBreak: 'keep-all' }}>
                    {modal === 'apply'
                      ? '간단한 정보를 입력해주시면 담당자가 연락드립니다.'
                      : '궁금한 점을 남겨주시면 빠르게 답변드립니다.'}
                  </p>
                </div>

                {/* 이름 */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="성명을 입력해주세요"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-gray-900 placeholder:text-gray-400 bg-gray-50"
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">연락처 *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-gray-900 placeholder:text-gray-400 bg-gray-50"
                  />
                </div>

                {/* 희망 근무 지역 (접수만) */}
                {modal === 'apply' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">희망 근무 지역</label>
                    <input
                      type="text"
                      name="region"
                      value={form.region}
                      onChange={handleChange}
                      placeholder="예: 경기 부천, 서울 강남 등"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-gray-900 placeholder:text-gray-400 bg-gray-50"
                    />
                  </div>
                )}

                {/* 이력서 첨부 (채용지원만) */}
                {modal === 'apply' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      이력서 첨부 <span className="text-gray-400 font-normal">(선택 · PDF / Word · 10MB 이하)</span>
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {resumeFile ? (
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                        <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-gray-700 flex-1 truncate">{resumeFile.name}</span>
                        <button
                          type="button"
                          onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        파일 선택하기
                      </button>
                    )}
                    {resumeError && <p className="text-red-500 text-xs mt-1.5">{resumeError}</p>}
                  </div>
                )}

                {/* 메시지 */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    {modal === 'apply' ? '추가 메시지' : '문의 내용 *'}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={
                      modal === 'apply'
                        ? '경력, 특기사항 등 자유롭게 입력해주세요 (선택)'
                        : '궁금한 점을 남겨주세요'
                    }
                    required={modal === 'inquiry'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-gray-900 placeholder:text-gray-400 bg-gray-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full font-black text-gray-900 text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-sm hover:shadow-md"
                  style={{ backgroundColor: '#FEE500' }}
                >
                  {submitting
                    ? (modal === 'apply' && resumeFile ? '이력서 업로드 중...' : '제출 중...')
                    : (modal === 'apply' ? '지원서 제출하기' : '문의 보내기')
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
