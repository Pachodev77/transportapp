import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const ActiveTripContext = createContext();

export function useActiveTrip() {
  return useContext(ActiveTripContext);
}

export function ActiveTripProvider({ children }) {
  const { currentUser } = useAuth();
  const [activePassengerTrip, setActivePassengerTrip] = useState(null);
  const [activeDriverTrip, setActiveDriverTrip] = useState(null);
  const [loadingTrips, setLoadingTrips] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setActivePassengerTrip(null);
      setActiveDriverTrip(null);
      setLoadingTrips(false);
      return;
    }

    setLoadingTrips(true);

    // Query for passenger active trips
    const passengerQuery = query(
      collection(db, 'rideRequests'),
      where('passengerId', '==', currentUser.uid)
    );

    const unsubscribePassenger = onSnapshot(passengerQuery, (snapshot) => {
      const trips = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const active = trips.find(t => ['pending', 'accepted', 'in_progress'].includes(t.status));
      setActivePassengerTrip(active || null);
    }, (error) => {
      console.error('Error fetching passenger trips:', error);
    });

    // Query for driver active trips
    const driverQuery = query(
      collection(db, 'rideRequests'),
      where('driverId', '==', currentUser.uid)
    );

    const unsubscribeDriver = onSnapshot(driverQuery, (snapshot) => {
      const trips = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const active = trips.find(t => ['accepted', 'in_progress'].includes(t.status));
      setActiveDriverTrip(active || null);
      setLoadingTrips(false);
    }, (error) => {
      console.error('Error fetching driver trips:', error);
      setLoadingTrips(false);
    });

    return () => {
      unsubscribePassenger();
      unsubscribeDriver();
    };
  }, [currentUser]);

  return (
    <ActiveTripContext.Provider value={{ activePassengerTrip, activeDriverTrip, loadingTrips }}>
      {children}
    </ActiveTripContext.Provider>
  );
}
