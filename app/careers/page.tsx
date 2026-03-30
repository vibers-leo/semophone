import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { benefits } from '@/data/careers';
import CareersApplySection from '@/components/sections/CareersApplySection';

export const metadata = {
  title: '채용정보 | 세모폰',
  description: '세모폰과 함께 성장할 인재를 찾습니다.'
};

const coreValues = [
  {
    en: 'Teamwork',
    icon: '/icons/사람들2.png',
    title: '함께의 가치',
    description: '더 나은 아이디어를 만들기 위해 각 팀과 적극적으로 협업합니다. 혼자 빠른 것보다 함께 멀리 가는 것을 우선합니다.',
  },
  {
    en: 'Flexible thinking',
    icon: '/icons/나침반.png',
    title: '유연한 사고',
    description: '열린 자세로 다양한 의견을 받아들이고, 문제를 여러 각도에서 분석합니다. 변화를 두려워하지 않고 능동적으로 대처합니다.',
  },
  {
    en: 'Moral behavior',
    icon: '/icons/보안.png',
    title: '투명한 행동',
    description: '기본 윤리의식과 원칙을 바탕으로 투명하고 공정하게 업무를 처리합니다. 서로 신뢰할 수 있는 문화를 만들어 갑니다.',
  },
];

const wantedPeople = [
  { num: '01', text: '성실하고 긍정적인 마인드의 소유자' },
  { num: '02', text: '약속을 잘 지키고 본인의 역할을 충실히 수행하시는 분' },
  { num: '03', text: '어떠한 난관에도 효율적으로 문제를 해결하시는 분' },
  { num: '04', text: '협업과 소통능력이 뛰어나신 분' },
];

const timeline = [
  { year: '2017', label: '창업' },
  { year: '2018', label: '10개 매장' },
  { year: '2019', label: '30개 매장' },
  { year: '2020', label: '40개 매장' },
  { year: '2026', label: '50개 매장' },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>

        {/* S1: Hero */}
        <section className="bg-white pt-[100px] md:pt-[120px] pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            {/* 아이콘 + 타이틀 (about/history 패턴) */}
            <div className="flex items-start gap-4 mb-10">
              <Image
                src="/icons/사람들2.png"
                alt="채용정보"
                width={96}
                height={96}
                className="w-20 h-20 md:w-24 md:h-24 object-contain flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Careers at 세모폰</p>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2" style={{ wordBreak: 'keep-all' }}>채용정보</h1>
                <p className="text-base md:text-lg text-gray-600" style={{ wordBreak: 'keep-all' }}>
                  함께 성장할 동료를 찾습니다
                </p>
              </div>
            </div>

            {/* 핵심 수치 3개 */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                { num: '10년+', label: '안정적인 업력', sub: '2017년 창업, 꾸준한 성장' },
                { num: '50개', label: '수도권 직영매장', sub: '서울 · 경기 · 인천' },
                { num: '70%', label: '7년 이상 장기근속', sub: '매장 직원 100명 기준' },
              ].map((item) => (
                <div
                  key={item.num}
                  className="rounded-2xl px-4 md:px-6 py-4 md:py-5 bg-gray-50 border border-gray-100"
                >
                  <p className="text-2xl md:text-3xl font-black text-gray-900">{item.num}</p>
                  <p className="text-gray-900 font-bold text-xs md:text-sm mt-1">{item.label}</p>
                  <p className="text-gray-400 text-xs mt-0.5 hidden sm:block">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S2: 우리 회사는요? */}
        <section className="bg-gray-50 py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">

            {/* 대형 인용구 — 카드 없이 타이포그래피로만 */}
            <div className="mb-14">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">About us</p>
              <div className="relative pl-6 border-l-4" style={{ borderColor: '#FEE500' }}>
                <p
                  className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight"
                  style={{ wordBreak: 'keep-all' }}
                >
                  직원이 성장하여,<br />회사가 성장한다
                </p>
              </div>
            </div>

            {/* 강조 배지 */}
            <div className="mb-12">
              <span
                className="inline-block px-5 py-2.5 rounded-full text-sm font-bold text-gray-900"
                style={{ backgroundColor: '#FEE500' }}
              >
                매장 직원 100명 중 70명이 7년 이상 근무하는 이유
              </span>
            </div>

            {/* 본문 */}
            <div
              className="space-y-5 text-gray-600 leading-relaxed text-base md:text-lg mb-14"
              style={{ wordBreak: 'keep-all', maxWidth: '65ch' }}
            >
              <p>
                세모폰은 인천, 경기, 서울 지역에서 약 50개 직영매장을 운영하는
                10년 이상 업력의 안정적인 회사입니다.
              </p>
              <p>
                단순한 매장 운영을 넘어 직원과 회사가 함께 성장하는 것을 가장 중요하게 생각합니다.
                경력직은 업계 최고 수준의 보수를, 신입도 체계적인 교육으로 빠르게 성장할 수 있습니다.
              </p>
              <p className="font-semibold text-gray-900">
                통신업이 처음이어도 괜찮습니다. 배우려는 의지만 있다면 누구나 시작할 수 있습니다.
              </p>
            </div>

            {/* 타임라인 */}
            <div className="flex items-end gap-0 overflow-x-auto pb-2">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">{item.label}</span>
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: '#FEE500' }}
                    />
                    <span className="text-sm font-black text-gray-900">{item.year}</span>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-12 md:w-20 h-px bg-gray-300 mb-[2px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S3: 핵심가치 — 다크, 글래스 카드 */}
        <section className="bg-[#09090b] py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#FEE500' }}>Our Values</p>
            <h2
              className="text-3xl md:text-4xl font-black text-white mb-14 leading-tight tracking-tight"
              style={{ wordBreak: 'keep-all' }}
            >
              우리는 이렇게 일합니다
            </h2>

            <div className="space-y-4">
              {coreValues.map((v, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5 md:gap-10 items-start"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-3">
                    <Image
                      src={v.icon}
                      alt={v.en}
                      width={36}
                      height={36}
                      className="w-8 h-8 object-contain flex-shrink-0"
                    />
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#FEE500' }}>
                      {v.en}
                    </p>
                  </div>
                  <div>
                    <h3
                      className="text-lg md:text-xl font-black text-white mb-2 tracking-tight"
                      style={{ wordBreak: 'keep-all' }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="text-white/50 leading-relaxed text-sm md:text-base"
                      style={{ wordBreak: 'keep-all' }}
                    >
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S4: 복리후생 */}
        <section className="bg-white py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Image
              src="/icons/선물.png"
              alt="복리후생"
              width={64}
              height={64}
              className="w-14 h-14 object-contain mx-auto mb-5"
            />
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">
              Benefits
            </p>
            <h2
              className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight tracking-tight"
              style={{ wordBreak: 'keep-all' }}
            >
              최고의 환경과 복지
            </h2>
            <p className="text-gray-500 text-sm mb-12">업계 최고 수준의 근무 환경을 제공합니다</p>

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

        {/* S5: 인재상 — 넘버드 카드 그리드 */}
        <section className="bg-gray-50 py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Who we want</p>
              <h2
                className="text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight"
                style={{ wordBreak: 'keep-all' }}
              >
                이런 사람을 찾습니다
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wantedPeople.map((item) => (
                <div
                  key={item.num}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4 items-start"
                >
                  <span
                    className="text-2xl font-black flex-shrink-0 leading-none mt-0.5"
                    style={{ color: '#FEE500' }}
                  >
                    {item.num}
                  </span>
                  <p
                    className="text-base font-semibold text-gray-800 leading-snug"
                    style={{ wordBreak: 'keep-all' }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S6: 모집 분야 + 접수 (client component — 모달 포함) */}
        <CareersApplySection />

        {/* S7: 채용 전형절차 */}
        <section className="bg-[#09090b] py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#FEE500' }}>
              Process
            </p>
            <h2
              className="text-2xl md:text-3xl font-black text-white mb-10 tracking-tight"
              style={{ wordBreak: 'keep-all' }}
            >
              채용 전형절차
            </h2>

            {/* 지원방법 */}
            <div className="flex gap-4 mb-10 flex-wrap">
              {['간편 문자 지원', '전화 지원'].map((method, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full px-5 py-2.5"
                  style={{ background: 'rgba(254,229,0,0.1)', border: '1px solid rgba(254,229,0,0.2)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FEE500' }} />
                  <span className="text-sm font-bold" style={{ color: '#FEE500' }}>{method}</span>
                </div>
              ))}
            </div>

            {/* 3단계 */}
            <div className="flex items-center gap-3 flex-wrap">
              {[
                {
                  label: '서류전형',
                  svg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FEE500' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                },
                {
                  label: '1차 면접',
                  svg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FEE500' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                },
                {
                  label: '최종 합격',
                  svg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FEE500' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-2.5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {step.svg}
                    </div>
                    <span className="text-xs font-bold text-white/60">{step.label}</span>
                  </div>
                  {i < 2 && (
                    <svg className="w-4 h-4 mb-5 flex-shrink-0 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs text-white/30">
              지원서는 접수 후 검토하여 개별 연락드립니다.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
