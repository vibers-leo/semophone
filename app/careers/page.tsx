import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { benefits } from '@/data/careers';

export const metadata = {
  title: '채용정보 | 세모폰',
  description: '세모폰과 함께 성장할 인재를 찾습니다.'
};

const coreValues = [
  {
    en: 'Teamwork',
    title: '# 함께의 가치',
    description: '세모폰은 함께의 가치를 추구합니다. 더 나은 아이디어의 확장을 위해 각 팀과의 적극적인 협업을 바탕으로 혁신을 추구합니다.',
  },
  {
    en: 'Flexible thinking',
    title: '# 유연한 사고',
    description: '세모폰은 열린 사고를 바탕으로 다양한 생각들을 유연하고 긍정적으로 받아들입니다. 또한 문제에 대한 능동적인 태도로 다양한 방향으로 문제를 분석합니다.',
  },
  {
    en: 'Moral behavior',
    title: '# 투명한 행동',
    description: '세모폰은 기본적인 윤리의식을 바탕으로 행동합니다. 기본과 원칙을 준수하며, 투명하고 공정하게 업무를 처리합니다. 기본 예절을 바탕으로 자유롭고, 평등한 문화를 추구합니다.',
  },
];

const wantedPeople = [
  '성실하고 긍정적인 마인드의 소유자',
  '약속을 잘 지키고 본인의 역할을 충실히 수행하시는 분',
  '어떠한 난관에도 효율적으로 문제를 해결하시는 분',
  '협업과 소통능력이 뛰어나신 분',
];

const timeline = ['2017', '2018', '2019', '2020', '2026'];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>

        {/* S1: Hero */}
        <section className="bg-white pt-[100px] md:pt-[120px] pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-4">
              <Image
                src="/icons/사람들2.png"
                alt="채용정보"
                width={96}
                height={96}
                className="w-20 h-20 md:w-24 md:h-24 object-contain flex-shrink-0"
              />
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">채용정보</h1>
                <p className="text-base md:text-lg text-gray-600">
                  함께 성장할 동료를 찾습니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* S2: 우리 회사는요? */}
        <section className="bg-gray-50 py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">About us</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">우리 회사는요?</h2>

            {/* 인용구 */}
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-10">
              <span className="absolute top-4 left-6 text-6xl font-black leading-none" style={{ color: '#FEE500' }}>&ldquo;</span>
              <p className="text-2xl md:text-3xl font-black text-gray-900 pt-6">
                직원이 성장하여, 회사가 성장한다
              </p>
              <span className="text-6xl font-black leading-none" style={{ color: '#FEE500' }}>&rdquo;</span>
            </div>

            {/* 강조 배지 */}
            <div className="mb-12">
              <span
                className="inline-block px-6 py-3 rounded-full text-base font-bold text-gray-900"
                style={{ backgroundColor: '#FEE500' }}
              >
                매장 직원 100명중 70명이 7년 이상 근무하는 이유
              </span>
            </div>

            {/* 본문 */}
            <div className="space-y-5 text-gray-700 leading-relaxed text-base md:text-lg text-left">
              <p>
                휴대폰성지 세모폰은 인천, 경기, 서울 지역에서 약 50개 매장을 운영하고 있는
                10년 이상의 업력을 가진 안정적인 회사입니다.
              </p>
              <p>
                저희는 단순한 매장 운영을 넘어 직원과 회사가 함께 성장하는 것을 가장 중요하게 생각하며,
                서로 소통하고 고민하며 변화하는 시장에 맞춰 지속적으로 발전해 나가고 있습니다.
              </p>
              <p>
                경력직의 경우, 능력과 성과에 따른 업계 최고 수준의 보수를 보장해드리며,
                신입분들도 체계적인 교육과 지원을 통해 빠르게 적응하고 성장할 수 있도록 도와드립니다.
              </p>
              <p>
                통신업이 처음이셔도 전혀 부담 가지실 필요 없습니다.
                배우려는 자세와 도전하려는 의지만 있다면 누구나 충분히 시작하실 수 있습니다.
              </p>
              <p className="font-bold text-gray-900">
                함께 성장하며 오래 일할 수 있는 환경을 찾고 계신다면, 휴대폰성지 세모폰과 함께해 주세요.
              </p>
            </div>

            {/* 타임라인 */}
            <div className="mt-14 flex items-center justify-center">
              {timeline.map((year, i) => (
                <div key={year} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-gray-400" style={{ backgroundColor: '#FEE500' }} />
                    <span className="text-sm font-bold text-gray-600">{year}</span>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-10 md:w-16 h-0.5 bg-gray-300 mb-5" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S3: 우리는 이렇게 일합니다 (다크) */}
        <section className="bg-gray-900 py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#FEE500' }}>About us</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-16">
              우리는 <span className="font-black">이렇게</span> 일합니다.
            </h2>

            <div className="divide-y divide-white/10">
              {coreValues.map((v, i) => (
                <div key={i} className="py-10 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-10">
                  <p className="text-sm font-bold" style={{ color: '#FEE500' }}>{v.en}</p>
                  <div>
                    <h3 className="text-xl font-black text-white mb-3">{v.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S4: 최고의 환경과 복지 */}
        <section className="bg-white py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Image
              src="/icons/선물.png"
              alt="복리후생"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto mb-6"
            />
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">최고의 환경과 복지</h2>

            <div className="flex flex-wrap gap-3 justify-center">
              {benefits.map((b, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 rounded-full text-sm font-bold text-gray-900"
                  style={{ backgroundColor: '#FEE500' }}
                >
                  {b.title}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* S5: 이런 사람을 원합니다 */}
        <section className="bg-gray-50 py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="inline-block border-2 border-gray-900 text-2xl md:text-3xl font-black text-gray-900 px-8 py-3 rounded-xl">
                이런 사람을 원합니다!
              </h2>
            </div>

            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {wantedPeople.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-5">
                  <span className="text-xl font-black flex-shrink-0 text-green-500">✓</span>
                  <p className="text-base md:text-lg text-gray-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S6: 모집 분야 */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="inline-block border-2 border-gray-900 text-2xl md:text-3xl font-black text-gray-900 px-8 py-3 rounded-xl">
                모집 분야
              </h2>
            </div>

            {/* PC 테이블 */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: '#FEE500' }}>
                    <th className="py-4 px-6 text-left font-black text-gray-900 w-24">모집부문</th>
                    <th className="py-4 px-6 text-left font-black text-gray-900 w-44">업무내용</th>
                    <th className="py-4 px-6 text-left font-black text-gray-900">자격요건 및 우대사항</th>
                    <th className="py-4 px-6 text-left font-black text-gray-900 w-24">모집인원</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="py-6 px-6 font-bold text-gray-900 align-top">판매사</td>
                    <td className="py-6 px-6 text-gray-700 align-top leading-relaxed">
                      고객응대, 판매,<br />매장관리, 고객관리
                    </td>
                    <td className="py-6 px-6 text-gray-700 align-top">
                      <p className="font-bold text-gray-900 mb-2">자격 요건</p>
                      <ul className="space-y-1 mb-4 text-sm">
                        <li>- 성별무관, 학력무관, 경력무관</li>
                        <li>- 서비스와 영업마인드 있으신분</li>
                      </ul>
                      <p className="font-bold text-gray-900 mb-2">우대사항</p>
                      <ul className="space-y-1 text-sm">
                        <li>- 유사업무 경험 우대</li>
                        <li>- 인근 거주 우대</li>
                        <li>- 밝은 성격을 가지신 분</li>
                        <li>- 오래 함께 하실 분</li>
                      </ul>
                    </td>
                    <td className="py-6 px-6 font-bold text-gray-900 align-top text-center">00명</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 모바일 카드 */}
            <div className="md:hidden overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 font-black text-gray-900 text-base" style={{ backgroundColor: '#FEE500' }}>
                판매사
              </div>
              <div className="p-6 space-y-5 text-sm text-gray-700">
                <div>
                  <p className="font-bold text-gray-900 mb-1">업무내용</p>
                  <p>고객응대, 판매, 매장관리, 고객관리</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">자격 요건</p>
                  <p>성별/학력/경력 무관, 서비스와 영업마인드 있으신 분</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">우대사항</p>
                  <p>유사업무 경험 / 인근 거주 / 밝은 성격 / 오래 함께할 분</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">모집인원</p>
                  <p>00명</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* S7: 전형절차 + 담당자 (다크) */}
        <section className="bg-gray-900 py-24 px-6">
          <div className="max-w-3xl mx-auto">

            {/* 지원방법 */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FEE500' }} />
                <h3 className="text-lg font-black text-white">지원방법</h3>
              </div>
              <p className="text-gray-400 pl-5 text-base">간편 문자 지원 &nbsp;/&nbsp; 전화 지원</p>
            </div>

            {/* 전형절차 */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FEE500' }} />
                <h3 className="text-lg font-black text-white">전형절차</h3>
              </div>
              <div className="flex items-center justify-center gap-3 pl-5 flex-wrap">
                {[
                  { label: '서류전형', icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FEE500' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  )},
                  { label: '1차면접', icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FEE500' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  )},
                  { label: '최종합격', icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FEE500' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )},
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                        {step.icon}
                      </div>
                      <span className="text-sm text-gray-300 font-semibold">{step.label}</span>
                    </div>
                    {i < 2 && (
                      <svg className="w-5 h-5 text-gray-600 mb-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 담당자 */}
            <div className="rounded-2xl bg-white/5 border border-white/10 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-1">담당자</p>
                <p className="text-white font-black text-xl">최준철</p>
              </div>
              <a
                href="tel:010-3775-3735"
                className="flex items-center gap-3 px-8 py-4 rounded-xl font-black text-gray-900 text-lg hover:scale-105 transition-transform"
                style={{ backgroundColor: '#FEE500' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                010-3775-3735
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
