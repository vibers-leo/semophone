import { HistoryEvent, Milestone } from '@/types/content';

export const historyEvents: HistoryEvent[] = [
  {
    year: "2012",
    quarter: "창업",
    icon: "/icons/store_1.png",
    title: "세모폰의 시작",
    description: "부천의 5평 남짓한 매장에서 시작\n복잡하고 불투명했던 휴대폰 구매 과정을\n더 쉽고 명확한 기준을 바탕으로 바꿔왔습니다.",
    stats: [
      { label: "창업 지역", value: "경기 부천" },
      { label: "운영 철학", value: "투명한 가격" }
    ]
  },
  {
    year: "2017",
    quarter: "확장",
    icon: "/icons/chart_2.png",
    title: "더 많은 고객과의 연결",
    description: "더 많은 고객에게 다가가기 위해\n부천·서울·인천을 중심으로 매장을 확장\n누적 고객 10만명이 증명한 신뢰를 쌓아왔습니다",
    stats: [
      { label: "매장 수", value: "20개+" },
      { label: "누적 고객", value: "10만명+" }
    ]
  },
  {
    year: "2021",
    quarter: "U+ 도매대리점",
    icon: "/icons/semophone_basic.png",
    title: "U+ 도매대리점 6만 가입자 달성",
    description: "U+ 본사 직영 대리점 계약 체결\n불필요한 비용을 고객 혜택으로 전환,\n유통 경쟁력을 갖춘 구조형 매장으로 성장했습니다.",
    stats: [
      { label: "U+ 가입자", value: "6만명" },
      { label: "달성 기간", value: "2년" }
    ]
  },
  {
    year: "2022",
    quarter: "KT 도매대리점",
    icon: "/icons/partnership.png",
    title: "KT 도매대리점 5만 가입자 달성",
    description: "KT 본사 직영 대리점 계약 체결\n수도권내 최단기간 5만 가입자 달성\n복수 통신사 직영 대리점 권한을 바탕으로\n합리적인 조건 제공이 가능한 환경을 구축했습니다.",
    stats: [
      { label: "KT 가입자", value: "5만명" },
      { label: "통신사 커버", value: "LGU+ · KT" }
    ]
  },
  {
    year: "2023",
    quarter: "네트워크 확장",
    icon: "/icons/map_empty.png",
    title: "수도권 전역 및 온라인으로 확장된 네트워크",
    description: "분당·광주·용인 등 수도권 전역으로 매장 확대\n어디서든 세모폰을 만날 수 있는 환경을 구축했고,\n온라인 채널 강화를 통해 편리하고 일괄된 구매 경험을 제공했습니다.",
    stats: [
      { label: "커버 지역", value: "수도권 전역" },
      { label: "서비스", value: "온·오프라인" }
    ]
  },
  {
    year: "2026",
    quarter: "현재",
    icon: "/icons/celebration.png",
    title: "50개 이상의 직영점 · 46만명의 누적 고객",
    description: "단순 규모 확장 중심의 브랜드가 아닌\n투명성과 신뢰를 기준으로 한 이통통신 시장의 새로운 기준이 되었습니다.\n앞으로도 세모폰의 기준을 시장 전반으로 확장하여 더 많은 고객에게 전달해 나가겠습니다.",
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
    icon: "/icons/security_lock.png",
    image: "/landing/banner1.png"
  },
  {
    title: "24시간 고객 지원",
    description: "개통 후에도 365일 끝까지 책임지는 사후관리",
    icon: "/icons/shield_empty.png",
    image: "/landing/trust-support.png"
  },
  {
    title: "모바일 앱 출시",
    description: "언제 어디서나 매장 찾기, 실시간 상담 가능",
    icon: "/icons/phone_hand.png",
    image: "/landing/app-icon.png"
  }
];
