import { Timestamp } from 'firebase/firestore';

export interface Benefit {
  id: string;
  icon: string;           // 이모지 (예: 💰, 🤝)
  title: string;
  description: string;
  bannerImage?: string;   // 배너 이미지 URL (선택)
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

export interface JobOpening {
  id: string;
  title: string;              // 직무명
  department?: string;         // 부서 (선택)
  location: string;            // 근무지
  type: '정규직' | '계약직' | '아르바이트';  // 고용형태
  requirements: string[];      // 자격요건
  preferred: string[];         // 우대사항
  responsibilities: string[];  // 담당업무
  isActive: boolean;           // 활성화 여부
  order: number;               // 정렬 순서
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Application {
  id: string;
  name: string;               // 지원자 이름
  email: string;              // 이메일
  phone: string;              // 연락처
  position: string;           // 지원 직무
  resumeUrl: string;          // 이력서 파일 URL
  coverLetter?: string;       // 자기소개서 (선택)
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';  // 지원 상태
  createdAt: Timestamp;       // 제출일
  reviewedAt?: Timestamp;     // 검토일
  reviewedBy?: string;        // 검토자 이메일
  notes?: string;             // 관리자 메모
}
