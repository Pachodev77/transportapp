import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { FaSearch, FaMapMarkerAlt, FaArrowRight, FaCar, FaClock, FaUser, FaMoneyBillWave, FaStar, FaCheck, FaTimes } from 'react-icons/fa';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  serverTimestamp, 
  arrayUnion, 
  arrayRemove,
  getDoc,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  writeBatch,
  increment
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
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

export default function Passenger() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [availableTrips, setAvailableTrips] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search'); // 'search' or 'my-bookings'
  
  // Real-time listener for available trips
  useEffect(() => {
    if (!origin || !destination) return;
    
    setLoading(true);
    
    // Create a query for trips that match origin, destination, and have available seats
    const tripsQuery = query(
      collection(db, 'trips'),
      where('status', '==', 'available'),
      where('origin.name', '==', origin.name),
      where('destination.name', '==', destination.name),
      where('departureTime', '>=', new Date().toISOString())
    );
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(tripsQuery, (snapshot) => {
      const tripsData = [];
      snapshot.forEach((doc) => {
        tripsData.push({ id: doc.id, ...doc.data() });
      });
      setAvailableTrips(tripsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching trips:', error);
      setLoading(false);
    });
    
    // Clean up listener on unmount
    return () => unsubscribe();
  }, [origin, destination]);
  
  // Fetch user's bookings
  useEffect(() => {
    if (!currentUser) return;
    
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('passengerId', '==', currentUser.uid),
      orderBy('bookingDate', 'desc')
    );
    
    const unsubscribe = onSnapshot(bookingsQuery, async (snapshot) => {
      const bookingsData = [];
      
      for (const doc of snapshot.docs) {
        const bookingData = { id: doc.id, ...doc.data() };
        
        // Get trip details for each booking
        const tripDoc = await getDoc(doc.data().tripRef);
        if (tripDoc.exists()) {
          bookingData.trip = { id: tripDoc.id, ...tripDoc.data() };
          bookingsData.push(bookingData);
        }
      }
      
      setMyBookings(bookingsData);
    }, (error) => {
      console.error('Error fetching bookings:', error);
    });
    
    return () => unsubscribe();
  }, [currentUser]);

  const handleLocationSelect = (latlng) => {
    if (!origin) {
      setOrigin({ ...latlng, name: 'Origen' });
    } else if (!destination) {
      setDestination({ ...latlng, name: 'Destino' });
    }
  };

  const handleSearch = async () => {
    if (!origin || !destination) {
      alert('Por favor selecciona origen y destino en el mapa');
      return;
    }
    
    setLoading(true);
    
    try {
      // The real-time listener in useEffect will handle the updates
      // This function is kept for backward compatibility
      console.log('Searching for trips...');
    } catch (error) {
      console.error('Error searching for trips:', error);
      alert('Error al buscar viajes. Por favor intenta de nuevo.');
      setLoading(false);
    }
  };

  const handleBookTrip = async (trip) => {
    if (!currentUser) {
      alert('Por favor inicia sesión para reservar un viaje');
      return;
    }
    
    if (trip.availableSeats <= 0) {
      alert('Lo sentimos, no hay asientos disponibles en este viaje');
      return;
    }
    
    try {
      const tripRef = doc(db, 'trips', trip.id);
      const bookingRef = collection(db, 'bookings');
      
      // Start a batch to ensure both updates succeed or fail together
      const batch = writeBatch(db);
      
      // 1. Update the trip to add the passenger and reduce available seats
      batch.update(tripRef, {
        availableSeats: trip.availableSeats - 1,
        passengers: arrayUnion({
          userId: currentUser.uid,
          name: currentUser.displayName || 'Usuario',
          email: currentUser.email,
          bookingDate: new Date().toISOString()
        }),
        updatedAt: serverTimestamp()
      });
      
      // 2. Create a booking record
      const newBookingRef = doc(bookingRef);
      batch.set(newBookingRef, {
        tripId: trip.id,
        tripRef: tripRef,
        passengerId: currentUser.uid,
        passengerName: currentUser.displayName || 'Usuario',
        passengerEmail: currentUser.email,
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        price: trip.price,
        origin: trip.origin,
        destination: trip.destination,
        departureTime: trip.departureTime,
        driverName: trip.driverName,
        carModel: trip.carModel,
        carPlate: trip.carPlate,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Commit the batch
      await batch.commit();
      
      // Show success message
      alert(`¡Has reservado un asiento en el viaje de ${trip.driverName}!`);
      
    } catch (error) {
      console.error('Error booking trip:', error);
      alert('Ocurrió un error al reservar el viaje. Por favor intenta de nuevo.');
    }
  };
  
  const handleCancelBooking = async (bookingId) => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }
    
    try {
      const booking = myBookings.find(b => b.id === bookingId);
      if (!booking) {
        throw new Error('Reserva no encontrada');
      }
      
      const bookingRef = doc(db, 'bookings', bookingId);
      const tripRef = doc(db, 'trips', booking.tripId);
      
      // Start a batch to ensure both updates succeed or fail together
      const batch = writeBatch(db);
      
      // 1. Update booking status to cancelled
      batch.update(bookingRef, {
        status: 'cancelled',
        updatedAt: serverTimestamp(),
        cancelledAt: new Date().toISOString()
      });
      
      // 2. Update trip to free up the seat and remove passenger
      batch.update(tripRef, {
        availableSeats: increment(1),
        passengers: arrayRemove({
          userId: currentUser.uid,
          name: currentUser.displayName || 'Usuario',
          email: currentUser.email
        }),
        updatedAt: serverTimestamp()
      });
      
      // Commit the batch
      await batch.commit();
      
      // Show success message
      alert('Reserva cancelada exitosamente');
      
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Ocurrió un error al cancelar la reserva. Por favor intenta de nuevo.');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'America/Bogota'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Bogota'
    });
  };
  
  const formatDateOnly = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: 'America/Bogota'
    });
  };
  
  const getTripStatus = (trip) => {
    const now = new Date();
    const departureTime = new Date(trip.departureTime);
    
    if (trip.status === 'completed') return 'Completado';
    if (trip.status === 'cancelled') return 'Cancelado';
    
    if (departureTime < now) return 'Finalizado';
    
    const diffHours = (departureTime - now) / (1000 * 60 * 60);
    if (diffHours < 1) return 'Muy pronto';
    if (diffHours < 24) return 'Hoy';
    
    return formatDateOnly(trip.departureTime);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Buscar viaje</h2>
              
              <div className="flex border-b mb-4">
                <button 
                  className={`flex-1 py-2 font-medium ${activeTab === 'search' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('search')}
                >
                  Buscar viaje
                </button>
                <button 
                  className={`flex-1 py-2 font-medium ${activeTab === 'my-trips' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('my-trips')}
                >
                  Mis viajes
                </button>
              </div>
              
              {activeTab === 'search' ? (
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
                  
                  <button
                    onClick={handleSearch}
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
                        Buscando...
                      </>
                    ) : (
                      <>
                        <FaSearch className="mr-2" />
                        Buscar viajes
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Mis reservas</h3>
                  {myBookings.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No tienes viajes programados</p>
                      <button 
                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() => setActiveTab('search')}
                      >
                        Buscar viajes disponibles
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">
                                {booking.trip.origin.name.split(',')[0]} → {booking.trip.destination.name.split(',')[0]}
                              </h4>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                booking.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : booking.status === 'cancelled'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-blue-600">${booking.trip.price.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">
                                {formatDateOnly(booking.trip.departureTime)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-red-500 mr-2 w-4" />
                              <span className="truncate">{booking.trip.origin.name}</span>
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-green-500 mr-2 w-4" />
                              <span className="truncate">{booking.trip.destination.name}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <FaClock className="mr-2 w-4" />
                              <span>{formatDate(booking.trip.departureTime)}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <FaCar className="mr-2 w-4" />
                              <span>{booking.trip.carModel} • {booking.trip.carPlate}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <FaUser className="mr-2 w-4" />
                              <span>Conductor: {booking.trip.driverName}</span>
                            </div>
                          </div>
                          
                          {booking.status === 'confirmed' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                              >
                                Cancelar reserva
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
            </div>
            
            {/* Available Trips */}
            {activeTab === 'search' && availableTrips.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-medium text-gray-900 mb-4">Viajes disponibles</h3>
                <div className="space-y-4">
                  {availableTrips.map((trip) => (
                    <div key={trip.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{trip.driverName}</h4>
                          <div className="flex items-center text-yellow-400 text-sm">
                            <FaStar className="mr-1" />
                            <span>{trip.rating} ({Math.floor(trip.rating * 10)} reseñas)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">${trip.price.toLocaleString()}</div>
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
                          <span className="truncate">{trip.origin.name}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-green-500 mr-2 w-4" />
                          <span className="truncate">{trip.destination.name}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <FaClock className="mr-2 w-4" />
                          <span>{formatDate(trip.departureTime)}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <FaCar className="mr-2 w-4" />
                          <span>{trip.carModel} • {trip.carPlate}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <FaUser className="mr-2 w-4" />
                          <span>{trip.availableSeats} asiento{trip.availableSeats !== 1 ? 's' : ''} disponible{trip.availableSeats !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleBookTrip(trip)}
                        disabled={trip.availableSeats <= 0}
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
          </div>
          
          {/* Map */}
          <div className="w-full lg:flex-1 h-[600px] rounded-lg overflow-hidden shadow-lg">
            <MapContainer 
              center={[4.6097, -74.0817]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationSelector onSelect={handleLocationSelect} />
              
              {/* Origin Marker */}
              {origin && (
                <Marker position={[origin.lat, origin.lng]} icon={defaultIcon}>
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
              {activeTab === 'search' && availableTrips.map((trip) => (
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
                      <div className="font-medium">{trip.driverName}</div>
                      <div>Hacia: {trip.destination.name}</div>
                      <div>${trip.price.toLocaleString()}</div>
                      <button 
                        className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => {
                          // In a real app, this would scroll to the trip in the list
                          const element = document.getElementById(`trip-${trip.id}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                            element.classList.add('ring-2', 'ring-blue-500');
                            setTimeout(() => {
                              element.classList.remove('ring-2', 'ring-blue-500');
                            }, 2000);
                          }
                        }}
                      >
                        Ver detalles
                      </button>
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
