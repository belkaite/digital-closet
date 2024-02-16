import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage, firebaseApp };
