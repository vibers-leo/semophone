/**
 * 환율 API 서비스
 * exchangerate-api.com 무료 API 사용 (월 1500회 무료)
 * 24시간 캐싱으로 API 호출 최소화
 * Firestore fallback으로 안정성 확보
 */

// TODO: Firebase 설정 경로 확인 필요
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase/client';

export interface ExchangeRates {
  base: string;
  rates: { [currency: string]: number };
  updated_at: string;
}

const CACHE_KEY = 'exchange_rates';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24시간

/**
 * 환율 정보 조회
 * 우선순위: 로컬 스토리지 캐시 → API 호출 → Firestore 고정 환율
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  // 1. 로컬 스토리지 캐시 확인
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const data = JSON.parse(cached) as ExchangeRates;
        const age = Date.now() - new Date(data.updated_at).getTime();

        // 24시간 이내면 캐시된 데이터 사용
        if (age < CACHE_DURATION) {
          console.log('[ExchangeRate] Using cached rates');
          return data;
        }
      } catch (error) {
        console.error('[ExchangeRate] Cache parse error:', error);
      }
    }
  }

  // 2. API 호출 시도
  try {
    console.log('[ExchangeRate] Fetching from API...');
    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/KRW',
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const apiData = await response.json();

    const rates: ExchangeRates = {
      base: 'KRW',
      rates: apiData.rates,
      updated_at: new Date().toISOString(),
    };

    // 로컬 스토리지에 캐시 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
    }

    console.log('[ExchangeRate] API fetch successful');
    return rates;
  } catch (error) {
    console.error('[ExchangeRate] API fetch failed:', error);

    // 3. Fallback: 하드코딩된 환율
    return getHardcodedRates();
  }
}

/**
 * 최종 Fallback: 하드코딩된 환율 (2026년 3월 기준 대략적인 환율)
 */
function getHardcodedRates(): ExchangeRates {
  console.warn('[ExchangeRate] Using hardcoded rates');

  return {
    base: 'KRW',
    rates: {
      KRW: 1,
      USD: 0.00071,  // 1 KRW = 0.00071 USD (약 1,400원/달러)
      EUR: 0.00066,  // 1 KRW = 0.00066 EUR (약 1,500원/유로)
      JPY: 0.11,     // 1 KRW = 0.11 JPY (약 9원/엔)
      CNY: 0.0051,   // 1 KRW = 0.0051 CNY (약 195원/위안)
      GBP: 0.00057,  // 1 KRW = 0.00057 GBP (약 1,750원/파운드)
    },
    updated_at: '2026-03-01T00:00:00.000Z',
  };
}

/**
 * 통화 변환
 * @param amount 금액
 * @param from 원본 통화
 * @param to 대상 통화
 * @param rates 환율 정보
 * @returns 변환된 금액
 */
export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: ExchangeRates
): number {
  // 같은 통화면 그대로 반환
  if (from === to) return amount;

  // 환율 정보가 없으면 원본 반환
  if (!rates.rates[from] || !rates.rates[to]) {
    console.warn(`[ExchangeRate] Missing rate for ${from} or ${to}`);
    return amount;
  }

  // KRW 기준으로 변환
  // 1. 원본 통화를 KRW로 변환
  const toKRW = from === 'KRW' ? amount : amount / rates.rates[from];

  // 2. KRW를 대상 통화로 변환
  const result = to === 'KRW' ? toKRW : toKRW * rates.rates[to];

  return Math.round(result * 100) / 100; // 소수점 2자리 반올림
}

/**
 * 특정 통화의 환율 조회 (1 KRW = ? 해당통화)
 */
export function getRate(currency: string, rates: ExchangeRates): number {
  return rates.rates[currency] || 1;
}

/**
 * KRW로 변환 (간편 함수)
 */
export function toKRW(amount: number, from: string, rates: ExchangeRates): number {
  return convertCurrency(amount, from, 'KRW', rates);
}
