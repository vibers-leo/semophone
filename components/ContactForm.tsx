'use client';

import { useState } from 'react';

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [notifications, setNotifications] = useState('');

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
      console.log('📤 Sending contact form:', formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('📥 Response status:', response.status);

      const data = await response.json();
      console.log('📥 Response data:', data);

      if (data.success) {
        setSubmitStatus('success');
        setNotifications(data.notifications || '알림 발송됨');
        setFormData({ name: '', phone: '', email: '', message: '' });

        // 알럿으로 즉시 피드백
        alert(`✅ 문의가 성공적으로 접수되었습니다!\n\n${data.notifications || '알림 발송됨'}\n\n빠른 시일 내에 연락드리겠습니다.`);

        // 성공 메시지는 계속 표시 (사라지지 않음)
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || '문의 접수에 실패했습니다.');
        console.error('❌ Contact form failed:', data);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('네트워크 오류가 발생했습니다.');
      console.error('❌ Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={compact ? "w-full" : "w-full max-w-2xl mx-auto px-4"}>
      <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4 md:space-y-6"}>
        {/* 이름 */}
        <div>
          <label htmlFor="name" className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5 md:mb-2">
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
            className="w-full px-3 py-2.5 md:px-4 md:py-3 border-2 border-gray-200 rounded-xl focus:border-brand focus:outline-none transition-colors text-gray-900 text-sm md:text-base"
          />
        </div>

        {/* 연락처 */}
        <div>
          <label htmlFor="phone" className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5 md:mb-2">
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
            className="w-full px-3 py-2.5 md:px-4 md:py-3 border-2 border-gray-200 rounded-xl focus:border-brand focus:outline-none transition-colors text-gray-900 text-sm md:text-base"
          />
        </div>

        {/* 이메일 (선택) */}
        <div>
          <label htmlFor="email" className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5 md:mb-2">
            이메일 <span className="text-gray-400 text-xs">(선택)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full px-3 py-2.5 md:px-4 md:py-3 border-2 border-gray-200 rounded-xl focus:border-brand focus:outline-none transition-colors text-gray-900 text-sm md:text-base"
          />
        </div>

        {/* 문의내용 */}
        <div>
          <label htmlFor="message" className="block text-xs md:text-sm font-bold text-gray-900 mb-1.5 md:mb-2">
            문의내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={compact ? 3 : 5}
            placeholder="궁금하신 내용을 자유롭게 작성해주세요."
            className="w-full px-3 py-2.5 md:px-4 md:py-3 border-2 border-gray-200 rounded-xl focus:border-brand focus:outline-none transition-colors resize-none text-gray-900 text-sm md:text-base leading-relaxed"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand text-black font-bold py-3.5 md:py-4 rounded-xl hover:bg-brand-600 transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none text-sm md:text-base"
        >
          {isSubmitting ? '전송 중...' : '문의하기'}
        </button>

        {/* 성공/실패 메시지 */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 md:p-4 text-center">
            <p className="text-green-800 font-bold text-sm md:text-base">✅ 문의가 성공적으로 접수되었습니다!</p>
            <p className="text-green-700 text-xs md:text-sm mt-1">
              {notifications && (
                <>
                  <span className="font-semibold">{notifications}</span>
                  <br />
                </>
              )}
              빠른 시일 내에 연락드리겠습니다.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitStatus('idle');
                setNotifications('');
              }}
              className="mt-3 text-green-700 hover:text-green-900 font-semibold text-xs md:text-sm underline"
            >
              확인
            </button>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 md:p-4 text-center">
            <p className="text-red-800 font-bold text-sm md:text-base">❌ {errorMessage}</p>
            <p className="text-red-700 text-xs md:text-sm mt-1">다시 시도해주시거나 전화로 문의해주세요.</p>
          </div>
        )}
      </form>

      {/* 개인정보 처리방침 안내 */}
      {!compact && (
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-xl">
          <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
            문의 접수 시 입력하신 개인정보는 문의 응대 목적으로만 사용되며,
            관련 법령에 따라 안전하게 관리됩니다.
            문의 처리 완료 후 즉시 파기됩니다.
          </p>
        </div>
      )}
    </div>
  );
}
