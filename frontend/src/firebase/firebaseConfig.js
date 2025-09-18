import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  setPersistence, 
  browserLocalPersistence 
} from 'firebase/auth';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "81243763076",
  appId: "1:81243763076:web:7e0e3baca62282b0476dd1",
  measurementId: "G-HQ0VQ56HPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services with persistence settings
export const auth = getAuth(app);

// Initialize Firestore with persistence settings
export const db = getFirestore(app);

// Initialize auth providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  login_hint: 'user@example.com'
});

export const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  'display': 'popup',
  'auth_type': 'reauthenticate'
});

// Export the initializePersistence function
export const initializePersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    
    // Enable multi-tab indexedDB persistence
    if (typeof window !== 'undefined') {
      try {
        await enableMultiTabIndexedDbPersistence(db);
        console.log('Firestore multi-tab persistence enabled');
        return true;
      } catch (error) {
        if (error.code === 'failed-precondition') {
          console.warn('Multi-tab persistence can only be enabled in one tab at a time.');
        } else if (error.code === 'unimplemented') {
          console.warn('The current browser does not support multi-tab persistence.');
        }
        return false;
      }
    }
    return true;
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (error.code === 'unimplemented') {
      console.warn('The current browser does not support all of the features required to enable persistence');
    }
    console.error('Persistence error:', error);
    return false;
  }
};

export default app;
