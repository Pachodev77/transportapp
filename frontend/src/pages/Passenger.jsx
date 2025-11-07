import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingModal from '../components/RatingModal';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet';
import { FaSearch, FaMapMarkerAlt, FaCar, FaSpinner, FaStar, FaClock, FaCommentDots, FaStarHalfAlt } from 'react-icons/fa';
import { 
  collection, 
  query, 
  where, 
  addDoc, 
  onSnapshot,
  serverTimestamp,
  orderBy,
  updateDoc,
  doc,
  setDoc,
  GeoPoint,
  increment,
  getDocs
} from 'firebase/firestore';
import { db, runTransaction } from '../firebase/config';
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

function LocationSelector({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    }
  });
  return null;
}

function RecenterMap({ position, zoom }) {
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
  const [successMessage, setSuccessMessage] = useState('');
  const [pointsToFit, setPointsToFit] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [tripToRate, setTripToRate] = useState(null);

  // Handle rating a trip
  const handleRateTrip = async ({ tripId, rating, comment }) => {
    if (!currentUser) {
      setError('Debes iniciar sesión para calificar un viaje');
      return;
    }

    try {
      setLoading(true);
      
      // Obtener la referencia del viaje
      const tripRef = doc(db, 'trips', tripId);
      
      // Usar transacción para asegurar consistencia
      await runTransaction(db, async (transaction) => {
        // Obtener los datos actuales del viaje
        const tripDoc = await transaction.get(tripRef);
        if (!tripDoc.exists()) {
          throw new Error('El viaje no existe');
        }
        
        const tripData = tripDoc.data();
        
        // Verificar que el usuario actual sea el pasajero
        if (tripData.passengerId !== currentUser.uid) {
          throw new Error('No tienes permiso para calificar este viaje');
        }
        
        // Verificar que el viaje esté completado o cancelado
        if (tripData.status !== 'completed' && tripData.status !== 'cancelled') {
          throw new Error('Solo puedes calificar viajes completados o cancelados');
        }
        
        // Verificar que no se haya calificado ya
        if (tripData.rating) {
          throw new Error('Este viaje ya fue calificado');
        }
        
        // Actualizar el viaje con la calificación
        transaction.update(tripRef, {
          rating,
          comment: comment || '',
          ratedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          ratedBy: [...(tripData.ratedBy || []), currentUser.uid]
        });

        // Actualizar la calificación del conductor
        if (tripData.driverId) {
          const driverRef = doc(db, 'users', tripData.driverId);
          const driverDoc = await transaction.get(driverRef);
          
          if (driverDoc.exists()) {
            const driverData = driverDoc.data();
            const newRatingCount = (driverData.ratingCount || 0) + 1;
            const newRating = ((driverData.rating || 0) * (newRatingCount - 1) + rating) / newRatingCount;
            
            transaction.update(driverRef, {
              rating: parseFloat(newRating.toFixed(1)),
              ratingCount: newRatingCount,
              updatedAt: serverTimestamp()
            });
          }
        }
      });

      // Update local state
      setMyBookings(prev => prev.map(booking => 
        booking.id === tripId 
          ? { ...booking, rating, comment, status: 'completed' } 
          : booking
      ));

      setSuccessMessage('¡Gracias por calificar tu viaje!');
    } catch (error) {
      console.error('Error rating trip:', error);
      setError('Error al calificar el viaje. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Show rating modal for completed trips
  useEffect(() => {
    if (!currentUser) return;
    
    // Buscar viajes completados sin calificar donde el usuario actual sea el pasajero
    const completedTrip = myBookings.find(trip => {
      // Verificar que el viaje esté completado
      const isCompleted = trip.status === 'completed';
      // Verificar que el usuario actual sea el pasajero y NO el conductor
      const isPassenger = trip.passengerId === currentUser.uid && trip.driverId !== currentUser.uid;
      // Verificar que el viaje no tenga calificación o que el usuario no haya calificado aún
      const isNotRated = !trip.rating || (trip.ratedBy && !trip.ratedBy.includes(currentUser.uid));
      // Verificar que el viaje esté marcado como canRate o tenga completedAt reciente (últimas 24h)
      const canRate = trip.canRate || 
                    (trip.completedAt && 
                     (typeof trip.completedAt === 'object' 
                      ? new Date(trip.completedAt.seconds * 1000) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                      : new Date(trip.completedAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                     ));
      
      return isCompleted && isPassenger && isNotRated && canRate;
    });
    
    if (completedTrip && !showRatingModal) {
      console.log('Mostrando modal de calificación para el viaje:', completedTrip.id);
      
      // Mostrar el modal después de un pequeño retraso para asegurar que la UI esté lista
      const timer = setTimeout(() => {
        // Verificar nuevamente que el usuario sea el pasajero antes de mostrar el modal
        if (completedTrip.passengerId === currentUser.uid && completedTrip.driverId !== currentUser.uid) {
          setTripToRate(completedTrip);
          setShowRatingModal(true);
          
          // Marcar que ya se mostró el modal para este viaje
          setMyBookings(prev => 
            prev.map(trip => 
              trip.id === completedTrip.id 
                ? { ...trip, canRate: false } // Evitar que se muestre de nuevo
                : trip
            )
          );
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [myBookings, currentUser, showRatingModal]);

  // Effect to update points to fit when a trip is active
  useEffect(() => {
    if (selectedTrip && (selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress')) {
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
  const intervalRef = useRef(null); // Use a ref to store the interval ID

  useEffect(() => {
    // Clear any existing interval when the effect re-runs or component unmounts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (selectedTrip && (selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress')) {
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
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
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
      },
      (error) => {
        setLocationError(`Location access denied (Code: ${error.code}). Please ensure location services are enabled for your browser and this site.`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [currentUser]);
  
  const tabs = [
    { id: 'search', name: STRINGS.BUSCAR_VIAJE },
    { id: 'my-requests', name: STRINGS.MIS_SOLICITUDES },
    { id: 'my-trips', name: STRINGS.MIS_VIAJES },
  ];

  // Handle location selection on the map
  const handleLocationSelect = async (latlng) => {
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

    if (selectedTrip.status === 'pending') {
      return true; // Can cancel pending requests at any time
    }

    if (selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress') {
      if (!selectedTrip.acceptedAt) return false; // Should not happen if accepted

      const acceptedTime = selectedTrip.acceptedAt.toDate(); // Convert Firestore timestamp to Date object
      const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);

      return acceptedTime > thirtySecondsAgo;
    }

    return false;
  };

  const handleCancelActiveRequest = () => {
    if (selectedTrip) {
      handleCancelRequest(selectedTrip.id);
    }
  };

  // Handle canceling a ride request
  const handleCancelRequest = async (requestId) => {
    if (!window.confirm(STRINGS.CONFIRMAR_CANCELAR_SOLICITUD)) {
      return;
    }
    
    try {
      setLoading(true);
      const requestRef = doc(db, 'rideRequests', requestId);
      await updateDoc(requestRef, {
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error canceling ride request:', error);
      setError(STRINGS.ERROR_CANCELAR_SOLICITUD);
    } finally {
      setLoading(false);
    }
  };

  // Handle ride request submission
  const handleRequestRide = async () => {
    if (!origin || !destination) {
      setError(STRINGS.SELECCIONAR_ORIGEN_DESTINO);
      return;
    }

    if (!currentUser) {
      navigate('/login', { state: { from: 'passenger' } });
      return;
    }

    const hasActiveRequest = myRideRequests.some(
      (request) => request.status === 'pending' || request.status === 'accepted'
    );

    if (hasActiveRequest) {
      setError('Ya tienes una solicitud de viaje activa.');
      return;
    }

    setLoading(true);
    setError('');

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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        passengerPhotoURL: currentUser.photoURL || null,
        estimatedPrice: parseInt(suggestedPrice) || 0, // Use the suggested price
        estimatedDistance: null, 
        estimatedDuration: null 
      };
      
      // Add the ride request to the 'rideRequests' collection
      await addDoc(collection(db, 'rideRequests'), rideRequest);
      
      // Reset the form
      setOrigin(null);
      setDestination(null);
      
      setSuccessMessage('¡Tu solicitud de viaje ha sido publicada! Un conductor la aceptará pronto.');
      
    } catch (error) {
      console.error(STRINGS.ERROR_SOLICITAR_VIAJE, error);
      alert(`Error al crear el viaje: ${error.message}`); // Added alert
      setError(STRINGS.ERROR_OCURRIDO_SOLICITAR_VIAJE);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available trips
  useEffect(() => {
    if (!currentUser) return;
    
    const tripsQuery = query(
      collection(db, 'trips'),
      where('status', '==', 'available'),
      orderBy('departureTime', 'asc')
    );
    
    const unsubscribe = onSnapshot(tripsQuery, (snapshot) => {
      const trips = [];
      snapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });
      setAvailableTrips(trips);
    });
    
    return () => unsubscribe();
  }, [currentUser]);

  // Fetch user's ride requests
  useEffect(() => {
    if (!currentUser) return;

    const getInitialRideRequests = async () => {
      const rideRequestsQuery = query(
        collection(db, 'rideRequests'),
        where('passengerId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(rideRequestsQuery);
      const requests = [];
      let activeTrip = null;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const request = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        };
        requests.push(request);
        
        // Solo considerar como viaje activo si está en estos estados
        if ((!activeTrip || activeTrip.status === 'completed') && 
            (request.status === 'accepted' || request.status === 'in_progress')) {
          activeTrip = request;
        }
      });
      
      // Filtrar solicitudes para mostrar solo las activas en myRideRequests
      const activeRequests = requests.filter(req => 
        ['pending', 'accepted', 'in_progress'].includes(req.status)
      );
      
      setMyRideRequests(activeRequests);
      
      // Solo establecer el viaje seleccionado si es un viaje activo
      if (activeTrip && (activeTrip.status === 'accepted' || activeTrip.status === 'in_progress')) {
        setSelectedTrip(activeTrip);
      } else {
        setSelectedTrip(null);
      }
    };

    getInitialRideRequests();
    
    const rideRequestsQuery = query(
      collection(db, 'rideRequests'),
      where('passengerId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribeRideRequests = onSnapshot(rideRequestsQuery, (snapshot) => {
      const requests = [];
      let activeTrip = null;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const request = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        };
        requests.push(request);
        
        // Solo considerar como viaje activo si está en estos estados
        if ((!activeTrip || activeTrip.status === 'completed') && 
            (request.status === 'accepted' || request.status === 'in_progress')) {
          activeTrip = request;
        }
      });
      
      // Filtrar solicitudes para mostrar solo las activas en myRideRequests
      const activeRequests = requests.filter(req => 
        ['pending', 'accepted', 'in_progress'].includes(req.status)
      );
      
      setMyRideRequests(activeRequests);
      
      // Solo establecer el viaje seleccionado si es un viaje activo
      if (activeTrip && (activeTrip.status === 'accepted' || activeTrip.status === 'in_progress')) {
        setSelectedTrip(activeTrip);
      } else {
        setSelectedTrip(null);
      }
    }, (error) => {
      console.error('Error al cargar solicitudes de viaje:', error);
      setError('Error al cargar las solicitudes de viaje');
    });
    
    return () => unsubscribeRideRequests();
  }, [currentUser]);
  
  // Fetch user's bookings
  useEffect(() => {
    if (!currentUser) return;
    
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('passengerId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribeBookings = onSnapshot(bookingsQuery, (snapshot) => {
      const bookings = [];
      snapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() });
      });
      setMyBookings(bookings);
    });
    
    return () => unsubscribeBookings();
  }, [currentUser]);

  // Handle trip booking
  const handleBookTrip = async (trip) => {
    if (!currentUser) {
      navigate('/login', { state: { from: 'passenger' } });
      return;
    }

    setLoading(true);
    setError('');

    try {
      await runTransaction(db, async (transaction) => {
        const tripRef = doc(db, 'trips', trip.id);
        const tripDoc = await transaction.get(tripRef);

        if (!tripDoc.exists() || tripDoc.data().availableSeats <= 0) {
          throw new Error('No hay asientos disponibles en este viaje.');
        }

        // Decrement available seats
        transaction.update(tripRef, {
          availableSeats: increment(-1),
          updatedAt: serverTimestamp(),
        });

        // Create a new booking
        const bookingRef = doc(collection(db, 'bookings'));
        transaction.set(bookingRef, {
          tripId: trip.id,
          passengerId: currentUser.uid,
          passengerName: currentUser.displayName || STRINGS.USUARIO,
          driverId: trip.driverId,
          driverName: trip.driverName,
          origin: trip.origin,
          destination: trip.destination,
          departureTime: trip.departureTime,
          price: trip.price,
          status: 'pending',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });

      setSuccessMessage('¡Viaje reservado con éxito!');

    } catch (error) {
      console.error(STRINGS.ERROR_RESERVAR_VIAJE, error);
      setError(error.message || STRINGS.ERROR_OCURRIDO_RESERVAR_VIAJE);
    } finally {
      setLoading(false);
    }
  };

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm(STRINGS.CONFIRMAR_CANCELAR_RESERVA)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await runTransaction(db, async (transaction) => {
        const bookingRef = doc(db, 'bookings', bookingId);
        const bookingDoc = await transaction.get(bookingRef);

        if (!bookingDoc.exists()) {
          throw new Error('Esta reserva ya no existe.');
        }

        const booking = bookingDoc.data();

        // Update booking status
        transaction.update(bookingRef, {
          status: 'cancelled',
          updatedAt: serverTimestamp(),
        });

        // Increment available seats if the booking was confirmed
        if (booking.status === 'confirmed') {
          const tripRef = doc(db, 'trips', booking.tripId);
          transaction.update(tripRef, {
            availableSeats: increment(1),
            updatedAt: serverTimestamp(),
          });
        }
      });

      setSuccessMessage('¡Reserva cancelada con éxito!');

    } catch (error) {
      console.error(STRINGS.ERROR_CANCELAR_RESERVA, error);
      setError(error.message || STRINGS.ERROR_OCURRIDO_CANCELAR_RESERVA);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex flex-col lg:flex-row pt-16">
      {isChatOpen && selectedTrip && (
        <Chat tripId={selectedTrip.tripId || selectedTrip.id} onClose={() => setIsChatOpen(false)} />
      )}

      {/* Contenido principal - En móviles: abajo del mapa, en desktop: al lado del mapa */}
      <div className="w-full lg:w-1/3 bg-white p-6 overflow-y-auto order-2 lg:order-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-dark hidden lg:block">{STRINGS.SOLICITAR_VIAJE}</h1>
          {selectedTrip && (selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress') && (
            <button onClick={() => setIsChatOpen(true)} className="p-2 rounded-full hover:bg-gray-200 transition-colors lg:block hidden">
              <FaCommentDots className="text-primary text-2xl" />
            </button>
          )}
        </div>
        
        {/* Alert for active trip - between map and tabs */}
        {selectedTrip && (selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress') && selectedTrip.passengerId === currentUser?.uid && (
          <div className="mb-6 p-4 bg-success text-white rounded-lg text-center shadow-lg animate-pulse">
            <p className="font-bold text-lg">¡Tu conductor está en camino!</p>
            {selectedTrip.driverName && <p><strong>{selectedTrip.driverName}</strong> llegará pronto.</p>}
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex border-b mb-4 space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Button 
              key={tab.id}
              className={`flex-1 min-w-max py-2 px-2 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-secondary hover:text-primary transition-colors'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </Button>
          ))}
        </div>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-success text-white rounded-lg flex justify-between items-center">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage('')} className="text-xl font-bold leading-none p-1">&times;</button>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-danger text-white rounded-lg">
            {error}
          </div>
        )}
        {locationError && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-lg">
            <p className="font-bold">Location Error:</p>
            <p>{locationError}</p>
          </div>
        )}

        {activeTab === 'my-requests' ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-dark">{STRINGS.MIS_SOLICITUDES_DE_VIAJE}</h2>
            {myRideRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-secondary mb-4">{STRINGS.NO_TIENES_SOLICITUDES}</p>
                <Button
                  onClick={() => setActiveTab('search')}
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  {STRINGS.SOLICITAR_UN_VIAJE_AHORA}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myRideRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-dark">
                          {request.origin?.address || STRINGS.ORIGEN} → {request.destination?.address || STRINGS.DESTINO}
                        </h3>
                        <p className="text-sm text-secondary mt-1">
                          {formatDate(request.createdAt)}
                        </p>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.status === 'pending' ? 'bg-warning text-white' :
                            request.status === 'accepted' ? 'bg-success text-white' :
                            'bg-secondary text-white'
                          }`}>
                            {request.status === 'pending' ? STRINGS.PENDIENTE :
                             request.status === 'accepted' ? STRINGS.ACEPTADO : STRINGS.CANCELADO}
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
        ) : activeTab === 'search' ? (
          <>
            <div className="space-y-4">
              <AddressInput
                label={STRINGS.ORIGEN}
                icon={<FaMapMarkerAlt className="text-danger" />}
                onSelect={(location) => setOrigin(location)}
                value={originQuery}
                onChange={setOriginQuery}
                onUseCurrentLocation={handleSetCurrentLocationAsOrigin}
              />
              
              <AddressInput
                label={STRINGS.DESTINO}
                icon={<FaMapMarkerAlt className="text-success" />}
                onSelect={(location) => setDestination(location)}
                value={destinationQuery}
                onChange={setDestinationQuery}
              />

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-dark mb-1">
                  {STRINGS.PRECIO_SUGERIDO}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-secondary sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    placeholder="0"
                    value={suggestedPrice}
                    onChange={(e) => setSuggestedPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>
              
              {hasActiveRequest ? (
                <Button
                  onClick={handleCancelActiveRequest}
                  disabled={loading || !canCancelActiveRequest()}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>{STRINGS.CANCELANDO}</span>
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaCar className="mr-2" />
                      <span>{STRINGS.CANCELAR_VIAJE}</span>
                    </div>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleRequestRide}
                  disabled={!origin || !destination || loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>{STRINGS.BUSCANDO_CONDUCTOR}</span>
                    </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaCar className="mr-2" />
                      <span>{STRINGS.SOLICITAR_VIAJE}</span>
                    </div>
                  )}
                </Button>
              )}
              
              {origin && destination && (
                <p className="mt-2 text-xs text-center text-secondary">
                  {STRINGS.CONDUCTORES_CERCANOS_NOTIFICADOS}
                </p>
              )}
            </div>
            
            {/* Available Trips */}
            {availableTrips.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-dark mb-4">{STRINGS.VIAJES_DISPONIBLES}</h2>
                <div className="space-y-4">
                  {availableTrips.map((trip) => (
                    <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-dark">{trip.driverName}</h3>
                          <div className="flex items-center text-warning text-sm">
                            <FaStar className="mr-1" />
                            <span>{trip.rating} ({trip.reviewCount} {STRINGS.RESENAS})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">${trip.price?.toLocaleString()}</div>
                          <div className="text-sm text-secondary">
                            {trip.availableSeats > 0 
                              ? `${trip.availableSeats} ${trip.availableSeats > 1 ? STRINGS.ASIENTOS : STRINGS.ASIENTO} ${STRINGS.DISPONIBLE}`
                              : STRINGS.SIN_CUPOS}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-danger mr-2 w-4" />
                          <span className="truncate">{trip.origin?.address}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-success mr-2 w-4" />
                          <span className="truncate">{trip.destination?.address}</span>
                        </div>
                        <div className="flex items-center text-secondary">
                          <FaClock className="mr-2 w-4" />
                          <span>{formatDate(trip.departureTime)}</span>
                        </div>
                        <div className="flex items-center text-secondary">
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
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-dark">{STRINGS.MIS_VIAJES}</h2>
            
            {myBookings.length === 0 ? (
              <div className="text-center py-8">
                <FaCar className="mx-auto text-secondary text-4xl mb-2" />
                <p className="text-secondary">{STRINGS.NO_TIENES_VIAJES_PROGRAMADOS}</p>
                <Button 
                  onClick={() => setActiveTab('search')}
                  className="mt-2 text-primary hover:underline text-sm"
                >
                  {STRINGS.BUSCAR_VIAJES_DISPONIBLES}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-dark">
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
                        <div className="text-sm text-secondary">
                          {booking.departureTime && formatDate(booking.departureTime)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-danger mr-2 w-4" />
                        <span className="truncate">{booking.origin?.address}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-success mr-2 w-4" />
                        <span className="truncate">{booking.destination?.address}</span>
                      </div>
                      {booking.driverName && (
                        <div className="flex items-center text-secondary">
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

      {/* Mapa - En móviles: arriba del contenido, en desktop: a la derecha */}
      <div className="w-full lg:w-2/3 order-1 lg:order-2 bg-white rounded-xl shadow-md overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Título - Solo visible en móviles */}
        <div className="lg:hidden bg-white p-4 border-b flex items-center justify-between relative z-10">
          <h1 className="text-xl font-bold text-dark">{STRINGS.SOLICITAR_VIAJE}</h1>
          {selectedTrip && (selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress') && (
            <button 
              onClick={() => setIsChatOpen(true)} 
              className="p-2 rounded-full hover:bg-gray-200 transition-colors relative z-20"
              style={{
                position: 'relative',
                zIndex: 1000 // Higher z-index to ensure it stays above the map
              }}
            >
              <FaCommentDots className="text-primary text-2xl" />
            </button>
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
        >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mapViewMode === 'currentLocation' && currentPosition && (
              <RecenterMap position={currentPosition} zoom={15} />
            )}
            {mapViewMode === 'allPoints' && pointsToFit && pointsToFit.length > 0 && (
              <FitBoundsToMarkers points={pointsToFit} />
            )}
            
            {/* Passenger Location Marker */}
            {currentPosition && (
              <Marker 
                position={currentPosition} 
                icon={passengerIcon}
              >
                <Popup>{STRINGS.TU_UBICACION}</Popup>
              </Marker>
            )}
            
            {/* Driver Location Marker */}
            {driverLocation && selectedTrip && (
              <Marker 
                position={[driverLocation.latitude, driverLocation.longitude]} 
                icon={(selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress') ? flashingDriverIcon : driverIcon}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedTrip.driverName}</p>
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
            <LocationSelector onSelect={handleLocationSelect} />
            
            {/* Route Line */}
          </MapContainer>
        
      </div>
      
      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRateTrip}
        tripId={tripToRate?.id}
      />
    </div>
  );
}
