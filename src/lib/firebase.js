import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'reactchat-48876.firebaseapp.com',
  projectId: 'reactchat-48876',
  storageBucket: 'reactchat-48876.appspot.com',
  messagingSenderId: '176043196720',
  appId: '1:176043196720:web:26c13dd9f79c9d64f3c8f5',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
