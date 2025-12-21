// Firebase 설정 및 초기화
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyA9SGMnFTdKuJvld-FNWJiW278Ebz_-dwU",
  authDomain: "daizzi-20251221.firebaseapp.com",
  projectId: "daizzi-20251221",
  storageBucket: "daizzi-20251221.firebasestorage.app",
  messagingSenderId: "792524259824",
  appId: "1:792524259824:web:847bb35ba40f36bf149d35",
  measurementId: "G-360XBBHTRD"
};

// Firebase 앱 초기화 (중복 초기화 방지)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase 서비스 초기화
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Analytics는 클라이언트 사이드에서만 사용
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, auth, storage, analytics };
