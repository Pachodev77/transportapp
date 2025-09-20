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
  doc,
  setDoc,
  firebase
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
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
  const [currentPosition, setCurrentPosition] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);

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
  const [driverLocation, setDriverLocation] = useState(null);

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
      } else if (!destination) {
        setDestination({ 
          lat: latlng.lat,
          lng: latlng.lng,
          name: STRINGS.DESTINO,
          address: address || STRINGS.UBICACION_SELECCIONADA
        });
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
    
    setLoading(true);
    setError('');
    
    try {
      // Create a new ride request
      const rideRequest = {
        passengerId: currentUser.uid,
        passengerName: currentUser.displayName || STRINGS.USUARIO,
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
      console.error(STRINGS.ERROR_SOLICITAR_VIAJE, error);
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
        passengerName: currentUser.displayName || STRINGS.USUARIO,
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
      console.error(STRINGS.ERROR_RESERVAR_VIAJE, error);
      setError(STRINGS.ERROR_OCURRIDO_RESERVAR_VIAJE);
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
      console.error(STRINGS.ERROR_CANCELAR_RESERVA, error);
      setError(STRINGS.ERROR_OCURRIDO_CANCELAR_RESERVA);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-1/3 bg-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-dark">{STRINGS.SOLICITAR_VIAJE}</h1>
        
        {/* Tabs */}
        <div className="flex border-b mb-4">
          {tabs.map((tab) => (
            <Button 
              key={tab.id}
              className={`flex-1 py-2 font-medium ${
                activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-secondary'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </Button>
          ))}
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-danger text-white rounded-lg">
            {error}
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
            <div className="mb-6 p-4 bg-primary-light rounded-lg">
              <p className="text-sm text-primary-dark mb-3">
                <span className="font-semibold">{STRINGS.INSTRUCCIONES}</span> {STRINGS.SELECCIONA_ORIGEN_DESTINO_MAPA}
              </p>
              <ol className="list-decimal list-inside text-sm space-y-1 text-primary-dark">
                <li>{STRINGS.SELECCIONA_PUNTO_ORIGEN}</li>
                <li>{STRINGS.SELECCIONA_PUNTO_DESTINO}</li>
                <li>{STRINGS.CONFIRMA_SOLICITUD_VIAJE}</li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">{STRINGS.ORIGEN}</label>
                <div className="flex items-center bg-light rounded-lg p-3">
                  <FaMapMarkerAlt className="text-danger mr-2" />
                  <span>{origin?.address || STRINGS.SELECCIONA_EN_MAPA}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark mb-1">{STRINGS.DESTINO}</label>
                <div className="flex items-center bg-light rounded-lg p-3">
                  <FaMapMarkerAlt className="text-success mr-2" />
                  <span>{destination?.address || STRINGS.SELECCIONA_EN_MAPA}</span>
                </div>
              </div>
              
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
                  <>
                    <FaCar />
                    <span>{STRINGS.SOLICITAR_VIAJE}</span>
                  </>
                )}
              </Button>
              
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
      
      {/* Map Section */}
      <div className="w-full lg:w-2/3 h-64 lg:h-full">
          <MapContainer 
            center={currentPosition || [0, 0]}
            zoom={currentPosition ? 13 : 2}
            style={{ height: '100%', width: '100%', minHeight: '400px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationSelector onSelect={handleLocationSelect} />
            
            {/* Origin Marker */}
            {origin && (
              <Marker position={[origin.lat, origin.lng]} icon={defaultIcon}>
                <Popup>{STRINGS.ORIGEN_PUNTOS}{origin.address}</Popup>
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
                <Popup>{STRINGS.DESTINO_PUNTOS}{destination.address}</Popup>
              </Marker>
            )}
            {/* Driver Location Marker */}
            {driverLocation && (
              <Marker 
                position={[driverLocation.latitude, driverLocation.longitude]}
                icon={new L.Icon({
                  ...defaultIcon.options,
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
                })}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedTrip.driverName}</p>
                  </div>
                </Popup>
              </Marker>
            )}
            {/* Driver Location Marker */}
            {driverLocation && (
              <Marker 
                position={[driverLocation.latitude, driverLocation.longitude]}
                icon={new L.Icon({
                  ...defaultIcon.options,
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
                })}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedTrip.driverName}</p>
                  </div>
                </Popup>
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
            
  const [driverLocation, setDriverLocation] = useState(null);

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

            {/* Driver Location Marker */}
            {driverLocation && (
              <Marker 
                position={[driverLocation.latitude, driverLocation.longitude]}
                icon={new L.Icon({
                  ...defaultIcon.options,
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
                })}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedTrip.driverName}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
