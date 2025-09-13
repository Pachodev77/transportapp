// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwff9ZSIOE8hF3c0-kKxX7zyj8MpO0C6E",
  authDomain: "transportapp-dfd34.firebaseapp.com",
  projectId: "transportapp-dfd34",
  storageBucket: "transportapp-dfd34.appspot.com",
  messagingSenderId: "81243763076",
  appId: "1:81243763076:web:7e0e3baca62282b0476dd1",
  measurementId: "G-HQ0VQ56HPB"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

// Proveedores de autenticación
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Funciones de Firestore
const usersCollection = collection(db, 'users');
const tripsCollection = collection(db, 'trips');

// Obtener usuario por ID
export const getUser = async (userId) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
};

// Crear o actualizar usuario
export const createOrUpdateUser = async (userId, userData) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(
    userRef,
    { 
      ...userData,
      updatedAt: serverTimestamp(),
      ...(!userData.createdAt && { createdAt: serverTimestamp() })
    },
    { merge: true }
  );
  return getUser(userId);
};

// Crear un nuevo viaje
export const createTrip = async (tripData) => {
  const tripRef = doc(tripsCollection);
  const newTrip = {
    ...tripData,
    status: 'searching', // 'searching', 'in_progress', 'completed', 'cancelled'
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await setDoc(tripRef, newTrip);
  return { id: tripRef.id, ...newTrip };
};

// Obtener viajes por estado
export const getTripsByStatus = async (status) => {
  const q = query(tripsCollection, where('status', '==', status));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Actualizar estado de un viaje
export const updateTripStatus = async (tripId, status) => {
  const tripRef = doc(db, 'trips', tripId);
  await updateDoc(tripRef, {
    status,
    updatedAt: serverTimestamp()
  });
  return { id: tripId, status };
};

export default app;
