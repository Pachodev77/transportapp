import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { FaSearch, FaMapMarkerAlt, FaCar, FaSpinner, FaStar, FaClock } from 'react-icons/fa';
import { 
  collection, 
  query, 
  where, 
  addDoc, 
  onSnapshot, 
  serverTimestamp,
  orderBy,
  updateDoc,
  doc
} from 'firebase/firestore';
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

// Format date helper function
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('es-CO', options);
};

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
  
  const tabs = [
    { id: 'search', name: 'Buscar viaje' },
    { id: 'my-requests', name: 'Mis solicitudes' },
    { id: 'my-trips', name: 'Mis viajes' },
  ];

  // Handle location selection on the map
  const handleLocationSelect = async (latlng) => {
    try {
      const address = await getAddressFromCoordinates(latlng.lat, latlng.lng);
      
      if (!origin) {
        setOrigin({ 
          lat: latlng.lat,
          lng: latlng.lng,
          name: 'Origen',
          address: address || 'Ubicación seleccionada'
        });
      } else if (!destination) {
        setDestination({ 
          lat: latlng.lat,
          lng: latlng.lng,
          name: 'Destino',
          address: address || 'Ubicación seleccionada'
        });
      }
    } catch (error) {
      console.error('Error getting address:', error);
      setError('Error al obtener la dirección. Intenta de nuevo.');
    }
  };

  // Helper function to get address from coordinates
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name || 'Ubicación seleccionada';
    } catch (error) {
      console.error('Error getting address:', error);
      return 'Ubicación seleccionada';
    }
  };

  // Handle canceling a ride request
  const handleCancelRequest = async (requestId) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta solicitud de viaje?')) {
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
      setError('No se pudo cancelar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Handle ride request submission
  const handleRequestRide = async () => {
    if (!origin || !destination) {
      setError('Por favor selecciona origen y destino en el mapa');
      return;
    }
    
    if (!currentUser) {
      navigate('/login', { state: { from: 'passenger' } });
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Create a new ride request
      const rideRequest = {
        passengerId: currentUser.uid,
        passengerName: currentUser.displayName || 'Usuario',
        passengerEmail: currentUser.email,
        origin: {
          lat: origin.lat,
          lng: origin.lng,
          name: origin.name,
          address: origin.address
        },
        destination: {
          lat: destination.lat,
          lng: destination.lng,
          name: destination.name,
          address: destination.address
        },
        status: 'pending',
        timestamp: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add the ride request to Firestore
      await addDoc(collection(db, 'rideRequests'), rideRequest);
      
      // Reset the form
      setOrigin(null);
      setDestination(null);
      
    } catch (error) {
      console.error('Error al solicitar viaje:', error);
      setError('Ocurrió un error al solicitar el viaje. Por favor intenta de nuevo.');
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
    
    const rideRequestsQuery = query(
      collection(db, 'rideRequests'),
      where('passengerId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribeRideRequests = onSnapshot(rideRequestsQuery, (snapshot) => {
      const requests = [];
      snapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setMyRideRequests(requests);
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
      const booking = {
        tripId: trip.id,
        passengerId: currentUser.uid,
        passengerName: currentUser.displayName || 'Usuario',
        driverId: trip.driverId,
        driverName: trip.driverName,
        origin: trip.origin,
        destination: trip.destination,
        departureTime: trip.departureTime,
        price: trip.price,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'bookings'), booking);
      
      // Update available seats
      await updateDoc(doc(db, 'trips', trip.id), {
        availableSeats: trip.availableSeats - 1,
        updatedAt: serverTimestamp()
      });
      
    } catch (error) {
      console.error('Error al reservar viaje:', error);
      setError('Ocurrió un error al reservar el viaje. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'cancelled',
        updatedAt: serverTimestamp()
      });
      
      // Update available seats if the booking was confirmed
      const booking = myBookings.find(b => b.id === bookingId);
      if (booking && booking.status === 'confirmed') {
        await updateDoc(doc(db, 'trips', booking.tripId), {
          availableSeats: increment(1),
          updatedAt: serverTimestamp()
        });
      }
      
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
      setError('Ocurrió un error al cancelar la reserva. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/3 bg-white p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Solicitar Viaje</h1>
          
          {/* Tabs */}
          <div className="flex border-b mb-4">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                className={`flex-1 py-2 font-medium ${
                  activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {activeTab === 'my-requests' ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Mis Solicitudes de Viaje</h2>
              {myRideRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No tienes solicitudes de viaje activas.</p>
                  <button
                    onClick={() => setActiveTab('search')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Solicitar un viaje ahora
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myRideRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {request.origin?.address || 'Origen'} → {request.destination?.address || 'Destino'}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(request.createdAt)}
                          </p>
                          <div className="mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {request.status === 'pending' ? 'Pendiente' :
                               request.status === 'accepted' ? 'Aceptado' : 'Cancelado'}
                            </span>
                          </div>
                        </div>
                        {request.status === 'pending' && (
                          <button
                            onClick={() => handleCancelRequest(request.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                            disabled={loading}
                          >
                            {loading ? 'Cancelando...' : 'Cancelar'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === 'search' ? (
            <>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 mb-3">
                  <span className="font-semibold">Instrucciones:</span> Selecciona origen y destino en el mapa.
                </p>
                <ol className="list-decimal list-inside text-sm space-y-1 text-blue-800">
                  <li>Selecciona el punto de origen</li>
                  <li>Selecciona el punto de destino</li>
                  <li>Confirma tu solicitud de viaje</li>
                </ol>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origen</label>
                  <div className="flex items-center bg-gray-100 rounded-lg p-3">
                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                    <span>{origin?.address || 'Selecciona en el mapa'}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                  <div className="flex items-center bg-gray-100 rounded-lg p-3">
                    <FaMapMarkerAlt className="text-green-500 mr-2" />
                    <span>{destination?.address || 'Selecciona en el mapa'}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleRequestRide}
                  disabled={!origin || !destination || loading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                    (!origin || !destination || loading)
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } flex items-center justify-center space-x-2`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Buscando conductor...</span>
                    </>
                  ) : (
                    <>
                      <FaCar />
                      <span>Solicitar Viaje</span>
                    </>
                  )}
                </button>
                
                {origin && destination && (
                  <p className="mt-2 text-xs text-center text-gray-500">
                    Los conductores cercanos serán notificados de tu solicitud
                  </p>
                )}
              </div>
              
              {/* Available Trips */}
              {availableTrips.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold mb-4">Viajes disponibles</h2>
                  <div className="space-y-4">
                    {availableTrips.map((trip) => (
                      <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium">{trip.driverName}</h3>
                            <div className="flex items-center text-yellow-400 text-sm">
                              <FaStar className="mr-1" />
                              <span>{trip.rating} ({trip.reviewCount} reseñas)</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600">${trip.price?.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">
                              {trip.availableSeats > 0 
                                ? `${trip.availableSeats} asiento${trip.availableSeats !== 1 ? 's' : ''} disp.`
                                : 'Sin cupos'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-red-500 mr-2 w-4" />
                            <span className="truncate">{trip.origin?.address}</span>
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-green-500 mr-2 w-4" />
                            <span className="truncate">{trip.destination?.address}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <FaClock className="mr-2 w-4" />
                            <span>{formatDate(trip.departureTime)}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <FaCar className="mr-2 w-4" />
                            <span>{trip.carModel} • {trip.carPlate}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleBookTrip(trip)}
                          disabled={!trip.availableSeats || loading}
                          className={`w-full ${
                            trip.availableSeats > 0 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-gray-400 cursor-not-allowed'
                          } text-white py-2 rounded-lg font-medium transition-colors`}
                        >
                          {trip.availableSeats > 0 ? 'Reservar ahora' : 'Sin cupos disponibles'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Mis viajes</h2>
              
              {myBookings.length === 0 ? (
                <div className="text-center py-8">
                  <FaCar className="mx-auto text-gray-300 text-4xl mb-2" />
                  <p className="text-gray-500">No tienes viajes programados</p>
                  <button 
                    onClick={() => setActiveTab('search')}
                    className="mt-2 text-blue-600 hover:underline text-sm"
                  >
                    Buscar viajes disponibles
                  </button>
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
                          <h3 className="font-medium">
                            {booking.origin?.address?.split(',')[0]} → {booking.destination?.address?.split(',')[0]}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : booking.status === 'cancelled' 
                                ? 'bg-gray-100 text-gray-800' 
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status === 'confirmed' ? 'Confirmado' : 
                             booking.status === 'pending' ? 'Pendiente' : 
                             booking.status === 'cancelled' ? 'Cancelado' : booking.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">${booking.price?.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">
                            {booking.departureTime && formatDate(booking.departureTime)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-red-500 mr-2 w-4" />
                          <span className="truncate">{booking.origin?.address}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-green-500 mr-2 w-4" />
                          <span className="truncate">{booking.destination?.address}</span>
                        </div>
                        {booking.driverName && (
                          <div className="flex items-center text-gray-500">
                            <span className="mr-2">Conductor:</span>
                            <span>{booking.driverName}</span>
                          </div>
                        )}
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="mt-4 pt-3 border-t">
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                          >
                            {loading ? 'Cancelando...' : 'Cancelar reserva'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Map Section */}
        <div className="w-2/3 h-full">
          <MapContainer 
            center={[4.7109, -74.0721]} // Default to Bogotá
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationSelector onSelect={handleLocationSelect} />
            
            {/* Origin Marker */}
            {origin && (
              <Marker position={[origin.lat, origin.lng]} icon={defaultIcon}>
                <Popup>Origen: {origin.address}</Popup>
              </Marker>
            )}
            
            {/* Destination Marker */}
            {destination && (
              <Marker 
                position={[destination.lat, destination.lng]} 
                icon={new L.Icon({
                  ...defaultIcon.options,
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
                })}
              >
                <Popup>Destino: {destination.address}</Popup>
              </Marker>
            )}
            
            {/* Route Line */}
            {origin && destination && (
              <Polyline 
                positions={[
                  [origin.lat, origin.lng],
                  [destination.lat, destination.lng]
                ]} 
                color="blue"
                weight={3}
                opacity={0.7}
              />
            )}
            
            {/* Available Trips Markers */}
            {activeTab === 'search' && availableTrips.map((trip) => (
              <Marker 
                key={trip.id}
                position={[trip.origin.lat, trip.origin.lng]}
                icon={new L.Icon({
                  ...defaultIcon.options,
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
                })}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-medium">{trip.driverName}</p>
                    <p>${trip.price?.toLocaleString()}</p>
                    <p>{trip.availableSeats} asiento{trip.availableSeats !== 1 ? 's' : ''} disponible{trip.availableSeats !== 1 ? 's' : ''}</p>
                    <p>{formatDate(trip.departureTime)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* User's Bookings Markers */}
            {activeTab === 'my-trips' && myBookings.map((booking) => (
              <Marker 
                key={booking.id}
                position={[booking.origin.lat, booking.origin.lng]}
                icon={new L.Icon({
                  ...defaultIcon.options,
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
                  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'
                })}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {booking.origin.address.split(',')[0]} → {booking.destination.address.split(',')[0]}
                    </p>
                    <p>${booking.price?.toLocaleString()}</p>
                    <p className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : booking.status === 'cancelled' 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmado' : 
                       booking.status === 'pending' ? 'Pendiente' : 
                       booking.status === 'cancelled' ? 'Cancelado' : booking.status}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
