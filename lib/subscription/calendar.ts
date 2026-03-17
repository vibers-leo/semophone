/**
 * 캘린더 유틸리티
 * 반복되는 구독 결제일 생성 및 관리
 */

import { addMonths, startOfMonth, endOfMonth, parseISO, isSameDay, format } from 'date-fns';
import type { UserSubscription } from '@/lib/subscription/types';

export interface RecurringDate {
  date: Date;
  subscriptions: UserSubscription[];
  totalAmount: number;
}

/**
 * 특정 월에 해당하는 반복 결제일 생성
 * @param subscriptions 구독 목록
 * @param viewMonth 보고자 하는 월
 * @returns 날짜별 구독 정보 배열
 */
export function generateRecurringDates(
  subscriptions: UserSubscription[],
  viewMonth: Date
): RecurringDate[] {
  const dateMap = new Map<string, { date: Date; subscriptions: UserSubscription[]; totalAmount: number }>();

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);

  subscriptions.forEach((sub) => {
    // 평생 구독은 반복 없음
    if (sub.billing_cycle === 'lifetime') return;

    // 활성 상태가 아니면 표시하지 않음
    if (sub.status !== 'active') return;

    const renewalDate = parseISO(sub.renewal_date);
    const dayOfMonth = renewalDate.getDate();

    // 현재 보는 월의 해당 일자
    const dateInViewMonth = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth(),
      dayOfMonth
    );

    // 월의 범위 내에 있는지 확인 (예: 31일이 없는 달 처리)
    if (dateInViewMonth < monthStart || dateInViewMonth > monthEnd) {
      return;
    }

    const dateKey = format(dateInViewMonth, 'yyyy-MM-dd');

    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, {
        date: dateInViewMonth,
        subscriptions: [],
        totalAmount: 0,
      });
    }

    const data = dateMap.get(dateKey)!;
    data.subscriptions.push(sub);

    // 월간 비용 계산
    const monthlyPrice = sub.billing_cycle === 'yearly' ? sub.price / 12 : sub.price;
    data.totalAmount += monthlyPrice;
  });

  // 날짜순 정렬
  return Array.from(dateMap.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * 특정 날짜에 해당하는 구독 찾기
 * @param date 찾고자 하는 날짜
 * @param recurringDates 반복 날짜 배열
 * @returns 해당 날짜의 구독 정보
 */
export function getSubscriptionsForDate(
  date: Date,
  recurringDates: RecurringDate[]
): RecurringDate | null {
  return recurringDates.find((rd) => isSameDay(rd.date, date)) || null;
}

/**
 * 향후 N개월의 반복 날짜 생성 (분석용)
 * @param subscriptions 구독 목록
 * @param months 향후 개월 수
 * @returns 월별 반복 날짜 배열
 */
export function generateFutureRecurringDates(
  subscriptions: UserSubscription[],
  months: number = 12
): Map<string, RecurringDate[]> {
  const result = new Map<string, RecurringDate[]>();
  const today = new Date();

  for (let i = 0; i < months; i++) {
    const month = addMonths(today, i);
    const monthKey = format(month, 'yyyy-MM');
    const recurringDates = generateRecurringDates(subscriptions, month);
    result.set(monthKey, recurringDates);
  }

  return result;
}

/**
 * 월별 총 비용 계산
 * @param subscriptions 구독 목록
 * @param month 계산할 월
 * @returns 해당 월의 총 비용
 */
export function calculateMonthlyTotal(
  subscriptions: UserSubscription[],
  month: Date
): number {
  const recurringDates = generateRecurringDates(subscriptions, month);
  return recurringDates.reduce((sum, rd) => sum + rd.totalAmount, 0);
}
