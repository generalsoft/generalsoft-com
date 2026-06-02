import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const requiredConfigKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const viteEnv = import.meta.env as Record<string, string | undefined>;
const missingKeys = requiredConfigKeys.filter((key) => !viteEnv[key]);
if (missingKeys.length) {
  console.error('Missing Firebase config env vars:', missingKeys.join(', '));
}

const firebaseConfigured = requiredConfigKeys.every((key) => !!viteEnv[key]);
if (!firebaseConfigured) {
  console.error('Missing Firebase config env vars:', missingKeys.join(', '));
}

const app = firebaseConfigured ? initializeApp(firebaseConfig) : undefined;
export const db = app ? getFirestore(app) : null;
export const isFirebaseConfigured = firebaseConfigured;
