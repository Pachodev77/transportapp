import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Polyline } from 'react-leaflet';
import { FaCar, FaMapMarkerAlt, FaClock, FaUser, FaMoneyBillWave, FaStar, FaPlus, FaCheck, FaTimes, FaSpinner, FaCommentDots } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { 
  getTripsByStatus as getTrips,
  getUserTrips, 
  updateTripStatus, 
  createTrip, 
  subscribeToTripUpdates,
  subscribeToTrips,
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

function TripTabs({ showHistory, setShowHistory }) {
  return (
    <div className="flex border-b mb-4">
      <button
        className={`py-2 px-4 text-sm font-medium ${!showHistory ? 'border-b-2 border-primary text-primary' : 'text-secondary'}`}
        onClick={() => setShowHistory(false)}
      >
        Viajes Activos
      </button>
      <button
        className={`py-2 px-4 text-sm font-medium ${showHistory ? 'border-b-2 border-primary text-primary' : 'text-secondary'}`}
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

  useEffect(() => {
    console.log('DEBUG: RecenterMap useEffect triggered.');
    console.log('DEBUG: RecenterMap position:', position);
    console.log('DEBUG: RecenterMap zoom:', zoom);
    if (position && position[0] !== 0 && position[1] !== 0) {
      map.flyTo(position, zoom);
      console.log('DEBUG: map.flyTo called in RecenterMap.');
    } else {
      console.log('DEBUG: RecenterMap: Invalid position, not flying.');
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

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);
        if (locationError) setLocationError(null); // Clear error on success
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
  
  const [pointsToFit, setPointsToFit] = useState(null);
  const [mapViewMode, setMapViewMode] = useState('allPoints'); // 'allPoints' or 'currentLocation'
  const intervalRef = useRef(null); // Use a ref to store the interval ID
  const isTripActiveRef = useRef(false); // New ref to track if trip was active in previous render
  const [acceptedTrip, setAcceptedTrip] = useState(null);

  useEffect(() => {
    console.log('DEBUG: mapViewMode useEffect triggered. acceptedTrip status:', acceptedTrip?.status);
    const currentTripActive = acceptedTrip && (acceptedTrip.status === 'accepted' || acceptedTrip.status === 'in_progress');

    // If trip just became active
    if (currentTripActive && !isTripActiveRef.current) {
      console.log('DEBUG: Trip just became active. Setting initial mode to allPoints and starting interval.');
      setMapViewMode('allPoints'); // Explicitly set initial mode for active trip
      
      // Clear any existing interval before setting a new one
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setMapViewMode(prevMode => {
          const newMode = (prevMode === 'allPoints' ? 'currentLocation' : 'allPoints');
          console.log(`DEBUG: Toggling mapViewMode from ${prevMode} to ${newMode}`);
          return newMode;
        });
      }, 10000); // Toggle every 10 seconds
    }
    // If trip just became inactive
    else if (!currentTripActive && isTripActiveRef.current) {
      console.log('DEBUG: Trip just became inactive. Clearing interval and resetting mode.');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setMapViewMode('allPoints'); // Default view when no active trip
    }
    // If trip is active and was active before (acceptedTrip reference changed but status is same)
    else if (currentTripActive && isTripActiveRef.current) {
      console.log('DEBUG: Trip remains active. Interval should continue running.');
      // Do nothing, let the existing interval continue
    }
    // If trip is inactive and was inactive before
    else if (!currentTripActive && !isTripActiveRef.current) {
      console.log('DEBUG: Trip remains inactive. Mode is allPoints.');
      // Do nothing, mode is already 'allPoints'
    }

    isTripActiveRef.current = currentTripActive; // Update ref for next render

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log('DEBUG: Cleanup: Cleared interval on unmount/re-run.');
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

  useEffect(() => {
    if (!currentUser) {
      console.log('Usuario no autenticado, no se pueden cargar viajes');
      return;
    }
    
    console.log('🔍 Buscando solicitudes de viaje pendientes...');
    
    try {
      const q = query(
        collection(db, 'rideRequests'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      
      console.log('🔧 Consulta Firestore creada:', {
        collection: 'rideRequests',
        filters: ['status == pending'],
        orderBy: 'createdAt desc'
      });
      
      const unsubscribe = onSnapshot(
        q, 
        (querySnapshot) => {
          console.log(`✅ Se encontraron ${querySnapshot.size} solicitudes de viaje`);
          
          if (querySnapshot.empty) {
            console.log('ℹ️ No se encontraron viajes pendientes en la base de datos');
            setAvailableTrips([]);
            return;
          }
          
          const trips = [];
          
          querySnapshot.forEach((doc) => {
            try {
              const data = doc.data();
              console.log('📝 Procesando viaje ID:', doc.id, 'Datos:', data);
              
              // Procesar coordenadas
              const originCoords = processCoords(data.origin?.coordinates);
              const destCoords = processCoords(data.destination?.coordinates);
              
              if (!originCoords || !destCoords) {
                console.warn(`Viaje ${doc.id} ignorado: coordenadas inválidas`);
                return;
              }
              
              // Crear objeto de viaje con formato consistente
              const tripData = {
                id: doc.id,
                ...data,
                origin: {
                  address: data.origin?.address || 'Origen no especificado',
                  coordinates: originCoords
                },
                destination: {
                  address: data.destination?.address || 'Destino no especificado',
                  coordinates: destCoords
                },
                passengerName: data.passengerName || 'Pasajero desconocido',
                status: data.status || 'pending',
                createdAt: data.createdAt?.toDate() || new Date(),
                estimatedPrice: data.estimatedPrice || 0
              };
              
              console.log('📍 Viaje procesado:', {
                id: tripData.id,
                origin: {
                  address: tripData.origin.address,
                  coordinates: tripData.origin.coordinates
                },
                destination: {
                  address: tripData.destination.address,
                  coordinates: tripData.destination.coordinates
                },
                passenger: tripData.passengerName
              });
              
              trips.push(tripData);
            } catch (error) {
              console.error('❌ Error al procesar el viaje:', doc.id, error);
            }
          });
          
          // Eliminar duplicados por ID antes de actualizar el estado
          const uniqueTrips = [];
          const seenIds = new Set();
          
          trips.forEach(trip => {
            if (!seenIds.has(trip.id)) {
              seenIds.add(trip.id);
              uniqueTrips.push(trip);
            } else {
              console.warn(`⚠️ Se encontró un viaje duplicado con ID: ${trip.id}`);
            }
          });
          
          console.log('🚀 Viajes disponibles para mostrar (sin duplicados):', uniqueTrips);
          setAvailableTrips(uniqueTrips);
        },
        (error) => {
          console.error('❌ Error en la consulta de viajes:', error);
          setLocationError('Error al cargar las solicitudes de viaje: ' + error.message);
        }
      );
      
      return () => {
        console.log('👋 Desuscribiendo del listener de viajes');
        unsubscribe();
      };
    } catch (error) {
      console.error('🔥 Error al configurar la consulta de viajes:', error);
      setLocationError('Error al configurar la consulta: ' + error.message);
    }
  }, [currentUser, processCoords]);

  useEffect(() => {
    if (acceptedTrip?.passengerId) {
      const passengerLocationRef = doc(db, 'locations', acceptedTrip.passengerId);
      const unsubscribe = onSnapshot(passengerLocationRef, (doc) => {
        if (doc.exists()) {
          setPassengerLocation(doc.data().location);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [acceptedTrip]);
  
  // Effect to update points to fit when a trip is active
  useEffect(() => {
    console.log('DEBUG: pointsToFit useEffect triggered.');
    console.log('DEBUG: acceptedTrip status:', acceptedTrip?.status);
    console.log('DEBUG: currentPosition:', currentPosition);
    console.log('DEBUG: passengerLocation:', passengerLocation);
    console.log('DEBUG: acceptedTrip.origin?.coordinates:', acceptedTrip?.origin?.coordinates);
    console.log('DEBUG: acceptedTrip.destination?.coordinates:', acceptedTrip?.destination?.coordinates);

    if (acceptedTrip && (acceptedTrip.status === 'accepted' || acceptedTrip.status === 'in_progress')) {
      const points = [];
      
      // 1. Driver's current position
      if (currentPosition) {
        points.push({ lat: currentPosition[0], lng: currentPosition[1] });
      }
      
      // 2. Passenger's last known location
      if (passengerLocation) {
        points.push(processCoords(passengerLocation));
      }
      
      // 3. Trip origin (Point A)
      if (acceptedTrip.origin?.coordinates) {
        points.push(processCoords(acceptedTrip.origin.coordinates));
      }
      
      // 4. Trip destination (Point B)
      if (acceptedTrip.destination?.coordinates) {
        points.push(processCoords(acceptedTrip.destination.coordinates));
      }
      
      console.log('DEBUG: Points before filtering:', points);
      const filteredPoints = points.filter(p => p && typeof p.lat === 'number' && typeof p.lng === 'number');
      console.log('DEBUG: Points after filtering:', filteredPoints);
      setPointsToFit(filteredPoints);
    } else {
      setPointsToFit(null);
      console.log('DEBUG: acceptedTrip not active, pointsToFit set to null.');
    }
  }, [acceptedTrip, currentPosition, passengerLocation, processCoords]);
  
  // Function to center the map on a specific location
  const centerMapOnLocation = (lat, lng, zoom = 15) => {
    if (!mapRef.current) {
      console.log('Map reference not available, storing pending center:', { lat, lng });
      pendingCenter.current = { lat, lng, zoom };
      return false;
    }

    try {
      console.log('Centering map to:', { lat, lng, zoom });
      
      // First set view immediately
      mapRef.current.setView([lat, lng], zoom, {
        animate: true,
        duration: 0.5
      });
      
      // Then do a smooth flyTo
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.flyTo([lat, lng], zoom, {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.5
          });
        }
      }, 50);
      
      return true;
    } catch (error) {
      console.error('Error centering map:', error);
      return false;
    }
  };





  // Fetch user's trips (both active and history)
  useEffect(() => {
    if (!currentUser) return;

    // Initial load of trips
    const loadAndFetchTrips = async () => {
      setLoading(true);
      try {
        const [activeTrips, historyTrips] = await Promise.all([
          getUserTrips(currentUser.uid, false), // false for active trips
          getUserTrips(currentUser.uid, true)   // true for history
        ]);

        setMyTrips(activeTrips);
        setTripHistory(historyTrips);

        // Find and set the currently accepted trip from the initial load
        const currentlyAcceptedTrip = activeTrips.find(
          trip => trip.status === 'accepted' || trip.status === 'in_progress'
        );
        setAcceptedTrip(currentlyAcceptedTrip || null);

      } catch (error) {
        console.error("Error loading initial trips:", error);
        setError("Failed to load trip data.");
      } finally {
        setLoading(false);
      }
    };

    loadAndFetchTrips();

    // Set up subscription for real-time updates
    const unsubscribe = subscribeToTripUpdates(
      currentUser.uid,
      (updatedTrips) => {
        // Filter trips into active and history
        const activeTrips = updatedTrips.filter(
          trip => trip.status !== 'completed' && trip.status !== 'cancelled'
        );
        const historyTrips = updatedTrips.filter(
          trip => trip.status === 'completed' || trip.status === 'cancelled'
        );

        setMyTrips(activeTrips);
        setTripHistory(historyTrips);
        
        // Find and set the currently accepted trip from the real-time updates
        const currentlyAcceptedTrip = activeTrips.find(
          trip => trip.status === 'accepted' || trip.status === 'in_progress'
        );
        setAcceptedTrip(currentlyAcceptedTrip || null);
      },
      (error) => {
        console.error('Error subscribing to trip updates:', error);
        setError("Failed to get real-time trip updates.");
      }
    );
    
    // Cleanup subscription on component unmount
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [currentUser]);

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
    
    // Show pickup alert
    setShowPickupAlert(true);
    // Hide alert after 10 seconds
    setTimeout(() => setShowPickupAlert(false), 10000);

    setLoading(true);
    setError('');

    try {
      // 1. Obtener la solicitud de viaje
      const requestRef = doc(db, 'rideRequests', requestId);
      const requestDoc = await getDoc(requestRef);
      
      if (!requestDoc.exists()) {
        throw new Error('La solicitud de viaje ya no está disponible');
      }

      const requestData = requestDoc.data();
      
      // 2. Crear un nuevo viaje en la colección 'trips'
      const tripRef = await addDoc(collection(db, 'trips'), {
        status: 'accepted',
        driverId: currentUser.uid,
        driverName: currentUser.displayName || 'Conductor',
        driverPhotoURL: currentUser.photoURL || null,
        passengerId: requestData.passengerId,
        passengerName: requestData.passengerName,
        passengerPhotoURL: requestData.passengerPhotoURL || null,
        origin: requestData.origin,
        destination: requestData.destination,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        estimatedPrice: requestData.estimatedPrice || 0,
        estimatedDistance: requestData.estimatedDistance || 0,
        estimatedDuration: requestData.estimatedDuration || 0,
        // Agregar información del vehículo si está disponible
        carModel: tripDetails.carModel || '',
        carPlate: tripDetails.carPlate || '',
        // Inicializar el estado del viaje
        currentLocation: null,
        startTime: null,
        endTime: null,
        route: [],
        // Información de pago
        paymentStatus: 'pending',
        paymentMethod: 'cash', // Por defecto, se puede cambiar
        // Calificación
        driverRating: null,
        passengerRating: null,
        // Notas adicionales
        notes: ''
      });

      // 3. Create the chat room for this trip
      const chatRef = doc(db, 'chats', tripRef.id);
      await setDoc(chatRef, {
        participant_uids: [currentUser.uid, requestData.passengerId],
        createdAt: serverTimestamp(),
      });

      // 4. Actualizar el estado de la solicitud a 'accepted' y vincular el ID del viaje
      await updateDoc(requestRef, {
        status: 'accepted',
        driverId: currentUser.uid,
        driverName: currentUser.displayName || 'Conductor',
        updatedAt: serverTimestamp(),
        acceptedAt: serverTimestamp(),
        tripId: tripRef.id // Vincular el ID del nuevo viaje a la solicitud original
      });

      // 4. Actualizar el estado local
      const tripDoc = await getDoc(tripRef);
      if (tripDoc.exists()) {
        const data = tripDoc.data();
        // Create a consistently structured trip object for immediate UI update
        const tripData = {
          id: tripDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        };

        // Manually add the new trip to the 'myTrips' state for immediate UI update
        setMyTrips(prevMyTrips => [tripData, ...prevMyTrips]);
        setAcceptedTrip(tripData);
        setActiveTab('my-trips');
        
        // 5. Opcional: Notificar al pasajero (puedes implementar esto con Firebase Cloud Messaging)
        // await notifyPassenger(tripData.passengerId, 'Tu viaje ha sido aceptado');
        
        // Mostrar mensaje de éxito
        alert(`¡Viaje aceptado! Estás en camino a recoger a ${tripData.passengerName || 'el pasajero'}.`);
      }

    } catch (error) {
      console.error('Error al aceptar el viaje:', error);
      setError(`Error al aceptar el viaje: ${error.message}`);
      alert(`Error al aceptar el viaje: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({
      ...prev,
      [name]: name === 'availableSeats' || name === 'price' ? parseInt(value) || 0 : value
    }));
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    
    if (!origin || !destination) {
      alert(STRINGS.SELECCIONAR_ORIGEN_DESTINO);
      return;
    }
    
    try {
      setLoading(true);
      
      // Create a new trip using our createTrip function
      await createTrip({
        origin,
        destination,
        status: 'searching',
        driverId: currentUser.uid,
        driverName: currentUser.displayName || STRINGS.CONDUCTOR,
        driverPhoto: currentUser.photoURL || '',
        price: tripDetails.price || 0,
        availableSeats: tripDetails.availableSeats || 1,
        carModel: tripDetails.carModel || '',
        carPlate: tripDetails.carPlate || '',
        estimatedDuration: tripDetails.estimatedDuration || '',
        departureTime: tripDetails.departureTime || new Date().toISOString()
      });
      
      // Reset the form
      setOrigin(null);
      setDestination(null);
      setTripDetails({
        departureTime: '',
        availableSeats: 1,
        price: 0,
        carModel: '',
        carPlate: '',
        estimatedDuration: ''
      });
      
      alert('¡Viaje creado con éxito!');
      
    } catch (error) {
      console.error('Error creating trip:', error);
      alert(error.message || 'Error al crear el viaje. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Effect to handle map centering when a trip is accepted
  useEffect(() => {
    if (acceptedTrip?.origin?.coordinates && mapRef.current) {
      const coords = processCoords(acceptedTrip.origin.coordinates);
      if (coords) {
        const { lat, lng } = coords;
        mapRef.current.flyTo([lat, lng], 15, {
          animate: true,
          duration: 1.5
        });
      }
    }
  }, [acceptedTrip, processCoords]);

  const handleCompleteTrip = async (tripId) => {
    if (!tripId) {
      console.error('No se proporcionó un ID de viaje para completar');
      alert('No se pudo identificar el viaje a completar');
      return;
    }

    if (!window.confirm('¿Estás seguro de que deseas marcar este viaje como completado?')) {
      return;
    }

    setLoading(true);
    console.log('Iniciando proceso de finalización de viaje...');
    
    try {
      const now = serverTimestamp();
      const tripRef = doc(db, 'trips', tripId);
      
      console.log('Iniciando transacción...');
      
      await runTransaction(db, async (transaction) => {
        console.log('Transacción iniciada');
        
        // 1. Obtener datos del viaje
        console.log('Obteniendo datos del viaje...');
        const tripDoc = await transaction.get(tripRef);
        
        if (!tripDoc.exists()) {
          throw new Error('El viaje ya no existe.');
        }

        const tripData = tripDoc.data();
        
        // 2. Verificar que el conductor sea el correcto
        if (tripData.driverId !== currentUser.uid) {
          throw new Error('No tienes permiso para completar este viaje');
        }
        
        // 3. Verificar que el viaje esté en un estado que pueda ser completado
        if (!['in_progress', 'accepted'].includes(tripData.status)) {
          throw new Error(`No se puede completar un viaje con estado: ${tripData.status}. El viaje debe estar en progreso o aceptado.`);
        }

        console.log('Datos del viaje:', { 
          id: tripDoc.id, 
          estado: tripData.status,
          conductorId: tripData.driverId,
          pasajeroId: tripData.passengerId,
          rideRequestId: tripData.rideRequestId 
        });
        
        // 4. Actualizar estado del viaje a completado
        console.log('Actualizando estado del viaje a completado...');
        
        // Crear objeto con los datos de actualización
        const tripUpdate = {
          status: 'completed',
          endTime: now,
          updatedAt: now,
          completedAt: now,
          // Incluir todos los campos necesarios para las reglas de seguridad
          driverId: tripData.driverId,
          passengerId: tripData.passengerId
        };
        
        // Aplicar la actualización
        transaction.update(tripRef, tripUpdate);
        
        console.log('Actualizando viaje a completado');
        console.log('Estado del viaje actualizado a completado', tripUpdate);

        // 5. Actualizar la solicitud de viaje asociada si existe
        if (tripData.rideRequestId) {
          console.log('Actualizando estado de la solicitud de viaje...');
          const rideRequestRef = doc(db, 'rideRequests', tripData.rideRequestId);
          transaction.update(rideRequestRef, {
            status: 'completed',
            completedAt: now,
            updatedAt: now
          });
          console.log('Solicitud de viaje actualizada a completada');
        } else {
          console.log('No se encontró rideRequestId, omitiendo actualización de solicitud');
        }

        // 6. Crear entrada en el historial del conductor
        console.log('Creando entrada en el historial del conductor...');
        const driverHistoryRef = doc(collection(db, 'users', currentUser.uid, 'tripHistory'), tripId);
        transaction.set(driverHistoryRef, {
          ...tripData,
          status: 'completed',
          completedAt: now,
          endTime: now,
          updatedAt: now,
          historyEntry: true
        });
        console.log('Entrada en el historial del conductor creada');

        // 7. Crear entrada en el historial del pasajero
        console.log('Creando entrada en el historial del pasajero...');
        const passengerHistoryRef = doc(collection(db, 'users', tripData.passengerId, 'tripHistory'), tripId);
        transaction.set(passengerHistoryRef, {
          ...tripData,
          status: 'completed',
          completedAt: now,
          endTime: now,
          updatedAt: now,
          historyEntry: true,
          canRate: true // Marcar que el pasajero puede calificar
        });
        console.log('Entrada en el historial del pasajero creada');

        // 8. Actualizar contador de viajes completados del conductor
        console.log('Actualizando contador de viajes completados...');
        const driverRef = doc(db, 'users', currentUser.uid);
        transaction.update(driverRef, {
          completedTrips: increment(1),
          updatedAt: now
        });
        console.log('Contador de viajes completados actualizado');
      });

      console.log('Transacción completada exitosamente');
      
      // Actualizar estado local
      setMyTrips(prevTrips => {
        const updatedTrips = prevTrips.map(trip => 
          trip.id === tripId 
            ? { 
                ...trip, 
                status: 'completed', 
                completedAt: new Date(),
                endTime: new Date()
              } 
            : trip
        );
        console.log('Estado local actualizado');
        return updatedTrips;
      });

      // Limpiar viaje aceptado si es el actual
      if (acceptedTrip?.id === tripId) {
        setAcceptedTrip(null);
        console.log('Viaje aceptado eliminado del estado');
      }

      alert('¡Viaje completado con éxito! El pasajero podrá calificar el servicio.');
      
    } catch (error) {
      console.error('Error al completar el viaje:', {
        mensaje: error.message,
        código: error.code,
        stack: error.stack,
        nombre: error.name
      });
      alert(`Error al completar el viaje: ${error.message}`);
    } finally {
      console.log('Proceso de finalización de viaje finalizado');
      setLoading(false);
    }
    
    // Código de finalización de la función
  };


  return (
    <div className="min-h-screen bg-light pt-16">
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark">{STRINGS.PANEL_DEL_CONDUCTOR}</h1>
          {acceptedTrip && (
            <button onClick={() => setIsChatOpen(true)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <FaCommentDots className="text-primary text-2xl" />
            </button>
          )}
        </div>
      </div>
      
      {isChatOpen && acceptedTrip && (
        <Chat tripId={acceptedTrip.id} onClose={() => setIsChatOpen(false)} />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        {locationError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded" role="alert">
            <p className="font-bold">Error de Ubicación</p>
            <p>{locationError}</p>
          </div>
        )}
        
        {/* Active trip alert - between map and tabs */}
        {acceptedTrip && (acceptedTrip.status === 'accepted' || acceptedTrip.status === 'in_progress') && (
          <div className="mb-6 p-4 bg-success text-white rounded-lg text-center shadow-lg animate-pulse">
            <p className="font-bold text-lg">¡El pasajero te está esperando!</p>
            {acceptedTrip.passengerName && <p><strong>{acceptedTrip.passengerName}</strong> está listo para el viaje.</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar izquierda - Contenido principal */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            {/* Tabs - Visibles en móviles y escritorio */}
            <div className="bg-white rounded-lg shadow-md p-6">
              
              <div className="flex border-b mb-4 space-x-2 overflow-x-auto">
                <Button 
                  className={`flex-1 min-w-max py-2 px-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'available' ? 'text-primary border-b-2 border-primary' : 'text-secondary'
                  }`}
                  onClick={() => setActiveTab('available')}
                >
                  {STRINGS.VIAJES_DISPONIBLES}
                </Button>
                <Button 
                  className={`flex-1 min-w-max py-2 px-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'my-trips' ? 'text-primary border-b-2 border-primary' : 'text-secondary'
                  }`}
                  onClick={() => setActiveTab('my-trips')}
                >
                  {STRINGS.MIS_VIAJES}
                </Button>
                <Button 
                  className={`flex-1 min-w-max py-2 px-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === 'create-trip' ? 'text-primary border-b-2 border-primary' : 'text-secondary'
                  }`}
                  onClick={() => setActiveTab('create-trip')}
                >
                  <FaPlus className="inline mr-1" /> {activeTab === 'create-trip' ? 'Nuevo viaje' : ''}
                </Button>
              </div>
              
              {/* Available Trips Tab */}
              {activeTab === 'available' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-dark">{STRINGS.SOLICITUDES_DE_VIAJE}</h3>
                  {availableTrips.length === 0 ? (
                    <p className="text-sm text-secondary py-4 text-center">{STRINGS.NO_HAY_VIAJES_DISPONIBLES}</p>
                  ) : (
                    <div className="space-y-4">
                      {availableTrips.map((trip) => (
                        <div key={trip.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-danger mr-2 w-4" />
                            <span className="truncate">{trip.origin?.address || STRINGS.ORIGEN_NO_ESPECIFICADO}</span>
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-success mr-2 w-4" />
                            <span className="truncate">{trip.destination?.address || STRINGS.DESTINO_NO_ESPECIFICADO}</span>
                          </div>
                          <div className="flex items-center text-secondary">
                            <FaClock className="mr-2 w-4" />
                            <span>{formatDate(trip.departureTime)}</span>
                          </div>
                          <div className="flex items-center text-secondary">
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
                        <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium text-dark">
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
                              <div className="text-xl font-bold text-primary">${(trip.price || 0).toLocaleString()}</div>
                              <div className="text-sm text-secondary">
                                {trip.passengers} {trip.passengers > 1 ? STRINGS.PASAJEROS : STRINGS.PASAJERO}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-danger mr-2 w-4" />
                              <span className="truncate">{trip.origin?.address || STRINGS.ORIGEN_NO_ESPECIFICADO}</span>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-success mr-2 w-4" />
                              <span className="truncate">{trip.destination?.address || STRINGS.DESTINO_NO_ESPECIFICADO}</span>
                            </div>
                            <div className="flex items-center text-secondary">
                              <FaClock className="mr-2 w-4" />
                              <span>{formatDate(trip.departureTime)}</span>
                            </div>
                            {trip.carModel && (
                              <div className="flex items-center text-secondary">
                                <FaCar className="mr-2 w-4" />
                                <span>{trip.carModel} {trip.carPlate ? `• ${trip.carPlate}` : ''}</span>
                              </div>
                            )}
                            {trip.passengerName && (
                              <div className="mt-2 pt-2 border-t">
                                <p className="font-medium text-sm mb-1">{STRINGS.PASAJERO}:</p>
                                <div className="flex items-center text-sm text-dark">
                                  <FaUser className="mr-2 w-4 text-secondary" />
                                  <span>{trip.passengerName}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {trip.status === 'accepted' && (
                            <div className="flex gap-2">
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
                      <div className="text-center py-8 text-secondary">
                        <p>{STRINGS.NO_TIENES_VIAJES_ACTIVOS}</p>
                        <Button 
                          className="mt-4 text-primary hover:text-primary-dark font-medium"
                          onClick={() => setActiveTab('create-trip')}
                        >
                          {STRINGS.CREAR_UN_NUEVO_VIAJE}
                        </Button>
                      </div>
                    )
                  ) : (
                    // Trip history
                    tripHistory.length > 0 ? (
                      tripHistory.map((trip) => (
                        <div key={trip.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-success">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-dark">
                                {trip.origin?.name || STRINGS.ORIGEN_DESCONOCIDO} → {trip.destination?.name || STRINGS.DESTINO_DESCONOCIDO}
                              </h3>
                              <p className="text-sm text-secondary">
                                {trip.passengerName ? `${STRINGS.PASAJERO}: ${trip.passengerName}` : STRINGS.PASAJERO_NO_ESPECIFICADO}
                              </p>
                              <p className="text-sm text-secondary">
                                {STRINGS.PRECIO}${trip.price || 'No especificado'}
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
                        <p className="text-secondary">{STRINGS.AUN_NO_TIENES_VIAJES_COMPLETADOS}</p>
                      </div>
                    )
                  )}
                </div>
              )}
              
              {/* Create Trip Tab */}
              {activeTab === 'create-trip' && (
                <form onSubmit={handleCreateTrip}>
                  <h3 className="font-medium text-dark mb-4">{STRINGS.CREAR_NUEVO_VIAJE}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">{STRINGS.ORIGEN}</label>
                      <div className="flex items-center bg-light rounded-lg p-3">
                        <FaMapMarkerAlt className="text-danger mr-2" />
                        <span>{origin?.name || STRINGS.SELECCIONA_EN_MAPA}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">{STRINGS.DESTINO}</label>
                      <div className="flex items-center bg-light rounded-lg p-3">
                        <FaMapMarkerAlt className="text-success mr-2" />
                        <span>{destination?.name || STRINGS.SELECCIONA_EN_MAPA}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="departureTime" className="block text-sm font-medium text-dark mb-1">
                        {STRINGS.FECHA_Y_HORA_DE_SALIDA}
                      </label>
                      <input
                        type="datetime-local"
                        id="departureTime"
                        name="departureTime"
                        value={tripDetails.departureTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="availableSeats" className="block text-sm font-medium text-dark mb-1">
                        {STRINGS.ASIENTOS_DISPONIBLES_MAYUS}
                      </label>
                      <input
                        type="number"
                        id="availableSeats"
                        name="availableSeats"
                        min="1"
                        max="10"
                        value={tripDetails.availableSeats}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-dark mb-1">
                        {STRINGS.PRECIO_POR_ASIENTO}
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
                          value={tripDetails.price}
                          onChange={handleInputChange}
                          className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="carModel" className="block text-sm font-medium text-dark mb-1">
                        {STRINGS.MODELO_DEL_VEHICULO}
                      </label>
                      <input
                        type="text"
                        id="carModel"
                        name="carModel"
                        value={tripDetails.carModel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder={STRINGS.EJ_TOYOTA_COROLLA}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="carPlate" className="block text-sm font-medium text-dark mb-1">
                        {STRINGS.PLACA_DEL_VEHICULO}
                      </label>
                      <input
                        type="text"
                        id="carPlate"
                        name="carPlate"
                        value={tripDetails.carPlate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder={STRINGS.EJ_ABC123}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="estimatedDuration" className="block text-sm font-medium text-dark mb-1">
                        {STRINGS.DURACION_ESTIMADA}
                      </label>
                      <input
                        type="text"
                        id="estimatedDuration"
                        name="estimatedDuration"
                        value={tripDetails.estimatedDuration}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder={STRINGS.EJ_45_MIN}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={!origin || !destination || loading}
                        className={`w-full bg-primary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                          (!origin || !destination || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
                        }`}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {STRINGS.CREANDO_VIAJE}
                          </>
                        ) : (
                          STRINGS.PUBLICAR_VIAJE
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
              
              {/* Alert for active trip will be placed between map and tabs */}
            </div>
          </div>
          
          {/* Mapa - Visible en móviles (arriba) y escritorio (derecha) */}
          <div className="lg:col-span-2 order-1 lg:order-2 bg-white rounded-xl shadow-md overflow-hidden relative" style={{ height: 'calc(100vh - 8rem)' }}>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              {!currentPosition && (
                <div className="text-center p-4 bg-white rounded-lg shadow-lg">
                  <p className="text-lg font-medium text-gray-700">Cargando mapa...</p>
                  <p className="text-sm text-gray-500 mt-1">Obteniendo tu ubicación</p>
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
              whenCreated={(mapInstance) => {
                console.log('Mapa inicializado:', mapInstance);
                handleMapLoad(mapInstance);
              }}
              key={`map-${currentPosition ? 'with-position' : 'no-position'}-${window.innerWidth}`}
            >
              {mapViewMode === 'currentLocation' && currentPosition && (() => {
                console.log('DEBUG: MapContainer rendering RecenterMap.');
                console.log('DEBUG: mapViewMode:', mapViewMode);
                console.log('DEBUG: currentPosition:', currentPosition);
                return <RecenterMap position={currentPosition} zoom={15} />;
              })()}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {mapViewMode === 'allPoints' && pointsToFit && pointsToFit.length > 0 && (() => {
                console.log('DEBUG: MapContainer rendering FitBoundsToMarkers.');
                console.log('DEBUG: mapViewMode:', mapViewMode);
                console.log('DEBUG: pointsToFit:', pointsToFit);
                console.log('DEBUG: pointsToFit.length:', pointsToFit?.length);
                return <FitBoundsToMarkers points={pointsToFit} />;
              })()}
              {currentPosition && (
                <Marker 
                  position={currentPosition} 
                  icon={acceptedTrip ? flashingDriverIcon : driverIcon}
                >
                  <Popup>{STRINGS.TU_UBICACION}</Popup>
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
                availableTrips.map((trip) => {
                  try {
                    console.log(`Procesando marcadores para viaje ${trip.id}:`, trip);
                    
                    // Verificar que las coordenadas sean válidas
                    if (!trip.origin?.coordinates || !trip.destination?.coordinates) {
                      console.warn(`Viaje ${trip.id} sin coordenadas válidas`);
                      return null;
                    }
                    
                    // Obtener coordenadas en formato [lat, lng] para Leaflet
                    const originCoords = [
                      trip.origin.coordinates.lat,
                      trip.origin.coordinates.lng
                    ];
                    
                    const destCoords = [
                      trip.destination.coordinates.lat,
                      trip.destination.coordinates.lng
                    ];
                    
                    console.log('Coordenadas procesadas:', { originCoords, destCoords });

                    return (
                      <React.Fragment key={`trip-${trip.id}`}>
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
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm text-gray-700">No hay viajes disponibles en este momento</p>
                </div>
              )}
              
              {/* Selector de ubicación para crear viaje */}
              {activeTab === 'create-trip' && (
                <LocationSelector onSelect={handleLocationSelect} />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Driver;