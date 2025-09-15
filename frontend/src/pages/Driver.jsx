import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FaCar, FaMapMarkerAlt, FaClock, FaUser, FaMoneyBillWave, FaStar, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
import { collection, query, where, getDocs, getDoc, addDoc, updateDoc, doc, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

export default function Driver() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  
  const renderTripTabs = () => (
    <div className="flex border-b border-gray-200 mb-4">
      <button
        className={`py-2 px-4 font-medium ${!showHistory ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setShowHistory(false)}
      >
        Viajes Activos
      </button>
      <button
        className={`py-2 px-4 font-medium ${showHistory ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setShowHistory(true)}
      >
        Historial
      </button>
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

  // Fetch available ride requests and handle initial map centering
  useEffect(() => {
    if (!currentUser) return;
    
    // If we have an accepted trip from localStorage, center the map on it
    const savedTrip = localStorage.getItem('acceptedTrip');
    if (savedTrip) {
      const trip = JSON.parse(savedTrip);
      if (trip?.origin) {
        // Small delay to ensure map is ready
        const timer = setTimeout(() => {
          if (mapRef.current) {
            const { lat, lng } = trip.origin;
            mapRef.current.flyTo([lat, lng], 15, {
              animate: true,
              duration: 1.5,
              easeLinearity: 0.5
            });
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    }
    
    const q = query(
      collection(db, 'rideRequests'),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = [];
      snapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setAvailableTrips(requests);
    });
    
    return () => unsubscribe();
  }, [currentUser]);
  
  // Fetch all trips and handle filtering locally
  useEffect(() => {
    if (!currentUser) return;
    
    console.log('=== Setting up Firestore listeners ===');
    console.log('User ID:', currentUser.uid);
    
    // Query for trips where the current user is the driver
    const tripsQuery = query(
      collection(db, 'trips'),
      where('driverId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    console.log('Setting up trips query for driver:', currentUser.uid);
    
    // Listen for changes to trips
    const unsubscribeTrips = onSnapshot(tripsQuery, 
      (snapshot) => {
        const allTrips = [];
        snapshot.forEach((doc) => {
          allTrips.push({ id: doc.id, ...doc.data() });
        });
        
        // Split into active and completed trips
        const activeTrips = allTrips.filter(trip => 
          ['requested', 'accepted', 'in_progress'].includes(trip.status)
        );
        
        const completedTrips = allTrips.filter(trip => 
          trip.status === 'completed'
        );
        
        console.log('=== Trips update ===');
        console.log('Active trips:', activeTrips.length);
        console.log('Completed trips:', completedTrips.length);
        
        // Update state
        setMyTrips(activeTrips);
        setTripHistory(completedTrips);
      },
      (error) => {
        console.error('Error fetching trips:', error);
      }
    );
    
    // Also check rideRequests collection for backward compatibility
    const rideRequestsQuery = query(
      collection(db, 'rideRequests'),
      where('driverId', '==', currentUser.uid),
      where('status', '==', 'accepted')
    );
    
    const unsubscribeRideRequests = onSnapshot(rideRequestsQuery, 
      (snapshot) => {
        const requests = [];
        snapshot.forEach((doc) => {
          requests.push({ id: doc.id, ...doc.data() });
        });
        
        if (requests.length > 0) {
          setMyTrips(prev => {
            // Filter out any existing trips with the same ID
            const existingIds = new Set(prev.map(trip => trip.id));
            const newTrips = requests.filter(trip => !existingIds.has(trip.id));
            return [...prev, ...newTrips];
          });
        }
      },
      (error) => {
        console.error('Error fetching ride requests:', error);
      }
    );
    
    return () => {
      unsubscribeTrips();
      unsubscribeRideRequests();
    };
  }, [currentUser]);

  const handleLocationSelect = (latlng) => {
    if (!origin) {
      setOrigin({ ...latlng, name: 'Origen' });
    } else if (!destination) {
      setDestination({ ...latlng, name: 'Destino' });
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
      alert('Por favor selecciona origen y destino en el mapa');
      return;
    }
    
    setLoading(true);
    try {
      const newTrip = {
        driverId: currentUser.uid,
        driverName: currentUser.displayName,
        origin,
        destination,
        ...tripDetails,
        status: 'available',
        createdAt: new Date().toISOString(),
        passengers: []
      };
      
      await addDoc(collection(db, 'trips'), newTrip);
      
      // Reset form
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
      
      alert('¡Viaje creado exitosamente!');
      setActiveTab('my-trips');
    } catch (error) {
      console.error('Error creating trip: ', error);
      alert('Error al crear el viaje. Por favor intenta de nuevo.');
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

  const handleAcceptTrip = async (tripId) => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      
      // Find the trip in availableTrips
      const tripToAccept = availableTrips.find(trip => trip.id === tripId);
      if (!tripToAccept) {
        throw new Error('No se encontró el viaje seleccionado');
      }
      
      // Ensure we have valid origin coordinates
      if (!tripToAccept.origin || typeof tripToAccept.origin.lat !== 'number' || typeof tripToAccept.origin.lng !== 'number') {
        console.error('Invalid trip origin coordinates:', tripToAccept.origin);
        throw new Error('El viaje no tiene una ubicación de origen válida');
      }
      
      // Store the accepted trip with a new reference to ensure state update
      const newAcceptedTrip = {
        ...tripToAccept,
        origin: {
          lat: parseFloat(tripToAccept.origin.lat),
          lng: parseFloat(tripToAccept.origin.lng),
          name: tripToAccept.origin.name || 'Origen'
        }
      };
      
      setAcceptedTrip(newAcceptedTrip);
      console.log('Trip accepted, updating state with:', newAcceptedTrip);
      
      // Force center the map on the passenger's location
      const { lat, lng } = newAcceptedTrip.origin;
      centerMapOnLocation(lat, lng);
      
      // Create a new trip in the trips collection
      const tripData = {
        ...tripToAccept,
        status: 'accepted',
        driverId: currentUser.uid,
        driverName: currentUser.displayName || 'Conductor',
        passengerId: tripToAccept.passengerId,
        passengerName: tripToAccept.passengerName,
        origin: tripToAccept.origin,
        destination: tripToAccept.destination,
        price: tripToAccept.price || 0,
        passengers: tripToAccept.passengers || 1,
        departureTime: tripToAccept.departureTime || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add to trips collection
      await addDoc(collection(db, 'trips'), tripData);
      
      // Update the ride request status to 'accepted'
      const requestRef = doc(db, 'rideRequests', tripId);
      await updateDoc(requestRef, {
        status: 'accepted',
        driverId: currentUser.uid,
        driverName: currentUser.displayName || 'Conductor',
        updatedAt: new Date().toISOString()
      });
      
      // Remove from available trips
      setAvailableTrips(prev => prev.filter(trip => trip.id !== tripId));
      
      alert('¡Has aceptado el viaje exitosamente! Dirígete a la ubicación del pasajero.');
      setActiveTab('my-trips');
      
    } catch (error) {
      console.error('Error accepting trip:', error);
      alert('Error al aceptar el viaje. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTrip = async (tripId) => {
    console.log('=== [handleCompleteTrip] Starting ===');
    console.log('Trip ID:', tripId);
    console.log('Current myTrips:', myTrips);
    
    if (!tripId) {
      const errorMsg = 'No trip ID provided for completion';
      console.error(errorMsg);
      alert('No se pudo identificar el viaje a completar');
      return;
    }
    
    const tripToComplete = myTrips.find(trip => trip.id === tripId);
    
    if (!tripToComplete) {
      const errorMsg = `Trip ${tripId} not found in active trips`;
      console.error(errorMsg);
      console.log('Available trip IDs:', myTrips.map(t => t.id));
      alert('No se pudo encontrar el viaje activo para completar');
      return;
    }
    
    console.log('Trip to complete found:', tripToComplete);
    
    // Create a copy of the trip with updated status
    const completedTrip = {
      ...tripToComplete,
      status: 'completed',
      updatedAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    try {
      setLoading(true);
      console.log('Starting trip completion process...');
      
      // Try to find the trip in the 'trips' collection
      let tripRef = doc(db, 'trips', tripId);
      let tripDoc = await getDoc(tripRef);
      let collectionName = 'trips';
      
      // If not found in 'trips', try 'rideRequests' collection
      if (!tripDoc.exists()) {
        console.log(`Trip not found in 'trips' collection, checking 'rideRequests'...`);
        collectionName = 'rideRequests';
        tripRef = doc(db, 'rideRequests', tripId);
        tripDoc = await getDoc(tripRef);
        
        if (!tripDoc.exists()) {
          const errorMsg = `Trip ${tripId} not found in either collection`;
          console.error(errorMsg);
          throw new Error('El viaje no existe en la base de datos');
        }
      }
      
      console.log(`Found trip in collection: ${collectionName}/${tripId}`);
      console.log('Current trip data:', tripDoc.data());
      
      // Prepare update data
      const updateData = {
        status: 'completed',
        updatedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      };
      
      console.log('Attempting to update with data:', updateData);
      
      // Update the document
      await updateDoc(tripRef, updateData);
      console.log('✅ Successfully updated trip in Firestore');
      
      // Optimistically update the local state
      console.log('Updating local state...');
      setMyTrips(prev => {
        const updated = prev.filter(trip => trip.id !== tripId);
        console.log('Updated myTrips (after filter):', updated);
        return updated;
      });
      
      setTripHistory(prev => {
        const updated = [completedTrip, ...prev];
        console.log('Updated tripHistory (after add):', updated);
        return updated;
      });
      
      // Clear the accepted trip from state and localStorage if it's the current trip
      if (acceptedTrip?.id === tripId) {
        console.log('Clearing accepted trip from state and localStorage');
        setAcceptedTrip(null);
        localStorage.removeItem('acceptedTrip');
      }
      
      console.log('✅ Trip marked as completed successfully');
      alert('¡Viaje completado exitosamente!');
    } catch (error) {
      console.error('❌ Error completing trip:', {
        error,
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      let errorMessage = 'Error al completar el viaje. Por favor, inténtalo de nuevo.';
      
      if (error.code === 'permission-denied') {
        console.error('Permission denied - check Firestore rules');
        errorMessage = 'No tienes permiso para completar este viaje.';
      } else if (error.code === 'not-found' || 
                 error.message.includes('no existe') || 
                 error.message.includes('not found')) {
        errorMessage = 'El viaje no existe o ya ha sido completado';
      }
      
      alert(errorMessage);
      
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Panel del Conductor</h2>
              
              <div className="flex border-b mb-4">
                <button 
                  className={`flex-1 py-2 font-medium ${activeTab === 'available' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('available')}
                >
                  Viajes Disponibles
                </button>
                <button 
                  className={`flex-1 py-2 font-medium ${activeTab === 'my-trips' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('my-trips')}
                >
                  Mis Viajes
                </button>
                <button 
                  className={`flex-1 py-2 font-medium ${activeTab === 'create-trip' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('create-trip')}
                >
                  <FaPlus className="inline mr-1" />
                </button>
              </div>
              
              {/* Available Trips Tab */}
              {activeTab === 'available' && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Solicitudes de viaje</h3>
                  {availableTrips.length === 0 ? (
                    <p className="text-sm text-gray-500 py-4 text-center">No hay viajes disponibles en este momento</p>
                  ) : (
                    <div className="space-y-4">
                      {availableTrips.map((trip) => (
                        <div key={trip.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-red-500 mr-2 w-4" />
                            <span className="truncate">{trip.origin?.name || 'Origen no especificado'}</span>
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-green-500 mr-2 w-4" />
                            <span className="truncate">{trip.destination?.name || 'Destino no especificado'}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <FaClock className="mr-2 w-4" />
                            <span>{formatDate(trip.departureTime)}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <FaUser className="mr-2 w-4" />
                            <span>{trip.passengers || 1} pasajero{trip.passengers !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center text-lg font-semibold text-blue-600">
                            <FaMoneyBillWave className="mr-2" />
                            ${(trip.price || 0).toLocaleString()}
                          </div>
                          <button
                            onClick={() => handleAcceptTrip(trip.id)}
                            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Procesando...
                              </>
                            ) : (
                              <>
                                <FaCheck className="mr-2" />
                                Aceptar viaje
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* My Trips Tab */}
              {activeTab === 'my-trips' && (
                <div className="space-y-4">
                  {renderTripTabs()}
                  
                  {!showHistory ? (
                    // Active trips
                    myTrips.length > 0 ? (
                      myTrips.map((trip) => (
                        <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">
                                {trip.origin?.name?.split(',')[0] || 'Origen'} → {trip.destination?.name?.split(',')[0] || 'Destino'}
                              </h4>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                trip.status === 'accepted' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : trip.status === 'completed'
                                    ? 'bg-gray-100 text-gray-800'
                                    : trip.status === 'in_progress'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                              }`}>
                                {trip.status === 'accepted' 
                                  ? 'Aceptado' 
                                  : trip.status === 'completed' 
                                    ? 'Completado' 
                                    : trip.status === 'in_progress'
                                      ? 'En curso'
                                      : 'Disponible'}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-blue-600">${(trip.price || 0).toLocaleString()}</div>
                              <div className="text-sm text-gray-500">
                                {trip.passengers} pasajero{trip.passengers !== 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-red-500 mr-2 w-4" />
                              <span className="truncate">{trip.origin?.name || 'Origen no especificado'}</span>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-green-500 mr-2 w-4" />
                              <span className="truncate">{trip.destination?.name || 'Destino no especificado'}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <FaClock className="mr-2 w-4" />
                              <span>{formatDate(trip.departureTime)}</span>
                            </div>
                            {trip.carModel && (
                              <div className="flex items-center text-gray-500">
                                <FaCar className="mr-2 w-4" />
                                <span>{trip.carModel} {trip.carPlate ? `• ${trip.carPlate}` : ''}</span>
                              </div>
                            )}
                            {trip.passengerName && (
                              <div className="mt-2 pt-2 border-t">
                                <p className="font-medium text-sm mb-1">Pasajero:</p>
                                <div className="flex items-center text-sm text-gray-600">
                                  <FaUser className="mr-2 w-4 text-gray-400" />
                                  <span>{trip.passengerName}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {trip.status === 'accepted' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleCompleteTrip(trip.id)}
                                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                                disabled={loading}
                              >
                                {loading ? 'Procesando...' : 'Completar viaje'}
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No tienes viajes activos</p>
                        <button 
                          className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                          onClick={() => setActiveTab('create-trip')}
                        >
                          Crear un nuevo viaje
                        </button>
                      </div>
                    )
                  ) : (
                    // Trip history
                    tripHistory.length > 0 ? (
                      tripHistory.map((trip) => (
                        <div key={trip.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {trip.origin?.name || 'Origen desconocido'} → {trip.destination?.name || 'Destino desconocido'}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {trip.passengerName ? `Pasajero: ${trip.passengerName}` : 'Pasajero no especificado'}
                              </p>
                              <p className="text-sm text-gray-500">
                                Precio: ${trip.price || 'No especificado'}
                              </p>
                              {trip.completedAt && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Completado: {formatDate(trip.completedAt, true)}
                                </p>
                              )}
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completado
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Aún no tienes viajes completados en tu historial.</p>
                      </div>
                    )
                  )}
                </div>
              )}
              
              {/* Create Trip Tab */}
              {activeTab === 'create-trip' && (
                <form onSubmit={handleCreateTrip}>
                  <h3 className="font-medium text-gray-900 mb-4">Crear nuevo viaje</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Origen</label>
                      <div className="flex items-center bg-gray-100 rounded-lg p-3">
                        <FaMapMarkerAlt className="text-red-500 mr-2" />
                        <span>{origin?.name || 'Selecciona en el mapa'}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                      <div className="flex items-center bg-gray-100 rounded-lg p-3">
                        <FaMapMarkerAlt className="text-green-500 mr-2" />
                        <span>{destination?.name || 'Selecciona en el mapa'}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha y hora de salida
                      </label>
                      <input
                        type="datetime-local"
                        id="departureTime"
                        name="departureTime"
                        value={tripDetails.departureTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700 mb-1">
                        Asientos disponibles
                      </label>
                      <input
                        type="number"
                        id="availableSeats"
                        name="availableSeats"
                        min="1"
                        max="10"
                        value={tripDetails.availableSeats}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Precio por asiento
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          min="0"
                          value={tripDetails.price}
                          onChange={handleInputChange}
                          className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="carModel" className="block text-sm font-medium text-gray-700 mb-1">
                        Modelo del vehículo
                      </label>
                      <input
                        type="text"
                        id="carModel"
                        name="carModel"
                        value={tripDetails.carModel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Toyota Corolla 2020"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="carPlate" className="block text-sm font-medium text-gray-700 mb-1">
                        Placa del vehículo
                      </label>
                      <input
                        type="text"
                        id="carPlate"
                        name="carPlate"
                        value={tripDetails.carPlate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: ABC123"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="estimatedDuration" className="block text-sm font-medium text-gray-700 mb-1">
                        Duración estimada
                      </label>
                      <input
                        type="text"
                        id="estimatedDuration"
                        name="estimatedDuration"
                        value={tripDetails.estimatedDuration}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 45 min"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!origin || !destination || loading}
                        className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                          (!origin || !destination || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creando viaje...
                          </>
                        ) : (
                          'Publicar viaje'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Map - Added responsive height and full width on mobile */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden w-full h-[400px] lg:h-auto">
            <div className="w-full h-full">
              <MapContainer 
                center={[5.2226, -76.0307]} 
                zoom={13} 
                style={{ height: '100%', width: '100%', minHeight: '400px' }}
                zoomControl={true}
                whenCreated={handleMapLoad}
              >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Passenger Location Marker */}
              {acceptedTrip?.origin && (
                <Marker 
                  position={[acceptedTrip.origin.lat, acceptedTrip.origin.lng]}
                  icon={passengerIcon}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-medium">Recoger a {acceptedTrip.passengerName || 'el pasajero'}</div>
                      <div>{acceptedTrip.origin.name || 'Ubicación del pasajero'}</div>
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
                  <Popup>Origen: {origin.name || 'Ubicación de recogida'}</Popup>
                </Marker>
              )}
              
              {/* Destination Marker */}
              {destination && (
                <Marker 
                  position={[destination.lat, destination.lng]} 
                  icon={defaultIcon}
                >
                  <Popup>Destino: {destination.name || 'Ubicación de destino'}</Popup>
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
                      <div className="font-medium">Solicitud de viaje</div>
                      <div>De: {trip.origin.name || 'Origen'}</div>
                      <div>A: {trip.destination.name || 'Destino'}</div>
                      <div>Pasajeros: {trip.passengers || 1}</div>
                      <div>Precio: ${(trip.price || 0).toLocaleString()}</div>
                      <button
                        onClick={() => handleAcceptTrip(trip.id)}
                        className="mt-2 w-full bg-green-600 text-white py-1 px-2 rounded text-xs font-medium hover:bg-green-700"
                      >
                        Aceptar viaje
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* Location Selector */}
              {activeTab === 'create-trip' && (
                <LocationSelector onSelect={handleLocationSelect} />
              )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
