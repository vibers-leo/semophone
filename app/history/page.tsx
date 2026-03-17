import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Timeline from '@/components/sections/Timeline';
import { BentoGrid } from '@/components/layouts/BentoGrid';
import StatCard from '@/components/ui/StatCard';
import { historyEvents } from '@/data/history';

export const metadata = {
  title: '히스토리 | 세모폰',
  description: '세모폰의 성장 스토리와 주요 마일스톤을 확인하세요.'
};

export default function HistoryPage() {
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
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">히스토리</h1>
            <p className="text-lg md:text-xl text-dark/80 font-semibold">
              세모폰의 성장 스토리
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="bg-gray-50 py-24 px-3 text-center">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">숫자로 보는 세모폰</h2>
            <p className="text-gray-600 mb-12 text-lg">함께 성장한 시간들</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard value="000,000" unit="명+" label="누적 고객" useBento={false} delay={0} />
              <StatCard value="00" unit="개+" label="전국 매장" useBento={false} delay={0.1} />
              <StatCard value="0.0" unit="★" label="고객 만족도" useBento={false} delay={0.2} />
              <StatCard value="000" unit="일" label="사후관리" useBento={false} delay={0.3} />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-dark">세모폰의 성장 여정</h2>
            <Timeline events={historyEvents} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
