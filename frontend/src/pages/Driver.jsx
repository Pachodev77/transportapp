import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FaCar, FaMapMarkerAlt, FaClock, FaUser, FaMoneyBillWave, FaStar, FaPlus, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { 
  getTripsByStatus as getTrips,
  getUserTrips, 
  updateTripStatus, 
  createTrip, 
  subscribeToTripUpdates,
  subscribeToTrips,
  onSnapshot,
  doc,
  setDoc
} from '../firebase/config';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { STRINGS } from '../utils/constants';
import Button from '../components/Button';

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

// Custom icon for passenger location
const passengerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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

function Driver() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);
        if (currentUser) {
          const locationRef = doc(db, 'locations', currentUser.uid);
          setDoc(locationRef, { 
            location: new firebase.firestore.GeoPoint(latitude, longitude),
            updatedAt: serverTimestamp(),
          });
        }
      },
      (error) => {
        console.error('Error watching position:', error);
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
  
  const TripTabs = () => (
    <div className="flex border-b border-gray-200 mb-4">
      <Button
        className={`py-2 px-4 font-medium ${!showHistory ? 'text-primary border-b-2 border-primary' : 'text-secondary'}`}
        onClick={() => setShowHistory(false)}
      >
        {STRINGS.VIAJES_ACTIVOS}
      </Button>
      <Button
        className={`py-2 px-4 font-medium ${showHistory ? 'text-primary border-b-2 border-primary' : 'text-secondary'}`}
        onClick={() => setShowHistory(true)}
      >
        {STRINGS.HISTORIAL}
      </Button>
    </div>
  );
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
  
  const [map, setMap] = useState(null);
  const [acceptedTrip, setAcceptedTrip] = useState(null);
  const mapRef = useRef();
  const mapInitialized = useRef(false);
  const pendingCenter = useRef(null);
  
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

  // Effect to handle map centering when acceptedTrip changes
  useEffect(() => {
    if (!acceptedTrip?.origin) return;
    
    const { lat, lng } = acceptedTrip.origin;
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
      console.error('Invalid coordinates in acceptedTrip:', { lat, lng });
      return;
    }
    
    // Try to center immediately
    const success = centerMapOnLocation(lat, lng);
    
    // If failed, try again after a short delay
    if (!success) {
      const timer = setTimeout(() => {
        centerMapOnLocation(lat, lng);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [acceptedTrip]);

  // Fetch available trips and subscribe to updates
  useEffect(() => {
    if (!currentUser) return;

    // Load saved trip from localStorage if exists
    const savedTrip = JSON.parse(localStorage.getItem('acceptedTrip'));
    if (savedTrip?.origin) {
      setAcceptedTrip(savedTrip);
      // Center map on saved trip location
      setTimeout(() => {
        const { lat, lng } = savedTrip.origin;
        centerMapOnLocation(lat, lng);
      }, 500);
    }

    // Subscribe to real-time updates for available trips
    const unsubscribeTrips = subscribeToTrips('searching',
      (trips) => {
        setAvailableTrips(trips);
      },
      (error) => {
        console.error('Error fetching available trips:', error);
      }
    );

    return () => {
      if (typeof unsubscribeTrips === 'function') {
        unsubscribeTrips();
      }
    };
  }, [currentUser]);

  // Fetch user's trips (both active and history)
  useEffect(() => {
    if (!currentUser) return;
    
    const fetchUserTrips = async () => {
      try {
        setLoading(true);
        const [activeTrips, historyTrips] = await Promise.all([
          getUserTrips(currentUser.uid, false), // Active trips
          getUserTrips(currentUser.uid, true)   // History trips
        ]);
        
        setMyTrips(activeTrips);
        setTripHistory(historyTrips);
      } catch (error) {
        console.error('Error fetching user trips:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserTrips();
    
    // Subscribe to real-time updates for active trips
    const unsubscribe = subscribeToTripUpdates(
      currentUser.uid,
      (trips) => {
        setMyTrips(trips.filter(trip => trip.status !== 'completed' && trip.status !== 'cancelled'));
        // Update acceptedTrip if it's one of the updated trips
        if (acceptedTrip) {
          const updatedTrip = trips.find(t => t.id === acceptedTrip.id);
          if (updatedTrip) {
            setAcceptedTrip(updatedTrip);
            localStorage.setItem('acceptedTrip', JSON.stringify(updatedTrip));
          }
        }
      },
      (error) => {
        console.error('Error subscribing to trip updates:', error);
      }
    );
    
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [currentUser, acceptedTrip]);

  const handleLocationSelect = (latlng) => {
    if (!origin) {
      setOrigin({ ...latlng, name: STRINGS.ORIGEN });
    } else if (!destination) {
      setDestination({ ...latlng, name: STRINGS.DESTINO });
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
    if (acceptedTrip?.origin && mapRef.current) {
      const { lat, lng } = acceptedTrip.origin;
      mapRef.current.flyTo([lat, lng], 15, {
        animate: true,
        duration: 1.5
      });
    }
  }, [acceptedTrip]);

  const handleCompleteTrip = async (tripId) => {
    if (!tripId) {
      console.error('No trip ID provided for completion');
      alert('No se pudo identificar el viaje a completar');
      return;
    }

    // Find the trip in active trips
    const tripToComplete = myTrips.find(trip => trip.id === tripId);
    
    if (!tripToComplete) {
      console.error(`Trip ${tripId} not found in active trips`);
      console.log('Available trip IDs:', myTrips.map(t => t.id));
      alert('No se pudo encontrar el viaje activo para completar');
      return;
    }
    
    if (!window.confirm('¿Estás seguro de que deseas marcar este viaje como completado?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Update the trip status to completed
      await updateTripStatus(tripId, 'completed');
      
      // If this was the currently accepted trip, clear it
      if (acceptedTrip && acceptedTrip.id === tripId) {
        setAcceptedTrip(null);
        localStorage.removeItem('acceptedTrip');
      }
      
      // Show success message
      alert('¡Viaje completado con éxito!');
      
      // Refresh the trips list
      const [activeTrips, historyTrips] = await Promise.all([
        getUserTrips(currentUser.uid, false), // Active trips
        getUserTrips(currentUser.uid, true)   // History trips
      ]);
      
      setMyTrips(activeTrips);
      setTripHistory(historyTrips);
      
    } catch (error) {
      console.error('Error completing trip:', error);
      alert(error.message || 'Error al completar el viaje. Por favor, inténtalo de nuevo.');
      
      // Clean up local state if the trip doesn't exist on the server
      if (error.code === 'not-found' || error.message.includes('no existe')) {
        console.log('Cleaning up local state for non-existent trip');
        setMyTrips(prev => prev.filter(trip => trip.id !== tripId));
        if (acceptedTrip?.id === tripId) {
          setAcceptedTrip(null);
          localStorage.removeItem('acceptedTrip');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    try {
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString('es-ES', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha inválida';
    }
  };

  const handleMapLoad = (mapInstance) => {
    console.log('Map instance loaded');
    mapRef.current = mapInstance;
    setMap(mapInstance);
    mapInitialized.current = true;
    
    // If we have a pending center from before the map was ready, apply it now
    if (pendingCenter.current) {
      const { lat, lng, zoom } = pendingCenter.current;
      centerMapOnLocation(lat, lng, zoom);
      pendingCenter.current = null;
    }
    // Otherwise, if we have an accepted trip, center on it
    else if (acceptedTrip?.origin) {
      const { lat, lng } = acceptedTrip.origin;
      if (typeof lat === 'number' && typeof lng === 'number') {
        centerMapOnLocation(lat, lng);
      }
    }
    
    // Add a one-time moveend listener to log when the map has finished moving
    const handleMoveEnd = () => {
      if (mapRef.current) {
        const center = mapRef.current.getCenter();
        console.log('Map moved to:', { 
          lat: center.lat, 
          lng: center.lng,
          zoom: mapRef.current.getZoom()
        });
      }
    };
    
    mapInstance.on('moveend', handleMoveEnd);
    
    // Cleanup
    return () => {
      mapInstance.off('moveend', handleMoveEnd);
    };
  };


  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-dark mb-4">{STRINGS.PANEL_DEL_CONDUCTOR}</h2>
              
              <div className="flex border-b mb-4">
                <Button 
                  className={`flex-1 py-2 font-medium ${activeTab === 'available' ? 'text-primary border-b-2 border-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('available')}
                >
                  {STRINGS.VIAJES_DISPONIBLES}
                </Button>
                <Button 
                  className={`flex-1 py-2 font-medium ${activeTab === 'my-trips' ? 'text-primary border-b-2 border-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('my-trips')}
                >
                  {STRINGS.MIS_VIAJES}
                </Button>
                <Button 
                  className={`flex-1 py-2 font-medium ${activeTab === 'create-trip' ? 'text-primary border-b-2 border-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('create-trip')}
                >
                  <FaPlus className="inline mr-1" />
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
                            <span className="truncate">{trip.origin?.name || STRINGS.ORIGEN_NO_ESPECIFICADO}</span>
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-success mr-2 w-4" />
                            <span className="truncate">{trip.destination?.name || STRINGS.DESTINO_NO_ESPECIFICADO}</span>
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
                            ${(trip.price || 0).toLocaleString()}
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
                  <TripTabs />
                  
                  {!showHistory ? (
                    // Active trips
                    myTrips.length > 0 ? (
                      myTrips.map((trip) => (
                        <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium text-dark">
                                {trip.origin?.name?.split(',')[0] || STRINGS.ORIGEN} → {trip.destination?.name?.split(',')[0] || STRINGS.DESTINO}
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
                              <span className="truncate">{trip.origin?.name || STRINGS.ORIGEN_NO_ESPECIFICADO}</span>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-success mr-2 w-4" />
                              <span className="truncate">{trip.destination?.name || STRINGS.DESTINO_NO_ESPECIFICADO}</span>
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
            </div>
          </div>
          
          {/* Map - Added responsive height and full width on mobile */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden w-full h-96 lg:h-full">
            <div className="w-full h-full">
              <MapContainer 
                  center={currentPosition || [0, 0]} 
                  zoom={currentPosition ? 13 : 2} 
                  style={{ height: '100%', width: '100%', minHeight: '400px' }}
                  zoomControl={true}
                  whenCreated={handleMapLoad}
                >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
  const [passengerLocation, setPassengerLocation] = useState(null);

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

                {/* Passenger Location Marker */}
                {passengerLocation && (
                  <Marker 
                    position={[passengerLocation.latitude, passengerLocation.longitude]}
                    icon={passengerIcon}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="font-medium">{STRINGS.RECOGER_A}{acceptedTrip.passengerName || STRINGS.EL_PASAJERO}</div>
                        <div>{acceptedTrip.origin.name || STRINGS.UBICACION_DEL_PASAJERO}</div>
                      </div>
                    </Popup>
                  </Marker>
                )}
                
                {/* Origin Marker */}
                {origin && (
                  <Marker 
                    position={[origin.lat, origin.lng]} 
                    icon={defaultIcon}
                  >
                    <Popup>{STRINGS.ORIGEN_PUNTOS}{origin.name || STRINGS.UBICACION_DE_RECOGIDA}</Popup>
                  </Marker>
                )}
                
                {/* Destination Marker */}
                {destination && (
                  <Marker 
                    position={[destination.lat, destination.lng]} 
                    icon={defaultIcon}
                  >
                    <Popup>{STRINGS.DESTINO_PUNTOS}{destination.name || STRINGS.UBICACION_DE_DESTINO}</Popup>
                  </Marker>
                )}
                
                {/* Available Trips Markers */}
                {activeTab === 'available' && availableTrips.map((trip) => (
                  <Marker 
                    key={trip.id}
                    position={[trip.origin.lat, trip.origin.lng]} 
                    icon={defaultIcon}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="font-medium">{STRINGS.SOLICITUD_DE_VIAJE}</div>
                        <div>{STRINGS.DE}{trip.origin.name || STRINGS.ORIGEN}</div>
                        <div>{STRINGS.A}{trip.destination.name || STRINGS.DESTINO}</div>
                        <div>{STRINGS.PASAJEROS_PUNTOS}{trip.passengers || 1}</div>
                        <div>{STRINGS.PRECIO}${(trip.price || 0).toLocaleString()}</div>
                        <Button
                          onClick={() => handleAcceptTrip(trip.id)}
                          className="mt-2 w-full bg-success text-white py-1 px-2 rounded text-xs font-medium hover:bg-success-dark"
                        >
                          {STRINGS.ACEPTAR_VIAJE}
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                {/* Location Selector */}
                {activeTab === 'create-trip' && (
                  <LocationSelector onSelect={handleLocationSelect} />
                )}
              </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Driver;