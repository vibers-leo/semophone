/**
 * 절약 팁 엔진
 * 사용자 구독을 분석하여 비용 절감 방안 제안
 */

import type { UserSubscription, ServicePlan } from '@/lib/subscription/types';

export type TipType =
  | 'annual_discount'    // 연간 결제 할인
  | 'duplicate'          // 중복 구독 감지
  | 'alternative'        // 대체 서비스 제안
  | 'unused'             // 미사용 가능성
  | 'price_increase';    // 가격 인상 감지

export interface SavingTip {
  id: string;
  type: TipType;
  priority: number;        // 1-10, 높을수록 중요
  title: string;
  description: string;
  potentialSavings: number; // 원화 기준 절감액
  actionUrl?: string;       // 행동 유도 링크
  relatedSubscriptionIds: string[];
  metadata?: {
    monthlyToYearly?: { monthly: number; yearly: number };
    duplicates?: string[];
    alternative?: { name: string; price: number };
  };
}

/**
 * 절약 팁 생성 메인 함수
 */
export async function generateSavingsTips(
  subscriptions: UserSubscription[],
  servicePlans: ServicePlan[]
): Promise<SavingTip[]> {
  const tips: SavingTip[] = [];
  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');

  // Rule 1: 연간 결제 할인 감지
  tips.push(...detectAnnualDiscounts(activeSubscriptions, servicePlans));

  // Rule 2: 중복 서비스 감지
  tips.push(...detectDuplicateServices(activeSubscriptions));

  // Rule 3: 대체 서비스 제안
  tips.push(...suggestAlternatives(activeSubscriptions, servicePlans));

  // Rule 4: 가격 인상 감지 (향후 구현)
  // tips.push(...detectPriceIncreases(activeSubscriptions, servicePlans));

  // 우선순위 및 절감액 기준 정렬
  return tips.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // 우선순위 높은 것 먼저
    }
    return b.potentialSavings - a.potentialSavings; // 절감액 큰 것 먼저
  });
}

/**
 * Rule 1: 연간 결제 할인 감지
 * 월간 구독 중 연간 결제 시 절감 가능한 경우 감지
 */
function detectAnnualDiscounts(
  subscriptions: UserSubscription[],
  servicePlans: ServicePlan[]
): SavingTip[] {
  const tips: SavingTip[] = [];

  subscriptions
    .filter(sub => sub.billing_cycle === 'monthly' && sub.service_plan_id)
    .forEach(sub => {
      const plan = servicePlans.find(p => p.id === sub.service_plan_id);

      if (plan && plan.price_yearly) {
        const monthlyTotal = sub.price * 12;
        const savings = monthlyTotal - plan.price_yearly;

        // 10% 이상 절감 가능할 때만 팁 생성
        if (savings > monthlyTotal * 0.1) {
          const serviceName = sub.custom_service_name || plan.service_name;

          tips.push({
            id: `annual-${sub.id}`,
            type: 'annual_discount',
            priority: 8,
            title: `${serviceName} 연간 결제로 ${Math.round(savings).toLocaleString()}원 절약`,
            description: `월간 결제 대신 연간 결제를 선택하면 1년에 ${Math.round(savings).toLocaleString()}원을 절약할 수 있어요. (약 ${Math.round((savings / monthlyTotal) * 100)}% 할인)`,
            potentialSavings: savings,
            relatedSubscriptionIds: [sub.id],
            metadata: {
              monthlyToYearly: {
                monthly: monthlyTotal,
                yearly: plan.price_yearly,
              },
            },
          });
        }
      }
    });

  return tips;
}

/**
 * Rule 2: 중복 서비스 감지
 * 유사한 기능을 제공하는 서비스 중복 구독 감지
 */
function detectDuplicateServices(subscriptions: UserSubscription[]): SavingTip[] {
  const tips: SavingTip[] = [];

  // 서비스 카테고리 매핑 (실제로는 DB에서 관리하는 게 좋음)
  const categoryMap: { [key: string]: string[] } = {
    'OTT': ['Netflix', 'Disney', 'Wavve', 'Tving', 'YouTube Premium'],
    '음악 스트리밍': ['Spotify', 'Apple Music', 'YouTube Music', 'Melon'],
    '클라우드 스토리지': ['Google Drive', 'Dropbox', 'iCloud', 'OneDrive'],
    '생산성': ['Notion', 'Evernote', 'Obsidian', 'Roam Research'],
  };

  // 카테고리별 그룹화
  Object.entries(categoryMap).forEach(([category, serviceNames]) => {
    const duplicates = subscriptions.filter(sub => {
      const name = sub.custom_service_name || sub.service_plan?.service_name || '';
      return serviceNames.some(serviceName =>
        name.toLowerCase().includes(serviceName.toLowerCase())
      );
    });

    if (duplicates.length > 1) {
      // 가장 비싼 것과 가장 저렴한 것 찾기
      const sortedByPrice = [...duplicates].sort((a, b) => {
        const priceA = a.billing_cycle === 'yearly' ? a.price / 12 : a.price;
        const priceB = b.billing_cycle === 'yearly' ? b.price / 12 : b.price;
        return priceB - priceA;
      });

      const mostExpensive = sortedByPrice[0];
      const leastExpensive = sortedByPrice[sortedByPrice.length - 1];

      const monthlyPriceExpensive = mostExpensive.billing_cycle === 'yearly'
        ? mostExpensive.price / 12
        : mostExpensive.price;

      const monthlyPriceCheap = leastExpensive.billing_cycle === 'yearly'
        ? leastExpensive.price / 12
        : leastExpensive.price;

      const monthlySavings = monthlyPriceExpensive - monthlyPriceCheap;
      const yearlySavings = monthlySavings * 12;

      tips.push({
        id: `duplicate-${category}`,
        type: 'duplicate',
        priority: 9, // 높은 우선순위
        title: `${category} 서비스 중복 구독 감지`,
        description: `${duplicates.map(d => d.custom_service_name || d.service_plan?.service_name).join(', ')} 서비스를 모두 구독 중이에요. 하나만 선택하면 연간 최대 ${Math.round(yearlySavings).toLocaleString()}원을 절약할 수 있어요.`,
        potentialSavings: yearlySavings,
        relatedSubscriptionIds: duplicates.map(d => d.id),
        metadata: {
          duplicates: duplicates.map(d => d.custom_service_name || d.service_plan?.service_name || ''),
        },
      });
    }
  });

  return tips;
}

/**
 * Rule 3: 대체 서비스 제안
 * 더 저렴하거나 비슷한 기능의 대체 서비스 제안
 */
function suggestAlternatives(
  subscriptions: UserSubscription[],
  servicePlans: ServicePlan[]
): SavingTip[] {
  const tips: SavingTip[] = [];

  // 대체 서비스 매핑 (실제로는 DB에서 관리)
  const alternatives: { [key: string]: { name: string; reason: string; planId?: string }[] } = {
    'Netflix Premium': [
      { name: 'Netflix Standard', reason: '화질만 다르고 기능 동일' },
    ],
    'Spotify Premium': [
      { name: 'YouTube Music Premium', reason: 'YouTube Premium 포함' },
    ],
  };

  subscriptions.forEach(sub => {
    const serviceName = sub.custom_service_name || sub.service_plan?.plan_name || '';
    const alts = alternatives[serviceName];

    if (alts && alts.length > 0) {
      alts.forEach(alt => {
        // 대체 서비스 플랜 찾기
        const altPlan = servicePlans.find(p =>
          p.service_name.includes(alt.name) || p.plan_name.includes(alt.name)
        );

        if (altPlan && altPlan.price_monthly) {
          const currentMonthly = sub.billing_cycle === 'yearly' ? sub.price / 12 : sub.price;
          const savings = currentMonthly - altPlan.price_monthly;

          if (savings > 0) {
            tips.push({
              id: `alternative-${sub.id}-${altPlan.id}`,
              type: 'alternative',
              priority: 6,
              title: `${alt.name}으로 변경하여 절약`,
              description: `${serviceName} 대신 ${alt.name}을 사용하면 월 ${Math.round(savings).toLocaleString()}원 (연간 ${Math.round(savings * 12).toLocaleString()}원)을 절약할 수 있어요. ${alt.reason}`,
              potentialSavings: savings * 12,
              relatedSubscriptionIds: [sub.id],
              metadata: {
                alternative: {
                  name: alt.name,
                  price: altPlan.price_monthly,
                },
              },
            });
          }
        }
      });
    }
  });

  return tips;
}

/**
 * 총 절감 가능 금액 계산
 */
export function calculateTotalSavings(tips: SavingTip[]): number {
  // 중복 구독 팁과 대체 서비스 팁은 동시에 적용 불가하므로
  // 각 카테고리에서 최대값만 합산
  const byType = tips.reduce((acc, tip) => {
    if (!acc[tip.type]) {
      acc[tip.type] = [];
    }
    acc[tip.type].push(tip);
    return acc;
  }, {} as { [key: string]: SavingTip[] });

  let total = 0;

  // 연간 할인: 모두 합산 가능
  total += (byType.annual_discount || []).reduce((sum, t) => sum + t.potentialSavings, 0);

  // 중복 구독: 각 카테고리에서 최대값
  total += (byType.duplicate || []).reduce((sum, t) => sum + t.potentialSavings, 0);

  // 대체 서비스: 최대값만 (여러 개 동시 적용 불가)
  const altMax = Math.max(0, ...(byType.alternative || []).map(t => t.potentialSavings));
  total += altMax;

  return total;
}

/**
 * 팁 우선순위별 그룹화
 */
export function groupTipsByPriority(tips: SavingTip[]): {
  high: SavingTip[];
  medium: SavingTip[];
  low: SavingTip[];
} {
  return {
    high: tips.filter(t => t.priority >= 8),
    medium: tips.filter(t => t.priority >= 5 && t.priority < 8),
    low: tips.filter(t => t.priority < 5),
  };
}
