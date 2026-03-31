import { HistoryEvent, Milestone } from '@/types/content';

export const historyEvents: HistoryEvent[] = [
  {
    year: "2012",
    quarter: "창업",
    icon: "🏪",
    title: "세모폰의 시작",
    description: "경기도 부천에서 첫 매장을 시작하며, 복잡하고 불투명했던 휴대폰 구매 과정을 쉽고 명확하게 바꾸는 것을 목표로 했습니다. 단순한 판매가 아닌 '신뢰를 기반으로 고객 최우선'을 중심에 두었고, 이 철학이 지금의 세모폰을 만들었습니다.",
    stats: [
      { label: "창업 지역", value: "경기 부천" },
      { label: "운영 철학", value: "투명한 가격" }
    ]
  },
  {
    year: "성장기",
    quarter: "확장",
    icon: "📈",
    title: "더 많은 고객과의 연결",
    description: "서울·경기 지역을 중심으로 20개 이상의 매장으로 확장되며 더 많은 고객들이 세모폰을 찾기 시작했습니다. 누적 개통 고객 10만 명을 넘어 세모폰은 수도권 내 신뢰 기반 브랜드로 자리잡았습니다.",
    stats: [
      { label: "매장 수", value: "20개+" },
      { label: "누적 고객", value: "10만명+" }
    ]
  },
  {
    year: "2021",
    quarter: "도매대리점",
    icon: "📡",
    title: "LG U+ 도매대리점 6만 가입자 달성",
    description: "이동통신 유통 구조상 발생하는 불필요한 비용을 고객 혜택으로 전환하기 위해 LG U+ 본사 직영 대리점 권한을 확보했습니다. 그 결과 단 2년 만에 무선 가입자 6만 명을 달성하며, 단순 판매점을 넘어 유통 경쟁력을 갖춘 구조형 매장으로 성장했습니다.",
    stats: [
      { label: "LG U+ 가입자", value: "6만명" },
      { label: "달성 기간", value: "2년" }
    ]
  },
  {
    year: "2022",
    quarter: "도매대리점",
    icon: "🤝",
    title: "KT 도매대리점 5만 가입자 달성",
    description: "LG U+에 이어 KT 본사 직영 대리점 권한까지 확보하며 세모폰의 유통 구조는 더욱 확장되었습니다. 복수 통신사 기반 운영을 통해 고객의 사용 패턴에 맞는 최적의 선택이 가능해졌고, 한 곳에서 합리적인 조건과 상담이 가능한 환경을 구축했습니다.",
    stats: [
      { label: "KT 가입자", value: "5만명" },
      { label: "통신사 커버", value: "LGU+ · KT" }
    ]
  },
  {
    year: "확장기",
    quarter: "전역",
    icon: "🗺️",
    title: "수도권 전역으로 확장된 네트워크",
    description: "서울·인천·부천을 비롯해 분당, 광주, 용인 등 수도권 전역으로 매장이 확대되며, 어디서든 가까운 곳에서 세모폰을 만날 수 있는 환경을 갖추었습니다. 온라인과 오프라인을 연결하여 보다 편리하고 일관된 상담·구매 경험을 제공합니다.",
    stats: [
      { label: "커버 지역", value: "수도권 전역" },
      { label: "서비스", value: "온·오프라인" }
    ]
  },
  {
    year: "현재",
    quarter: "Now",
    icon: "👑",
    title: "현재, 그리고 앞으로",
    description: "현재 세모폰은 50개 이상의 매장과 함께 누적 46만 명 이상의 고객과 연결되어 있습니다. 이 성장은 단순한 규모 확대가 아닌 신뢰 기반 운영이 만들어낸 결과입니다. 앞으로도 세모폰은 누구나 편하게 방문하고, 믿고 선택할 수 있는 이동통신 시장의 기준이 되는 브랜드로 꾸준히 성장해 나가겠습니다.",
    stats: [
      { label: "매장 수", value: "50개+" },
      { label: "누적 고객", value: "46만명+" },
      { label: "고객 만족도", value: "4.8★" }
    ]
  }
];

export const milestones: Milestone[] = [
  {
    title: "단통법 폐지 대응",
    description: "업계 최초 지원금 제한 없는 자유 개통 시스템 구축",
    icon: "🔓",
    image: "/landing/banner1.png"
  },
  {
    title: "24시간 고객 지원",
    description: "개통 후에도 365일 끝까지 책임지는 사후관리",
    icon: "🛡️",
    image: "/landing/trust-support.png"
  },
  {
    title: "모바일 앱 출시",
    description: "언제 어디서나 매장 찾기, 실시간 상담 가능",
    icon: "📱",
    image: "/landing/app-icon.png"
  }
];
