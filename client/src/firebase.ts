// Firebase v9+ modular SDK initialization and Auth helpers
// Reads config from Vite env variables (import.meta.env)
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);

export const isFirebaseConfigured = missing.length === 0;

// Initialize only if configured
const app = isFirebaseConfigured
  ? (getApps().length ? getApps()[0] : initializeApp(firebaseConfig))
  : undefined;

export const auth = isFirebaseConfigured ? getAuth(app!) : (undefined as any);
export const googleProvider = isFirebaseConfigured ? new GoogleAuthProvider() : (undefined as any);
export const onAuthChange = (cb: Parameters<typeof onAuthStateChanged>[1]) => {
  if (!isFirebaseConfigured) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        `Firebase not configured. Define VITE_FIREBASE_* in client/.env to enable Auth.`,
      );
    }
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
};
export const logout = () => {
  if (!isFirebaseConfigured) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`Firebase not configured. logout() is a no-op.`);
    }
    return Promise.resolve();
  }
  return signOut(auth);
};

export default app as any;
