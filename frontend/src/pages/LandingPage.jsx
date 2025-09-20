import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaSearch, FaShieldAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

function LandingPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Array de imágenes para el carrusel
  const heroImages = [
    { 
      id: 1,
      url: 'https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      alt: 'Personas en un vehículo'
    },
    { 
      id: 2,
      url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      alt: 'Auto en carretera al atardecer'
    },
    { 
      id: 3,
      url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      alt: 'Auto deportivo en carretera'
    },
    { 
      id: 4,
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      alt: 'Personas felices en un auto familiar'
    },
    { 
      id: 5,
      url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      alt: 'Persona en motocicleta en la ciudad'
    }
  ];
  
  // Estado para rastrear qué imágenes fallaron al cargar
  const [failedImages, setFailedImages] = useState([]);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Efecto para cambiar la imagen del héroe automáticamente cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  // Efecto para el carrusel de características
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const featureInterval = setInterval(() => {
      nextFeature();
    }, 4000);
    
    return () => clearInterval(featureInterval);
  }, [isAutoPlaying, currentFeatureIndex]);
  
  const goToFeature = (index) => {
    setCurrentFeatureIndex(index);
    setIsAutoPlaying(false);
    // Reactivar el autoplay después de una selección manual
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  
  // Touch events for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextFeature();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevFeature();
    }
  };
  
  const updateUserRole = useCallback(async (newRole) => {
    if (!currentUser) return false;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        role: newRole,
        updatedAt: new Date().toISOString()
      });
      
      console.log(`User role updated to ${newRole}`);
      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  }, [currentUser]);

  const features = [
    {
      icon: <FaSearch className="w-6 h-6 text-blue-600" />,
      title: 'Soy pasajero',
      description: 'Encuentra viajes disponibles en tiempo real y viaja cómodamente',
      color: 'blue'
    },
    {
      icon: <FaCar className="w-6 h-6 text-green-600" />,
      title: 'Soy conductor',
      description: 'Comparte tu viaje y ayuda a otros a llegar a su destino',
      color: 'green'
    },
    {
      icon: <FaMoneyBillWave className="w-6 h-6 text-yellow-500" />,
      title: 'Ahorra dinero',
      description: 'Divide los costos del viaje con otros pasajeros',
      color: 'yellow'
    },
    {
      icon: <FaShieldAlt className="w-6 h-6 text-red-500" />,
      title: 'Viaja seguro',
      description: 'Perfiles verificados y sistema de valoraciones',
      color: 'red'
    }
  ];
  
  // Function to handle next feature
  const nextFeature = () => {
    setCurrentFeatureIndex((prevIndex) => 
      prevIndex === features.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  
  // Function to handle previous feature
  const prevFeature = () => {
    setCurrentFeatureIndex((prevIndex) => 
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const steps = [
    {
      number: '1',
      title: 'Crea tu cuenta',
      description: 'Regístrate en segundos con tu correo o redes sociales'
    },
    {
      number: '2',
      title: 'Elige tu rol',
      description: 'Selecciona si eres conductor o pasajero'
    },
    {
      number: '3',
      title: 'Conecta y viaja',
      description: 'Coordina los detalles y disfruta del viaje'
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Navbar is already included in the Layout component */}
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="w-full mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Viaja de forma</span>
                  <span className="block text-blue-200">segura y económica</span>
                </h1>
                <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Conectamos conductores con pasajeros que van en la misma dirección. Ahorra dinero, reduce la huella de carbono y viaja cómodamente.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate(currentUser ? '/passenger' : '/login', { state: { role: 'passenger' } })}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                    >
                      Soy pasajero
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={async () => {
                        if (currentUser) {
                          // If user is logged in, update their role to driver
                          const success = await updateUserRole('driver');
                          if (success) {
                            navigate('/driver');
                          } else {
                            console.error('Failed to update user role');
                            // Optionally show an error message to the user
                          }
                        } else {
                          // If not logged in, pass the role to the login page
                          navigate('/login', { 
                            state: { 
                              role: 'driver',
                              from: '/driver' 
                            } 
                          });
                        }
                      }}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10"
                    >
                      Soy conductor
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="relative h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {heroImages.map((image, index) => {
              const hasError = failedImages.includes(image.id);
              
              return (
                <div 
                  key={image.id}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    width: '100%',
                    minHeight: '100%',
                    backgroundColor: '#f0f0f0'
                  }}
                >
                  {!hasError ? (
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover min-h-[256px] sm:min-h-[288px] md:min-h-[384px] lg:min-h-full"
                      onError={(e) => {
                        console.error(`Error al cargar la imagen ${image.id}: ${image.url}`);
                        setFailedImages(prev => [...prev, image.id]);
                      }}
                      loading="eager"
                    />
                  ) : (
                    <div className="text-6xl font-bold text-gray-500">
                      {image.id}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Carousel */}
      <div className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Características</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Una mejor manera de viajar
            </p>
            <p className="mt-3 max-w-2xl text-xl text-gray-500 mx-auto">
              TransportApp hace que viajar sea más fácil, económico y ecológico.
            </p>
          </div>

          <div className="relative overflow-hidden">
            {/* Carousel Items */}
            <div 
              className="transition-all duration-500 ease-in-out transform"
              style={{
                height: '300px',
                position: 'relative'
              }}
            >
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl transition-opacity duration-500 ${
                    index === currentFeatureIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="text-center max-w-md mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                      {React.cloneElement(feature.icon, { className: 'w-8 h-8' })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => {
                setCurrentFeatureIndex(prev => (prev === 0 ? features.length - 1 : prev - 1));
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-blue-600 focus:outline-none z-20"
              aria-label="Anterior característica"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => {
                setCurrentFeatureIndex(prev => (prev === features.length - 1 ? 0 : prev + 1));
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-blue-600 focus:outline-none z-20"
              aria-label="Siguiente característica"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 p-4">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToFeature(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentFeatureIndex 
                    ? `bg-${features[currentFeatureIndex].color}-500 w-6` 
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
                aria-label={`Ir a característica ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">¿Listo para empezar?</span>
            <span className="block">Únete a nuestra comunidad hoy mismo.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Miles de personas ya están ahorrando dinero y viajando de forma más inteligente con TransportApp.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
          >
            Comenzar ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
