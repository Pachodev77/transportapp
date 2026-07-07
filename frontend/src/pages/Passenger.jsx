import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingModal from '../components/RatingModal';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet';
import { FaSearch, FaMapMarkerAlt, FaCar, FaSpinner, FaStar, FaClock, FaCommentDots, FaStarHalfAlt, FaMap } from 'react-icons/fa';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp, 
  setDoc, 
  getDocs, 
  writeBatch, 
  limit, 
  addDoc, 
  orderBy, 
  GeoPoint, 
  increment,
  runTransaction,
  arrayUnion
} from 'firebase/firestore';
import { Geolocation } from '@capacitor/geolocation';
import UserAvatar from '../components/UserAvatar';
import { db, createRideRequest, subscribeToRideRequests, updateRideRequestStatus, getUserRideRequests, subscribeToPassengerRideRequestUpdates } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { STRINGS } from '../utils/constants';
import { formatDate } from '../utils/dateUtils';
import Button from '../components/Button';
import AddressInput from '../components/AddressInput';
import Routing from '../components/Routing';
import Chat from '../components/Chat';
import FitBoundsToMarkers from '../components/FitBoundsToMarkers';
import { unlockAudio, playNotificationSound } from '../utils/audioNotification';

// Icons for map markers
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

function LocationSelector({ onSelect, onDrag }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
    dragstart() {
      if (onDrag) onDrag();
    }
  });
  return null;
}

function RecenterMap({ position, zoom }) {
  const map = useMap();
  const lastCenteredRef = useRef(null);

  useEffect(() => {
    if (!position || position[0] === 0 || position[1] === 0) return;

    // Center if we haven't centered yet
    if (!lastCenteredRef.current) {
      map.flyTo(position, zoom);
      lastCenteredRef.current = position;
      return;
    }

    // Re-center if the new position is significantly different (> ~500m)
    // This handles the case where GPS starts with a rough estimate then gets exact location
    const [prevLat, prevLng] = lastCenteredRef.current;
    const [newLat, newLng] = position;
    const latDiff = Math.abs(newLat - prevLat);
    const lngDiff = Math.abs(newLng - prevLng);
    const significantChange = latDiff > 0.005 || lngDiff > 0.005; // ~500m threshold

    if (significantChange) {
      map.flyTo(position, zoom);
      lastCenteredRef.current = position;
    }
  }, [position, zoom, map]);

  return null;
}

function ForceCenterMap({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position && position[0] !== 0 && position[1] !== 0) {
      map.flyTo(position, zoom);
    }
  }, [position, zoom, map]);
  return null;
}

export default function Passenger() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [myRideRequests, setMyRideRequests] = useState([]);
  const [availableTrips, setAvailableTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [currentPosition, setCurrentPosition] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [originQuery, setOriginQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState('');
  const [hasActiveRequest, setHasActiveRequest] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasUnreadChat, setHasUnreadChat] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [pointsToFit, setPointsToFit] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [tripToRate, setTripToRate] = useState(null);
  const hasShownRatingModal = useRef({});
  const [isMapCollapsed, setIsMapCollapsed] = useState(false);

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

  // Prefetch current user's photo so the map marker loads instantly
  useEffect(() => {
    if (currentUser?.photoURL) {
      const img = new Image();
      img.src = currentUser.photoURL;
    }
  }, [currentUser?.photoURL]);

  // Handle rating a trip
  const handleRateTrip = async (ratingData) => {
    if (!ratingData || !ratingData.rating) {
      setShowRatingModal(false);
      return;
    }
    if (!currentUser) return;

    const { rideRequestId, rating, comment = '' } = ratingData;

    if (!rideRequestId) {
      setError('No se pudo completar la calificación. Falta el ID de la solicitud de viaje.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setError('La calificación debe ser entre 1 y 5 estrellas');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const rideRequestRef = doc(db, 'rideRequests', rideRequestId);
      const rideRequestDoc = await getDoc(rideRequestRef);

      if (!rideRequestDoc.exists()) {
        throw new Error('La solicitud de viaje ya no existe.');
      }

      const rideRequestData = rideRequestDoc.data();

      if (rideRequestData.passengerId !== currentUser.uid) {
        throw new Error('No tienes permiso para calificar este viaje.');
      }

      if (rideRequestData.status !== 'completed' && rideRequestData.status !== 'cancelled') {
        throw new Error('Solo puedes calificar viajes completados o cancelados.');
      }

      if (rideRequestData.ratedBy?.includes(currentUser.uid)) {
        throw new Error('Este viaje ya fue calificado.');
      }

      // 1. First, mark the ride as rated
      await updateDoc(rideRequestRef, {
        canRate: false,
        ratedBy: arrayUnion(currentUser.uid),
        updatedAt: serverTimestamp()
      });

      // 2. Then, update the driver's rating
      if (rideRequestData.driverId) {
        const driverRef = doc(db, 'users', rideRequestData.driverId);
        
        // Use a transaction to ensure atomic updates
        await runTransaction(db, async (transaction) => {
          const driverDoc = await transaction.get(driverRef);
          
          if (driverDoc.exists()) {
            const driverData = driverDoc.data();
            const currentRating = Number(driverData.rating) || 0;
            const currentRatingCount = Number(driverData.ratingCount) || 0;
            const newRatingCount = currentRatingCount + 1;
            const newRating = (currentRating * currentRatingCount + Number(rating)) / newRatingCount;

            transaction.update(driverRef, {
              rating: parseFloat(newRating.toFixed(1)),
              ratingCount: newRatingCount,
              updatedAt: serverTimestamp()
            });
          }
        });
      }

      // Update local state
      setMyBookings(prev =>
        prev.map(booking =>
          booking.id === rideRequestId
            ? {
                ...booking,
                canRate: false,
                ratedBy: [...(booking.ratedBy || []), currentUser.uid]
              }
            : booking
        )
      );

      setSuccessMessage('¡Gracias por calificar al conductor!');
      setTimeout(() => {
        setShowRatingModal(false);
        setTripToRate(null);
      }, 2000);

    } catch (error) {
      console.error('Error al calificar el viaje:', error);
      setError(`Error: ${error.message || 'No se pudo completar la calificación. Por favor, inténtalo de nuevo.'}`);
    } finally {
      setLoading(false);
    }
  };

  // Show rating modal for completed trips
  useEffect(() => {
    if (!currentUser || showRatingModal) {
      return;
    }

    const rideToRate = myRideRequests.find(req =>
      (req.status === 'completed' || req.status === 'cancelled') &&
      req.passengerId === currentUser.uid &&
      req.driverId && // Must have a driver to rate
      !req.ratedBy?.includes(currentUser.uid) &&
      req.canRate !== false
    );

    if (rideToRate) {
      const storageKey = `hasShownRatingModal_${rideToRate.id}`;
      if (!sessionStorage.getItem(storageKey) && !hasShownRatingModal.current[rideToRate.id]) {
        sessionStorage.setItem(storageKey, 'true');
        hasShownRatingModal.current[rideToRate.id] = true;
        
        if (rideToRate.status === 'cancelled' && rideToRate.cancelledBy === 'driver') {
          alert('El conductor ha cancelado tu viaje. Puedes dejar una reseña sobre su servicio.');
        } else if (rideToRate.status === 'cancelled') {
          alert('El viaje ha sido cancelado. Puedes dejar una reseña si lo deseas.');
        }
        setTripToRate(rideToRate);
        setShowRatingModal(true);
      }
    }
  }, [myRideRequests, currentUser, showRatingModal]); // Only depend on uid instead of the whole currentUser object

  // Background listener for unread chat messages (always active when there's an active trip)
  const lastSeenMsgIdRef = useRef(null);
  const isChatOpenRef = useRef(isChatOpen);

  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  useEffect(() => {
    const tripId = selectedTrip?.tripId || selectedTrip?.id;
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
  }, [selectedTrip?.tripId, selectedTrip?.id, currentUser?.uid]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (isChatOpen) {
      const tripId = selectedTrip?.tripId || selectedTrip?.id;
      if (!tripId) return;
      setHasUnreadChat(false);
      const messagesRef = collection(db, 'chats', tripId, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      getDocs(q).then(snapshot => {
        if (!snapshot.empty) {
          lastSeenMsgIdRef.current = snapshot.docs[snapshot.docs.length - 1].id;
        }
      });
    }
  }, [isChatOpen, selectedTrip?.tripId, selectedTrip?.id]);

  // Effect to update points to fit when a trip is active
  useEffect(() => {
    if (selectedTrip && (selectedTrip.status === 'pending' || selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress')) {
      const points = [];
      
      // 1. Passenger's current position
      if (currentPosition) {
        points.push({ lat: currentPosition[0], lng: currentPosition[1] });
      }
      
      // 2. Driver's last known location
      if (driverLocation) {
        points.push({ lat: driverLocation.latitude, lng: driverLocation.longitude });
      }
      
      // 3. Trip origin (Point A)
      if (selectedTrip.origin?.coordinates) {
        points.push({ lat: selectedTrip.origin.coordinates.latitude, lng: selectedTrip.origin.coordinates.longitude });
      }
      
      // 4. Trip destination (Point B)
      if (selectedTrip.destination?.coordinates) {
        points.push({ lat: selectedTrip.destination.coordinates.latitude, lng: selectedTrip.destination.coordinates.longitude });
      }
      
      setPointsToFit(points.filter(p => p.lat && p.lng)); // Filter out any invalid points
    } else {
      setPointsToFit(null);
    }
  }, [selectedTrip, currentPosition, driverLocation]);

  const [mapViewMode, setMapViewMode] = useState('currentLocation'); // Default to currentLocation
  const [userDraggedMap, setUserDraggedMap] = useState(false); // True after user drags map
  const [forceRecenter, setForceRecenter] = useState(false); // Force a one-shot re-center
  const intervalRef = useRef(null); // Use a ref to store the interval ID

  useEffect(() => {
    // Clear any existing interval when the effect re-runs or component unmounts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (selectedTrip && (selectedTrip.status === 'pending' || selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress')) {
      // If a trip is active, start alternating, starting with 'allPoints'
      setMapViewMode('allPoints'); // Start with all points when trip becomes active
      intervalRef.current = setInterval(() => {
        setMapViewMode(prevMode => (prevMode === 'allPoints' ? 'currentLocation' : 'allPoints'));
      }, 25000); // Toggle every 25 seconds
    } else {
      // If no active trip, default to 'currentLocation'
      setMapViewMode('currentLocation');
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selectedTrip]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    setHasActiveRequest(myRideRequests.some(
      (request) => request.status === 'pending' || request.status === 'accepted' || request.status === 'in_progress'
    ));
  }, [myRideRequests]);

  useEffect(() => {
    if (selectedTrip) {
      setOriginQuery(selectedTrip.origin.address);
      setDestinationQuery(selectedTrip.destination.address);
    } else {
      setOriginQuery('');
      setDestinationQuery('');
    }
  }, [selectedTrip]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToPassengerRideRequestUpdates(currentUser.uid, (rideRequests) => {
      setMyRideRequests(rideRequests);

      const activeTrip = rideRequests.find(
        request => request.status === 'pending' || request.status === 'accepted' || request.status === 'in_progress'
      );
      setSelectedTrip(activeTrip || null);

      const completedTrips = rideRequests.filter(
        request => request.status === 'completed'
      );
      setMyBookings(completedTrips);
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (selectedTrip?.driverId) {
      const driverLocationRef = doc(db, 'locations', selectedTrip.driverId);
      const unsubscribe = onSnapshot(driverLocationRef, (doc) => {
        if (doc.exists()) {
          setDriverLocation(doc.data().location);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [selectedTrip]);

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
  
  const tabs = [
    { id: 'search', name: STRINGS.BUSCAR_VIAJE },
    { id: 'my-requests', name: STRINGS.MIS_SOLICITUDES },
    { id: 'my-trips', name: STRINGS.MIS_VIAJES },
  ];

  // Handle location selection on the map
  const handleLocationSelect = async (latlng) => {
    // Pause auto-centering while user is picking a location on the map
    setUserDraggedMap(true);
    try {
      const address = await getAddressFromCoordinates(latlng.lat, latlng.lng);
      
      if (!origin) {
        setOrigin({ 
          lat: latlng.lat,
          lng: latlng.lng,
          name: STRINGS.ORIGEN,
          address: address || STRINGS.UBICACION_SELECCIONADA
        });
        setOriginQuery(address || STRINGS.UBICACION_SELECCIONADA); // Update query
      } else if (!destination) {
        setDestination({ 
          lat: latlng.lat,
          lng: latlng.lng,
          name: STRINGS.DESTINO,
          address: address || STRINGS.UBICACION_SELECCIONADA
        });
        setDestinationQuery(address || STRINGS.UBICACION_SELECCIONADA); // Update query
      }
    } catch (error) {
      console.error('Error getting address:', error);
      setError(STRINGS.ERROR_OBTENER_DIRECCION);
    }
  };

  // Helper function to get address from coordinates
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name || STRINGS.UBICACION_SELECCIONADA;
    } catch (error) {
      console.error('Error getting address:', error);
      return STRINGS.UBICACION_SELECCIONADA;
    }
  };

  const handleSetCurrentLocationAsOrigin = async () => {
    if (currentPosition) {
      try {
        const address = await getAddressFromCoordinates(currentPosition[0], currentPosition[1]);
        setOrigin({
          lat: currentPosition[0],
          lng: currentPosition[1],
          name: STRINGS.ORIGEN,
          address: address || STRINGS.UBICACION_SELECCIONADA
        });
        setOriginQuery(address || STRINGS.UBICACION_SELECCIONADA);
      } catch (error) {
        console.error('Error getting address from current location:', error);
        setError(STRINGS.ERROR_OBTENER_DIRECCION);
      }
    }
  };

  const canCancelActiveRequest = () => {
    if (!selectedTrip) return false;
    
    // Si el viaje no está en un estado cancelable, retornar false
    if (!['pending', 'accepted', 'in_progress'].includes(selectedTrip.status)) {
      return false;
    }

    // Asegurarse de que acceptedAt sea un objeto Date
    try {
      const acceptedTime = selectedTrip.acceptedAt?.toDate ? 
        selectedTrip.acceptedAt.toDate() : 
        (selectedTrip.acceptedAt ? new Date(selectedTrip.acceptedAt) : new Date());
      
      const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
      
      // Solo permitir cancelar si han pasado menos de 30 segundos desde que fue aceptado
      return acceptedTime > thirtySecondsAgo;
    } catch (error) {
      console.error('Error al verificar el tiempo de cancelación:', error);
      return false;
    }
  };

  // Handle canceling the active request
  const handleCancelActiveRequest = () => {
    if (selectedTrip) {
      const id = selectedTrip.id || selectedTrip.tripId || selectedTrip.rideRequestId;
      if (id) {
        handleCancelRequest(id);
      } else {
        alert("No se pudo identificar el viaje a cancelar.");
      }
    }
  };

  // Handle canceling a ride request by ID
  const handleCancelRequest = async (requestId) => {
    if (!window.confirm(STRINGS.CONFIRMAR_CANCELAR_SOLICITUD)) {
      return;
    }
    
    try {
      setLoading(true);
      await updateRideRequestStatus(requestId, 'cancelled', {
        cancelledAt: serverTimestamp(),
        cancelledBy: 'passenger'
      });
      
      // Actualizar estado local
      setMyRideRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { 
                ...req, 
                status: 'cancelled', 
                updatedAt: new Date(),
                cancelledAt: new Date()
              } 
            : req
        )
      );
      
      // Limpiar el viaje seleccionado si es el que se está cancelando
      if (selectedTrip?.id === requestId) {
        setSelectedTrip(null);
      }
      
      alert('Solicitud cancelada correctamente');
      
    } catch (error) {
      console.error('Error al cancelar la solicitud:', error);
      setError(error.message || STRINGS.ERROR_CANCELAR_SOLICITUD);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestRide = async () => {
    if (!origin || !destination) {
      setError(STRINGS.SELECCIONAR_ORIGEN_DESTINO);
      return;
    }

    if (!currentUser) {
      navigate('/login', { state: { from: 'passenger' } });
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const rideRequest = {
        passengerId: currentUser.uid,
        passengerName: currentUser.displayName || STRINGS.USUARIO,
        passengerEmail: currentUser.email,
        origin: {
          address: origin.address,
          coordinates: new GeoPoint(origin.lat, origin.lng)
        },
        destination: {
          address: destination.address,
          coordinates: new GeoPoint(destination.lat, destination.lng)
        },
        status: 'pending',
        passengerPhotoURL: currentUser.photoURL || null,
        estimatedPrice: parseInt(suggestedPrice) || 0,
      };
      
      await createRideRequest(rideRequest);
      setSuccessMessage('¡Tu solicitud de viaje ha sido publicada! Un conductor la aceptará pronto.');
      
      setOrigin(null);
      setDestination(null);
      setUserDraggedMap(false); // Resume auto-centering
      
    } catch (error) {
      console.error('Error al procesar la solicitud de viaje:', error);
      setError(error.message || 'Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookTrip = async (rideRequest) => {
    if (!currentUser) {
      navigate('/login', { state: { from: 'passenger' } });
      return;
    }

    setLoading(true);
    setError('');

    try {
      await updateRideRequestStatus(rideRequest.id, 'pending', {
        passengerId: currentUser.uid,
        passengerName: currentUser.displayName || STRINGS.USUARIO,
        passengerPhotoURL: currentUser.photoURL || null,
      });

      setSuccessMessage('¡Viaje reservado con éxito!');

    } catch (error) {
      console.error(STRINGS.ERROR_RESERVAR_VIAJE, error);
      setError(error.message || STRINGS.ERROR_OCURRIDO_RESERVAR_VIAJE);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='min-h-screen bg-light dark:bg-gray-900 pt-16 transition-colors duration-200'>
      {isChatOpen && selectedTrip && (
        <Chat 
          tripId={selectedTrip.tripId || selectedTrip.id} 
          onClose={() => setIsChatOpen(false)} 
          onNewMessage={() => { if (!isChatOpen) setHasUnreadChat(true); }}
          otherUserName={selectedTrip.driverName}
          otherUserPhotoURL={selectedTrip.driverPhotoURL} 
          otherUserId={selectedTrip.driverId}
        />
      )}

      {/* Título principal - Visible en todas las pantallas */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2'>
        <h1 className='text-2xl font-bold text-dark dark:text-white'>{STRINGS.PANEL_DEL_PASAJERO}</h1>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4'>
        
        {/* locationError moved to floating container */}
        {/* Floating driver info card - shown when trip is accepted or in progress */}
        {selectedTrip && (selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress') && selectedTrip.passengerId === currentUser?.uid && (
          <div className='fixed bottom-0 left-0 right-0 animate-slide-up cursor-pointer' style={{ zIndex: 999 }} onClick={() => navigate(`/profile/${selectedTrip.driverId}`)}>
            <div className='mx-auto max-w-2xl px-3 pb-3'>
              <div className='bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 animate-pulse hover:opacity-90 transition-opacity'>

                {/* Ping indicator */}
                <span className='relative flex-shrink-0 flex h-2.5 w-2.5'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60' />
                  <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-white' />
                </span>

                {/* Avatar */}
                <div className='flex-shrink-0'>
                  <UserAvatar 
                    userId={selectedTrip.driverId} 
                    fallbackName={selectedTrip.driverName} 
                    className="border-2 border-white/60" 
                  />
                </div>

                {/* Info */}
                <div className='flex-1 min-w-0'>
                  <p className='text-white font-semibold text-sm leading-tight truncate'>
                    {selectedTrip.status === 'accepted' ? '¡Conductor en camino!' : '¡Viaje en curso!'}
                  </p>
                  <p className='text-white/80 text-xs truncate'>
                    {selectedTrip.driverName || 'Conductor'}
                    {selectedTrip.rating > 0 && (
                      <span className='ml-2'>⭐ {Number(selectedTrip.rating).toFixed(1)}</span>
                    )}
                  </p>
                </div>

                {/* Price */}
                {selectedTrip.estimatedPrice > 0 && (
                  <div className='flex-shrink-0 text-right'>
                    <p className='text-white/70 text-[10px] uppercase tracking-wide'>Precio</p>
                    <p className='text-white font-bold text-base leading-tight'>
                      ${Number(selectedTrip.estimatedPrice).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Sidebar izquierda - Contenido principal */}
          <div className='lg:col-span-1 space-y-6 order-2 lg:order-1'>
            {/* Tabs - Visibles en móviles y escritorio */}
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
              
              <div className='flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 mb-4 gap-1'>
                {tabs.map((tab) => (
                  <button 
                    key={tab.id}
                    className={`flex-1 py-2 px-1 text-xs font-semibold text-center rounded-md transition-all duration-200 ${
                      activeTab === tab.id 
                        ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm' 
                        : 'text-gray-700 dark:text-gray-200 bg-transparent'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Notificaciones Flotantes */}
              <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-2 w-full max-w-xs sm:max-w-sm pointer-events-none">
                {successMessage && (
                  <div className='p-3 bg-success text-white rounded-lg shadow-xl flex justify-between items-center pointer-events-auto animate-slide-up'>
                    <span className="text-sm font-medium">{successMessage}</span>
                    <button onClick={() => setSuccessMessage('')} className='ml-3 text-xl font-bold leading-none p-1 hover:text-gray-200'>&times;</button>
                  </div>
                )}
                {error && (
                  <div className='p-3 bg-danger text-white rounded-lg shadow-xl flex justify-between items-center pointer-events-auto animate-slide-up'>
                    <span className="text-sm font-medium">{error}</span>
                    <button onClick={() => setError('')} className='ml-3 text-xl font-bold leading-none p-1 hover:text-gray-200'>&times;</button>
                  </div>
                )}
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

              {/* My Requests Tab */}
              {activeTab === 'my-requests' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-dark dark:text-white">{STRINGS.MIS_SOLICITUDES_DE_VIAJE}</h3>
                  {myRideRequests.length === 0 ? (
                    <p className="text-sm text-secondary py-4 text-center">{STRINGS.NO_TIENES_SOLICITUDES}</p>
                  ) : (
                    <div className="space-y-4">
                      {myRideRequests.map((request) => (
                        <div key={request.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-dark dark:text-white">
                                {request.origin?.address || STRINGS.ORIGEN} → {request.destination?.address || STRINGS.DESTINO}
                              </h3>
                              <p className="text-sm text-secondary dark:text-gray-400 mt-1">
                                {formatDate(request.createdAt)}
                              </p>
                              <div className="mt-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  {
                                    pending: 'bg-warning text-white',
                                    accepted: 'bg-blue-500 text-white',
                                    in_progress: 'bg-blue-600 text-white',
                                    completed: 'bg-success text-white',
                                    cancelled: 'bg-secondary text-white'
                                  }[request.status] || 'bg-gray-400 text-white'
                                }`}>
                                  {
                                    {
                                      pending: STRINGS.PENDIENTE,
                                      accepted: STRINGS.ACEPTADO,
                                      in_progress: STRINGS.EN_CURSO,
                                      completed: STRINGS.COMPLETADO,
                                      cancelled: STRINGS.CANCELADO
                                    }[request.status] || request.status
                                  }
                                </span>
                              </div>
                            </div>
                            {request.status === 'pending' && (
                              <Button
                                onClick={() => handleCancelRequest(request.id)}
                                className="text-danger hover:text-danger-dark text-sm font-medium"
                                disabled={loading}
                              >
                                {loading ? STRINGS.CANCELANDO : STRINGS.CANCELAR}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Search Tab */}
              {activeTab === 'search' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-dark dark:text-white">{STRINGS.BUSCAR_VIAJE}</h3>
                  <AddressInput
                    label={STRINGS.ORIGEN}
                    icon={<FaMapMarkerAlt className="text-danger" />}
                    onSelect={(location) => setOrigin(location)}
                    value={originQuery}
                    onChange={setOriginQuery}
                    onUseCurrentLocation={handleSetCurrentLocationAsOrigin}
                    onClear={() => {
                      setOrigin(null);
                      setOriginQuery('');
                      setUserDraggedMap(false);
                    }}
                  />
                  
                  <AddressInput
                    label={STRINGS.DESTINO}
                    icon={<FaMapMarkerAlt className="text-success" />}
                    onSelect={(location) => setDestination(location)}
                    value={destinationQuery}
                    onChange={setDestinationQuery}
                    onClear={() => {
                      setDestination(null);
                      setDestinationQuery('');
                    }}
                  />

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-dark dark:text-gray-300 mb-1">
                      {STRINGS.PRECIO_SUGERIDO}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-secondary dark:text-gray-400 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        placeholder="0"
                        value={suggestedPrice}
                        onChange={(e) => setSuggestedPrice(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  {hasActiveRequest ? (
                    <Button
                      onClick={handleCancelActiveRequest}
                      disabled={loading || !canCancelActiveRequest()}
                      className="w-full bg-danger text-white py-2 rounded-lg font-medium hover:bg-danger-dark transition-colors"
                    >
                      {loading ? STRINGS.CANCELANDO : STRINGS.CANCELAR_VIAJE}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleRequestRide}
                      disabled={!origin || !destination || loading}
                      className="w-full bg-success text-white py-2 rounded-lg font-medium hover:bg-success-dark transition-colors"
                    >
                      {loading ? STRINGS.BUSCANDO_CONDUCTOR : STRINGS.SOLICITAR_VIAJE}
                    </Button>
                  )}
                  
                  {origin && destination && (
                    <p className="mt-2 text-xs text-center text-secondary">
                      {STRINGS.CONDUCTORES_CERCANOS_NOTIFICADOS}
                    </p>
                  )}

                  {/* Available Trips */}
                  {availableTrips.length > 0 && (
                    <div className="mt-8">
                      <h4 className="font-medium text-dark dark:text-white mb-4">{STRINGS.VIAJES_DISPONIBLES}</h4>
                      <div className="space-y-4">
                        {availableTrips.map((trip) => (
                          <div key={trip.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-medium text-dark dark:text-white">{trip.driverName}</h3>
                                <div className="flex items-center text-warning text-sm">
                                  <FaStar className="mr-1" />
                                  <span>{trip.rating} ({trip.reviewCount} {STRINGS.RESENAS})</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-primary">${trip.price?.toLocaleString()}</div>
                                <div className="text-sm text-secondary dark:text-gray-400">
                                  {trip.availableSeats > 0 
                                    ? `${trip.availableSeats} ${trip.availableSeats > 1 ? STRINGS.ASIENTOS : STRINGS.ASIENTO} ${STRINGS.DISPONIBLE}`
                                    : STRINGS.SIN_CUPOS}
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2 text-sm mb-4">
                              <div className="flex items-center">
                                <FaMapMarkerAlt className="text-danger mr-2 w-4" />
                                <span className="truncate dark:text-gray-300">{trip.origin?.address}</span>
                              </div>
                              <div className="flex items-center">
                                <FaMapMarkerAlt className="text-success mr-2 w-4" />
                                <span className="truncate dark:text-gray-300">{trip.destination?.address}</span>
                              </div>
                              <div className="flex items-center text-secondary dark:text-gray-400">
                                <FaClock className="mr-2 w-4" />
                                <span>{formatDate(trip.departureTime)}</span>
                              </div>
                              <div className="flex items-center text-secondary dark:text-gray-400">
                                <FaCar className="mr-2 w-4" />
                                <span>{trip.carModel} • {trip.carPlate}</span>
                              </div>
                            </div>
                            
                            <Button
                              onClick={() => handleBookTrip(trip)}
                              disabled={!trip.availableSeats || loading}
                              className={`w-full ${
                                trip.availableSeats > 0 
                                  ? 'bg-success hover:bg-success-dark' 
                                  : 'bg-secondary cursor-not-allowed'
                              }`}
                            >
                              {trip.availableSeats > 0 ? STRINGS.RESERVAR_AHORA : STRINGS.SIN_CUPOS_DISPONIBLES}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* My Trips Tab */}
              {activeTab === 'my-trips' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-dark dark:text-white">{STRINGS.MIS_VIAJES}</h3>
                  {myBookings.length === 0 ? (
                    <div className="text-center py-8 text-secondary dark:text-gray-400">
                      <p>{STRINGS.NO_TIENES_VIAJES_PROGRAMADOS}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myBookings.map((booking) => (
                        <div key={booking.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium text-dark dark:text-white">
                                {booking.origin?.address?.split(',')[0]} → {booking.destination?.address?.split(',')[0]}
                              </h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                booking.status === 'confirmed' 
                                  ? 'bg-success text-white' 
                                  : booking.status === 'cancelled' 
                                    ? 'bg-secondary text-white' 
                                    : 'bg-warning text-white'
                              }`}>
                                {booking.status === 'confirmed' ? STRINGS.CONFIRMADO : 
                                 booking.status === 'pending' ? STRINGS.PENDIENTE : 
                                 booking.status === 'cancelled' ? STRINGS.CANCELADO : booking.status}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">${booking.price?.toLocaleString()}</div>
                              <div className="text-sm text-secondary dark:text-gray-400">
                                {booking.departureTime && formatDate(booking.departureTime)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-danger mr-2 w-4" />
                              <span className="truncate dark:text-gray-300">{booking.origin?.address}</span>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-success mr-2 w-4" />
                              <span className="truncate dark:text-gray-300">{booking.destination?.address}</span>
                            </div>
                            {booking.driverName && (
                              <div className="flex items-center text-secondary dark:text-gray-400">
                                <span className="mr-2">{STRINGS.CONDUCTOR}</span>
                                <span>{booking.driverName}</span>
                              </div>
                            )}
                          </div>
                          
                          {booking.status === 'pending' && (
                            <div className="mt-4 pt-3 border-t">
                              <Button
                                onClick={() => handleCancelBooking(booking.id)}
                                disabled={loading}
                                className="w-full bg-danger text-white py-2 rounded-lg font-medium hover:bg-danger-dark transition-colors"
                              >
                                {loading ? STRINGS.CANCELANDO : STRINGS.CANCELAR_RESERVA}
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mapa - Visible en móviles (arriba) y escritorio (derecha) */}
          <div className='lg:col-span-2 order-1 lg:order-2 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden relative' style={{ height: isMapCollapsed ? '0' : 'calc(100vh - 8rem)', transition: 'height 0.3s ease' }}>
            <div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
              {!currentPosition && (
                <div className='text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
                  <p className='text-lg font-medium text-gray-700 dark:text-gray-300'>Cargando mapa...</p>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>Obteniendo tu ubicación</p>
                </div>
              )}
            </div>
        
        <MapContainer 
          center={currentPosition || [0, 0]}
          zoom={currentPosition ? 13 : 2}
          style={{ 
            height: '100%', 
            width: '100%',
            position: 'relative',
            zIndex: 5,
            flex: '1 1 auto',
            minHeight: 0 // Ensures the map container can shrink below its content size
          }}
          zoomControl={true}
          attributionControl={false}
        >
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            />
            {mapViewMode === 'currentLocation' && currentPosition && !userDraggedMap && (
              <RecenterMap position={currentPosition} zoom={15} />
            )}
            {forceRecenter && currentPosition && (
              <ForceCenterMap position={currentPosition} zoom={15} />
            )}
            {mapViewMode === 'allPoints' && pointsToFit && pointsToFit.length > 0 && (
              <FitBoundsToMarkers points={pointsToFit} />
            )}
            
            {/* Passenger Location Marker */}
            {currentPosition && (
              <Marker 
                position={currentPosition} 
                icon={createPhotoMarkerIcon(
                  currentUser?.photoURL,
                  currentUser?.displayName?.charAt(0)?.toUpperCase(),
                  '#f1c40f',
                  false
                )}
              >
                <Popup>{STRINGS.TU_UBICACION}</Popup>
              </Marker>
            )}
            
            {/* Driver Location Marker */}
            {driverLocation && selectedTrip && (
              <Marker 
                position={[driverLocation.latitude, driverLocation.longitude]} 
                eventHandlers={{ click: () => navigate(`/profile/${selectedTrip.driverId}`) }}
                icon={createPhotoMarkerIcon(
                  selectedTrip.driverPhotoURL,
                  selectedTrip.driverName?.charAt(0)?.toUpperCase(),
                  '#2ecc71',
                  selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress'
                )}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-medium cursor-pointer text-blue-600 hover:underline">{selectedTrip.driverName}</p>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Origin and Destination Markers */}
            {selectedTrip ? (
              <>
                <Marker
                  position={[selectedTrip.origin.coordinates.latitude, selectedTrip.origin.coordinates.longitude]}
                  icon={originIcon}
                >
                  <Popup>{STRINGS.ORIGEN}: {selectedTrip.origin.address}</Popup>
                </Marker>
                <Marker
                  position={[selectedTrip.destination.coordinates.latitude, selectedTrip.destination.coordinates.longitude]}
                  icon={destinationIcon}
                >
                  <Popup>{STRINGS.DESTINO}: {selectedTrip.destination.address}</Popup>
                </Marker>
                <Routing
                  origin={{ lat: selectedTrip.origin.coordinates.latitude, lng: selectedTrip.origin.coordinates.longitude }}
                  destination={{ lat: selectedTrip.destination.coordinates.latitude, lng: selectedTrip.destination.coordinates.longitude }}
                />
              </>
            ) : (
              <>
                {origin && (
                  <Marker 
                    position={[origin.lat, origin.lng]} 
                    icon={originIcon}
                  >
                    <Popup>{STRINGS.ORIGEN}: {origin.address}</Popup>
                  </Marker>
                )}
                
                {destination && (
                  <Marker 
                    position={[destination.lat, destination.lng]} 
                    icon={destinationIcon}
                  >
                    <Popup>{STRINGS.DESTINO}: {destination.address}</Popup>
                  </Marker>
                )}

                {origin && destination && (
                  <Routing origin={origin} destination={destination} />
                )}
              </>
            )}
            <LocationSelector onSelect={handleLocationSelect} onDrag={() => setUserDraggedMap(true)} />
            
            </MapContainer>
          </div>

          {/* Botones flotantes - Mapa y Chat */}
          <div className='fixed top-20 right-4 flex gap-2' style={{ zIndex: 1000 }}>
            {selectedTrip && (selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress') && (
              <button
                onClick={() => { setIsChatOpen(!isChatOpen); setHasUnreadChat(false); }}
                className='relative bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
              >
                <FaCommentDots className='text-primary text-xl' />
                {hasUnreadChat && !isChatOpen && (
                  <span className='absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse' />
                )}
              </button>
            )}
            <button
              onClick={() => setIsMapCollapsed(!isMapCollapsed)}
              className='bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
            >
              <FaMap className='text-gray-700 dark:text-gray-300' />
            </button>
          </div>
        </div>
      </div>
      
      {/* Rating Modal - Always render but control visibility with isOpen */}
      {tripToRate && (
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => {
            setShowRatingModal(false);
          }}
          onSubmit={handleRateTrip}
          rideRequestId={tripToRate.id}
        />
      )}
    </div>
  );
}
