/**
 * Client-side Firestore Functions for Subscriptions
 * Direct Firestore access from client components
 * Security is enforced by Firestore Security Rules
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/config';

import type {
  ServicePlan,
  UserSubscription,
  SubscriptionStats,
  EnhancedSubscriptionStats,
  CurrencyTotal,
  PaymentMethod,
} from '@/lib/subscription/types';
import { getExchangeRates, convertCurrency } from '@/lib/subscription/exchange-rate';

/**
 * Get current user's subscriptions
 */
export async function getUserSubscriptions(): Promise<UserSubscription[]> {
  const user = auth?.currentUser;
  if (!user) {
    console.warn('[Subscriptions] No user logged in');
    return [];
  }

  try {
    const subscriptionsRef = collection(db!, 'users', user.uid, 'subscriptions');
    const q = query(subscriptionsRef, orderBy('renewal_date', 'asc'));
    const snapshot = await getDocs(q);

    const subscriptions: UserSubscription[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      // If service_plan_id exists, fetch the plan details
      let servicePlan = null;
      if (data.service_plan_id) {
        const planRef = doc(db!, 'servicePlans', data.service_plan_id);
        const planSnap = await getDoc(planRef);
        if (planSnap.exists()) {
          servicePlan = { id: planSnap.id, ...planSnap.data() };
        }
      }

      subscriptions.push({
        id: docSnap.id,
        ...data,
        // Convert Firestore Timestamps to strings for JSON serialization
        start_date: data.start_date?.toDate?.().toISOString() || data.start_date,
        renewal_date: data.renewal_date?.toDate?.().toISOString() || data.renewal_date,
        end_date: data.end_date?.toDate?.().toISOString() || data.end_date,
        created_at: data.created_at?.toDate?.().toISOString() || data.created_at,
        updated_at: data.updated_at?.toDate?.().toISOString() || data.updated_at,
        service_plan: servicePlan,
      } as UserSubscription);
    }

    return subscriptions;
  } catch (error) {
    console.error('[Subscriptions] Get error:', error);
    throw error;
  }
}

/**
 * Get subscription statistics with currency breakdown and exchange rate conversion
 */
export async function getSubscriptionStats(): Promise<EnhancedSubscriptionStats> {
  const subscriptions = await getUserSubscriptions();
  const activeSubscriptions = subscriptions.filter((s) => s.status === 'active');

  // Fetch exchange rates
  const rates = await getExchangeRates();

  // Group by currency
  const currencyMap = new Map<string, { monthly: number; yearly: number; count: number }>();

  activeSubscriptions.forEach((sub) => {
    const curr = sub.currency || 'KRW';

    if (!currencyMap.has(curr)) {
      currencyMap.set(curr, { monthly: 0, yearly: 0, count: 0 });
    }

    const data = currencyMap.get(curr)!;
    const monthlyPrice = sub.billing_cycle === 'yearly' ? sub.price / 12 : sub.price;
    const yearlyPrice = sub.billing_cycle === 'yearly' ? sub.price : sub.price * 12;

    data.monthly += monthlyPrice;
    data.yearly += yearlyPrice;
    data.count += 1;
  });

  // Convert to array
  const byCurrency: CurrencyTotal[] = Array.from(currencyMap.entries()).map(
    ([currency, data]) => ({
      currency,
      monthly: data.monthly,
      yearly: data.yearly,
      count: data.count,
    })
  );

  // Find dominant currency (most subscriptions)
  const dominantCurrency =
    byCurrency.sort((a, b) => b.count - a.count)[0]?.currency || 'KRW';

  // Calculate totals with exchange rate conversion to KRW
  const totalMonthly = byCurrency.reduce((sum, c) => {
    const inKRW = convertCurrency(c.monthly, c.currency, 'KRW', rates);
    return sum + inKRW;
  }, 0);

  const totalYearly = byCurrency.reduce((sum, c) => {
    const inKRW = convertCurrency(c.yearly, c.currency, 'KRW', rates);
    return sum + inKRW;
  }, 0);

  // Next renewal date
  const nextRenewal = activeSubscriptions[0]?.renewal_date || null;

  return {
    totalMonthly,
    totalYearly,
    activeCount: activeSubscriptions.length,
    nextRenewal,
    byCurrency,
    dominantCurrency,
  };
}

/**
 * Create a new subscription
 */
export async function createSubscription(data: {
  service_plan_id?: string;
  custom_service_name?: string;
  custom_plan_name?: string;
  billing_cycle: string;
  price: number;
  currency: string;
  start_date: string;
  renewal_date: string;
  end_date?: string;
  notes?: string;
  tags?: string[];
  payment_method?: PaymentMethod;
}) {
  const user = auth?.currentUser;
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const subscriptionData = {
      service_plan_id: data.service_plan_id || null,
      custom_service_name: data.custom_service_name || null,
      custom_plan_name: data.custom_plan_name || null,
      billing_cycle: data.billing_cycle,
      price: data.price,
      currency: data.currency,
      start_date: Timestamp.fromDate(new Date(data.start_date)),
      renewal_date: Timestamp.fromDate(new Date(data.renewal_date)),
      end_date: data.end_date ? Timestamp.fromDate(new Date(data.end_date)) : null,
      status: 'active',
      notification_enabled: true,
      notification_days_before: 7,
      notes: data.notes || null,
      tags: data.tags || [],
      payment_method: data.payment_method || null,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const subscriptionsRef = collection(db!, 'users', user.uid, 'subscriptions');
    const docRef = await addDoc(subscriptionsRef, subscriptionData);

    console.log('[Subscriptions] Created:', docRef.id);
    return { id: docRef.id, ...subscriptionData };
  } catch (error) {
    console.error('[Subscriptions] Create error:', error);
    throw error;
  }
}

/**
 * Update a subscription
 */
export async function updateSubscription(
  id: string,
  data: Partial<{
    custom_service_name: string;
    custom_plan_name: string;
    billing_cycle: string;
    price: number;
    currency: string;
    renewal_date: string;
    status: string;
    notes: string;
    payment_method: PaymentMethod;
  }>
) {
  const user = auth?.currentUser;
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const updateData: any = {
      ...data,
      updated_at: Timestamp.now(),
    };

    // Convert date string to Timestamp
    if (data.renewal_date) {
      updateData.renewal_date = Timestamp.fromDate(new Date(data.renewal_date));
    }

    const subscriptionRef = doc(db!, 'users', user.uid, 'subscriptions', id);
    await updateDoc(subscriptionRef, updateData);

    console.log('[Subscriptions] Updated:', id);
  } catch (error) {
    console.error('[Subscriptions] Update error:', error);
    throw error;
  }
}

/**
 * Delete a subscription
 */
export async function deleteSubscription(id: string) {
  const user = auth?.currentUser;
  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const subscriptionRef = doc(db!, 'users', user.uid, 'subscriptions', id);
    await deleteDoc(subscriptionRef);

    console.log('[Subscriptions] Deleted:', id);
  } catch (error) {
    console.error('[Subscriptions] Delete error:', error);
    throw error;
  }
}

/**
 * Get all active service plans
 */
export async function getServicePlans(): Promise<ServicePlan[]> {
  try {
    const servicePlansRef = collection(db!, 'servicePlans');
    const q = query(
      servicePlansRef,
      where('is_active', '==', true),
      orderBy('service_name', 'asc')
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
      created_at: docSnap.data().created_at?.toDate?.().toISOString(),
      updated_at: docSnap.data().updated_at?.toDate?.().toISOString(),
    })) as ServicePlan[];
  } catch (error) {
    console.error('[Subscriptions] Get service plans error:', error);
    throw error;
  }
}
