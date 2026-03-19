'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhySection from '@/components/sections/WhySection';
import TrustSection from '@/components/sections/TrustSection';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const NaverMap = dynamic(() => import('@/components/NaverMap'), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
        {/* Hero */}
        <section
          className="relative h-[40vh] min-h-[320px] max-h-[480px] overflow-hidden mt-[56px] md:mt-[72px]"
          style={{
            background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 50%, #FEE500 100%)',
          }}
        >
          <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">회사 소개</h1>
            <p className="text-lg md:text-xl text-dark/80 font-semibold">
              투명한 가격, 정직한 서비스
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white py-24 px-3 text-center">
          <div className="max-w-container-md mx-auto">
            <Image
              src="/images/logo/기본로고.png"
              alt="세모폰"
              width={120}
              height={120}
              className="mx-auto mb-6 opacity-90"
            />
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              세상의 모든<br />
              휴대폰 가격을 내리다
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              세모폰은 고객이 불필요한 비용을 지불하지 않도록,<br />
              투명한 가격과 정직한 서비스로 신뢰를 쌓아갑니다.
            </p>
          </div>
        </section>

        {/* 브랜드 아이덴티티 */}
        <section className="bg-gray-50 py-24 px-3">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                브랜드 아이덴티티
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                세모폰의 브랜드 아이덴티티와 로고 시스템을<br />
                소개합니다
              </p>
            </div>

            {/* 로고 소개 */}
            <div className="bg-white rounded-3xl p-12 shadow-xl mb-12">
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* 로고 이미지 */}
                <div className="flex-shrink-0">
                  <div className="w-64 h-64 bg-gray-50 rounded-2xl flex items-center justify-center p-8">
                    <Image
                      src="/images/logo/기본로고.png"
                      alt="세모폰 로고"
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* 로고 설명 */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">
                    세모폰 로고
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-brand">세모폰 로고</strong>는 <strong>"세상의 모든 휴대폰"</strong>이라는<br />
                    브랜드 철학을 담고 있습니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    삼각형(△) 형태의 심볼은 <strong className="text-gray-900">안정성</strong>과 <strong className="text-gray-900">신뢰</strong>를 상징하며,<br />
                    노란색(#FEE500)은 <strong className="text-gray-900">밝음</strong>과 <strong className="text-gray-900">투명함</strong>을 표현합니다.
                  </p>

                  {/* 다운로드 버튼 */}
                  <div className="pt-6">
                    <button
                      onClick={() => {
                        window.open('/downloads/semophone_logos_original.zip', '_blank');
                      }}
                      style={{ backgroundColor: '#FEE500' }}
                      className="px-8 py-4 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        로고 원본 파일 다운로드
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 기존 섹션 재사용 */}
        <WhySection />
        <TrustSection />

        {/* 본사 약도 */}
        <section className="bg-white py-24 px-3">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                찾아오시는 길
              </h2>
              <p className="text-gray-600 mb-2">
                세모폰 본사로 오시는 길을 안내합니다
              </p>
              <div className="text-base text-gray-800 font-semibold mt-6">
                <p>서울특별시 강남구 테헤란로 123 세모폰빌딩 5층</p>
                <p className="text-gray-600 text-sm mt-2">
                  📞 02-1234-5678 | 📧 info@semophone.co.kr
                </p>
              </div>
            </div>

            {/* 지도 */}
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-xl mb-12">
              <NaverMap
                stores={[{
                  id: 0,
                  name: '세모폰 본사',
                  address: '서울특별시 강남구 테헤란로 123',
                  phone: '02-1234-5678',
                  region: '서울',
                  subRegion: '동부',
                  lat: 37.5012,
                  lng: 127.0396,
                }]}
                userLocation={null}
              />
            </div>

            {/* 교통편 안내 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🚇</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">지하철</h3>
                <p className="text-sm text-gray-600">
                  2호선 강남역 3번출구<br />도보 5분
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🚌</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">버스</h3>
                <p className="text-sm text-gray-600">
                  간선: 146, 740<br />지선: 3012, 4412
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🚗</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">주차</h3>
                <p className="text-sm text-gray-600">
                  건물 지하 1-3층<br />방문객 2시간 무료
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
