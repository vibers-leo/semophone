'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    subject: '',
    message: '',
    privacyAgreed: false,
    smsAgreed: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAgreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'partnership',
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('문의가 접수되었습니다. 빠른 시일 내 연락드리겠습니다.');
        setFormData({
          name: '',
          phone: '',
          region: '',
          subject: '',
          message: '',
          privacyAgreed: false,
          smsAgreed: false,
        });
      } else {
        alert('문의 접수에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
        {/* Hero */}
        <section
          className="relative h-[40vh] min-h-[320px] overflow-hidden mt-[56px] md:mt-[72px]"
          style={{ background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 50%, #FEE500 100%)' }}
        >
          <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">창업문의</h1>
            <p className="text-lg md:text-xl text-dark/80 font-semibold">
              파격적인 창업비용면제 / 차별적인 솔루션과 매뉴
            </p>
          </div>
        </section>

        {/* 협업 소개 */}
        <section className="bg-white py-16 px-3">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              함께 만드는 미래
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              세모폰은 다양한 파트너와의 협력을 통해 고객에게 더 나은 가치를 제공합니다.<br />
              투명하고 정직한 파트너십으로 함께 성장하고자 합니다.
            </p>
          </div>
        </section>

        {/* 협업 분야 */}
        <section className="bg-gray-50 py-16 px-3">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">협업 분야</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "/icons/상점1.png",
                  title: "매장 제휴",
                  description: "세모폰 매장 입점 및 공동 마케팅"
                },
                {
                  icon: "/icons/마이크+폰.png",
                  title: "마케팅 제휴",
                  description: "브랜드 협업 및 공동 프로모션"
                },
                {
                  icon: "/icons/차트2.png",
                  title: "기술 협력",
                  description: "시스템 연동 및 기술 파트너십"
                }
              ].map((area, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 mb-6">
                    <Image src={area.icon} alt={area.title} width={56} height={56} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-base text-gray-700">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 문의 폼 - 좌우 레이아웃 */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-16">창업문의</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* 왼쪽: 캐릭터 이미지 */}
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <Image
                    src="/images/logo/기본로고.png"
                    alt="세모폰"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="mt-8 text-center">
                    <p className="text-2xl font-black text-gray-900 mb-2">
                      세모폰과 함께<br />성장하세요
                    </p>
                    <p className="text-gray-600">
                      투명하고 정직한 파트너십
                    </p>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 폼 */}
              <div className="bg-white">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* 이름 */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">이름</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="성명"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* 연락처 */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">연락처</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* 상담지역 */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">상담지역</label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand text-gray-900"
                      required
                    >
                      <option value="">선택하세요</option>
                      <option value="서울">서울</option>
                      <option value="경기">경기</option>
                      <option value="인천">인천</option>
                      <option value="기타">기타 지역</option>
                    </select>
                  </div>

                  {/* 제목 */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">제목</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="제목"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* 내용 */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">내용</label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="내용"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand resize-none text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>

                  {/* 개인정보 수집 동의 */}
                  <div className="flex items-start gap-2 bg-gray-50 p-4 rounded-lg">
                    <input
                      type="checkbox"
                      id="privacyAgreed"
                      checked={formData.privacyAgreed}
                      onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                      className="mt-1 w-4 h-4"
                      required
                    />
                    <label htmlFor="privacyAgreed" className="text-sm text-gray-700 flex-1">
                      <span className="font-bold">개인정보 수집 및 이용에 동의</span>
                      <Link href="/privacy" className="ml-2 text-brand underline">
                        자세히보기
                      </Link>
                    </label>
                  </div>

                  {/* SMS 수신동의 */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="smsAgreed"
                      checked={formData.smsAgreed}
                      onChange={(e) => setFormData({ ...formData, smsAgreed: e.target.checked })}
                      className="mt-1 w-4 h-4"
                    />
                    <label htmlFor="smsAgreed" className="text-sm text-gray-700">
                      SMS 수신동의
                    </label>
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ backgroundColor: '#FEE500' }}
                    className="w-full py-4 text-gray-900 rounded-lg font-bold text-lg hover:scale-105 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
                  >
                    {submitting ? '전송 중...' : '창업문의'}
                  </button>
                </form>

                {/* 직접 연락 */}
                <div className="mt-8 text-center pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">또는 직접 연락주세요</p>
                  <div className="space-y-2">
                    <a href="tel:0507-1489-2274" className="block text-lg font-bold text-gray-900 hover:text-brand">
                      📞 0507-1489-2274
                    </a>
                    <a href="mailto:partnership@semophone.co.kr" className="block text-sm text-gray-600 hover:text-brand">
                      📧 partnership@semophone.co.kr
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
