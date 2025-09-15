import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { FaCar, FaMapMarkerAlt, FaClock, FaUser, FaMoneyBillWave, FaStar, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, onSnapshot, orderBy } from 'firebase/firestore';
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

function LocationSelector({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    }
  });
  return null;
}

export default function Driver() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [availableTrips, setAvailableTrips] = useState([]);
  const [myTrips, setMyTrips] = useState([]);
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
  
  // Add a ref to store the map instance
  const [map, setMap] = useState(null);
  const [acceptedTrip, setAcceptedTrip] = useState(null);
  const [passengerLocation, setPassengerLocation] = useState(null);

  // Fetch available ride requests
  useEffect(() => {
    if (!currentUser) return;
    
    // Subscribe to ride requests with status 'pending'
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
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [currentUser]);
  
  // Fetch driver's active trips
  useEffect(() => {
    if (!currentUser) return;
    
    // Subscribe to trips where driver is the current user
    const q = query(
      collection(db, 'trips'),
      where('driverId', '==', currentUser.uid),
      where('status', 'in', ['accepted', 'in_progress']),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const trips = [];
      snapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });
      setMyTrips(trips);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
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
      
      console.log('Trip created with ID: ', 'temp-id');
      
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

  const handleAcceptRequest = async (request) => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      
      // Update the ride request status to 'accepted'
      const requestRef = doc(db, 'rideRequests', request.id);
      await updateDoc(requestRef, {
        status: 'accepted',
        driverId: currentUser.uid,
        driverName: currentUser.displayName || 'Conductor',
        updatedAt: new Date().toISOString()
      });
      
      // Create a new trip in the trips collection
      const tripData = {
        driverId: currentUser.uid,
        driverName: currentUser.displayName || 'Conductor',
        passengerId: request.passengerId,
        passengerName: request.passengerName,
        origin: request.origin,
        destination: request.destination,
        status: 'accepted',
        price: 0, // You might want to calculate this based on distance
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'trips'), tripData);
      
      // Show success message
      alert('¡Has aceptado la solicitud de viaje!');
      
    } catch (error) {
      console.error('Error accepting ride request:', error);
      alert('Error al aceptar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptTrip = async (tripId) => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      
      // Find the trip in availableTrips
      const tripToAccept = availableTrips.find(trip => trip.id === tripId);
      if (!tripToAccept) {
        throw new Error('No se encontró el viaje seleccionado');
      }
      
      // Store the accepted trip to show on the map
      setAcceptedTrip(tripToAccept);
      
      // Pan the map to the passenger's location if map is available
      if (map && tripToAccept.origin) {
        map.flyTo(
          [tripToAccept.origin.lat, tripToAccept.origin.lng],
          15, // Zoom level
          {
            animate: true,
            duration: 1.5
          }
        );
      }
      
      // Store the accepted trip to show on the map
      setAcceptedTrip(tripToAccept);
      
      // Pan the map to the passenger's location if map is available
      if (map && tripToAccept.origin) {
        map.flyTo(
          [tripToAccept.origin.lat, tripToAccept.origin.lng],
          15, // Zoom level
          {
            animate: true,
            duration: 1.5
          }
        );
      }
      
      // Store the accepted trip to show on the map
      setAcceptedTrip(tripToAccept);
      
      // Pan the map to the passenger's location if map is available
      if (map && tripToAccept.origin) {
        map.flyTo(
          [tripToAccept.origin.lat, tripToAccept.origin.lng],
          15, // Zoom level
          {
            animate: true,
            duration: 1.5
          }
        );
      }
      
      // Store the passenger's location
      if (tripToAccept.origin) {
        setPassengerLocation({
          lat: tripToAccept.origin.lat,
          lng: tripToAccept.origin.lng,
          name: tripToAccept.origin.name || 'Ubicación del pasajero'
        });
        
        // Pan the map to the passenger's location if map is available
        if (map) {
          map.flyTo(
            [tripToAccept.origin.lat, tripToAccept.origin.lng],
            15, // Zoom level
            {
              animate: true,
              duration: 1.5
            }
          );
        }
      }
      
      // Store the accepted trip to show on the map
      setAcceptedTrip(tripToAccept);
      
      // Pan the map to the passenger's location if map is available
      if (map && tripToAccept.origin) {
        map.flyTo(
          [tripToAccept.origin.lat, tripToAccept.origin.lng],
          15, // Zoom level
          {
            animate: true,
            duration: 1.5
          }
        );
      }
      
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
      
      // Store the accepted trip to show on the map
      setAcceptedTrip(tripToAccept);
      
      // Pan the map to the passenger's location if map is available
      if (map && tripToAccept.origin) {
        map.flyTo(
          [tripToAccept.origin.lat, tripToAccept.origin.lng],
          15, // Zoom level
          {
            animate: true,
            duration: 1.5
          }
        );
      }
      
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
    alert(`¡Viaje completado! ID: ${tripId}`);
    
    setMyTrips(prev => 
      prev.map(trip => 
        trip.id === tripId 
          ? { ...trip, status: 'completed' } 
          : trip
      )
    );
  };

   const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString('es-ES', options);
    } catch (error) {

const formatDate = (dateString) => {
if (!dateString) return 'No especificada';
try {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString('es-ES', options);
} catch (error) {
  console.error('Error formatting date:', error);
  return 'Fecha inválida';
}
};

const handleMapLoad = (mapInstance) => {
setMap(mapInstance);
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
              className={`flex-1 py-2 font-medium ${activeTab === 'available' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('available')}
            >
              Viajes Disponibles
            </button>
            <button 
              className={`flex-1 py-2 font-medium ${activeTab === 'my-trips' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('my-trips')}
            >
              Mis Viajes
            </button>
            <button 
              className={`flex-1 py-2 font-medium ${activeTab === 'create-trip' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
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
                      >
                        <FaCheck className="mr-2" />
                        Aceptar viaje
                      </button>
                    </div>
                  ))}
                </div>
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
              <h3 className="font-medium text-gray-900">Mis viajes activos</h3>
              {myTrips.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No tienes viajes activos</p>
                  <button 
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => setActiveTab('create-trip')}
                  >
                    Crear un nuevo viaje
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myTrips.map((trip) => (
                    <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">
                            {trip.origin.name.split(',')[0]} → {trip.destination.name.split(',')[0]}
                          </h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            trip.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : trip.status === 'completed'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {trip.status === 'active' ? 'Activo' : trip.status === 'completed' ? 'Completado' : 'Pendiente'}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">${(trip?.price ?? 0).toLocaleString()}</div>
                          <div className="text-sm text-gray-500">
                            {trip.availableSeats} asiento{trip.availableSeats !== 1 ? 's' : ''} disponible{trip.availableSeats !== 1 ? 's' : ''}
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
                        <div className="flex items-center text-gray-500">
                          <FaCar className="mr-2 w-4" />
                          <span>{trip.carModel} • {trip.carPlate}</span>
                        </div>
                        {trip.passengers && trip.passengers.length > 0 && (
                          <div className="mt-2 pt-2 border-t">
                            <p className="font-medium text-sm mb-1">Pasajeros:</p>
                            {trip.passengers.map((passenger, idx) => (
                              <div key={idx} className="flex items-center text-sm text-gray-600">
                                <FaUser className="mr-2 w-4 text-gray-400" />
                                <span>{passenger.name}</span>
                                <span className="ml-auto flex items-center text-yellow-400">
                                  <FaStar className="mr-1" />
                                  {passenger.rating || 'Nuevo'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {trip.status === 'active' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCompleteTrip(trip.id)}
                            className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                          >
                            Completar viaje
                          </button>
                          <button className="bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300">
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                
                <div className="grid grid-cols-2 gap-4">
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
                      Precio por persona (COP)
                    </label>
                    <div className="relative rounded-md shadow-sm">
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
                    required
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
              {/* Origin Marker */}
              {origin && (
                <Marker 
                  position={[origin.lat, origin.lng]} 
                  icon={defaultIcon}
                >
                  <Popup>Origen</Popup>
                </Marker>
              )}
              
              {/* Destination Marker */}
              {destination && (
                <Marker 
                  position={[destination.lat, destination.lng]} 
                  icon={new L.Icon({
                    ...defaultIcon.options,
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
                  })}
                >
                  <Popup>Destino</Popup>
                </Marker>
              )}
              
              {/* Available Trips Markers */}
              {activeTab === 'available' && availableTrips.map((trip) => (
                <Marker 
                  key={trip.id} 
                  position={[trip.origin.lat, trip.origin.lng]}
                  icon={new L.Icon({
                    ...defaultIcon.options,
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
                    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'
                  })}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-medium">{trip.passengerName}</div>
                      <div>Hacia: {trip.destination.name}</div>
                      <div>${(trip?.price ?? 0).toLocaleString()}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* My Trips Markers */}
              {activeTab === 'my-trips' && myTrips.map((trip) => (
                <Marker 
                  key={trip.id} 
                  position={[trip.origin.lat, trip.origin.lng]}
                  icon={new L.Icon({
                    ...defaultIcon.options,
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'
                  })}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-medium">Mi viaje</div>
                      <div>Hacia: {trip.destination.name}</div>
                      <div>${(trip?.price ?? 0).toLocaleString()}</div>
                      <div>{trip.passengers?.length || 0} pasajero{trip.passengers?.length !== 1 ? 's' : ''}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
