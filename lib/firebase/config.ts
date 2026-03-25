import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ''
};

// Firebase 앱 초기화 (클라이언트 사이드에서만)
let app: FirebaseApp | undefined;

if (typeof window !== 'undefined') {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

// 안전한 export (타입 단언 사용)
// 클라이언트 컴포넌트에서만 사용되므로 항상 초기화됨
export const auth = (typeof window !== 'undefined' && app ? getAuth(app) : null) as Auth;
export const db = (typeof window !== 'undefined' && app ? getFirestore(app) : null) as Firestore;
export const storage = (typeof window !== 'undefined' && app ? getStorage(app) : null) as FirebaseStorage;
export const analytics: Analytics | null = typeof window !== 'undefined' && app ? getAnalytics(app) : null;
