import { initializeApp, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { 
  getFirestore, 
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
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
  runTransaction
} from 'firebase/firestore';

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

// Initialize Firebase only once
let app;
let auth;
let db;

try {
  app = getApp();
} catch (e) {
  app = initializeApp(firebaseConfig);
}

auth = getAuth(app);

try {
  db = getFirestore(app);
} catch (e) {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
}

// Initialize auth persistence
export const initializePersistence = async () => {
  try {
    if (auth) {
      await setPersistence(auth, browserLocalPersistence);
      console.log('Auth persistence initialized');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error initializing auth persistence:', error);
    return false;
  }
};

// Initialize auth persistence when the module loads
initializePersistence().catch(console.error);

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
export const rideRequestsCollection = collection(db, 'rideRequests');
export const bookingsCollection = collection(db, 'bookings');

// Rate limiting
const RATE_LIMIT_MS = 300; // More lenient rate limit
let lastRequestTime = 0;

const checkRateLimit = () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_MS) {
    const waitTime = RATE_LIMIT_MS - timeSinceLastRequest;
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
 * Create a new ride request
 * @param {Object} rideRequestData - Ride request data
 * @returns {Promise<Object>} Created ride request with ID
 */
export const createRideRequest = async (rideRequestData) => {
  return withRateLimit(async () => {
    try {
      const rideRequestRef = doc(rideRequestsCollection);
      const now = serverTimestamp();
      
      const rideRequestWithMetadata = {
        status: 'pending', // Default status
        ...rideRequestData,      // User-provided data overrides default
        createdAt: now,
        updatedAt: now,
      };
      
      await setDoc(rideRequestRef, rideRequestWithMetadata);
      
      // Get the created document with ID
      const createdRideRequest = await getDoc(rideRequestRef);
      return { id: createdRideRequest.id, ...createdRideRequest.data() };
    } catch (error) {
      console.error('Error creating ride request:', error);
      throw error;
    }
  });
};

/**
 * Get ride requests by status with pagination
 * @param {string} status - Ride request status to filter by
 * @param {Object} options - Options object
 * @param {number} options.limit - Number of items per page (default: 10)
 * @param {DocumentSnapshot} options.lastDoc - Last document for pagination
 * @param {string[]} options.fields - Fields to return (empty for all)
 * @returns {Promise<{rideRequests: Array, lastDoc: DocumentSnapshot}>}
 */
export const getRideRequestsByStatus = async (status, { 
  limit: pageSize = 10, 
  lastDoc = null,
  fields = []
} = {}) => {
  try {
    checkRateLimit();
    let q = query(
      rideRequestsCollection,
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

    const rideRequests = querySnapshot.docs.map(doc => {
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
      rideRequests,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null
    };
  } catch (error) {
    console.error('Error getting ride requests:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time updates for ride requests
 * @param {string} status - Ride request status to subscribe to
 * @param {Function} callback - Callback function for updates
 * @param {string[]} fields - Fields to include in updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToRideRequests = (status, onNext, onError, fields = []) => {
  try {
    const q = query(
      rideRequestsCollection,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const rideRequests = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Filter fields if specified
        if (Array.isArray(fields) && fields.length > 0) {
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
      onNext(rideRequests);
    }, onError); // Pass onError to onSnapshot
  } catch (error) {
    console.error('Error setting up ride request subscription:', error);
    if (onError) {
      onError(error);
    }
    return () => {}; // Return a no-op unsubscribe function
  }
};

/**
 * Update ride request status
 * @param {string} rideRequestId - Ride request ID
 * @param {string} status - New status
 * @param {Object} additionalData - Additional fields to update
 * @returns {Promise<Object>} Updated ride request data
 */
export const updateRideRequestStatus = async (rideRequestId, status, additionalData = {}) => {
  try {
    checkRateLimit();
    const rideRequestRef = doc(db, 'rideRequests', rideRequestId);
    const updateData = {
      status,
      updatedAt: serverTimestamp(),
      ...additionalData
    };
    
    await updateDoc(rideRequestRef, updateData);
    return { id: rideRequestId, ...updateData };
  } catch (error) {
    console.error('Error updating ride request status:', error);
    throw error;
  }
};

/**
 * Get ride requests for a specific user
 * @param {string} userId - User ID
 * @param {boolean} history - Whether to fetch completed ride requests or active ride requests
 * @returns {Promise<Array>} Array of ride requests
 */
export const getUserRideRequests = async (userId, history = false) => {
  return withRateLimit(async () => {
    try {
      const rideRequestsRef = collection(db, 'rideRequests');
      const status = history ? ['completed', 'cancelled'] : ['pending', 'accepted', 'in_progress'];
      
      const q = query(
        rideRequestsRef,
        where('passengerId', '==', userId),
        where('status', 'in', status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user ride requests:', error);
      throw error;
    }
  });
};

/**
 * Subscribe to real-time updates for a passenger's ride requests
 * @param {string} userId - User ID of the passenger
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToPassengerRideRequestUpdates = (userId, callback) => {
  try {
    const q = query(
      rideRequestsCollection,
      where('passengerId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const rideRequests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(rideRequests);
    });
  } catch (error) {
    console.error('Error subscribing to passenger ride request updates:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time updates for a driver's ride requests
 * @param {string} userId - User ID of the driver
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToDriverRideRequestUpdates = (userId, callback) => {
  try {
    const q = query(
      rideRequestsCollection,
      where('driverId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const rideRequests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(rideRequests);
    });
  } catch (error) {
    console.error('Error subscribing to driver ride request updates:', error);
    throw error;
  }
};

export { app, auth, db, runTransaction };
export default app;