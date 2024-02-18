import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'IzaSyCSsyAMUg00wfJ6wUV81anemXNDpmJvzvc',
  authDomain: 'digital-closet-24a31.firebaseapp.com',
  projectId: 'digital-closet-24a31',
  storageBucket: 'digital-closet-24a31.appspot.com',
  appId: '1:535520537510:web:9f30829e85c73fed537d67'
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage, firebaseApp };
