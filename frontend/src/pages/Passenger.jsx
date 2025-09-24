import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet';
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
  GeoPoint,
  increment
} from 'firebase/firestore';
import { db, runTransaction } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { STRINGS } from '../utils/constants';
import { formatDate } from '../utils/dateUtils';
import Button from '../components/Button';

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

// Custom driver icon
const driverIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Custom passenger icon
const passengerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
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
        estimatedPrice: null, 
        estimatedDistance: null, 
        estimatedDuration: null 
      };
      
      // Add the ride request to the 'rideRequests' collection
      await addDoc(collection(db, 'rideRequests'), rideRequest);
      
      // Reset the form
      setOrigin(null);
      setDestination(null);
      
      alert('¡Tu solicitud de viaje ha sido publicada! Un conductor la aceptará pronto.');
      
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
    
    const rideRequestsQuery = query(
      collection(db, 'rideRequests'),
      where('passengerId', '==', currentUser.uid),
      where('status', 'in', ['pending', 'accepted', 'in_progress']),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribeRideRequests = onSnapshot(rideRequestsQuery, (snapshot) => {
      const requests = [];
      let activeTrip = null;
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Process the request object to ensure data consistency
        const request = {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
        };
        requests.push(request);
        // Find the active trip to track
        if (request.status === 'accepted' || request.status === 'in_progress') {
          activeTrip = request;
        }
      });
      setMyRideRequests(requests);

      if (activeTrip) {
        setSelectedTrip(activeTrip);
      } else {
        // If no trip is active, clear the selected trip
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

      alert('¡Viaje reservado con éxito!');

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

      alert('¡Reserva cancelada con éxito!');

    } catch (error) {
      console.error(STRINGS.ERROR_CANCELAR_RESERVA, error);
      setError(error.message || STRINGS.ERROR_OCURRIDO_CANCELAR_RESERVA);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex flex-col lg:flex-row pt-16">
      {/* Contenido principal - En móviles: abajo del mapa, en desktop: al lado del mapa */}
      <div className="w-full lg:w-1/3 bg-white p-6 overflow-y-auto order-2 lg:order-1">
        <h1 className="text-2xl font-bold mb-6 text-dark hidden lg:block">{STRINGS.SOLICITAR_VIAJE}</h1>
        
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

        {selectedTrip && (selectedTrip.status === 'accepted' || selectedTrip.status === 'in_progress') && selectedTrip.passengerId === currentUser?.uid && (
          <div className="mb-4 p-4 bg-success text-white rounded-lg text-center shadow-lg animate-pulse">
            <p className="font-bold text-lg">¡Tu conductor está en camino!</p>
            {selectedTrip.driverName && <p><strong>{selectedTrip.driverName}</strong> llegará pronto.</p>}
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

      {/* Mapa - En móviles: arriba del contenido, en desktop: a la derecha */}
      <div className="w-full lg:w-2/3 order-1 lg:order-2 bg-white rounded-xl shadow-md overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Título - Solo visible en móviles */}
        <div className="lg:hidden bg-white p-4 border-b">
          <h1 className="text-xl font-bold text-dark">{STRINGS.SOLICITAR_VIAJE}</h1>
        </div>
        
        <MapContainer 
          center={currentPosition || [0, 0]}
          zoom={currentPosition ? 13 : 2}
          style={{ 
            height: '100%', 
            width: '100%',
            position: 'relative',
            zIndex: 1
          }}
          zoomControl={true}
          key={`map-${JSON.stringify(currentPosition)}-${window.innerWidth}`}
        >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <RecenterMap position={currentPosition} zoom={13} />
            
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
            {driverLocation && (
              <Marker 
                position={[driverLocation.latitude, driverLocation.longitude]} 
                icon={driverIcon}
              >
                <Popup>{STRINGS.CONDUCTOR}</Popup>
              </Marker>
            )}
            
            {/* Origin and Destination Markers */}
            {origin && (
              <Marker 
                position={[origin.lat, origin.lng]} 
                icon={defaultIcon}
              >
                <Popup>{STRINGS.ORIGEN}: {origin.address}</Popup>
              </Marker>
            )}
            
            {destination && (
              <Marker 
                position={[destination.lat, destination.lng]} 
                icon={defaultIcon}
              >
                <Popup>{STRINGS.DESTINO}: {destination.address}</Popup>
              </Marker>
            )}
            
            {/* Route between origin and destination */}
            {origin && destination && (
              <Polyline 
                positions={[
                  [origin.lat, origin.lng],
                  [destination.lat, destination.lng]
                ]} 
                color="blue"
              />
            )}
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
            
            {/* Route Line */}
          </MapContainer>
        
      </div>
    </div>
  );
}
