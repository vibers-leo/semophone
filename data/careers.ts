import { JobOpening, Benefit } from '@/types/content';

export const benefits: Benefit[] = [
  {
    icon: "/icons/보안.png",
    title: "4대 보험 완비",
    description: "국민연금, 건강보험, 고용보험, 산재보험"
  },
  {
    icon: "/icons/시계.png",
    title: "유연 근무제",
    description: "출퇴근 시간 자율 조정 가능"
  },
  {
    icon: "/icons/카드.png",
    title: "점심 식대 지원",
    description: "월 15만원 식대 지원"
  },
  {
    icon: "/icons/캘린더.png",
    title: "연차/휴가",
    description: "법정 연차 + 리프레시 휴가"
  },
  {
    icon: "/icons/연필, 작성.png",
    title: "교육비 지원",
    description: "직무 관련 교육 100% 지원"
  },
  {
    icon: "/icons/태그, 할인.png",
    title: "성과급",
    description: "분기별 실적 기반 인센티브"
  }
];

export const jobOpenings: JobOpening[] = [
  {
    id: "job-001",
    title: "매장 매니저",
    location: "서울 강남구",
    type: "정규직",
    requirements: [
      "유통/서비스업 경력 2년 이상",
      "고객 응대 능력 우수자",
      "팀 리더십 경험자"
    ],
    preferred: [
      "통신 업계 경력자 우대",
      "매장 운영 경험자 우대"
    ],
    responsibilities: [
      "매장 운영 관리 및 매출 목표 달성",
      "직원 교육 및 관리",
      "고객 상담 및 불만 처리"
    ]
  },
  {
    id: "job-002",
    title: "고객 상담사",
    location: "서울 강남구, 경기 수원시",
    type: "정규직",
    requirements: [
      "고객 응대 경험 1년 이상",
      "원활한 의사소통 능력",
      "기본적인 PC 활용 능력"
    ],
    preferred: [
      "통신 상품 지식 보유자",
      "친절하고 밝은 성격"
    ],
    responsibilities: [
      "고객 상담 및 개통 업무",
      "요금제 안내 및 상담",
      "사후관리 및 고객 만족도 관리"
    ]
  },
  {
    id: "job-003",
    title: "마케팅 담당자",
    location: "서울 강남구 (본사)",
    type: "정규직",
    requirements: [
      "마케팅 경력 3년 이상",
      "디지털 마케팅 경험 필수",
      "데이터 분석 능력"
    ],
    preferred: [
      "SNS 마케팅 경험자",
      "광고 캠페인 기획 경험자"
    ],
    responsibilities: [
      "온/오프라인 마케팅 전략 수립",
      "SNS 채널 운영 및 콘텐츠 기획",
      "광고 효과 분석 및 개선"
    ]
  }
];

export const cultureValues = [
  {
    icon: "/icons/채팅, 고객센터.png",
    title: "수평적 소통",
    description: "직급에 관계없이 자유로운 의견 공유"
  },
  {
    icon: "/icons/시계.png",
    title: "워라밸 보장",
    description: "정시 퇴근 문화, 주말/공휴일 휴무"
  },
  {
    icon: "/icons/차트.png",
    title: "성과 중심",
    description: "능력과 성과로 평가하는 공정한 시스템"
  }
];

export const coreValues = [
  {
    icon: "/icons/나침반.png",
    title: "혁신 Innovation",
    description: "기존의 틀을 깨고 새로운 가치를 창출합니다"
  },
  {
    icon: "/icons/사람들2.png",
    title: "존중 Respect",
    description: "모든 구성원의 의견을 경청하고 존중합니다"
  },
  {
    icon: "/icons/보안.png",
    title: "투명성 Transparency",
    description: "모든 프로세스를 투명하게 공개합니다"
  },
  {
    icon: "/icons/선물.png",
    title: "성장 Growth",
    description: "개인과 조직의 지속적인 성장을 추구합니다"
  }
];

export const hiringProcess = [
  {
    step: "01",
    title: "지원서 접수",
    description: "온라인 지원서 제출"
  },
  {
    step: "02",
    title: "서류 전형",
    description: "지원서 검토 후 통보"
  },
  {
    step: "03",
    title: "실무 면접",
    description: "직무 역량 평가"
  },
  {
    step: "04",
    title: "최종 합격",
    description: "처우 협의 및 입사"
  }
];
