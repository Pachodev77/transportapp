import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingModal from '../components/RatingModal';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet';
import { FaSearch, FaMapMarkerAlt, FaCar, FaSpinner, FaStar, FaClock, FaCommentDots, FaStarHalfAlt } from 'react-icons/fa';
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
  runTransaction
} from 'firebase/firestore';
import { db } from '../firebase/config';
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
  const handleRateTrip = async (ratingData) => {
    // Handle both object and individual parameters for backward compatibility
    const { tripId, rideRequestId, rating, comment = '' } = typeof ratingData === 'object' ? ratingData : { 
      tripId: arguments[0],
      rideRequestId: arguments[1],
      rating: arguments[2], 
      comment: arguments[3] || '' 
    };
    
    if ((!tripId && !rideRequestId) || rating === undefined) {
      console.error('Missing required parameters for rating:', { tripId, rideRequestId, rating });
      setError('Faltan parámetros necesarios para calificar el viaje');
      return;
    }
    if (!currentUser || !currentUser.uid) {
      setError('No hay un usuario autenticado');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // First, try to find the ride request using the provided ID or by tripId
      let rideRequestRef;
      let rideRequestDoc;
      let rideRequestData = null;
      
      // Try to find by rideRequestId first if provided
      if (rideRequestId) {
        rideRequestRef = doc(db, 'rideRequests', rideRequestId);
        rideRequestDoc = await getDoc(rideRequestRef);
        if (rideRequestDoc.exists()) {
          rideRequestData = { id: rideRequestDoc.id, ...rideRequestDoc.data() };
        }
      }
      
      // If not found by rideRequestId, try to find by tripId
      if (!rideRequestData && tripId) {
        const rideRequestsQuery = query(
          collection(db, 'rideRequests'),
          where('tripId', '==', tripId),
          limit(1)
        );
        
        const querySnapshot = await getDocs(rideRequestsQuery);
        if (!querySnapshot.empty) {
          rideRequestDoc = querySnapshot.docs[0];
          rideRequestRef = doc(db, 'rideRequests', rideRequestDoc.id);
          rideRequestData = { id: rideRequestDoc.id, ...rideRequestDoc.data() };
        }
      }
      
      // If still not found, try to get the trip and create a ride request if needed
      if (!rideRequestData && tripId) {
        const tripRef = doc(db, 'trips', tripId);
        const tripDoc = await getDoc(tripRef);
        
        if (tripDoc.exists()) {
          const tripData = tripDoc.data();
          
          // Create a new ride request based on trip data
          const newRideRequest = {
            tripId: tripId,
            passengerId: tripData.passengerId,
            driverId: tripData.driverId,
            status: 'completed',
            origin: tripData.origin,
            destination: tripData.destination,
            price: tripData.price || 0,
            distance: tripData.distance || 0,
            duration: tripData.duration || 0,
            paymentMethod: tripData.paymentMethod || 'cash',
            createdAt: tripData.createdAt || serverTimestamp(),
            updatedAt: serverTimestamp(),
            canRate: true
          };
          
          // Add the new ride request to Firestore
          const docRef = await addDoc(collection(db, 'rideRequests'), newRideRequest);
          rideRequestRef = doc(db, 'rideRequests', docRef.id);
          rideRequestData = { id: docRef.id, ...newRideRequest };
        }
      }
      
      if (!rideRequestData) {
        throw new Error('No se pudo encontrar o crear la solicitud de viaje');
      }
      
      // Verificar que el usuario sea el pasajero
      if (rideRequestData.passengerId !== currentUser.uid) {
        throw new Error('No tienes permiso para calificar este viaje');
      }
      
      // Verificar que el viaje esté completado
      if (rideRequestData.status !== 'completed') {
        throw new Error('Solo puedes calificar viajes completados');
      }
      
      // Verificar que no haya sido calificado ya por este usuario
      const ratedBy = Array.isArray(rideRequestData.ratedBy) ? rideRequestData.ratedBy : [];
      if (ratedBy.includes(currentUser.uid)) {
        throw new Error('Este viaje ya fue calificado');
      }
      
      // Crear el objeto de actualización con solo the fields we want to update
      const updateData = {
        rating: Number(rating),
        comment: String(comment || ''),
        ratedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ratedBy: [...ratedBy, currentUser.uid],
        canRate: false
      };
      
      // Actualizar el documento
      await updateDoc(rideRequestRef, updateData);
      
      // Actualizar el documento de viaje correspondiente si existe
      if (rideRequestData.tripId) {
        const tripRef = doc(db, 'trips', rideRequestData.tripId);
        await updateDoc(tripRef, {
          rating: Number(rating),
          comment: String(comment || ''),
          ratedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          ratedBy: [...ratedBy, currentUser.uid]
        });
      }
      
      // Actualizar la calificación del conductor
      if (rideRequestData.driverId) {
        const driverRef = doc(db, 'users', rideRequestData.driverId);
        const driverDoc = await getDoc(driverRef);
        
        if (driverDoc.exists()) {
          const driverData = driverDoc.data();
          const currentRating = Number(driverData.rating) || 0;
          const currentRatingCount = Number(driverData.ratingCount) || 0;
          const newRatingCount = currentRatingCount + 1;
          const newRating = (currentRating * currentRatingCount + Number(rating)) / newRatingCount;
          
          await updateDoc(driverRef, {
            rating: parseFloat(newRating.toFixed(1)),
            ratingCount: newRatingCount,
            updatedAt: serverTimestamp()
          });
        }
      }

      // Actualizar el estado local
      setMyBookings(prev => prev.map(booking => 
        booking.id === tripId 
          ? { 
              ...booking, 
              rating: Number(rating), 
              comment: String(comment || ''), 
              status: 'completed',
              ratedBy: [...(Array.isArray(booking.ratedBy) ? booking.ratedBy : []), currentUser.uid],
              canRate: false
            } 
          : booking
      ));

      setSuccessMessage('¡Gracias por calificar tu viaje!');
      
      // Cerrar el modal después de 2 segundos
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
    if (!currentUser || showRatingModal) return;
    
    // Find completed trips that need rating
    const completedTrip = myBookings.find(trip => {
      const isCompleted = trip.status === 'completed';
      const isPassenger = trip.passengerId === currentUser.uid && trip.driverId !== currentUser.uid;
      const isNotRated = !trip.rating || (trip.ratedBy && !trip.ratedBy.includes(currentUser.uid));
      const canRate = trip.canRate === true;
      
      return isCompleted && isPassenger && isNotRated && canRate;
    });
    
    if (completedTrip) {
      console.log('Preparando para mostrar modal de calificación para el viaje:', completedTrip.id);
      
      const timer = setTimeout(async () => {
        if (completedTrip.passengerId === currentUser.uid && completedTrip.driverId !== currentUser.uid) {
          const rideRequestId = completedTrip.rideRequestId || completedTrip.id;
          const rideRequestRef = doc(db, 'rideRequests', rideRequestId);
          
          try {
            // Check if document exists first
            const rideRequestDoc = await getDoc(rideRequestRef);
            
            // If document doesn't exist, create it with minimal required fields
            if (!rideRequestDoc.exists()) {
              console.log('Documento de solicitud de viaje no encontrado, creando uno nuevo');
              await setDoc(rideRequestRef, {
                id: rideRequestId,
                tripId: completedTrip.id,
                passengerId: currentUser.uid,
                driverId: completedTrip.driverId,
                status: 'completed',
                canRate: true,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                paymentMethod: 'cash',
                // Include any other minimal required fields
                ...(completedTrip.origin && { origin: completedTrip.origin }),
                ...(completedTrip.destination && { destination: completedTrip.destination }),
                ...(completedTrip.price !== undefined && { price: completedTrip.price }),
                ...(completedTrip.distance !== undefined && { distance: completedTrip.distance }),
                ...(completedTrip.duration !== undefined && { duration: completedTrip.duration })
              });
              console.log('Nuevo documento de solicitud de viaje creado');
            } else {
              // Document exists, just update canRate
              await updateDoc(rideRequestRef, {
                canRate: true,
                updatedAt: serverTimestamp()
              });
            }
            
            // Update local state to show the modal
            const tripToRateWithIds = {
              ...completedTrip,
              rideRequestId: rideRequestId
            };
            
            setTripToRate(tripToRateWithIds);
            setShowRatingModal(true);
            
            // Update local state to prevent showing the modal again
            setMyBookings(prev => 
              prev.map(trip => 
                trip.id === completedTrip.id 
                  ? { ...trip, canRate: false }
                  : trip
              )
            );
            
          } catch (error) {
            console.error('Error al preparar la calificación del viaje:', error);
            // Even if there's an error, we can still try to show the modal
            try {
              const tripToRateWithIds = {
                ...completedTrip,
                rideRequestId: rideRequestId
              };
              
              setTripToRate(tripToRateWithIds);
              setShowRatingModal(true);
              
              // Update local state to prevent showing the modal again
              setMyBookings(prev => 
                prev.map(trip => 
                  trip.id === completedTrip.id 
                    ? { ...trip, canRate: false }
                    : trip
                )
              );
            } catch (uiError) {
              console.error('Error al mostrar el modal de calificación:', uiError);
            }
          }
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
      handleCancelRequest(selectedTrip.id);
    }
  };

  // Handle canceling a ride request by ID
  const handleCancelRequest = async (requestId) => {
    if (!window.confirm(STRINGS.CONFIRMAR_CANCELAR_SOLICITUD)) {
      return;
    }
    
    try {
      setLoading(true);
      const requestRef = doc(db, 'rideRequests', requestId);
      
      // Usar transacción para garantizar consistencia
      await runTransaction(db, async (transaction) => {
        // 1. Obtener la solicitud actual
        const requestDoc = await transaction.get(requestRef);
        if (!requestDoc.exists()) {
          throw new Error('La solicitud de viaje ya no existe');
        }
        
        const requestData = requestDoc.data();
        
        // 2. Verificar que el usuario sea el pasajero
        if (requestData.passengerId !== currentUser.uid) {
          throw new Error('No tienes permiso para cancelar esta solicitud');
        }
        
        // 3. Verificar que la solicitud no esté ya cancelada o completada
        if (['cancelled', 'completed'].includes(requestData.status)) {
          throw new Error('No se puede cancelar una solicitud que ya está ' + requestData.status);
        }
        
        const now = serverTimestamp();
        
        // 4. Actualizar la solicitud
        transaction.update(requestRef, {
          status: 'cancelled',
          cancelledAt: now,
          updatedAt: now,
          cancelledBy: 'passenger'
        });
        
        // 5. Si hay un viaje asociado, actualizarlo también
        if (requestData.tripId) {
          const tripRef = doc(db, 'trips', requestData.tripId);
          const tripDoc = await transaction.get(tripRef);
          
          if (tripDoc.exists()) {
            transaction.update(tripRef, {
              status: 'cancelled',
              cancelledAt: now,
              updatedAt: now,
              cancelledBy: 'passenger'
            });
          }
        }
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

  // Fetch available trips and active trips for the passenger
  useEffect(() => {
    if (!currentUser) return;
    
    // Query for available trips
    const availableTripsQuery = query(
      collection(db, 'trips'),
      where('status', '==', 'available'),
      orderBy('departureTime', 'asc')
    );
    
    // Query for active trips where the current user is the passenger
    const activeTripsQuery = query(
      collection(db, 'trips'),
      where('passengerId', '==', currentUser.uid),
      where('status', 'in', ['accepted', 'in_progress', 'completed'])
    );
    
    const unsubscribeAvailable = onSnapshot(availableTripsQuery, (snapshot) => {
      const trips = [];
      snapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });
      setAvailableTrips(trips);
    });
    
    const unsubscribeActive = onSnapshot(activeTripsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified' || change.type === 'added') {
          const trip = { id: change.doc.id, ...change.doc.data() };
          
          // If trip is completed, update the UI accordingly
          if (trip.status === 'completed') {
            setMyBookings(prev => {
              const existingIndex = prev.findIndex(b => b.id === trip.id);
              
              if (existingIndex >= 0) {
                const updatedBookings = [...prev];
                updatedBookings[existingIndex] = { 
                  ...trip, 
                  canRate: true,
                  status: 'completed' 
                };
                return updatedBookings;
              } else {
                return [...prev, { 
                  ...trip, 
                  canRate: true,
                  status: 'completed' 
                }];
              }
            });
            
            // Update selectedTrip if it's the current trip
            setSelectedTrip(prev => {
              if (prev && prev.id === trip.id) {
                return { ...trip, status: 'completed' };
              }
              return prev;
            });
          }
        }
      });
    });
    
    return () => {
      unsubscribeAvailable();
      unsubscribeActive();
    };
  }, [currentUser]);

  // Fetch user's ride requests and bookings
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
      let completedTrip = null;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Función segura para convertir timestamps
        const safeToDate = (timestamp) => {
          if (!timestamp) return null;
          return timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
        };
        
        const request = {
          id: doc.id,
          ...data,
          createdAt: safeToDate(data.createdAt),
          updatedAt: safeToDate(data.updatedAt),
          acceptedAt: safeToDate(data.acceptedAt),
          completedAt: safeToDate(data.completedAt),
          cancelledAt: safeToDate(data.cancelledAt)
        };
        requests.push(request);
        
        // Solo considerar como viaje activo si está en estos estados
        if (request.status === 'accepted' || request.status === 'in_progress') {
          activeTrip = request;
        } 
        // Si encontramos un viaje completado que aún no ha sido calificado
        else if (request.status === 'completed' && !completedTrip) {
          completedTrip = request;
        }
      });
      
      // Filtrar solicitudes para mostrar solo las activas en myRideRequests
      const activeRequests = requests.filter(req => 
        ['pending', 'accepted', 'in_progress'].includes(req.status)
      );
      
      setMyRideRequests(activeRequests);
      
      // Si hay un viaje completado que necesita calificación, actualizamos el estado local
      if (completedTrip) {
        setMyBookings(prev => {
          const exists = prev.some(booking => booking.id === completedTrip.id);
          if (!exists) {
            return [...prev, { ...completedTrip, canRate: true }];
          }
          return prev.map(booking => 
            booking.id === completedTrip.id 
              ? { ...booking, status: 'completed', canRate: true }
              : booking
          );
        });
      }
      
      // Solo establecer el viaje seleccionado si es un viaje activo
      setSelectedTrip(activeTrip || null);
    };

    getInitialRideRequests();
    
    const rideRequestsQuery = query(
      collection(db, 'rideRequests'),
      where('passengerId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribeRideRequests = onSnapshot(rideRequestsQuery, (snapshot) => {
      console.log('Actualización recibida en rideRequests');
      const requests = [];
      let activeTrip = null;
      let completedTrip = null;
      
      // First pass: process all documents
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Función segura para convertir timestamps
        const safeToDate = (timestamp) => {
          if (!timestamp) return null;
          return timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
        };
        
        const request = {
          id: doc.id,
          ...data,
          createdAt: safeToDate(data.createdAt),
          updatedAt: safeToDate(data.updatedAt),
          acceptedAt: safeToDate(data.acceptedAt),
          completedAt: safeToDate(data.completedAt),
          cancelledAt: safeToDate(data.cancelledAt)
        };
        
        console.log('Procesando solicitud:', { id: request.id, status: request.status, completedAt: request.completedAt });
        
        // Consider active if in these states
        if (request.status === 'accepted' || request.status === 'in_progress') {
          console.log('Encontrado viaje activo:', request.id);
          activeTrip = request;
          // Add to active requests
          requests.push(request);
        }
        // If we find a completed trip
        else if (request.status === 'completed') {
          console.log('Encontrado viaje completado:', request.id);
          // If no completed trip yet or this one is more recent
          if (!completedTrip || (request.completedAt && (!completedTrip.completedAt || 
              request.completedAt > completedTrip.completedAt))) {
            completedTrip = request;
          }
          // Don't add to active requests
        } else if (request.status === 'pending') {
          // Add pending requests to active requests
          requests.push(request);
        }
      });
      
      // Actualizar las solicitudes activas (solo pending, accepted, in_progress)
      setMyRideRequests(prevRequests => {
        // Filtrar para asegurarnos de que solo hay solicitudes activas
        const filteredRequests = requests.filter(req => {
          const isActive = ['pending', 'accepted', 'in_progress'].includes(req.status);
          if (!isActive && req.status === 'completed') {
            console.log(`Filtrando viaje completado: ${req.id}`, req);
          }
          return isActive;
        });
        
        // Verificar si hay cambios antes de actualizar el estado
        if (JSON.stringify(prevRequests) === JSON.stringify(filteredRequests)) {
          return prevRequests;
        }
        
        console.log('Actualizando solicitudes activas:', filteredRequests.map(r => ({ 
          id: r.id, 
          status: r.status,
          completedAt: r.completedAt 
        })));
        
        // Verificar si hay solicitudes que deberían estar completadas pero no lo están
        const shouldBeCompleted = requests.filter(req => 
          req.status !== 'completed' && req.completedAt
        );
        
        if (shouldBeCompleted.length > 0) {
          console.warn('Se encontraron solicitudes con completedAt pero sin estado completado:', 
            shouldBeCompleted.map(r => ({ id: r.id, status: r.status, completedAt: r.completedAt }))
          );
        }
        
        return filteredRequests;
      });
      
      // Manejar viajes completados
      if (completedTrip) {
        console.log('Viaje completado detectado:', { 
          id: completedTrip.id, 
          status: completedTrip.status,
          completedAt: completedTrip.completedAt 
        });
        
        // Actualizar el estado de los viajes completados
        setMyBookings(prev => {
          const existingIndex = prev.findIndex(b => b.id === completedTrip.id);
          
          // Si el viaje ya existe en el historial, actualizarlo
          if (existingIndex >= 0) {
            // Solo actualizar si hay cambios para evitar renderizados innecesarios
            const existingTrip = prev[existingIndex];
            if (existingTrip.status !== 'completed' || 
                (completedTrip.completedAt && existingTrip.completedAt?.getTime() !== completedTrip.completedAt.getTime())) {
              
              const updatedBookings = [...prev];
              updatedBookings[existingIndex] = { 
                ...completedTrip, 
                canRate: true,
                status: 'completed' 
              };
              console.log('Actualizando viaje existente en el historial:', updatedBookings[existingIndex]);
              return updatedBookings;
            }
            return prev;
          } 
          // Si es un viaje nuevo, agregarlo al historial
          else {
            const newBooking = { 
              ...completedTrip, 
              canRate: true,
              status: 'completed' 
            };
            console.log('Agregando nuevo viaje al historial:', newBooking);
            return [...prev, newBooking];
          }
        });
        
        // Si hay un viaje activo que coincide con el completado, quitarlo de activos
        if (activeTrip && activeTrip.id === completedTrip.id) {
          console.log('Eliminando viaje completado de activos:', activeTrip.id);
          setMyRideRequests(prev => 
            prev.filter(req => req.id !== completedTrip.id)
          );
        }
        
        // Actualizar el viaje seleccionado
        setSelectedTrip(prev => {
          // Solo actualizar si hay un cambio real en el estado
          if (!prev || prev.id !== completedTrip.id || prev.status !== 'completed') {
            console.log('Actualizando viaje seleccionado a completado:', completedTrip.id);
            return { ...completedTrip, status: 'completed' };
          }
          return prev;
        });
      }
      
      // Actualizar el viaje seleccionado si hay un viaje activo
      if (activeTrip) {
        setSelectedTrip(prev => {
          // Solo actualizar si hay un cambio real en el estado
          if (!prev || prev.id !== activeTrip.id || prev.status !== activeTrip.status) {
            return { ...activeTrip };
          }
          return prev;
        });
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
        onSubmit={(ratingData) => {
          // Pasar tanto el tripId como el rideRequestId al manejador
          handleRateTrip({
            ...ratingData,
            tripId: tripToRate?.id,
            rideRequestId: tripToRate?.rideRequestId
          });
        }}
        tripId={tripToRate?.id}
      />
    </div>
  );
}
