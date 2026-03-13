'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'partnership'>('general');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand rounded-3xl mb-8 shadow-xl">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            문의하기
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            언제든지 편하게 연락주세요
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Tabs */}
          <div className="bg-white rounded-3xl p-2 shadow-lg mb-8 inline-flex gap-2 w-full">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'general'
                  ? 'bg-brand text-black shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              일반 문의
            </button>
            <button
              onClick={() => setActiveTab('partnership')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'partnership'
                  ? 'bg-brand text-black shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              제휴 문의
            </button>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <form className="space-y-8">
              {/* Name */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  이름
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors text-base bg-gray-50 focus:bg-white"
                  placeholder="이름을 입력해주세요"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  이메일
                </label>
                <input
                  type="email"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors text-base bg-gray-50 focus:bg-white"
                  placeholder="이메일을 입력해주세요"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  전화번호
                </label>
                <input
                  type="tel"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors text-base bg-gray-50 focus:bg-white"
                  placeholder="전화번호를 입력해주세요"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  {activeTab === 'general' ? '문의 분류' : '제휴 유형'}
                </label>
                <select className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors text-base bg-gray-50 focus:bg-white">
                  {activeTab === 'general' ? (
                    <>
                      <option>휴대폰 문의</option>
                      <option>매장 위치 안내</option>
                      <option>A/S 문의</option>
                      <option>기타 문의</option>
                    </>
                  ) : (
                    <>
                      <option>매장 제휴</option>
                      <option>광고 제휴</option>
                      <option>기타 제휴</option>
                    </>
                  )}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  문의 내용
                </label>
                <textarea
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand transition-colors resize-none text-base bg-gray-50 focus:bg-white"
                  rows={8}
                  placeholder="문의 내용을 입력해주세요"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                보내기
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h3 className="text-2xl font-black text-gray-900 mb-8 text-center">
              다른 방법으로도 연락할 수 있습니다
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand rounded-2xl mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-2 font-semibold">전화</p>
                <p className="text-xl font-black text-gray-900">
                  1234-5678
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand rounded-2xl mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-2 font-semibold">이메일</p>
                <p className="text-xl font-black text-gray-900">
                  hello@semophone.com
                </p>
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
