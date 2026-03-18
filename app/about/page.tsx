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

        {/* CI 갤러리 */}
        <section className="bg-gray-50 py-24 px-3">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                세모폰 CI
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 text-left bg-white rounded-2xl p-8 shadow-lg mb-12">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-brand">세모폰 로고</strong>는 <strong>"세상의 모든 휴대폰"</strong>이라는 브랜드 철학을 담고 있습니다.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  삼각형(△) 형태의 심볼은 <strong className="text-gray-900">안정성</strong>과 <strong className="text-gray-900">신뢰</strong>를 상징하며,
                  노란색(#FEE500)은 <strong className="text-gray-900">밝음</strong>과 <strong className="text-gray-900">투명함</strong>을 표현합니다.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  다양한 환경과 매체에 최적화된 로고 파일을 제공하며, 각 로고 이미지를 클릭하시면 원본 파일을 다운로드하실 수 있습니다.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { src: '/images/logo/기본로고.png', name: '기본 로고', bgColor: '#FFFFFF' },
                { src: '/images/logo/기본로고_흰글씨.png', name: '반전 로고', bgColor: '#1A1A1A' },
                { src: '/images/logo/로고_가로나열형.png', name: '가로 나열형', bgColor: '#FFFFFF' },
                { src: '/images/logo/로고_가로단축형.png', name: '가로 단축형', bgColor: '#FFFFFF' },
                { src: '/images/logo/로고_검정글씨만.png', name: '검정 글씨', bgColor: '#FFFFFF' },
                { src: '/images/logo/로고_노랑글씨_검정배경.png', name: '노랑 글씨 (검정 배경)', bgColor: '#000000' },
                { src: '/images/logo/로고_노랑글씨나열.png', name: '노랑 나열', bgColor: '#000000' },
                { src: '/images/logo/로고_노랑글씨만.png', name: '노랑 글씨', bgColor: '#000000' },
                { src: '/images/logo/로고단순_가로나열형.png', name: '단순 가로 나열', bgColor: '#FFFFFF' },
                { src: '/images/logo/로고단순_가로단축형.png', name: '단순 가로 단축', bgColor: '#FFFFFF' },
                { src: '/images/logo/검정글씨.png', name: '검정 글씨 단독', bgColor: '#FFFFFF' },
                { src: '/images/logo/검정글씨_노란배경.png', name: '검정 글씨 (노랑 배경)', bgColor: '#FEE500' },
              ].map((logo, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
                  <a
                    href={logo.src}
                    download
                    className="block"
                  >
                    <div
                      className="aspect-video flex items-center justify-center mb-4 rounded-xl relative overflow-hidden"
                      style={{ backgroundColor: logo.bgColor }}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={200}
                        height={80}
                        className="max-w-full max-h-full object-contain p-4 group-hover:scale-110 transition-transform"
                      />
                      {/* 다운로드 오버레이 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3 shadow-lg">
                          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-700 text-center group-hover:text-brand transition-colors">
                      {logo.name}
                    </p>
                  </a>
                  <div className="mt-3 text-center">
                    <a
                      href={logo.src}
                      download
                      className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-brand transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      다운로드
                    </a>
                  </div>
                </div>
              ))}
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
