'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '' });

        // 3초 후 성공 메시지 초기화
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || '문의 접수에 실패했습니다.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('네트워크 오류가 발생했습니다.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이름 */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="홍길동"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand focus:outline-none transition-colors text-gray-900"
          />
        </div>

        {/* 연락처 */}
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="010-1234-5678"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand focus:outline-none transition-colors text-gray-900"
          />
        </div>

        {/* 이메일 (선택) */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
            이메일 <span className="text-gray-400 text-xs">(선택)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand focus:outline-none transition-colors text-gray-900"
          />
        </div>

        {/* 문의내용 */}
        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
            문의내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="궁금하신 내용을 자유롭게 작성해주세요."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand focus:outline-none transition-colors resize-none text-gray-900"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand text-black font-bold py-4 rounded-xl hover:bg-[#D4AD00] transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
        >
          {isSubmitting ? '전송 중...' : '문의하기'}
        </button>

        {/* 성공/실패 메시지 */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-800 font-bold">✅ 문의가 성공적으로 접수되었습니다!</p>
            <p className="text-green-700 text-sm mt-1">빠른 시일 내에 연락드리겠습니다.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-800 font-bold">❌ {errorMessage}</p>
            <p className="text-red-700 text-sm mt-1">다시 시도해주시거나 전화로 문의해주세요.</p>
          </div>
        )}
      </form>

      {/* 개인정보 처리방침 안내 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-600 leading-relaxed">
          문의 접수 시 입력하신 개인정보는 문의 응대 목적으로만 사용되며,
          관련 법령에 따라 안전하게 관리됩니다.
          문의 처리 완료 후 즉시 파기됩니다.
        </p>
      </div>
    </div>
  );
}
