import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, Timestamp, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { JobOpening } from '@/types/firestore';

export function useJobs() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'jobOpenings'),
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as JobOpening[];
          setJobs(data);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('채용공고 데이터 로드 오류:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err: any) {
      console.error('채용공고 query 생성 오류:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const createJob = async (data: Omit<JobOpening, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await addDoc(collection(db, 'jobOpenings'), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    } catch (err: any) {
      console.error('채용공고 생성 오류:', err);
      throw err;
    }
  };

  const updateJob = async (id: string, data: Partial<JobOpening>) => {
    try {
      await updateDoc(doc(db, 'jobOpenings', id), {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (err: any) {
      console.error('채용공고 수정 오류:', err);
      throw err;
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'jobOpenings', id));
    } catch (err: any) {
      console.error('채용공고 삭제 오류:', err);
      throw err;
    }
  };

  return { jobs, loading, error, createJob, updateJob, deleteJob };
}
