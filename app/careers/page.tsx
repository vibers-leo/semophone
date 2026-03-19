import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { BentoGrid } from '@/components/layouts/BentoGrid';
import BenefitCard from '@/components/ui/BenefitCard';
import JobsSection from '@/components/sections/JobsSection';
import { benefits, cultureValues, coreValues, hiringProcess } from '@/data/careers';

export const metadata = {
  title: '채용정보 | 세모폰',
  description: '세모폰과 함께 성장할 인재를 찾습니다.'
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
        {/* Hero */}
        <section className="bg-white pt-[100px] md:pt-[120px] pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-4">
              <Image
                src="/icons/사람들2.png"
                alt="채용정보"
                width={64}
                height={64}
                className="w-14 h-14 md:w-16 md:h-16 object-contain flex-shrink-0"
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

        {/* 핵심 가치 */}
        <section className="bg-white py-24 px-3">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">핵심 가치</h2>
              <p className="text-gray-600">세모폰이 추구하는 4가지 핵심 가치</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 mb-6 mx-auto">
                    <img src={value.icon} alt={value.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3 text-center">{value.title}</h3>
                  <p className="text-sm text-gray-600 text-center leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 회사 문화 */}
        <section className="bg-gray-50 py-24 px-3 text-center">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">회사 문화</h2>
            <p className="text-gray-600 mb-12">성장을 응원하는 문화</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cultureValues.map((culture, i) => (
                <BenefitCard
                  key={i}
                  icon={culture.icon}
                  title={culture.title}
                  description={culture.description}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 복리후생 */}
        <section className="bg-white py-24 px-3 text-center">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">복리후생</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <BenefitCard
                  key={i}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 채용 프로세스 */}
        <section className="bg-gray-50 py-24 px-3">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                채용 프로세스
              </h2>
              <p className="text-gray-600">투명하고 공정한 채용 절차</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {hiringProcess.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-black text-black">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  {i < hiringProcess.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-300" style={{ transform: 'translateX(50%)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 채용공고 (Firestore 연동) */}
        <JobsSection />
      </main>
      <Footer />
    </>
  );
}
