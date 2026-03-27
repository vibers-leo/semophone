import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  storeName?: string;
  status: string;
  workflowStatus?: string;
  notes?: InquiryNote[];
  createdAt: any;
  updatedAt?: any;
}

export interface InquiryNote {
  id: string;
  content: string;
  tag?: string;
  createdAt: string;
  createdBy: string;
}

const WORKFLOW_STEPS = [
  { status: 'received', label: '문의 접수', color: 'bg-gray-500' },
  { status: 'first_call', label: '1차 유선 상담', color: 'bg-blue-500' },
  { status: 'kakao_progress', label: '상세 안내', color: 'bg-green-500' },
  { status: 'signup_order', label: '견적 / 계약', color: 'bg-purple-500' },
  { status: 'payment_received', label: '입금 확인', color: 'bg-yellow-500' },
  { status: 'in_progress', label: '진행 중', color: 'bg-orange-500' },
  { status: 'review', label: '중간 확인', color: 'bg-pink-500' },
  { status: 'completed', label: '완료', color: 'bg-teal-500' },
  { status: 'subscription_active', label: '관리 중', color: 'bg-indigo-500' },
];

export { WORKFLOW_STEPS };

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'contacts'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as Inquiry[];
          setInquiries(data);
          setLoading(false);
        },
        (err) => {
          console.error('문의 데이터 로드 오류:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const updateInquiry = async (id: string, data: Partial<Inquiry>) => {
    await updateDoc(doc(db, 'contacts', id), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  };

  const deleteInquiry = async (id: string) => {
    await deleteDoc(doc(db, 'contacts', id));
  };

  return { inquiries, loading, error, updateInquiry, deleteInquiry };
}
