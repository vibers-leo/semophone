export interface HistoryEvent {
  year: string;
  quarter?: string;
  icon: string;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
}

export interface Milestone {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: '정규직' | '계약직' | '아르바이트';
  requirements: string[];
  preferred?: string[];
  responsibilities: string[];
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}
