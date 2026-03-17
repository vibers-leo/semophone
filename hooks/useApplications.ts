import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Application } from '@/types/firestore';

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'applications'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Application[];
          setApplications(data);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('지원서 데이터 로드 오류:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      return unsubscribe;
    } catch (err: any) {
      console.error('지원서 query 생성 오류:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const createApplication = async (data: Omit<Application, 'id' | 'createdAt' | 'reviewedAt' | 'reviewedBy' | 'notes'>) => {
    try {
      await addDoc(collection(db, 'applications'), {
        ...data,
        createdAt: Timestamp.now(),
      });
    } catch (err: any) {
      console.error('지원서 생성 오류:', err);
      throw err;
    }
  };

  const updateApplication = async (id: string, data: Partial<Application>) => {
    try {
      await updateDoc(doc(db, 'applications', id), {
        ...data,
      });
    } catch (err: any) {
      console.error('지원서 수정 오류:', err);
      throw err;
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'applications', id));
    } catch (err: any) {
      console.error('지원서 삭제 오류:', err);
      throw err;
    }
  };

  return { applications, loading, error, createApplication, updateApplication, deleteApplication };
}
