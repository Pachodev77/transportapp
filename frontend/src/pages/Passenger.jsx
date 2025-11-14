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
  runTransaction,
  arrayUnion
} from 'firebase/firestore';
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
  const hasShownRatingModal = useRef({});

  // Handle rating a trip
  const handleRateTrip = async (ratingData) => {
    if (!ratingData || !ratingData.rating) {
      if (tripToRate?.rideRequestId) {
        hasShownRatingModal.current[tripToRate.rideRequestId] = false;
      }
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

      if (rideRequestData.status !== 'completed') {
        throw new Error('Solo puedes calificar viajes completados.');
      }

      if (rideRequestData.ratedBy?.includes(currentUser.uid)) {
        throw new Error('Este viaje ya fue calificado.');
      }

      const batch = writeBatch(db);

      const ratingUpdate = {
        rating: Number(rating),
        comment: String(comment || '').trim(),
        ratedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        canRate: false,
        ratedBy: arrayUnion(currentUser.uid)
      };

      batch.update(rideRequestRef, ratingUpdate);

      // The following transaction is removed because it violates security rules.
      // A Cloud Function should be used to aggregate ratings and update the driver's profile.
      /*
      if (rideRequestData.driverId) {
        const driverRef = doc(db, 'users', rideRequestData.driverId);
        
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
      */

      await batch.commit();

      setMyBookings(prev =>
        prev.map(booking =>
          booking.id === rideRequestId
            ? {
                ...booking,
                rating: Number(rating),
                comment: String(comment || '').trim(),
                canRate: false,
                ratedBy: [...(booking.ratedBy || []), currentUser.uid]
              }
            : booking
        )
      );

      setSuccessMessage('¡Gracias por calificar tu viaje!');
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
      req.status === 'completed' &&
      req.passengerId === currentUser.uid &&
      !req.ratedBy?.includes(currentUser.uid) &&
      req.canRate !== false
    );

    if (rideToRate && !hasShownRatingModal.current[rideToRate.id]) {
      hasShownRatingModal.current[rideToRate.id] = true;
      setTripToRate(rideToRate);
      setShowRatingModal(true);
    }
  }, [myRideRequests, currentUser, showRatingModal]); // Only depend on uid instead of the whole currentUser object

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
    if (!currentUser) return;

    const unsubscribe = subscribeToPassengerRideRequestUpdates(currentUser.uid, (rideRequests) => {
      setMyRideRequests(rideRequests);

      const activeTrip = rideRequests.find(
        request => request.status === 'accepted' || request.status === 'in_progress'
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
      handleCancelRequest(selectedTrip.rideRequestId);
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
      
      {/* Rating Modal - Always render but control visibility with isOpen */}
  {tripToRate && (
    <RatingModal
      key={tripToRate.id}
      isOpen={showRatingModal}
      onClose={() => {
        console.log('Closing rating modal');
        setShowRatingModal(false);
      }}
      onSubmit={handleRateTrip}
      rideRequestId={tripToRate.id}
    />
  )}
    </div>
  );
}
