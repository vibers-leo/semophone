'use client';

import { useState } from 'react';
import { useJobs } from '@/hooks/useJobs';
import { useApplications } from '@/hooks/useApplications';
import { uploadResumeFile } from '@/lib/firebase/storage';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationForm({ isOpen, onClose }: ApplicationFormProps) {
  const { jobs } = useJobs();
  const { createApplication } = useApplications();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    setUploading(true);

    try {
      // 이력서 파일 업로드
      const resumeUrl = await uploadResumeFile(name, resumeFile);
      setUploading(false);

      // 지원서 제출
      await createApplication({
        name,
        email,
        phone,
        position,
        resumeUrl,
        coverLetter: coverLetter || undefined,
        status: 'pending',
      });

      alert('지원서가 성공적으로 제출되었습니다!');

      // 폼 초기화
      setName('');
      setEmail('');
      setPhone('');
      setPosition('');
      setCoverLetter('');
      setResumeFile(null);
      onClose();
    } catch (error: any) {
      console.error('지원서 제출 오류:', error);
      alert(error.message || '지원서 제출 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">채용 지원서 작성</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={submitting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              이름 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
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
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              required
              disabled={submitting}
            >
              <option value="">선택해주세요</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.title}>
                  {job.title} ({job.location})
                </option>
              ))}
            </select>
          </div>

          {/* 이력서 파일 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              이력서 파일 * (PDF 또는 Word, 최대 10MB)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand transition-colors">
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
                  <span className="text-sm text-gray-700 font-medium">{resumeFile.name}</span>
                ) : (
                  <span className="text-sm text-gray-600">클릭하여 파일 선택</span>
                )}
                <span className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (최대 10MB)</span>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
              placeholder="자기소개서를 작성해주세요..."
              rows={6}
              disabled={submitting}
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors"
              disabled={submitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-brand text-dark font-bold rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {uploading ? '업로드 중...' : submitting ? '제출 중...' : '지원서 제출'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
