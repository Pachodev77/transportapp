import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaCar, FaMotorcycle, FaTruck, FaEdit, FaStar, FaStarHalfAlt, FaRegStar, FaHistory, FaChartLine, FaCoins, FaRegSmile, FaRegFrown, FaRegMeh, FaSpinner } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import SuccessMessage from '../components/SuccessMessage';

// Componente para mostrar las estrellas de calificación
const RatingStars = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  }
  
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }
  
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }
  
  return (
    <div className="flex items-center">
      <div className="flex">
        {stars}
      </div>
      <span className="ml-2 text-gray-600 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

// Componente para mostrar un viaje en el historial
const TripCard = ({ trip }) => {
  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completado</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Cancelado</span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">En curso</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Pendiente</span>;
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-gray-900">
            {trip.origin?.address || 'Origen no disponible'} → {trip.destination?.address || 'Destino no disponible'}
          </h4>
          <p className="text-sm text-gray-500">
            {trip.date ? new Date(trip.date.seconds * 1000).toLocaleDateString() : 'Fecha no disponible'}
          </p>
        </div>
        {getStatusBadge(trip.status)}
      </div>
      
      {trip.driverRating && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">Tu calificación al conductor:</p>
          <RatingStars rating={trip.driverRating} />
        </div>
      )}
      
      {trip.comments && (
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Comentario:</span> {trip.comments}
        </p>
      )}
    </div>
  );
};

// Componente para mostrar estadísticas
const StatsCard = ({ icon, title, value, description, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    purple: 'bg-purple-50 text-purple-700',
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-start">
      <div className={`p-3 rounded-full ${colors[color]} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default function Profile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check for success message in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('success') === 'true') {
      setSuccessMessage('Perfil actualizado correctamente');
      // Remove the success parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location]);
  
  const [stats, setStats] = useState({
    totalTrips: 0,
    completedTrips: 0,
    rating: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);

    // Listener for user data
    const userDocRef = doc(db, 'users', currentUser.uid);
    const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const creationDate = currentUser.metadata?.creationTime 
          ? new Date(currentUser.metadata.creationTime) 
          : new Date();
        const memberSince = creationDate.getFullYear();

        setUserData({
          id: doc.id,
          ...doc.data(),
          phoneNumber: doc.data().phoneNumber || 'No especificado',
          address: doc.data().address || 'No especificada',
          vehicleType: doc.data().vehicleType || 'No especificado',
          licensePlate: doc.data().licensePlate || 'No especificada',
          vehicleColor: doc.data().vehicleColor || 'No especificado',
          vehicleYear: doc.data().vehicleYear || 'No especificado',
          driverApproved: doc.data().driverApproved || false,
          memberSince: memberSince,
          ...currentUser
        });
      } else {
        setError('No se encontraron datos de perfil.');
      }
      setLoading(false); // Set loading to false after user data is fetched
    }, (error) => {
      console.error('Error fetching user data:', error);
      setError('Error al cargar los datos del perfil.');
      setLoading(false);
    });

    // Set up listeners for both passenger and driver trips
    const passengerQuery = query(collection(db, 'rideRequests'), where('passengerId', '==', currentUser.uid));
    const driverQuery = query(collection(db, 'rideRequests'), where('driverId', '==', currentUser.uid));

    let passengerTrips = [];
    let driverTrips = [];

    const combineAndUpdateTrips = () => {
      const allTrips = [...passengerTrips, ...driverTrips];
      const uniqueTrips = Array.from(new Map(allTrips.map(trip => [trip.id, trip])).values())
        .sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      
      setTrips(uniqueTrips);

      // Calculate stats from the combined trips data
      const completedTrips = uniqueTrips.filter(trip => trip.status === 'completed');
      const totalSpent = uniqueTrips
        .filter(trip => trip.passengerId === currentUser.uid) // Only count spending as a passenger
        .reduce((sum, trip) => sum + (trip.estimatedPrice || 0), 0);
      
      const ratings = completedTrips
        .filter(trip => trip.passengerId === currentUser.uid && trip.rating && !isNaN(parseFloat(trip.rating)))
        .map(trip => parseFloat(trip.rating));
      
      const avgRating = ratings.length > 0 
        ? parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1))
        : 0;

      setStats({
        totalTrips: uniqueTrips.length,
        completedTrips: completedTrips.length,
        rating: avgRating,
        totalSpent,
      });
    };

    const unsubscribePassenger = onSnapshot(passengerQuery, (snapshot) => {
      passengerTrips = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      combineAndUpdateTrips();
    }, (error) => {
      console.error('Error fetching passenger trips:', error);
      setError('Error al cargar el historial de viajes como pasajero.');
    });

    const unsubscribeDriver = onSnapshot(driverQuery, (snapshot) => {
      driverTrips = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      combineAndUpdateTrips();
    }, (error) => {
      console.error('Error fetching driver trips:', error);
      setError('Error al cargar el historial de viajes como conductor.');
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeUser();
      unsubscribePassenger();
      unsubscribeDriver();
    };
  }, [currentUser]);

  if (loading && !userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }
  
  const renderVehicleIcon = (type) => {
    if (!type) return <FaCar className="text-blue-600 mr-2" />;
    
    const typeLower = type.toLowerCase();
    if (typeLower.includes('moto')) {
      return <FaMotorcycle className="text-blue-600 mr-2" />;
    } else if (typeLower.includes('camioneta') || typeLower.includes('suv') || typeLower.includes('pickup')) {
      return <FaTruck className="text-blue-600 mr-2" />;
    } else {
      return <FaCar className="text-blue-600 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={fetchUserData}
                className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {successMessage && (
        <SuccessMessage 
          message={successMessage} 
          onClose={() => setSuccessMessage('')} 
        />
      )}
      <div className="max-w-7xl mx-auto mt-16 md:mt-20">
        {/* Encabezado del perfil */}
        <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold shadow-lg">
                  {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0).toUpperCase()}
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold text-white">{currentUser?.displayName || 'Usuario'}</h1>
                  <div className="flex items-center mt-1">
                    <RatingStars rating={stats.rating} />
                    <span className="ml-2 text-blue-100 text-sm">Miembro desde {userData?.memberSince || '2023'}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => navigate('/profile/edit')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaEdit className="mr-2" />
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="px-6 py-4 bg-white border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard 
                icon={<FaHistory className="text-xl" />} 
                title="Viajes Totales" 
                value={stats.totalTrips} 
                color="blue"
              />
              <StatsCard 
                icon={<FaChartLine className="text-xl" />} 
                title="Tasa de finalización" 
                value={`${Math.round((stats.completedTrips / stats.totalTrips) * 100)}%`} 
                description={`${stats.completedTrips} de ${stats.totalTrips} viajes`}
                color="green"
              />
              <StatsCard 
                icon={<FaStar className="text-xl" />} 
                title="Calificación" 
                value={stats.rating.toFixed(1)} 
                description="Basado en tus viajes"
                color="yellow"
              />
              <StatsCard 
                icon={<FaCoins className="text-xl" />} 
                title="Total Gastado" 
                value={`$${stats.totalSpent.toLocaleString()}`} 
                description="En todos tus viajes"
                color="purple"
              />
            </div>
          </div>
        </div>
        
        {/* Pestañas de navegación */}
        <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('info')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'info' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Información Personal
              </button>
              <button
                onClick={() => setActiveTab('trips')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'trips' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <FaHistory className="inline mr-2" />
                Historial de Viajes
              </button>
              {currentUser?.role === 'driver' && (
                <button
                  onClick={() => setActiveTab('driver')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'driver' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  <FaCar className="inline mr-2" />
                  Panel de Conductor
                </button>
              )}
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'settings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Configuración
              </button>
            </nav>
          </div>
          
          {/* Contenido de las pestañas */}
          <div className="p-6">
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-400 mr-3 w-5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-gray-500">Correo electrónico</p>
                        <p className="text-gray-900 truncate">{userData?.email || 'No especificado'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-gray-400 mr-3 w-5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="text-gray-900">{userData?.phoneNumber || 'No especificado'}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-gray-400 mr-3 mt-1 w-5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-gray-500">Dirección</p>
                        <p className="text-gray-900 break-words">
                          {userData?.address || 'No especificada'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Información del Vehículo (solo para conductores) */}
                    {userData?.role === 'driver' && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Vehículo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
                              {renderVehicleIcon(userData?.vehicleType)}
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Tipo de vehículo</p>
                              <p className="text-gray-900 capitalize">
                                {userData?.vehicleType || 'No especificado'}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Placa</p>
                            <p className="text-gray-900 font-medium">
                              {userData?.licensePlate || 'No especificada'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Color</p>
                            <p className="text-gray-900">
                              {userData?.vehicleColor || 'No especificado'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Año</p>
                            <p className="text-gray-900">
                              {userData?.vehicleYear || 'No especificado'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {currentUser?.role === 'driver' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Vehículo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Tipo de vehículo</p>
                        <p className="text-gray-900 flex items-center">
                          {renderVehicleIcon(userData?.vehicleType)}
                          <span className="capitalize">{userData?.vehicleType || 'No especificado'}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Placa</p>
                        <p className="text-gray-900">{userData?.licensePlate || 'No especificada'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Color</p>
                        <p className="text-gray-900">{userData?.vehicleColor || 'No especificado'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Año</p>
                        <p className="text-gray-900">{userData?.vehicleYear || 'No especificado'}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preferencias</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="notifications"
                        name="notifications"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        defaultChecked={true}
                      />
                      <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                        Recibir notificaciones por correo electrónico
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="sms"
                        name="sms"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        defaultChecked={true}
                      />
                      <label htmlFor="sms" className="ml-2 block text-sm text-gray-700">
                        Recibir notificaciones por SMS
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'trips' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Historial de Viajes</h3>
                {trips.length > 0 ? (
                  <div className="space-y-4">
                    {trips.map(trip => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaHistory className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay viajes registrados</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Cuando realices un viaje, aparecerá aquí.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Buscar viajes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'driver' && currentUser?.role === 'driver' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Panel de Conductor</h3>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Tu perfil de conductor está {userData?.driverApproved ? 'verificado' : 'en revisión'}. 
                        {!userData?.driverApproved && 'Te notificaremos cuando sea aprobado.'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Rendimiento</h4>
                    <div className="space-y-4">
                      <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Puntualidad</span>
                              <span className="font-medium">4.8/5</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '96%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Limpieza</span>
                              <span className="font-medium">4.9/5</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '98%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Conducción</span>
                              <span className="font-medium">4.7/5</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                            </div>
                          </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Estadísticas de la semana</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Viajes completados</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Ingresos</span>
                        <span className="text-sm font-medium">$245,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Horas activo</span>
                        <span className="text-sm font-medium">28.5 hrs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Calificación promedio</span>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Estado del conductor</h4>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-sm text-gray-700">Disponible para viajes</span>
                    <button className="ml-auto text-sm text-blue-600 hover:text-blue-800">Cambiar estado</button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración de la cuenta</h3>
                <div className="space-y-6">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Preferencias de privacidad</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Controla cómo interactúas con otros usuarios en la plataforma.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Mostrar mi perfil en búsquedas</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <select
                              id="privacy"
                              name="privacy"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                              defaultValue="all"
                            >
                              <option value="all">Todos los usuarios</option>
                              <option value="passengers">Solo pasajeros</option>
                              <option value="drivers">Solo conductores</option>
                              <option value="none">Nadie</option>
                            </select>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Notificaciones</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Controla cómo y cuándo recibes notificaciones.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Notificaciones por correo</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <input
                                id="email-notifications"
                                name="email-notifications"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                defaultChecked={true}
                              />
                              <label htmlFor="email-notifications" className="ml-2">
                                Recibir notificaciones por correo electrónico
                              </label>
                            </div>
                          </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Notificaciones push</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                              <input
                                id="push-notifications"
                                name="push-notifications"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                defaultChecked={true}
                              />
                              <label htmlFor="push-notifications" className="ml-2">
                                Recibir notificaciones en el dispositivo
                              </label>
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-red-600">Zona de peligro</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Acciones que no se pueden deshacer.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Eliminar cuenta</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              onClick={() => {
                                if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
                                  // Lógica para eliminar la cuenta
                                }
                              }}
                            >
                              Eliminar mi cuenta permanentemente
                            </button>
                            <p className="mt-2 text-sm text-gray-500">
                              Se eliminarán todos tus datos de forma permanente. Esta acción no se puede deshacer.
                            </p>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
