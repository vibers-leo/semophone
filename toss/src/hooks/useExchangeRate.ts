import { useState, useEffect } from 'react';

export interface ExchangeRates {
  USD: number; // KRW per 1 USD
  JPY: number; // KRW per 1 JPY
  EUR: number; // KRW per 1 EUR
  updatedAt: string;
}

const CACHE_KEY = 'semo_exchange_v1';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24시간

function loadCache(): ExchangeRates | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch { return null; }
}

function saveCache(data: ExchangeRates) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
}

// 폴백 환율 (캐시/API 없을 때) - 매일 수동 업데이트 예정
const FALLBACK: ExchangeRates = {
  USD: 1530, JPY: 10.2, EUR: 1660,
  updatedAt: '기본값 (오늘 환율 반영 전)',
};

export function useExchangeRate() {
  const [rates, setRates] = useState<ExchangeRates>(loadCache() ?? FALLBACK);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loadCache()) return; // 캐시 있으면 스킵

    setLoading(true);
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(r => r.json())
      .then(data => {
        if (data.result !== 'success') throw new Error('API error');
        const krwPerUsd = data.rates.KRW;
        const jpyPerUsd = data.rates.JPY;
        const eurPerUsd = data.rates.EUR;

        const fresh: ExchangeRates = {
          USD: Math.round(krwPerUsd),
          JPY: Math.round((krwPerUsd / jpyPerUsd) * 10) / 10,
          EUR: Math.round(krwPerUsd / eurPerUsd),
          updatedAt: new Date(data.time_last_update_utc).toLocaleString('ko-KR', {
            month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
          }),
        };
        saveCache(fresh);
        setRates(fresh);
      })
      .catch(() => {
        // 실패 시 캐시 또는 폴백 유지
      })
      .finally(() => setLoading(false));
  }, []);

  return { rates, loading };
}
