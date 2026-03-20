'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const NaverMap = dynamic(() => import('@/components/NaverMap'), { ssr: false });

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
        {/* Hero */}
        <section className="bg-white pt-[100px] md:pt-[120px] pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-4">
              <Image
                src="/icons/건물.png"
                alt="회사소개"
                width={96}
                height={96}
                className="w-20 h-20 md:w-24 md:h-24 object-contain flex-shrink-0"
              />
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">회사 소개</h1>
                <p className="text-base md:text-lg text-gray-600">
                  투명한 가격, 정직한 서비스
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CEO 인사말 */}
        <section className="bg-white py-24 px-3">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-12">
                {/* CEO 사진 */}
                <div className="flex-shrink-0 w-full md:w-80">
                  <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/ceo.jpg"
                      alt="세모폰 대표"
                      width={320}
                      height={427}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 인사말 */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                      안녕하세요.
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
                      주식회사 승승장구 대표 최준철입니다.
                    </h3>
                  </div>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      저희 세모폰은 '세상의 모든 휴대폰'이라는 비전 아래 고객에게 최고의 가치를 제공하고자 합니다.
                      수년 간의 노력 끝에 전국 40개 매장에서 15만 고객님의 신뢰를 받으며 성장해왔습니다.
                    </p>
                    <p>
                      우리는 투명한 가격과 정직한 서비스를 원칙으로 합니다.
                      고객 한 분 한 분께 최선을 다하며, 온라인에서는 찾을 수 없는 특별한 가격과 전문 상담을 제공합니다.
                    </p>
                    <p>
                      앞으로도 세모폰은 변함없이 고객과의 약속을 지키며,
                      모바일 통신 시장의 투명한 기준이 되고자 노력하겠습니다.
                      고객 여러분의 현명한 선택에 세모폰이 함께하겠습니다.
                    </p>
                    <p>
                      감사합니다.
                    </p>
                  </div>

                  <div className="pt-4">
                    <p className="text-right text-lg font-bold text-gray-900">
                      CEO 최준철
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 세모폰의 CI 소개 */}
        <section className="bg-white py-24 px-3">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                세모폰의 CI 소개
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                세모폰 CI에는 정직한 믿음과 함께 성장하는 파트너십을 추구하는 의지가 담겨 있습니다.
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
                <div className="flex-1 space-y-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-6">
                    세모폰 로고
                  </h3>

                  <p className="text-gray-700 leading-relaxed text-base">
                    세모폰의 CI에는 브랜드가 추구하는 가치와 방향성이 담겨 있습니다.
                    세모폰의 CI는 '연결과 균형'을 기반으로 한 단순한 기하학적 형태에서 출발합니다.
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base">
                    세 개의 선이 이어져 만들어지는 삼각형 구조는 서로 다른 요소들이 하나로 모여 안정적인 형태를 이루는 모습을 의미합니다.
                    이는 다양한 휴대폰과 서비스, 그리고 고객의 선택이 세모폰 안에서 자연스럽게 연결되는 경험을 상징합니다.
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base">
                    삼각형의 세 꼭짓점은 제품, 고객, 서비스라는 핵심 요소를 나타냅니다.
                    각 요소가 균형 있게 조화를 이루며 하나의 구조를 완성하듯, 세모폰은 다양한 브랜드와 통신 서비스를 고객에게 연결합니다.
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base">
                    단순하고 균형 잡힌 형태는 신뢰와 안정감을 의미합니다.
                    빠르게 변화하는 모바일 시장 속에서도 고객이 믿고 선택할 수 있는 기준이 되고자 하는 의지를 담고 있습니다.
                  </p>

                  <p className="text-gray-700 leading-relaxed text-base">
                    앞으로 세모폰은 이 CI를 중심으로 더 많은 가치와 경험을 전달하는 브랜드로 성장해 나갈 것입니다.
                  </p>

                  {/* 다운로드 버튼 */}
                  <div className="pt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href="/downloads/semophone_logos_original.zip"
                      download="세모폰_로고_PNG파일.zip"
                      style={{ backgroundColor: '#FEE500' }}
                      className="px-6 py-3.5 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="text-sm">로고 PNG 파일 (ZIP)</span>
                      </div>
                    </a>
                    <a
                      href="/downloads/semophone_logo_original.ai"
                      download="세모폰_로고_AI원본.ai"
                      style={{ backgroundColor: '#FEE500' }}
                      className="px-6 py-3.5 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="text-sm">로고 AI 원본 파일</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 세모폰에 오시는 길 */}
        <section className="bg-gray-50 py-24 px-3">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                세모폰에 오시는 길
              </h2>
              <p className="text-gray-600 mb-2">
                휴대폰성지 세모폰 광명6동점
              </p>
              <div className="text-base text-gray-800 font-semibold mt-6">
                <p>경기도 광명시 광명로 824 1층 (광명동)</p>
                <p className="text-gray-600 text-sm mt-2">
                  📞 031-1234-5678
                </p>
              </div>
            </div>

            {/* 지도 */}
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-xl mb-12">
              <NaverMap
                stores={[{
                  id: 1,
                  name: '휴대폰성지 세모폰 광명6동점',
                  address: '경기도 광명시 광명로 824 1층 (광명동)',
                  phone: '031-1234-5678',
                  region: '경기',
                  subRegion: '기타',
                  lat: 37.4787,
                  lng: 126.8644,
                }]}
                userLocation={null}
              />
            </div>

            {/* 안내 메시지 */}
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <p className="text-lg text-gray-700">
                전국 40개 직영매장에서 세모폰을 만나보세요
              </p>
              <Link href="/stores" className="inline-block mt-4">
                <button
                  style={{ backgroundColor: '#FEE500' }}
                  className="px-8 py-3 text-gray-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  전체 매장 보기
                </button>
              </Link>
            </div>

            {/* 배너 이미지 */}
            <div className="mt-16">
              <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/images/about-banner.png"
                  alt="세모폰 소개"
                  width={1200}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
