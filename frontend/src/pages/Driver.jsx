import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Polyline } from 'react-leaflet';
import { FaCar, FaMapMarkerAlt, FaClock, FaUser, FaMoneyBillWave, FaStar, FaPlus, FaCheck, FaTimes, FaSpinner, FaCommentDots, FaMap } from 'react-icons/fa';
import { Geolocation } from '@capacitor/geolocation';
import { useAuth } from '../contexts/AuthContext';
import { 
  getRideRequestsByStatus,
  getUserRideRequests, 
  updateRideRequestStatus, 
  createRideRequest, 
  subscribeToDriverRideRequestUpdates,
  subscribeToRideRequests,
  db
} from '../firebase/config';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  onSnapshot, 
  doc, 
  updateDoc, 
  getDoc, 
  setDoc, 
  serverTimestamp, 
  GeoPoint, 
  increment, 
  runTransaction, 
  orderBy,
  arrayUnion,
  writeBatch,
  arrayRemove,
  limit,
  addDoc
} from 'firebase/firestore';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { STRINGS } from '../utils/constants';
import { formatDate } from '../utils/dateUtils';
import Button from '../components/Button';
import Routing from '../components/Routing';
import FitBoundsToMarkers from '../components/FitBoundsToMarkers';
import Chat from '../components/Chat';
import UserAvatar from '../components/UserAvatar';
import { unlockAudio, playNotificationSound } from '../utils/audioNotification';

// Fix for default marker icons
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icons for map markers
const createMarkerIcon = (content, color, className = '') => {
  const svg = `
    <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.716 0 0 6.716 0 15C0 23.284 15 42 15 42S30 23.284 30 15C30 6.716 23.284 0 15 0Z" fill="${color}"/>
      ${content}
    </svg>
  `;
  return new L.DivIcon({
    html: svg,
    className: `leaflet-div-icon ${className}`.trim(),
    iconSize: [30, 42],
    iconAnchor: [15, 42]
  });
};

const createLetterContent = (letter) => `<text x="15" y="20" font-size="15" font-weight="bold" fill="white" text-anchor="middle">${letter}</text>`;
const createIconContent = (iconClass) => `<foreignObject x="0" y="0" width="30" height="30"><div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;"><i class="${iconClass}" style="font-size: 16px; color: white;"></i></div></foreignObject>`;

const originIcon = createMarkerIcon(createLetterContent('A'), '#3498db');
const destinationIcon = createMarkerIcon(createLetterContent('B'), '#e74c3c');
const driverIcon = createMarkerIcon(createIconContent('fa-solid fa-car'), '#2ecc71');
const flashingDriverIcon = createMarkerIcon(createIconContent('fa-solid fa-car'), '#2ecc71', 'flashing-marker');
const passengerIcon = createMarkerIcon(createIconContent('fa-solid fa-person'), '#f1c40f');

const createPhotoMarkerIcon = (photoURL, fallbackLetter, borderColor = '#2ecc71', animate = false) => {
  const inner = photoURL
    ? `<img src="${photoURL}" loading="lazy" decoding="async" style="width:46px;height:46px;border-radius:50%;object-fit:cover;display:block;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
       <div style="display:none;width:46px;height:46px;border-radius:50%;background:${borderColor};align-items:center;justify-content:center;font-size:20px;font-weight:bold;color:white;">${fallbackLetter || '?'}</div>`
    : `<div style="width:46px;height:46px;border-radius:50%;background:${borderColor};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:bold;color:white;">${fallbackLetter || '?'}</div>`;

  const html = `
    <div style="display:flex;flex-direction:column;align-items:center;">
      <div style="
        width:50px;height:50px;
        border-radius:50%;
        border:3px solid ${borderColor};
        box-shadow:0 2px 8px rgba(0,0,0,0.35);
        overflow:hidden;
        background:white;
        flex-shrink:0;
        ${animate ? 'animation:markerPulse 1.2s infinite;' : ''}
      ">${inner}</div>
      <div style="
        width:0;height:0;
        border-left:8px solid transparent;
        border-right:8px solid transparent;
        border-top:12px solid ${borderColor};
        margin-top:-1px;
        flex-shrink:0;
      "></div>
    </div>
  `;
  return new L.DivIcon({
    html,
    className: '',
    iconSize: [56, 64],
    iconAnchor: [28, 64],
    popupAnchor: [0, -66]
  });
};


function TripTabs({ showHistory, setShowHistory }) {
  return (
    <div className="flex border-b dark:border-gray-700 mb-4">
      <button
        className={`py-2 px-4 text-sm font-medium ${!showHistory ? 'border-b-2 border-primary text-primary' : 'text-secondary dark:text-gray-400'}`}
        onClick={() => setShowHistory(false)}
      >
        Viajes Activos
      </button>
      <button
        className={`py-2 px-4 text-sm font-medium ${showHistory ? 'border-b-2 border-primary text-primary' : 'text-secondary dark:text-gray-400'}`}
        onClick={() => setShowHistory(true)}
      >
        Historial
      </button>
    </div>
  );
}

function LocationSelector({ onSelect }) {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    const handleClick = (e) => {
      onSelect(e.latlng);
    };
    
    map.on('click', handleClick);
    
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onSelect]);
  
  return null;
}

function RecenterMap({ position, zoom }) {
  const map = useMap();
  const hasCenteredRef = useRef(false);

  useEffect(() => {
    if (!hasCenteredRef.current && position && position[0] !== 0 && position[1] !== 0) {
      map.flyTo(position, zoom);
      hasCenteredRef.current = true;
    }
  }, [position, zoom, map]);

  return null;
}

function Driver() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Función para procesar coordenadas (mover fuera del efecto para mejor rendimiento)
  const processCoords = useCallback((coords) => {
    if (!coords) {
      console.warn('No se proporcionaron coordenadas');
      return null;
    }

    // Handle serialized GeoPoint from localStorage ({latitude, longitude})
    if (coords.latitude !== undefined && coords.longitude !== undefined) {
      return {
        lat: Number(coords.latitude),
        lng: Number(coords.longitude)
      };
    }
    
    // Si es un GeoPoint de Firestore (con _lat y _long)
    if (coords._lat !== undefined && coords._long !== undefined) {
      return { 
        lat: Number(coords._lat), 
        lng: Number(coords._long)
      };
    }
    
    // Si es un objeto con lat/lng
    if (coords.lat !== undefined && coords.lng !== undefined) {
      return { 
        lat: Number(coords.lat), 
        lng: Number(coords.lng)
      };
    }
    
    // Si es un array [lng, lat] (formato GeoJSON)
    if (Array.isArray(coords) && coords.length === 2) {
      return { 
        lat: Number(coords[1]), 
        lng: Number(coords[0])
      };
    }
    
    console.warn('Formato de coordenadas no reconocido:', coords);
    return null;
  }, []);

  const [activeTab, setActiveTab] = useState('available');
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [showPickupAlert, setShowPickupAlert] = useState(false);

  // Prefetch current user's photo so the map marker loads instantly
  useEffect(() => {
    if (currentUser?.photoURL) {
      const img = new Image();
      img.src = currentUser.photoURL;
    }
  }, [currentUser?.photoURL]);

  useEffect(() => {
    let watchId = null;

    const startWatching = async () => {
      try {
        if (window.Capacitor?.isNativePlatform?.()) {
          try {
            await Geolocation.requestPermissions();
          } catch (permError) {
            console.warn('Could not request permissions explicitly:', permError);
          }
        }
        
        watchId = await Geolocation.watchPosition(
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
          (position, error) => {
            if (error) {
              console.warn("Watch position error:", error);
              // Ignore timeouts (code 3) as the GPS might just be taking a bit longer to lock
              if (error.code !== 3 && error.code !== 'TIMEOUT') {
                setLocationError(`Buscando señal GPS...`);
              }
              return;
            }
            if (position) {
              const { latitude, longitude } = position.coords;
              setCurrentPosition([latitude, longitude]);
              if (locationError) setLocationError(null);
              if (currentUser) {
                const locationRef = doc(db, 'locations', currentUser.uid);
                setDoc(locationRef, { 
                  location: new GeoPoint(latitude, longitude),
                  updatedAt: serverTimestamp(),
                });
              }
            }
          }
        );
      } catch (error) {
        setLocationError(`Error al solicitar ubicación: ${error.message}`);
        setCurrentPosition(prev => prev || [4.6097, -74.0817]);
      }
    };

    startWatching();

    return () => {
      if (watchId != null) {
        Geolocation.clearWatch({ id: watchId }).catch(console.error);
      }
    };
  }, [currentUser, locationError]);

  // Auto-dismiss location error
  useEffect(() => {
    if (locationError) {
      const timer = setTimeout(() => setLocationError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [locationError]);
  
  const [pointsToFit, setPointsToFit] = useState(null);
  const [mapViewMode, setMapViewMode] = useState('allPoints'); // 'allPoints' or 'currentLocation'
  const intervalRef = useRef(null); // Use a ref to store the interval ID
  const isTripActiveRef = useRef(false); // New ref to track if trip was active in previous render
  const [acceptedTrip, setAcceptedTrip] = useState(null);
  const [selectedAvailableTripId, setSelectedAvailableTripId] = useState(null);

  useEffect(() => {
    const currentTripActive = acceptedTrip && (acceptedTrip.status === 'accepted' || acceptedTrip.status === 'in_progress');

    // If trip just became active
    if (currentTripActive && !isTripActiveRef.current) {
      setMapViewMode('allPoints');
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setMapViewMode(prevMode => (prevMode === 'allPoints' ? 'currentLocation' : 'allPoints'));
      }, 10000);
    }
    // If trip just became inactive
    else if (!currentTripActive && isTripActiveRef.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setMapViewMode('allPoints');
    }

    isTripActiveRef.current = currentTripActive;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [acceptedTrip]);

  const [map, setMap] = useState(null);
  const mapRef = useRef();
  const mapInitialized = useRef(false);
  const pendingCenter = useRef(null);
  const [passengerLocation, setPassengerLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnreadChat, setHasUnreadChat] = useState(false);
  const lastSeenMsgIdRef = useRef(null);
  const isChatOpenRef = useRef(isChatOpen);

  // Unlock audio on first user interaction so it works in Capacitor WebView
  useEffect(() => {
    const handler = () => unlockAudio();
    document.addEventListener('touchstart', handler, { once: true, passive: true });
    document.addEventListener('click', handler, { once: true });
    return () => {
      document.removeEventListener('touchstart', handler);
      document.removeEventListener('click', handler);
    };
  }, []);

  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  // Background listener for unread chat messages (always active when there's an active trip)
  useEffect(() => {
    const tripId = acceptedTrip?.id;
    if (!tripId || !currentUser) {
      lastSeenMsgIdRef.current = null;
      return;
    }

    const messagesRef = collection(db, 'chats', tripId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        const lastMsg = lastDoc.data();
        
        if (isChatOpenRef.current) {
          // If chat is open, just mark the latest as seen
          lastSeenMsgIdRef.current = lastDoc.id;
          setHasUnreadChat(false);
        } else {
          // If chat is closed and we have a new message from someone else
          if (lastMsg.senderId !== currentUser.uid && lastSeenMsgIdRef.current !== lastDoc.id) {
            lastSeenMsgIdRef.current = lastDoc.id;
            setHasUnreadChat(true);
            playNotificationSound();
          }
        }
      }
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedTrip?.id, currentUser?.uid]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (isChatOpen && acceptedTrip?.id) {
      setHasUnreadChat(false);
      const messagesRef = collection(db, 'chats', acceptedTrip.id, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      getDocs(q).then(snapshot => {
        if (!snapshot.empty) {
          lastSeenMsgIdRef.current = snapshot.docs[snapshot.docs.length - 1].id;
        }
      });
    }
  }, [isChatOpen, acceptedTrip?.id]);

  // Subscribe to passenger's real-time location when a trip is active
  useEffect(() => {
    if (acceptedTrip?.passengerId) {
      const passengerLocationRef = doc(db, 'locations', acceptedTrip.passengerId);
      const unsubscribe = onSnapshot(passengerLocationRef, (snap) => {
        if (snap.exists()) {
          setPassengerLocation(snap.data().location);
        }
      });
      return () => unsubscribe();
    } else {
      setPassengerLocation(null);
    }
  }, [acceptedTrip?.passengerId]);

  const [availableTrips, setAvailableTrips] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
  const [tripHistory, setTripHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [tripDetails, setTripDetails] = useState({
    departureTime: '',
    availableSeats: 1,
    price: 0,
    carModel: '',
    carPlate: '',
    estimatedDuration: ''
  });
  const [isMapCollapsed, setIsMapCollapsed] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToRideRequests('pending', (rideRequests) => {
      setAvailableTrips(rideRequests);
    }, (error) => {
      console.error('Error subscribing to ride requests:', error);
      setError('Failed to get real-time ride requests.');
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToDriverRideRequestUpdates(currentUser.uid, (rideRequests) => {
      const activeTrips = rideRequests.filter(
        request => request.status === 'accepted' || request.status === 'in_progress'
      );
      const historyTrips = rideRequests.filter(
        request => request.status === 'completed' || request.status === 'cancelled'
      );

      setMyTrips(activeTrips);
      setTripHistory(historyTrips);

      const currentlyAcceptedTrip = activeTrips.find(
        request => request.status === 'accepted' || request.status === 'in_progress'
      );
      setAcceptedTrip(currentlyAcceptedTrip || null);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Calculate distance between two coordinates in km (Haversine formula approximation)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Effect to automatically center the map on the closest available trip (A and B)
  useEffect(() => {
    // If there is an active trip, don't interfere (the other effect handles active trip centering)
    if (acceptedTrip && (acceptedTrip.status === 'accepted' || acceptedTrip.status === 'in_progress')) {
      return;
    }

    if (activeTab === 'available' && availableTrips.length > 0 && currentPosition) {
      let targetTrip = null;

      if (selectedAvailableTripId) {
        targetTrip = availableTrips.find(t => t.id === selectedAvailableTripId);
      }

      if (!targetTrip) {
        // Find the closest trip to the driver
        const closestTrip = [...availableTrips].reduce((closest, trip) => {
          const originCoords = processCoords(trip.origin?.coordinates);
          if (!originCoords) return closest;
          
          const distance = calculateDistance(
            currentPosition[0], currentPosition[1],
            originCoords.lat, originCoords.lng
          );
          
          if (!closest || distance < closest.distance) {
            return { trip, distance };
          }
          return closest;
        }, null);
        targetTrip = closestTrip ? closestTrip.trip : null;
      }

      if (targetTrip) {
        const points = [];
        
        // Include Trip Origin (A)
        const originCoords = processCoords(targetTrip.origin?.coordinates);
        if (originCoords) points.push(originCoords);
        
        // Include Trip Destination (B)
        const destCoords = processCoords(targetTrip.destination?.coordinates);
        if (destCoords) points.push(destCoords);

        setPointsToFit(points.filter(p => p && p.lat && p.lng));
        setMapViewMode('allPoints'); // Force map to zoom to these bounds
      }
    } else if (activeTab === 'available') {
      // No available trips, just show driver
      setPointsToFit(null);
      setMapViewMode('currentLocation');
    }
  }, [availableTrips, activeTab, currentPosition, acceptedTrip, processCoords, selectedAvailableTripId]);

  const handleLocationSelect = (latlng) => {
    if (!origin) {
      setOrigin({ ...latlng, name: STRINGS.ORIGEN });
    } else if (!destination) {
      setDestination({ ...latlng, name: STRINGS.DESTINO });
    }
  };

  const handleAcceptTrip = async (requestId) => {
    if (!currentUser) {
      navigate('/login', { state: { from: 'driver' } });
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const tripToAccept = availableTrips.find(trip => trip.id === requestId);
      if (!tripToAccept) {
        throw new Error("Trip not found in available trips.");
      }

      const driverData = {
        driverId: currentUser.uid,
        driverName: currentUser.displayName || 'Conductor',
        driverPhotoURL: currentUser.photoURL || null,
        acceptedAt: serverTimestamp(),
      };

      await updateRideRequestStatus(requestId, 'accepted', driverData);

      const acceptedTripData = {
        ...tripToAccept,
        ...driverData,
        status: 'accepted',
      };
      
      // NOTE: No need to manually update myTrips/availableTrips here
      // The onSnapshot listeners will automatically reflect the changes
      setActiveTab('my-trips');


    } catch (error) {
      console.error('Error al aceptar el viaje:', error);
      setError(`Error al aceptar el viaje: ${error.message}`);
      alert(`Error al aceptar el viaje: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTrip = async (requestId) => {
    if (!requestId) {
      alert('No se pudo identificar el viaje a completar');
      return;
    }

    if (!window.confirm('¿Estás seguro de que deseas marcar este viaje como completado?')) {
      return;
    }

    setLoading(true);

    try {
      await updateRideRequestStatus(requestId, 'completed', {
        completedAt: serverTimestamp(),
        canRate: true,
      });

      setMyTrips(prevTrips =>
        prevTrips.filter(trip => trip.id !== requestId)
      );
      setAcceptedTrip(null);

      alert('¡Viaje completado con éxito! El pasajero podrá calificar el servicio.');
      setShowHistory(true);
      setActiveTab('my-trips');

    } catch (error) {
      console.error('Error al completar el viaje:', error);
      alert(`Error al completar el viaje: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTrip = async (requestId) => {
    if (!requestId) {
      alert('No se pudo identificar el viaje a cancelar');
      return;
    }

    if (!window.confirm('¿Estás seguro de que deseas cancelar este viaje?')) {
      return;
    }

    setLoading(true);

    try {
      await updateRideRequestStatus(requestId, 'cancelled', {
        cancelledBy: 'driver',
        cancelledAt: serverTimestamp(),
        canRate: true,
      });

      setMyTrips(prevTrips =>
        prevTrips.filter(trip => trip.id !== requestId)
      );
      setAcceptedTrip(null);

      alert('El viaje ha sido cancelado.');
      
    } catch (error) {
      console.error('Error al cancelar el viaje:', error);
      alert(`Error al cancelar el viaje: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-light dark:bg-gray-900 pt-16 transition-colors duration-200">
      {/* Alert for pickup */}
      {showPickupAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg flex items-center">
            <div className="flex-shrink-0">
              <FaCar className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3">
              <p className="font-bold">¡Atención!</p>
              <p>Dirígete a la dirección de recogida</p>
            </div>
            <button 
              onClick={() => setShowPickupAlert(false)}
              className="ml-4 text-yellow-700 hover:text-yellow-900"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      
      {/* Título principal - Visible en todas las pantallas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-dark dark:text-white">{STRINGS.PANEL_DEL_CONDUCTOR}</h1>
      </div>
      
      {isChatOpen && acceptedTrip && (
        <Chat 
          tripId={acceptedTrip.id} 
          onClose={() => setIsChatOpen(false)} 
          onNewMessage={() => { if (!isChatOpen) setHasUnreadChat(true); }}
          otherUserName={acceptedTrip.passengerName}
          otherUserPhotoURL={acceptedTrip.passengerPhotoURL} 
          otherUserId={acceptedTrip.passengerId}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        {/* locationError moved to floating container */}
        
        

        {/* Notificaciones Flotantes */}
        <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-2 w-full max-w-xs sm:max-w-sm pointer-events-none">
          {locationError && (
            <div className='p-3 bg-warning text-white rounded-lg shadow-xl flex justify-between items-center pointer-events-auto animate-slide-up'>
              <div>
                <p className='font-bold text-sm'>Error de Ubicación</p>
                <span className="text-xs font-medium">{locationError}</span>
              </div>
              <button onClick={() => setLocationError(null)} className='ml-3 text-xl font-bold leading-none p-1 hover:text-gray-200'>&times;</button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar izquierda - Contenido principal */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            {/* Tabs - Visibles en móviles y escritorio */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              
              <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 mb-4 gap-1">
                <button 
                  className={`flex-1 py-2 px-1 text-xs font-semibold text-center rounded-md transition-all duration-200 ${
                    activeTab === 'available' 
                      ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-700 dark:text-gray-200 bg-transparent'
                  }`}
                  onClick={() => setActiveTab('available')}
                >
                  {STRINGS.VIAJES_DISPONIBLES}
                </button>
                <button 
                  className={`flex-1 py-2 px-1 text-xs font-semibold text-center rounded-md transition-all duration-200 ${
                    activeTab === 'my-trips' 
                      ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-700 dark:text-gray-200 bg-transparent'
                  }`}
                  onClick={() => setActiveTab('my-trips')}
                >
                  {STRINGS.MIS_VIAJES}
                </button>
              </div>
              
              {/* Available Trips Tab */}
              {activeTab === 'available' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-dark dark:text-white">{STRINGS.SOLICITUDES_DE_VIAJE}</h3>
                  {availableTrips.length === 0 ? (
                    <p className="text-sm text-secondary dark:text-gray-400 py-4 text-center">{STRINGS.NO_HAY_VIAJES_DISPONIBLES}</p>
                  ) : (
                    <div className="space-y-4">
                      {availableTrips.map((trip) => (
                        <div 
                          key={trip.id} 
                          className={`border dark:border-gray-700 rounded-lg p-4 space-y-3 cursor-pointer transition-colors ${selectedAvailableTripId === trip.id ? 'ring-2 ring-blue-500 border-transparent dark:bg-gray-800' : 'hover:border-blue-400 dark:hover:border-blue-500'}`}
                          onClick={() => setSelectedAvailableTripId(trip.id)}
                        >
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-danger mr-2 w-4" />
                            <span className="truncate dark:text-gray-300">{trip.origin?.address || STRINGS.ORIGEN_NO_ESPECIFICADO}</span>
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-success mr-2 w-4" />
                            <span className="truncate dark:text-gray-300">{trip.destination?.address || STRINGS.DESTINO_NO_ESPECIFICADO}</span>
                          </div>
                          <div className="flex items-center text-secondary dark:text-gray-400">
                            <FaClock className="mr-2 w-4" />
                            <span>{formatDate(trip.departureTime)}</span>
                          </div>
                          <div className="flex items-center text-secondary dark:text-gray-400">
                            <FaUser className="mr-2 w-4" />
                            <span>{trip.passengers || 1} {trip.passengers > 1 ? STRINGS.PASAJEROS : STRINGS.PASAJERO}</span>
                          </div>
                          <div className="flex items-center text-lg font-semibold text-primary">
                            <FaMoneyBillWave className="mr-2" />
                            ${(trip.estimatedPrice || 0).toLocaleString()}
                          </div>
                          <Button
                            onClick={() => handleAcceptTrip(trip.id)}
                            disabled={loading}
                            className="w-full bg-success text-white py-2 rounded-lg font-medium hover:bg-success-dark transition-colors flex items-center justify-center"
                          >
                            {loading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {STRINGS.PROCESANDO}
                              </>
                            ) : (
                              <>
                                <FaCheck className="mr-2" />
                                {STRINGS.ACEPTAR_VIAJE}
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* My Trips Tab */}
              {activeTab === 'my-trips' && (
                <div className="space-y-4">
                  <TripTabs showHistory={showHistory} setShowHistory={setShowHistory} />
                  
                  {!showHistory ? (
                    // Active trips
                    myTrips.length > 0 ? (
                      myTrips.map((trip) => (
                        <div key={trip.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium text-dark dark:text-white">
                                {trip.origin?.address?.split(',')[0] || STRINGS.ORIGEN} → {trip.destination?.address?.split(',')[0] || STRINGS.DESTINO}
                              </h4>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                trip.status === 'accepted' 
                                  ? 'bg-primary text-white' 
                                  : trip.status === 'completed'
                                    ? 'bg-secondary text-white'
                                    : trip.status === 'in_progress'
                                      ? 'bg-warning text-white'
                                      : 'bg-success text-white'
                              }`}>
                                {trip.status === 'accepted' 
                                  ? STRINGS.ACEPTADO 
                                  : trip.status === 'completed' 
                                    ? STRINGS.COMPLETADO 
                                    : trip.status === 'in_progress'
                                      ? STRINGS.EN_CURSO
                                      : STRINGS.DISPONIBLE_MAYUS}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">${((trip.estimatedPrice || trip.price) || 0).toLocaleString()}</div>
                              <div className="text-sm text-secondary dark:text-gray-400">
                                {trip.passengers} {trip.passengers > 1 ? STRINGS.PASAJEROS : STRINGS.PASAJERO}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-danger mr-2 w-4" />
                              <span className="truncate dark:text-gray-300">{trip.origin?.address || STRINGS.ORIGEN_NO_ESPECIFICADO}</span>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-success mr-2 w-4" />
                              <span className="truncate dark:text-gray-300">{trip.destination?.address || STRINGS.DESTINO_NO_ESPECIFICADO}</span>
                            </div>
                            <div className="flex items-center text-secondary dark:text-gray-400">
                              <FaClock className="mr-2 w-4" />
                              <span>{formatDate(trip.departureTime)}</span>
                            </div>
                            {trip.carModel && (
                              <div className="flex items-center text-secondary dark:text-gray-400">
                                <FaCar className="mr-2 w-4" />
                                <span>{trip.carModel} {trip.carPlate ? `• ${trip.carPlate}` : ''}</span>
                              </div>
                            )}
                            {trip.passengerName && (
                              <div className="mt-2 pt-2 border-t dark:border-gray-700">
                                <p className="font-medium text-sm mb-1 dark:text-gray-300">{STRINGS.PASAJERO}:</p>
                                <div className="flex items-center text-sm text-dark dark:text-white">
                                  <FaUser className="mr-2 w-4 text-secondary dark:text-gray-400" />
                                  <span>{trip.passengerName}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {(trip.status === 'accepted' || trip.status === 'in_progress') && (
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleCancelTrip(trip.id)}
                                disabled={loading}
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                              >
                                Cancelar
                              </Button>
                              <Button
                                onClick={() => handleCompleteTrip(trip.id)}
                                disabled={loading}
                                className="flex-1 bg-success text-white py-2 rounded-lg font-medium hover:bg-success-dark transition-colors"
                              >
                                {loading ? STRINGS.PROCESANDO : STRINGS.COMPLETAR_VIAJE}
                              </Button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-secondary dark:text-gray-400">
                        <p>{STRINGS.NO_TIENES_VIAJES_ACTIVOS}</p>
                      </div>
                    )
                  ) : (
                    // Trip history
                    tripHistory.length > 0 ? (
                      tripHistory.map((trip) => (
                        <div key={trip.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-success">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-dark dark:text-white">
                                {trip.origin?.name || STRINGS.ORIGEN_DESCONOCIDO} → {trip.destination?.name || STRINGS.DESTINO_DESCONOCIDO}
                              </h3>
                              <p className="text-sm text-secondary dark:text-gray-400">
                                {trip.passengerName ? `${STRINGS.PASAJERO}: ${trip.passengerName}` : STRINGS.PASAJERO_NO_ESPECIFICADO}
                              </p>
                              <p className="text-sm text-secondary dark:text-gray-400">
                                {STRINGS.PRECIO}${(trip.estimatedPrice || trip.price) || 'No especificado'}
                              </p>
                              {trip.completedAt && (
                                <p className="text-xs text-light mt-1">
                                  {STRINGS.COMPLETADO_PUNTOS}{formatDate(trip.completedAt, true)}
                                </p>
                              )}
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-white">
                              {STRINGS.COMPLETADO}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-secondary dark:text-gray-400">{STRINGS.AUN_NO_TIENES_VIAJES_COMPLETADOS}</p>
                      </div>
                    )
                  )}
                </div>
              )}
              
              {/* Alert for active trip will be placed between map and tabs */}
            </div>
          </div>
          
          {/* Mapa - Visible en móviles (arriba) y escritorio (derecha) */}
          <div className="lg:col-span-2 order-1 lg:order-2 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden relative" style={{ height: isMapCollapsed ? '0' : 'calc(100vh - 8rem)', transition: 'height 0.3s ease' }}>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
              {!currentPosition && (
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Cargando mapa...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Obteniendo tu ubicación</p>
                </div>
              )}
            </div>
            
            <MapContainer 
              center={currentPosition || [0, 0]} 
              zoom={currentPosition ? 15 : 2} 
              style={{ 
                height: '100%', 
                width: '100%',
                position: 'relative',
                zIndex: 10,
                backgroundColor: '#e5e7eb' // Fondo gris claro mientras carga
              }}
              zoomControl={true}
              attributionControl={false}
              whenCreated={(mapInstance) => {
                console.log('Mapa inicializado:', mapInstance);
                handleMapLoad(mapInstance);
              }}
              key={`map-${currentPosition ? 'with-position' : 'no-position'}-${window.innerWidth}`}
            >
              {mapViewMode === 'currentLocation' && currentPosition && (
                <RecenterMap position={currentPosition} zoom={15} />
              )}
              <TileLayer
                url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              />
              {mapViewMode === 'allPoints' && pointsToFit && pointsToFit.length > 0 && (
                <FitBoundsToMarkers key={`fit-bounds-${selectedAvailableTripId || 'default'}-${Date.now()}`} points={pointsToFit} />
              )}
              {currentPosition && (
                <Marker 
                  position={currentPosition} 
                  icon={createPhotoMarkerIcon(
                    currentUser?.photoURL,
                    currentUser?.displayName?.charAt(0)?.toUpperCase(),
                    '#2ecc71',
                    !!acceptedTrip
                  )}
                >
                  <Popup>{STRINGS.TU_UBICACION}</Popup>
                </Marker>
              )}

              {/* Passenger real-time location marker */}
              {passengerLocation && acceptedTrip && (
                <Marker
                  position={[passengerLocation.latitude, passengerLocation.longitude]}
                  eventHandlers={{ click: () => navigate(`/profile/${acceptedTrip.passengerId}`) }}
                  icon={createPhotoMarkerIcon(
                    acceptedTrip.passengerPhotoURL,
                    acceptedTrip.passengerName?.charAt(0)?.toUpperCase(),
                    '#f1c40f',
                    false
                  )}
                >
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold cursor-pointer text-blue-600 hover:underline">{acceptedTrip.passengerName}</p>
                      <p>Ubicación actual del pasajero</p>
                    </div>
                  </Popup>
                </Marker>
              )}

              {/* Render the accepted trip route and markers */}
              {acceptedTrip && (() => {
                const originCoords = processCoords(acceptedTrip.origin?.coordinates);
                const destCoords = processCoords(acceptedTrip.destination?.coordinates);
                const driverCoords = currentPosition ? { lat: currentPosition[0], lng: currentPosition[1] } : null;

                if (!originCoords || !destCoords) return null;

                // Default route is from passenger pickup (A) to destination (B)
                let routeOrigin = originCoords;
                let routeDestination = destCoords;

                // If trip is 'accepted', driver needs to get to the passenger.
                // Route should be from driver's location to pickup point (A).
                if (acceptedTrip.status === 'accepted' && driverCoords) {
                  routeOrigin = driverCoords;
                  routeDestination = originCoords;
                }

                return (
                  <React.Fragment>
                    {/* Passenger's pickup location marker (A) */}
                    <Marker
                      position={[originCoords.lat, originCoords.lng]}
                      icon={originIcon}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-semibold">Recoger a {acceptedTrip.passengerName}</p>
                          <p>{acceptedTrip.origin?.address}</p>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Destination marker (B) */}
                    <Marker
                      position={[destCoords.lat, destCoords.lng]}
                      icon={destinationIcon}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-semibold">Destino</p>
                          <p>{acceptedTrip.destination?.address}</p>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Render the calculated route */}
                    <Routing origin={routeOrigin} destination={routeDestination} />
                  </React.Fragment>
                );
              })()}
              
              {/* Mostrar marcadores de viajes disponibles */}
              {availableTrips && availableTrips.length > 0 ? (
                // Deduplicate trips by ID to prevent duplicate key warnings
                [...new Map(availableTrips.map(t => [t.id, t])).values()]
                .map((trip) => {
                  try {
                    const tripKey = trip.id;
                    
                    // Verificar que las coordenadas sean válidas
                    if (!trip.origin?.coordinates || !trip.destination?.coordinates) {
                      return null;
                    }
                    
                    // Obtener coordenadas en formato [lat, lng] para Leaflet
                    const originCoords = [
                      trip.origin.coordinates.latitude,
                      trip.origin.coordinates.longitude
                    ];
                    
                    const destCoords = [
                      trip.destination.coordinates.latitude,
                      trip.destination.coordinates.longitude
                    ];

                    return (
                      <React.Fragment key={tripKey}>
                        {/* Marcador de origen */}
                        <Marker
                          position={originCoords}
                          icon={originIcon}
                        >
                          <Popup>
                            <div className="text-sm">
                              <p className="font-semibold">Origen</p>
                              <p>{trip.origin?.address || 'Dirección no disponible'}</p>
                              <p>Pasajero: {trip.passengerName || 'No disponible'}</p>
                              <button
                                onClick={() => handleAcceptTrip(trip.id)}
                                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                              >
                                Aceptar viaje
                              </button>
                            </div>
                          </Popup>
                        </Marker>

                        {/* Marcador de destino */}
                        <Marker
                          position={destCoords}
                          icon={destinationIcon}
                        >
                          <Popup>
                            <div className="text-sm">
                              <p className="font-semibold">Destino</p>
                              <p>{trip.destination?.address || 'Dirección no disponible'}</p>
                            </div>
                          </Popup>
                        </Marker>


                      </React.Fragment>
                    );
                  } catch (error) {
                    console.error(`Error al renderizar marcadores para el viaje ${trip.id}:`, error);
                    return null;
                  }
                })
              ) : (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">No hay viajes disponibles en este momento</p>
                </div>
              )}
              
              {/* Selector de ubicación para crear viaje */}
              {activeTab === 'create-trip' && (
                <LocationSelector onSelect={handleLocationSelect} />
              )}
            </MapContainer>
          {/* Floating passenger info card - shown when trip is accepted or in progress */}
        {acceptedTrip && (acceptedTrip.status === 'accepted' || acceptedTrip.status === 'in_progress') && (
          <div className="fixed bottom-0 left-0 right-0 animate-slide-up cursor-pointer" style={{ zIndex: 999 }} onClick={() => navigate(`/profile/${acceptedTrip.passengerId}`)}>
            <div className="mx-auto max-w-2xl px-3 pb-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 animate-pulse hover:opacity-90 transition-opacity">
                {/* Ping indicator */}
                <span className="relative flex-shrink-0 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <UserAvatar 
                    userId={acceptedTrip.passengerId} 
                    fallbackName={acceptedTrip.passengerName} 
                    className="border-2 border-white/60" 
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight truncate">
                    {acceptedTrip.status === 'accepted' ? '¡Recoger al pasajero!' : '¡Viaje en curso!'}
                  </p>
                  <p className="text-white/80 text-xs truncate">
                    {acceptedTrip.passengerName || 'Pasajero'}
                  </p>
                </div>

                {/* Price */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-white font-bold text-lg leading-tight">
                    ${(acceptedTrip.estimatedPrice || acceptedTrip.price || 0).toLocaleString()}
                  </p>
                  <p className="text-white/70 text-[10px] uppercase font-bold tracking-wider">
                    Tarifa
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}           </div>
          
          {/* Botones flotantes - Mapa y Chat */}
          <div className="fixed top-20 right-4 flex gap-2" style={{ zIndex: 1000 }}>
            {acceptedTrip && (
              <button
                onClick={() => { setIsChatOpen(!isChatOpen); setHasUnreadChat(false); }}
                className="relative bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaCommentDots className="text-primary text-xl" />
                {hasUnreadChat && !isChatOpen && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsMapCollapsed(!isMapCollapsed)}
              className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaMap className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Driver;