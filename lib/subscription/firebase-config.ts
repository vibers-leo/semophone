/**
 * AI Recipe Firebase Configuration
 * 세모구독 기능 전용 - AI Recipe의 Firebase DB 사용
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const aiRecipeConfig = {
  apiKey: process.env.NEXT_PUBLIC_AIRECIPE_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AIRECIPE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_AIRECIPE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_AIRECIPE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_AIRECIPE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_AIRECIPE_FIREBASE_APP_ID,
};

// AI Recipe Firebase 앱 초기화 (세모구독 전용)
const aiRecipeAppName = 'airecipe-subscription';
let aiRecipeApp;

if (typeof window !== 'undefined') {
  const existingApp = getApps().find(app => app.name === aiRecipeAppName);
  aiRecipeApp = existingApp || initializeApp(aiRecipeConfig, aiRecipeAppName);
} else {
  aiRecipeApp = null;
}

// AI Recipe Firebase 서비스
export const aiRecipeAuth = aiRecipeApp ? getAuth(aiRecipeApp) : null;
export const aiRecipeDb = aiRecipeApp ? getFirestore(aiRecipeApp) : null;
export const aiRecipeStorage = aiRecipeApp ? getStorage(aiRecipeApp) : null;

export { aiRecipeApp };
