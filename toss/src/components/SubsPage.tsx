import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Crown, X, ChevronRight, TrendingDown, FileText, RefreshCw } from 'lucide-react';
import { IAP } from '@apps-in-toss/web-framework';
import { searchServices, toKRWMonthly, CURRENCY_SYMBOLS } from '../constants/services';
import { useExchangeRate } from '../hooks/useExchangeRate';
import type { Service, Plan, Currency } from '../constants/services';

interface Subscription {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceEmoji: string;
  serviceColor: string;
  planName: string;
  price: number;
  currency: Currency;
  cycle: 'monthly' | 'yearly';
  billingDay: number;
}

const STORAGE_KEY = 'semo_subs_v2';
const PRO_KEY = 'semo_pro_v1';

function load(): Subscription[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function save(subs: Subscription[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
}

const fmt = (n: number) => n.toLocaleString('ko-KR');

type Screen = 'dashboard' | 'search' | 'addDetail' | 'paywall' | 'report';

export default function SubsPage() {
  const [subs, setSubs] = useState<Subscription[]>(load);
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingDay, setBillingDay] = useState(1);
  const [isPro, setIsPro] = useState(() => localStorage.getItem(PRO_KEY) === 'true');
  const { rates, loading: ratesLoading } = useExchangeRate();

  const exchange = { KRW: 1, USD: rates.USD, JPY: rates.JPY, EUR: rates.EUR };

  useEffect(() => { save(subs); }, [subs]);
  useEffect(() => { localStorage.setItem(PRO_KEY, String(isPro)); }, [isPro]);

  const totalKRW = subs.reduce((s, sub) => s + toKRWMonthly(
    { price: sub.price, currency: sub.currency, cycle: sub.cycle, name: sub.planName },
    exchange
  ), 0);
  const today = new Date().getDate();

  const addSub = () => {
    if (!selectedService || !selectedPlan) return;
    if (!isPro && subs.length >= 5) { setScreen('paywall'); return; }
    setSubs(s => [...s, {
      id: Date.now().toString(),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      serviceEmoji: selectedService.emoji,
      serviceColor: selectedService.color,
      planName: selectedPlan.name,
      price: selectedPlan.price,
      currency: selectedPlan.currency,
      cycle: selectedPlan.cycle,
      billingDay,
    }]);
    setScreen('dashboard');
    setSelectedService(null);
    setSelectedPlan(null);
    setBillingDay(1);
  };

  const deleteSub = (id: string) => setSubs(s => s.filter(x => x.id !== id));

  const handleSubscribePro = () => {
    // 구독형 IAP: MONTHLY 자동갱신
    const cleanup = IAP.createSubscriptionPurchaseOrder({
      options: {
        sku: 'semo_pro_monthly', // 콘솔에 등록된 SKU
        processProductGrant: ({ orderId }) => {
          console.log('PRO 구독 완료', orderId);
          setIsPro(true);
          return true;
        },
      },
      onEvent: () => {
        setIsPro(true);
        setScreen('dashboard');
      },
      onError: (e) => {
        console.error('구독 실패', e);
      },
    });
    return cleanup;
  };

  const handleBuyReport = () => {
    // 소모성 IAP: 리포트 1회 900원
    IAP.createOneTimePurchaseOrder({
      options: {
        sku: 'semo_report_900',
        processProductGrant: ({ orderId }) => {
          console.log('리포트 구매 완료', orderId);
          setScreen('report');
          return true;
        },
      },
      onEvent: () => { setScreen('report'); },
      onError: (e) => { console.error('리포트 구매 실패', e); },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AnimatePresence mode="wait">
        {screen === 'dashboard' && (
          <Dashboard key="dash" subs={subs} total={totalKRW} today={today}
            isPro={isPro} exchange={exchange} ratesLoading={ratesLoading}
            ratesUpdatedAt={rates.updatedAt}
            onAdd={() => {
              if (!isPro && subs.length >= 5) { setScreen('paywall'); return; }
              setScreen('search');
            }}
            onDelete={deleteSub}
            onReport={() => {
              if (isPro) { setScreen('report'); return; }
              handleBuyReport();
            }}
            onPaywall={() => setScreen('paywall')}
          />
        )}
        {screen === 'search' && (
          <SearchScreen key="search"
            onSelect={s => { setSelectedService(s); setScreen('addDetail'); }}
            onBack={() => setScreen('dashboard')}
          />
        )}
        {screen === 'addDetail' && selectedService && (
          <AddDetailScreen key="detail"
            service={selectedService}
            exchange={exchange}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
            billingDay={billingDay}
            onBillingDay={setBillingDay}
            onConfirm={addSub}
            onBack={() => setScreen('search')}
          />
        )}
        {screen === 'paywall' && (
          <PaywallScreen key="paywall"
            onBack={() => setScreen('dashboard')}
            onSubscribe={handleSubscribePro}
          />
        )}
        {screen === 'report' && (
          <ReportScreen key="report"
            subs={subs} total={totalKRW} exchange={exchange}
            ratesUpdatedAt={rates.updatedAt}
            onBack={() => setScreen('dashboard')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 대시보드 ─────────────────────────────────────────────────────────────────

function Dashboard({ subs, total, today, isPro, exchange, ratesLoading, ratesUpdatedAt, onAdd, onDelete, onReport, onPaywall }: {
  subs: Subscription[]; total: number; today: number; isPro: boolean;
  exchange: Record<Currency, number>; ratesLoading: boolean; ratesUpdatedAt: string;
  onAdd: () => void; onDelete: (id: string) => void;
  onReport: () => void; onPaywall: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      <div className="bg-white px-5 pt-12 pb-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">세모구독</h1>
            <p className="text-xs text-gray-400 mt-0.5">내 구독 한눈에 보기</p>
          </div>
          {isPro && (
            <div className="flex items-center gap-1 bg-violet-100 px-2.5 py-1 rounded-full">
              <Crown size={12} className="text-violet-600" />
              <span className="text-xs font-bold text-violet-600">PRO</span>
            </div>
          )}
        </div>
        {/* 환율 정보 */}
        <div className="flex items-center gap-1.5 mt-3">
          {ratesLoading
            ? <span className="text-xs text-gray-400 flex items-center gap-1"><RefreshCw size={10} className="animate-spin" /> 환율 불러오는 중...</span>
            : <span className="text-xs text-gray-400">
                실시간 환율 · $1={fmt(exchange.USD)}원 · ¥1={exchange.JPY}원 · €1={fmt(exchange.EUR)}원
                <span className="ml-1 text-gray-300">({ratesUpdatedAt})</span>
              </span>
          }
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
        {/* 월 총액 */}
        <div className="bg-violet-600 rounded-2xl p-5 text-white">
          <p className="text-violet-300 text-sm mb-1">이번 달 구독 총액</p>
          <p className="text-4xl font-bold">{fmt(total)}원</p>
          <p className="text-violet-300 text-xs mt-2">
            {subs.length}개 서비스 · 하루 {fmt(Math.round(total / 30))}원 · 연 {fmt(total * 12)}원
          </p>
        </div>

        {/* 리포트 버튼 */}
        <button onClick={onReport}
          className="w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
            <FileText size={18} className="text-violet-500" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm">월간 구독 리포트</p>
            <p className="text-xs text-gray-400">{isPro ? '무료 열람' : '900원 · 이번 달 구독 분석'}</p>
          </div>
          <ChevronRight size={16} className="text-gray-300 shrink-0" />
        </button>

        {/* 구독 목록 */}
        {subs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-gray-500 text-sm">구독 중인 서비스를 추가해보세요</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400">구독 목록</p>
            {subs.map(sub => {
              const krw = toKRWMonthly({ price: sub.price, currency: sub.currency, cycle: sub.cycle, name: sub.planName }, exchange);
              const daysUntil = sub.billingDay >= today
                ? sub.billingDay - today
                : 30 - today + sub.billingDay;
              return (
                <motion.div key={sub.id} layout
                  className="bg-white rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ backgroundColor: sub.serviceColor + '20' }}>
                    {sub.serviceEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{sub.serviceName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{sub.planName}</span>
                      {sub.currency !== 'KRW' && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full">
                          {CURRENCY_SYMBOLS[sub.currency]}{sub.price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {daysUntil === 0 ? '⚡ 오늘 결제' : `${sub.billingDay}일 결제 · D-${daysUntil}`}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900 text-sm">{fmt(krw)}원</p>
                    <p className="text-xs text-gray-400">/월</p>
                  </div>
                  <button onClick={() => onDelete(sub.id)} className="ml-1 p-1.5 text-gray-300 hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {!isPro && subs.length >= 5 && (
          <button onClick={onPaywall}
            className="w-full bg-violet-50 border border-violet-200 rounded-2xl p-3 text-center"
          >
            <p className="text-sm text-violet-700 font-semibold">
              <Crown size={14} className="inline mr-1" />
              PRO로 업그레이드하면 무제한 추가 가능
            </p>
          </button>
        )}
      </div>

      <div className="px-5 pb-8">
        <motion.button whileTap={{ scale: 0.97 }} onClick={onAdd}
          className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2"
          style={{ backgroundColor: '#8B5CF6' }}
        >
          <Plus size={18} />
          구독 추가하기
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── 검색 ─────────────────────────────────────────────────────────────────────

function SearchScreen({ onSelect, onBack }: { onSelect: (s: Service) => void; onBack: () => void }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('전체');
  const categories = ['전체', '영상', '음악', 'AI', '업무', '디자인', '저장', '쇼핑', '독서'];
  const results = searchServices(query);
  const filtered = cat === '전체' ? results : results.filter(s => s.category === cat);

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="flex flex-col min-h-screen"
    >
      <div className="bg-white px-5 pt-12 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack}><X size={20} className="text-gray-500" /></button>
          <h2 className="text-base font-bold text-gray-900">구독 서비스 검색</h2>
        </div>
        <input autoFocus type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Netflix, Spotify, ChatGPT..."
          className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-300"
        />
      </div>
      <div className="bg-white px-5 py-2 border-b border-gray-100 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                cat === c ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >{c}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 px-5 py-4 space-y-2 overflow-y-auto">
        {filtered.length === 0 && <p className="text-center text-gray-400 text-sm py-10">검색 결과가 없어요</p>}
        {filtered.map(s => (
          <motion.button key={s.id} whileTap={{ scale: 0.98 }} onClick={() => onSelect(s)}
            className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm text-left"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ backgroundColor: s.color + '20' }}>{s.emoji}</div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">{s.name}</p>
              <p className="text-xs text-gray-400">{s.category} · {s.plans.length}개 요금제</p>
            </div>
            <ChevronRight size={16} className="text-gray-300 shrink-0" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── 상세 추가 ────────────────────────────────────────────────────────────────

function AddDetailScreen({ service, exchange, selectedPlan, onSelectPlan, billingDay, onBillingDay, onConfirm, onBack }: {
  service: Service; exchange: Record<Currency, number>;
  selectedPlan: Plan | null; onSelectPlan: (p: Plan) => void;
  billingDay: number; onBillingDay: (d: number) => void;
  onConfirm: () => void; onBack: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="flex flex-col min-h-screen"
    >
      <div className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onBack} className="mb-3"><X size={20} className="text-gray-500" /></button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: service.color + '20' }}>{service.emoji}</div>
          <div>
            <h2 className="font-bold text-gray-900">{service.name}</h2>
            <p className="text-xs text-gray-400">{service.category}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 px-5 py-5 space-y-5 overflow-y-auto">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">요금제 선택</p>
          <div className="space-y-2">
            {service.plans.map(p => {
              const selected = selectedPlan?.name === p.name;
              const krw = toKRWMonthly(p, exchange);
              return (
                <button key={p.name} onClick={() => onSelectPlan(p)}
                  className={`w-full rounded-2xl px-4 py-3.5 flex items-center justify-between transition-colors border-2 ${
                    selected ? 'border-violet-500 bg-violet-50' : 'border-gray-100 bg-white'
                  }`}
                >
                  <div className="text-left">
                    <p className={`font-bold text-sm ${selected ? 'text-violet-700' : 'text-gray-900'}`}>{p.name}</p>
                    {p.currency !== 'KRW' && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {CURRENCY_SYMBOLS[p.currency]}{p.price}/{p.cycle === 'monthly' ? '월' : '년'}
                        {p.cycle === 'yearly' && ` · 월 환산 ${fmt(krw)}원`}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-bold ${selected ? 'text-violet-700' : 'text-gray-900'}`}>
                      {p.currency === 'KRW' ? `${fmt(p.price)}원` : `≈ ${fmt(krw)}원`}
                    </p>
                    <p className="text-xs text-gray-400">/월</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">매월 결제일</p>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <span className="text-sm text-gray-600">매월</span>
            <div className="flex items-center gap-4">
              <button onClick={() => onBillingDay(Math.max(1, billingDay - 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">−</button>
              <span className="text-xl font-bold text-gray-900 w-8 text-center">{billingDay}</span>
              <button onClick={() => onBillingDay(Math.min(28, billingDay + 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">+</button>
            </div>
            <span className="text-sm text-gray-600">일</span>
          </div>
        </div>
      </div>
      <div className="px-5 pb-8">
        <motion.button whileTap={{ scale: 0.97 }} onClick={onConfirm} disabled={!selectedPlan}
          className="w-full py-4 rounded-2xl text-white font-bold text-base disabled:opacity-40"
          style={{ backgroundColor: '#8B5CF6' }}
        >추가하기</motion.button>
      </div>
    </motion.div>
  );
}

// ─── 월간 리포트 ──────────────────────────────────────────────────────────────

function ReportScreen({ subs, total, exchange, ratesUpdatedAt, onBack }: {
  subs: Subscription[]; total: number; exchange: Record<Currency, number>;
  ratesUpdatedAt: string; onBack: () => void;
}) {
  const thisMonth = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
  const foreignSubs = subs.filter(s => s.currency !== 'KRW');
  const foreignLoss = foreignSubs.reduce((acc, s) => {
    const krw = toKRWMonthly({ price: s.price, currency: s.currency, cycle: s.cycle, name: s.planName }, exchange);
    // 기준 환율(1400) 대비 손실
    const baseKrw = toKRWMonthly({ price: s.price, currency: s.currency, cycle: s.cycle, name: s.planName }, { KRW: 1, USD: 1400, JPY: 9.5, EUR: 1520 });
    return acc + (krw - baseKrw);
  }, 0);

  const sorted = [...subs].sort((a, b) => {
    const aKrw = toKRWMonthly({ price: a.price, currency: a.currency, cycle: a.cycle, name: a.planName }, exchange);
    const bKrw = toKRWMonthly({ price: b.price, currency: b.currency, cycle: b.cycle, name: b.planName }, exchange);
    return bKrw - aKrw;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="flex flex-col min-h-screen"
    >
      <div className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <button onClick={onBack} className="mb-3"><X size={20} className="text-gray-500" /></button>
        <h2 className="text-xl font-bold text-gray-900">{thisMonth} 리포트</h2>
        <p className="text-xs text-gray-400 mt-0.5">환율 기준: {ratesUpdatedAt}</p>
      </div>

      <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
        {/* 총액 */}
        <div className="bg-violet-600 rounded-2xl p-5 text-white">
          <p className="text-violet-300 text-sm mb-1">이번 달 총 구독료</p>
          <p className="text-4xl font-bold">{fmt(total)}원</p>
          <div className="flex gap-4 mt-3">
            <div>
              <p className="text-violet-300 text-xs">하루 환산</p>
              <p className="font-bold text-sm">{fmt(Math.round(total / 30))}원</p>
            </div>
            <div>
              <p className="text-violet-300 text-xs">연간 환산</p>
              <p className="font-bold text-sm">{fmt(total * 12)}원</p>
            </div>
            <div>
              <p className="text-violet-300 text-xs">서비스 수</p>
              <p className="font-bold text-sm">{subs.length}개</p>
            </div>
          </div>
        </div>

        {/* 외화 환율 손실 */}
        {foreignSubs.length > 0 && (
          <div className={`rounded-2xl p-4 flex items-start gap-3 ${foreignLoss > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
            <TrendingDown size={18} className={foreignLoss > 0 ? 'text-red-500 shrink-0 mt-0.5' : 'text-green-500 shrink-0 mt-0.5'} />
            <div>
              <p className={`font-bold text-sm ${foreignLoss > 0 ? 'text-red-700' : 'text-green-700'}`}>
                외화 결제 {foreignLoss > 0 ? `${fmt(foreignLoss)}원 추가 부담` : '환율 이득 중'}
              </p>
              <p className={`text-xs mt-0.5 ${foreignLoss > 0 ? 'text-red-500' : 'text-green-500'}`}>
                기준 환율($1=1,400원) 대비 현재 환율 기준
              </p>
            </div>
          </div>
        )}

        {/* TOP 구독 */}
        <div>
          <p className="text-xs font-semibold text-gray-400 mb-2">지출 순위</p>
          <div className="space-y-2">
            {sorted.map((sub, i) => {
              const krw = toKRWMonthly({ price: sub.price, currency: sub.currency, cycle: sub.cycle, name: sub.planName }, exchange);
              const pct = total > 0 ? Math.round((krw / total) * 100) : 0;
              return (
                <div key={sub.id} className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                  <span className={`text-sm font-bold w-5 text-center ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : 'text-orange-400'}`}>
                    {i + 1}
                  </span>
                  <span className="text-lg shrink-0">{sub.serviceEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{sub.serviceName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-violet-400" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{pct}%</span>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-sm shrink-0">{fmt(krw)}원</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 절약 팁 */}
        {sorted.length > 0 && (
          <div className="bg-amber-50 rounded-2xl p-4">
            <p className="font-bold text-amber-800 text-sm mb-1">💡 절약 팁</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              가장 비싼 <strong>{sorted[0].serviceName}</strong>을 연간 결제로 전환하면
              보통 1~2개월치를 절약할 수 있어요. 연간 약 <strong>{fmt(toKRWMonthly({ price: sorted[0].price, currency: sorted[0].currency, cycle: sorted[0].cycle, name: sorted[0].planName }, exchange) * 2)}원</strong> 절약 가능.
            </p>
          </div>
        )}
      </div>

      <div className="px-5 pb-8">
        <button onClick={onBack}
          className="w-full py-4 rounded-2xl font-bold text-base text-white"
          style={{ backgroundColor: '#8B5CF6' }}
        >확인</button>
      </div>
    </motion.div>
  );
}

// ─── 페이월 ───────────────────────────────────────────────────────────────────

function PaywallScreen({ onBack, onSubscribe }: { onBack: () => void; onSubscribe: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
      className="flex flex-col min-h-screen"
    >
      <div className="px-5 pt-12"><button onClick={onBack}><X size={20} className="text-gray-500" /></button></div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <Crown size={56} className="text-violet-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">세모구독 PRO</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          구독 5개 초과 · 월간 리포트 무제한<br />
          모든 기능을 마음껏 사용하세요
        </p>
        <div className="w-full bg-violet-50 border-2 border-violet-400 rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <p className="font-bold text-violet-900">월간 자동 갱신</p>
              <p className="text-xs text-violet-600 mt-0.5">App Store / Google Play · 언제든 해지 가능</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-violet-700">2,900원</p>
              <p className="text-xs text-violet-500">/월 · 하루 97원</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 w-full text-left text-sm text-gray-500">
          {['✓ 구독 무제한 추가', '✓ 월간 리포트 무제한', '✓ 외화 환율 손실 분석', '✓ 절약 팁 제공'].map(f => (
            <p key={f}>{f}</p>
          ))}
        </div>
      </div>
      <div className="px-5 pb-8 space-y-2">
        <motion.button whileTap={{ scale: 0.97 }} onClick={onSubscribe}
          className="w-full py-4 rounded-2xl text-white font-bold text-base"
          style={{ backgroundColor: '#8B5CF6' }}
        >월 2,900원으로 시작하기</motion.button>
        <button onClick={onBack} className="w-full py-3 text-sm text-gray-400">나중에 할게요</button>
      </div>
    </motion.div>
  );
}
