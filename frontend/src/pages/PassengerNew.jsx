import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import { FaSearch, FaMapMarkerAlt, FaCar, FaSpinner } from 'react-icons/fa';
import { 
  collection, 
  query, 
  where, 
  addDoc, 
  onSnapshot, 
  serverTimestamp,
  orderBy
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

export default function Passenger() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [error, setError] = useState('');

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
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
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

  // Fetch user's bookings
  useEffect(() => {
    if (!currentUser) return;
    
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('passengerId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
      const bookings = [];
      snapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() });
      });
      setMyBookings(bookings);
    });
    
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Map Section */}
        <div className="w-2/3 h-full">
          <MapContainer 
            center={[19.4326, -99.1332]} // Default to Mexico City
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
          </MapContainer>
        </div>
        
        {/* Sidebar */}
        <div className="w-1/3 bg-white p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Solicitar Viaje</h1>
            <button 
              onClick={() => {
                setOrigin(null);
                setDestination(null);
                setError('');
              }}
              className="text-sm text-blue-600 hover:underline"
              disabled={!origin && !destination}
            >
              Limpiar selección
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 mb-3">
              <span className="font-semibold">Instrucciones:</span> Haz clic en el mapa para seleccionar origen y destino.
            </p>
            <ol className="list-decimal list-inside text-sm space-y-1 text-blue-800">
              <li>Selecciona el punto de origen</li>
              <li>Selecciona el punto de destino</li>
              <li>Confirma tu solicitud de viaje</li>
            </ol>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 border rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Detalles del viaje</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Origen</p>
                      {origin ? (
                        <p className="font-medium">{origin.address}</p>
                      ) : (
                        <p className="text-gray-400 italic">Selecciona en el mapa</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4 pl-3 border-l-2 border-gray-200 h-6"></div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <FaMapMarkerAlt className="text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Destino</p>
                      {destination ? (
                        <p className="font-medium">{destination.address}</p>
                      ) : (
                        <p className="text-gray-400 italic">Selecciona en el mapa</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
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
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Tus viajes recientes</h2>
                <button 
                  onClick={() => navigate('/my-rides')}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Ver todos
                </button>
              </div>
              
              {myBookings.length > 0 ? (
                <div className="space-y-3">
                  {myBookings.slice(0, 3).map((booking) => (
                    <div 
                      key={booking.id} 
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/booking/${booking.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">
                            {booking.origin?.address || 'Origen'} → {booking.destination?.address || 'Destino'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {booking.createdAt?.toDate().toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status === 'accepted' ? 'Aceptado' :
                           booking.status === 'pending' ? 'Pendiente' :
                           booking.status === 'completed' ? 'Completado' : booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <FaCar className="mx-auto text-gray-300 text-3xl mb-2" />
                  <p className="text-gray-500">Aún no tienes viajes</p>
                  <p className="text-sm text-gray-400 mt-1">Solicita tu primer viaje</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
