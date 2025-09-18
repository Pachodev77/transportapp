import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  setPersistence,
  browserLocalPersistence
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
  arrayRemove,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  writeBatch,
  getDocsFromServer,
  getDocsFromCache,
  enableIndexedDbPersistence
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with error handling
export const auth = getAuth(app);

// Enable offline persistence
export const enablePersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    await enableIndexedDbPersistence(db, { 
      forceOwnership: true 
    });
    console.log('Firestore persistence enabled');
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (error.code === 'unimplemented') {
      console.warn('The current browser does not support all of the features required to enable persistence');
    }
    console.error('Persistence error:', error);
  }
};

export const db = getFirestore(app);

// Initialize providers with additional scopes if needed
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

// Firestore collections
export const usersCollection = collection(db, 'users');
export const tripsCollection = collection(db, 'trips');
export const bookingsCollection = collection(db, 'bookings');

// Rate limiting
const RATE_LIMIT_MS = 1000; // 1 request per second
let lastRequestTime = 0;

const checkRateLimit = () => {
  const now = Date.now();
  if (now - lastRequestTime < RATE_LIMIT_MS) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  lastRequestTime = now;
};

/**
 * Get user by ID with optional field selection
 * @param {string} userId - User ID
 * @param {string[]} fields - Optional array of field paths to return
 * @returns {Promise<Object|null>} User data or null if not found
 */
export const getUser = async (userId, fields = []) => {
  try {
    checkRateLimit();
    const userRef = doc(db, 'users', userId);
    let userDoc;
    
    // Try cache first
    try {
      userDoc = await getDocFromCache(userRef);
    } catch (error) {
      // If not in cache, get from server
      userDoc = await getDoc(userRef);
    }
    
    if (!userDoc.exists()) return null;
    
    const userData = userDoc.data();
    // Filter fields if specified
    if (fields.length > 0) {
      return fields.reduce((acc, field) => {
        if (userData[field] !== undefined) {
          acc[field] = userData[field];
        }
        return acc;
      }, { id: userDoc.id });
    }
    
    return { id: userDoc.id, ...userData };
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

/**
 * Create or update user data
 * @param {string} userId - User ID
 * @param {Object} userData - User data to save
 * @param {boolean} merge - Whether to merge with existing data (default: true)
 * @returns {Promise<Object>} Updated user data
 */
export const createOrUpdateUser = async (userId, userData, merge = true) => {
  try {
    checkRateLimit();
    const userRef = doc(db, 'users', userId);
    const now = serverTimestamp();
    const dataToSave = {
      ...userData,
      updatedAt: now,
      ...(!userData.createdAt && { createdAt: now })
    };
    
    await setDoc(userRef, dataToSave, { merge });
    return { id: userId, ...dataToSave };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Create a new trip
 * @param {Object} tripData - Trip data
 * @returns {Promise<Object>} Created trip with ID
 */
export const createTrip = async (tripData) => {
  try {
    checkRateLimit();
    const tripRef = doc(tripsCollection);
    const now = serverTimestamp();
    const newTrip = {
      ...tripData,
      status: 'searching',
      createdAt: now,
      updatedAt: now,
    };
    
    await setDoc(tripRef, newTrip);
    return { id: tripRef.id, ...newTrip };
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

/**
 * Get trips by status with pagination
 * @param {string} status - Trip status to filter by
 * @param {Object} options - Options object
 * @param {number} options.limit - Number of items per page (default: 10)
 * @param {DocumentSnapshot} options.lastDoc - Last document for pagination
 * @param {string[]} options.fields - Fields to return (empty for all)
 * @returns {Promise<{trips: Array, lastDoc: DocumentSnapshot}>}
 */
export const getTripsByStatus = async (status, { 
  limit: pageSize = 10, 
  lastDoc = null,
  fields = []
} = {}) => {
  try {
    checkRateLimit();
    let q = query(
      tripsCollection,
      where('status', '==', status),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    // Try cache first, then server
    let querySnapshot;
    try {
      querySnapshot = await getDocsFromCache(q);
      if (querySnapshot.empty) {
        throw new Error('No cached data');
      }
    } catch (error) {
      querySnapshot = await getDocs(q);
    }

    const trips = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Filter fields if specified
      if (fields.length > 0) {
        return {
          id: doc.id,
          ...fields.reduce((acc, field) => {
            if (data[field] !== undefined) {
              acc[field] = data[field];
            }
            return acc;
          }, {})
        };
      }
      return { id: doc.id, ...data };
    });

    return {
      trips,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null
    };
  } catch (error) {
    console.error('Error getting trips:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time updates for trips
 * @param {string} status - Trip status to subscribe to
 * @param {Function} callback - Callback function for updates
 * @param {string[]} fields - Fields to include in updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToTrips = (status, callback, fields = []) => {
  try {
    const q = query(
      tripsCollection,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const trips = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Filter fields if specified
        if (fields.length > 0) {
          return {
            id: doc.id,
            ...fields.reduce((acc, field) => {
              if (data[field] !== undefined) {
                acc[field] = data[field];
              }
              return acc;
            }, {})
          };
        }
        return { id: doc.id, ...data };
      });
      callback(trips);
    });
  } catch (error) {
    console.error('Error subscribing to trips:', error);
    throw error;
  }
};

/**
 * Update trip status
 * @param {string} tripId - Trip ID
 * @param {string} status - New status
 * @param {Object} additionalData - Additional fields to update
 * @returns {Promise<Object>} Updated trip data
 */
export const updateTripStatus = async (tripId, status, additionalData = {}) => {
  try {
    checkRateLimit();
    const tripRef = doc(db, 'trips', tripId);
    const updateData = {
      status,
      updatedAt: serverTimestamp(),
      ...additionalData
    };
    
    await updateDoc(tripRef, updateData);
    return { id: tripId, ...updateData };
  } catch (error) {
    console.error('Error updating trip status:', error);
    throw error;
  }
};

/**
 * Batch update multiple trips
 * @param {Array<{tripId: string, updates: Object}>} tripUpdates - Array of trip updates
 * @returns {Promise<{success: boolean, updatedCount: number}>}
 */
export const batchUpdateTrips = async (tripUpdates) => {
  try {
    checkRateLimit();
    const batch = writeBatch(db);
    const now = serverTimestamp();
    
    tripUpdates.forEach(({ tripId, updates }) => {
      const tripRef = doc(db, 'trips', tripId);
      batch.update(tripRef, {
        ...updates,
        updatedAt: now
      });
    });
    
    await batch.commit();
    return { 
      success: true, 
      updatedCount: tripUpdates.length 
    };
  } catch (error) {
    console.error('Error batch updating trips:', error);
    throw error;
  }
};

export default app;
