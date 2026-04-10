'use client';

import { useState, useEffect } from 'react';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string; // 채용공고 제목 (선택)
}

export default function ApplicationForm({ isOpen, onClose, jobTitle }: ApplicationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState(jobTitle || '매장 직원 (상시 채용)');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !submitting) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, submitting]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 10MB 제한
      if (file.size > 10 * 1024 * 1024) {
        alert('파일 크기는 10MB 이하여야 합니다.');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      alert('이력서 파일을 선택해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      // TODO: 실제 API 연동 시 구현
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert('지원서가 성공적으로 제출되었습니다!\n담당자가 확인 후 연락드리겠습니다.');

      // 폼 초기화
      setName('');
      setEmail('');
      setPhone('');
      setPosition(jobTitle || '매장 직원 (상시 채용)');
      setCoverLetter('');
      setResumeFile(null);
      onClose();
    } catch (error: any) {
      console.error('지원서 제출 오류:', error);
      alert('지원서 제출 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      style={{ zIndex: 9001 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full my-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-dark">채용 지원서 작성</h2>
              <p className="text-sm text-gray-500 mt-1">지원 직무: {position}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              disabled={submitting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* 2단 레이아웃: PC에서만 적용 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* 왼쪽: 개인정보 */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-dark mb-4">📋 개인정보</h3>

              {/* 이름 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  placeholder="홍길동"
                  required
                  disabled={submitting}
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  placeholder="example@email.com"
                  required
                  disabled={submitting}
                />
              </div>

              {/* 연락처 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  연락처 *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  placeholder="010-1234-5678"
                  required
                  disabled={submitting}
                />
              </div>

              {/* 지원 직무 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원 직무 *
                </label>
                <input
                  type="text"
                  value={position}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-700"
                />
              </div>
            </div>

            {/* 오른쪽: 이력서 & 자기소개서 */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-dark mb-4">📄 지원 서류</h3>

              {/* 이력서 파일 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  이력서 파일 * (PDF 또는 Word, 최대 10MB)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-brand hover:bg-brand/5 transition-all">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                    required
                    disabled={submitting}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {resumeFile ? (
                      <div className="text-center">
                        <p className="text-sm text-dark font-semibold">{resumeFile.name}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)}MB
                        </p>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm text-gray-700 font-medium">클릭하여 파일 선택</span>
                        <span className="text-sm text-gray-400 mt-1">PDF, DOC, DOCX (최대 10MB)</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* 자기소개서 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  자기소개서 (선택)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition-all resize-none"
                  placeholder="자기소개서를 작성해주세요..."
                  rows={8}
                  disabled={submitting}
                />
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-gray-700 transition-all"
              disabled={submitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-brand text-dark font-black rounded-xl hover:bg-brand-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? '제출 중...' : '지원서 제출'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
