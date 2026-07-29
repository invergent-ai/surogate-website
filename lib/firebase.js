import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// NEXT_PUBLIC_* vars are inlined into the static export at build time, same
// pattern as lib/analytics.js. Firebase web config is not a secret; access is
// controlled by Firestore security rules, not by hiding these values. Override
// via .env.local for a different project (e.g. staging).
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDDaNSFZZHptEsbZ9qSp6JSYmLnWq0Q2ZM',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'surogate-launch.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'surogate-launch',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'surogate-launch.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '102756966081',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:102756966081:web:08294a2f26edd15934be40',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Opt-in local testing: set NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true in
// .env.local to point the app at `firebase emulators:start` instead of live
// Firebase - lets you test signups + the counter without a real project.
let emulatorConnected = false;
if (
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' &&
  !emulatorConnected
) {
  connectFirestoreEmulator(db, 'localhost', 8090);
  emulatorConnected = true;
}
