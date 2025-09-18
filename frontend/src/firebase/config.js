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
export const db = getFirestore(app);

// Enable offline persistence
let persistenceInitialized = false;

export const initializePersistence = async () => {
  if (persistenceInitialized) return;
  
  try {
    await setPersistence(auth, browserLocalPersistence);
    await enableIndexedDbPersistence(db, { 
      forceOwnership: true 
    });
    console.log('Firestore persistence enabled');
    persistenceInitialized = true;
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (error.code === 'unimplemented') {
      console.warn('The current browser does not support all of the features required to enable persistence');
    } else if (error.code === 'failed-precondition') {
      console.warn('Persistence is already enabled in another tab');
    }
    console.warn('Persistence warning:', error.message);
  }
};

// Initialize persistence when the app starts
initializePersistence();

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
const RATE_LIMIT_MS = 300; // More lenient rate limit
let lastRequestTime = 0;

const checkRateLimit = () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_MS) {
    const waitTime = RATE_LIMIT_MS - timeSinceLastRequest;
    console.warn(`Rate limit hit, waiting ${waitTime}ms`);
    return waitTime;
  }
  
  lastRequestTime = now;
  return 0;
};

// Helper function to handle rate limiting
const withRateLimit = async (fn) => {
  const waitTime = checkRateLimit();
  if (waitTime > 0) {
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  return fn();
};

/**
 * Get user by ID with optional field selection
 * @param {string} userId - User ID
 * @param {string[]} fields - Optional array of field paths to return
 * @returns {Promise<Object|null>} User data or null if not found
 */
export const getUser = async (userId, fields = []) => {
  return withRateLimit(async () => {
    try {
      const userRef = doc(usersCollection, userId);
      let userDoc;
      
      try {
        // Try to get from cache first
        userDoc = await getDocFromCache(userRef);
      } catch (error) {
        // If not in cache, get from server
        userDoc = await getDoc(userRef);
      }
      
      if (!userDoc.exists()) return null;
      
      const userData = userDoc.data();
      
      // If specific fields are requested, filter the response
      if (fields.length > 0) {
        const filteredData = {};
        fields.forEach(field => {
          if (userData[field] !== undefined) {
            filteredData[field] = userData[field];
          }
        });
        return { id: userDoc.id, ...filteredData };
      }
      
      return { id: userDoc.id, ...userData };
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  });
};

/**
 * Create or update user data
 * @param {string} userId - User ID
 * @param {Object} userData - User data to save
 * @param {boolean} merge - Whether to merge with existing data (default: true)
 * @returns {Promise<Object>} Updated user data
 */
export const createOrUpdateUser = async (userId, userData, merge = true) => {
  return withRateLimit(async () => {
    try {
      const userRef = doc(usersCollection, userId);
      
      // Add timestamps
      const now = serverTimestamp();
      const dataToSave = {
        ...userData,
        updatedAt: now,
        ...(!userData.createdAt && { createdAt: now })
      };
      
      await setDoc(userRef, dataToSave, { merge });
      
      // Get the updated document
      const updatedDoc = await getDoc(userRef);
      return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (error) {
      console.error('Error creating/updating user:', error);
      throw error;
    }
  });
};

/**
 * Create a new trip
 * @param {Object} tripData - Trip data
 * @returns {Promise<Object>} Created trip with ID
 */
export const createTrip = async (tripData) => {
  return withRateLimit(async () => {
    try {
      const tripRef = doc(tripsCollection);
      const now = serverTimestamp();
      
      const tripWithMetadata = {
        ...tripData,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      };
      
      await setDoc(tripRef, tripWithMetadata);
      
      // Get the created document with ID
      const createdTrip = await getDoc(tripRef);
      return { id: createdTrip.id, ...createdTrip.data() };
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    }
  });
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

/**
 * Get trips for a specific user
 * @param {string} userId - User ID
 * @param {boolean} history - Whether to fetch completed trips or active trips
 * @returns {Promise<Array>} Array of trips
 */
export const getUserTrips = async (userId, history = false) => {
  return withRateLimit(async () => {
    try {
      const tripsRef = collection(db, 'trips');
      const status = history ? ['completed', 'cancelled'] : ['pending', 'accepted', 'in_progress'];
      
      const q = query(
        tripsRef,
        where('driverId', '==', userId),
        where('status', 'in', status),
        orderBy('departureTime', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user trips:', error);
      throw error;
    }
  });
};

/**
 * Subscribe to real-time updates for a user's trips
 * @param {string} userId - User ID
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToTripUpdates = (userId, callback) => {
  try {
    const q = query(
      tripsCollection,
      where('driverId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const trips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(trips);
    });
  } catch (error) {
    console.error('Error subscribing to trip updates:', error);
    throw error;
  }
};

export default app;
