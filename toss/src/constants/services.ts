export type Currency = 'KRW' | 'USD' | 'JPY' | 'EUR';

export interface Plan {
  name: string;
  price: number;
  currency: Currency;
  cycle: 'monthly' | 'yearly';
}

export interface Service {
  id: string;
  name: string;
  category: string;
  color: string;
  emoji: string;
  plans: Plan[];
}

export const SERVICES: Service[] = [
  {
    id: 'netflix', name: 'Netflix', category: '영상', color: '#E50914', emoji: '🎬',
    plans: [
      { name: '광고형 스탠다드', price: 5500, currency: 'KRW', cycle: 'monthly' },
      { name: '스탠다드', price: 13500, currency: 'KRW', cycle: 'monthly' },
      { name: '프리미엄', price: 17000, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'youtube', name: 'YouTube Premium', category: '영상', color: '#FF0000', emoji: '▶️',
    plans: [
      { name: '개인', price: 14000, currency: 'KRW', cycle: 'monthly' },
      { name: '가족', price: 21000, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'spotify', name: 'Spotify', category: '음악', color: '#1DB954', emoji: '🎵',
    plans: [
      { name: 'Individual', price: 10.99, currency: 'USD', cycle: 'monthly' },
      { name: 'Duo', price: 14.99, currency: 'USD', cycle: 'monthly' },
      { name: 'Family', price: 16.99, currency: 'USD', cycle: 'monthly' },
    ],
  },
  {
    id: 'applemusic', name: 'Apple Music', category: '음악', color: '#FC3C44', emoji: '🍎',
    plans: [
      { name: '개인', price: 11000, currency: 'KRW', cycle: 'monthly' },
      { name: '가족', price: 16500, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'disneyplus', name: 'Disney+', category: '영상', color: '#0063E5', emoji: '✨',
    plans: [
      { name: '광고형', price: 9900, currency: 'KRW', cycle: 'monthly' },
      { name: '프리미엄', price: 13900, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'chatgpt', name: 'ChatGPT Plus', category: 'AI', color: '#10A37F', emoji: '🤖',
    plans: [
      { name: 'Plus', price: 20, currency: 'USD', cycle: 'monthly' },
      { name: 'Pro', price: 200, currency: 'USD', cycle: 'monthly' },
    ],
  },
  {
    id: 'claude', name: 'Claude Pro', category: 'AI', color: '#D4A574', emoji: '🧠',
    plans: [
      { name: 'Pro', price: 20, currency: 'USD', cycle: 'monthly' },
    ],
  },
  {
    id: 'coupang', name: '쿠팡 로켓와우', category: '쇼핑', color: '#FF6000', emoji: '🚀',
    plans: [
      { name: '로켓와우', price: 7890, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'watcha', name: 'Watcha', category: '영상', color: '#FF0558', emoji: '🎥',
    plans: [
      { name: '베이직', price: 7900, currency: 'KRW', cycle: 'monthly' },
      { name: '스탠다드', price: 12900, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'wavve', name: 'Wavve', category: '영상', color: '#1A4FFF', emoji: '🌊',
    plans: [
      { name: '베이직', price: 7900, currency: 'KRW', cycle: 'monthly' },
      { name: '스탠다드', price: 10900, currency: 'KRW', cycle: 'monthly' },
      { name: '프리미엄', price: 13900, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'microsoft365', name: 'Microsoft 365', category: '업무', color: '#D83B01', emoji: '📊',
    plans: [
      { name: 'Personal', price: 8900, currency: 'KRW', cycle: 'monthly' },
      { name: 'Family', price: 12000, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'adobe', name: 'Adobe Creative Cloud', category: '디자인', color: '#FF0000', emoji: '🎨',
    plans: [
      { name: '개인 전체 앱', price: 84000, currency: 'KRW', cycle: 'monthly' },
      { name: '포토그래피', price: 13200, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'notion', name: 'Notion', category: '업무', color: '#000000', emoji: '📝',
    plans: [
      { name: 'Plus', price: 10, currency: 'USD', cycle: 'monthly' },
      { name: 'Business', price: 18, currency: 'USD', cycle: 'monthly' },
    ],
  },
  {
    id: 'github', name: 'GitHub', category: '개발', color: '#24292E', emoji: '🐙',
    plans: [
      { name: 'Pro', price: 4, currency: 'USD', cycle: 'monthly' },
      { name: 'Team', price: 4, currency: 'USD', cycle: 'monthly' },
    ],
  },
  {
    id: 'figma', name: 'Figma', category: '디자인', color: '#F24E1E', emoji: '🖌️',
    plans: [
      { name: 'Professional', price: 15, currency: 'USD', cycle: 'monthly' },
    ],
  },
  {
    id: 'dropbox', name: 'Dropbox', category: '저장', color: '#0061FF', emoji: '📦',
    plans: [
      { name: 'Plus', price: 11.99, currency: 'USD', cycle: 'monthly' },
      { name: 'Professional', price: 19.99, currency: 'USD', cycle: 'monthly' },
    ],
  },
  {
    id: 'icloud', name: 'iCloud+', category: '저장', color: '#3C8EFF', emoji: '☁️',
    plans: [
      { name: '50GB', price: 1100, currency: 'KRW', cycle: 'monthly' },
      { name: '200GB', price: 3300, currency: 'KRW', cycle: 'monthly' },
      { name: '2TB', price: 11100, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'tving', name: 'TVING', category: '영상', color: '#FF153C', emoji: '📺',
    plans: [
      { name: '베이직', price: 7900, currency: 'KRW', cycle: 'monthly' },
      { name: '스탠다드', price: 10900, currency: 'KRW', cycle: 'monthly' },
      { name: '프리미엄', price: 13900, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'millie', name: '밀리의서재', category: '독서', color: '#5C6BC0', emoji: '📚',
    plans: [
      { name: '개인', price: 9900, currency: 'KRW', cycle: 'monthly' },
    ],
  },
  {
    id: 'ridibooks', name: '리디셀렉트', category: '독서', color: '#1F8CE6', emoji: '📖',
    plans: [
      { name: '셀렉트', price: 6500, currency: 'KRW', cycle: 'monthly' },
    ],
  },
];

export function searchServices(query: string): Service[] {
  if (!query.trim()) return SERVICES.slice(0, 8);
  const q = query.toLowerCase();
  return SERVICES.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q)
  );
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  KRW: '₩', USD: '$', JPY: '¥', EUR: '€',
};

export function toKRWMonthly(plan: Plan, exchange: Record<Currency, number>): number {
  const monthly = plan.cycle === 'yearly' ? plan.price / 12 : plan.price;
  return Math.round(monthly * exchange[plan.currency]);
}
