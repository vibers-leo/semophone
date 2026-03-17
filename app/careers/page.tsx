import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BentoGrid } from '@/components/layouts/BentoGrid';
import BenefitCard from '@/components/ui/BenefitCard';
import JobsSection from '@/components/sections/JobsSection';
import ApplicationSection from '@/components/sections/ApplicationSection';
import { benefits, cultureValues } from '@/data/careers';

export const metadata = {
  title: '채용정보 | 세모폰',
  description: '세모폰과 함께 성장할 인재를 찾습니다.'
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main style={{ isolation: 'isolate', position: 'relative', zIndex: 0 }}>
        {/* Hero */}
        <section
          className="relative h-[40vh] min-h-[320px] max-h-[480px] overflow-hidden mt-[56px] md:mt-[72px]"
          style={{
            background: 'linear-gradient(135deg, #FEE500 0%, #FDD835 50%, #FEE500 100%)',
          }}
        >
          <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">채용정보</h1>
            <p className="text-lg md:text-xl text-dark/80 font-semibold">
              세모폰과 함께하세요
            </p>
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

        {/* 채용공고 (Firestore 연동) */}
        <JobsSection />

        {/* 지원 방법 (지원서 제출 폼) */}
        <ApplicationSection />
      </main>
      <Footer />
    </>
  );
}
