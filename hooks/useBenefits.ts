import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, Timestamp, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Benefit } from '@/types/firestore';

export function useBenefits() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'benefits'),
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Benefit[];
          setBenefits(data);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Benefits 데이터 로드 오류:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err: any) {
      console.error('Benefits query 생성 오류:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const createBenefit = async (data: Omit<Benefit, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await addDoc(collection(db, 'benefits'), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    } catch (err: any) {
      console.error('혜택 생성 오류:', err);
      throw err;
    }
  };

  const updateBenefit = async (id: string, data: Partial<Benefit>) => {
    try {
      await updateDoc(doc(db, 'benefits', id), {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (err: any) {
      console.error('혜택 수정 오류:', err);
      throw err;
    }
  };

  const deleteBenefit = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'benefits', id));
    } catch (err: any) {
      console.error('혜택 삭제 오류:', err);
      throw err;
    }
  };

  return { benefits, loading, error, createBenefit, updateBenefit, deleteBenefit };
}
