import { Timestamp } from 'firebase/firestore';

export interface Benefit {
  id: string;
  icon: string;           // 이모지 (예: 💰, 🤝)
  title: string;
  description: string;
  order: number;          // 정렬 순서
  isActive: boolean;      // 활성화 여부
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  region: '서울' | '경기' | '인천';
  lat: number;
  lng: number;
  images: string[];       // Firebase Storage URLs
  link?: string;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OgSettings {
  title: string;
  description: string;
  image: string;          // OG 이미지 URL
  keywords: string[];
  updatedAt: Timestamp;
  updatedBy: string;      // 수정자 이메일
}

export interface PageView {
  path: string;
  timestamp: Timestamp;
  userAgent?: string;
  referrer?: string;
}
