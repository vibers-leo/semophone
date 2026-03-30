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
        <section className="bg-white pt-[100px] md:pt-[120px] pb-16 md:pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

              {/* 왼쪽: 타이틀 */}
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-5">
                  Careers at 세모폰
                </p>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-6"
                  style={{ wordBreak: 'keep-all' }}
                >
                  함께 성장할<br />
                  <span className="text-brand">동료를 찾습니다</span>
                </h1>
                <p
                  className="text-base md:text-lg text-gray-500 leading-relaxed"
                  style={{ wordBreak: 'keep-all', maxWidth: '42ch' }}
                >
                  10년 이상의 업력, 수도권 50개 직영매장.<br />
                  직원이 성장하여 회사가 성장하는 곳입니다.
                </p>
              </div>

              {/* 오른쪽: 핵심 수치 카드 3개 */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  { num: '10년+', label: '안정적인 업력', sub: '2017년 창업, 꾸준한 성장' },
                  { num: '50개', label: '수도권 직영매장', sub: '서울 · 경기 · 인천' },
                  { num: '70%', label: '7년 이상 장기근속', sub: '매장 직원 100명 기준' },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="flex items-center gap-5 rounded-2xl px-6 py-5 bg-gray-50 border border-gray-100"
                  >
                    <span className="text-3xl font-black flex-shrink-0 text-gray-900">
                      {item.num}
                    </span>
                    <div>
                      <p className="text-gray-900 font-bold text-sm md:text-base">{item.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
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

        {/* S6: 모집 분야 */}
        <section className="bg-white py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Open positions</p>
              <h2
                className="text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight"
                style={{ wordBreak: 'keep-all' }}
              >
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
                        <li>- 서비스와 영업마인드 있으신 분</li>
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

        {/* S7: 채용공고 + 전형절차 — 다크 */}
        <section className="bg-[#09090b] py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">

            {/* 채용 상시공고 카드 */}
            <div
              className="rounded-3xl p-8 md:p-10 mb-16"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-block px-3 py-1.5 text-xs font-bold rounded-full text-gray-900"
                  style={{ backgroundColor: '#FEE500' }}
                >
                  상시 채용
                </span>
                <span className="text-sm text-white/40">서울 / 경기 / 인천</span>
              </div>

              <h3
                className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight tracking-tight"
                style={{ wordBreak: 'keep-all' }}
              >
                매장 직원 (상시 채용)
              </h3>

              <div className="flex items-center gap-4 mb-6 text-xs text-white/40">
                <span>매장 운영팀</span>
                <span>·</span>
                <span>정규직</span>
              </div>

              <p
                className="text-white/60 text-base leading-relaxed mb-8"
                style={{ wordBreak: 'keep-all' }}
              >
                수도권 50개 매장에서 함께 일할 열정적인 분을 찾습니다.
              </p>

              {/* 요구사항 */}
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#FEE500' }}>지원 자격</p>
                <ul className="space-y-2">
                  {['고객 응대에 능숙하신 분', '통신 업계에 관심 있으신 분', '성실하고 책임감 있으신 분'].map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                      <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#FEE500' }} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 복리후생 미니 */}
              <div className="mb-8">
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#FEE500' }}>복리후생</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['4대 보험 완비', '인센티브 제도', '교육 지원', '중식 제공'].map((b, i) => (
                    <div
                      key={i}
                      className="rounded-xl px-3 py-2.5 text-center text-xs font-semibold text-white/70"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* 접수 버튼 */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div
                  className="flex-1 text-center px-8 py-4 rounded-full text-base font-black cursor-default select-none transition-all"
                  style={{ backgroundColor: '#FEE500', color: '#09090b' }}
                >
                  접수하기
                </div>
                <div
                  className="flex-1 text-center px-8 py-4 rounded-full text-base font-black cursor-default select-none"
                  style={{ border: '2px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
                >
                  문의하기
                </div>
              </div>
            </div>

            {/* 전형절차 */}
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#FEE500' }}>
                Process
              </p>
              <h3
                className="text-xl md:text-2xl font-black text-white mb-10 tracking-tight"
                style={{ wordBreak: 'keep-all' }}
              >
                채용 전형절차
              </h3>

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

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
