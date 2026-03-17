/**
 * Subscription Types
 */

export type PaymentMethodType =
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay'
  | 'kakao_pay'
  | 'naver_pay'
  | 'toss'
  | 'other';

export interface PaymentMethod {
  type: PaymentMethodType;
  card_last4?: string;
  bank_name?: string;
  account_holder?: string;
  memo?: string;
}

export interface ServicePlan {
  id: string;
  service_name: string;
  plan_name: string;
  tier_level?: number;
  country_code: string;
  currency: string;
  price_monthly?: number;
  price_yearly?: number;
  price_note?: string;
  features: string[];
  limits?: Record<string, any>;
  website_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  service_plan_id?: string | null;
  custom_service_name?: string | null;
  custom_plan_name?: string | null;
  billing_cycle: 'monthly' | 'yearly' | 'lifetime';
  price: number;
  currency: string;
  start_date: string;
  renewal_date: string;
  end_date?: string | null;
  status: 'active' | 'cancelled' | 'paused' | 'expired';
  notification_enabled: boolean;
  notification_days_before: number;
  notes?: string | null;
  tags?: string[] | null;
  payment_method?: PaymentMethod | null;
  created_at: string;
  updated_at: string;
  service_plan?: ServicePlan | null;
}

export interface SubscriptionStats {
  totalMonthly: number;
  totalYearly: number;
  activeCount: number;
  nextRenewal?: string | null;
}

export interface CurrencyTotal {
  currency: string;
  monthly: number;
  yearly: number;
  count: number;
}

export interface EnhancedSubscriptionStats extends SubscriptionStats {
  byCurrency: CurrencyTotal[];
  dominantCurrency: string;
}

export interface SubscriptionFormData {
  service_plan_id?: string;
  custom_service_name?: string;
  custom_plan_name?: string;
  billing_cycle: 'monthly' | 'yearly' | 'lifetime';
  price: number;
  currency: string;
  start_date: string;
  renewal_date: string;
  status?: 'active' | 'cancelled' | 'paused' | 'expired';
  notes?: string;
  payment_method?: PaymentMethod;
}

/**
 * 서비스 제보 시스템
 */
export type ServiceRequestStatus = 'pending' | 'approved' | 'rejected';

export interface ServiceRequest {
  id: string;
  service_name: string;
  plan_name?: string;
  price_monthly?: number;
  price_yearly?: number;
  currency: string;
  country_code: string;
  website_url?: string;
  description?: string;
  category?: string;

  // 제보자 정보
  submitted_by_uid: string;
  submitted_by_email?: string;

  // 상태 관리
  status: ServiceRequestStatus;
  rejection_reason?: string;

  // 타임스탬프
  created_at: string;
  updated_at: string;
  reviewed_at?: string;
  reviewed_by_uid?: string;
}
