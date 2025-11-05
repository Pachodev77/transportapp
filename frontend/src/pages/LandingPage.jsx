import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaSearch, FaShieldAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

function LandingPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Función para obtener la URL de la imagen
  const getImageUrl = (imageName) => {
    // En desarrollo, usa la ruta relativa
    if (process.env.NODE_ENV === 'development') {
      return imageName;
    }
    // En producción, usa la ruta absoluta desde la raíz
    return `${window.location.origin}${imageName.startsWith('/') ? '' : '/'}${imageName}`;
  };
  
  // Estilos en línea para el carrusel
  const carouselStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'opacity 0.5s ease-in-out',
  };

  // Estilos para el contenedor de la imagen
  const heroSectionStyle = {
    position: 'relative',
    height: '100vh',
    minHeight: '700px',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  };

  // Estilo para el overlay oscuro sobre el carrusel
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  };

  // Estilo para el contenido sobre el carrusel
  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    color: 'white',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
  };

  // Array de imágenes para el carrusel
  const heroImages = [
    { 
      id: 1,
      url: getImageUrl('/pic 1.jpg'),
      alt: 'Imagen 1 del carrusel'
    },
    { 
      id: 2,
      url: getImageUrl('/pic 2.jpg'),
      alt: 'Imagen 2 del carrusel'
    },
    { 
      id: 3,
      url: getImageUrl('/pic 3.jpg'),
      alt: 'Imagen 3 del carrusel'
    },
    { 
      id: 4,
      url: getImageUrl('/pic 4.jpg'),
      alt: 'Imagen 4 del carrusel'
    },
    { 
      id: 5,
      url: getImageUrl('/pic 5.jpg'),
      alt: 'Imagen 5 del carrusel'
    },
    { 
      id: 6,
      url: getImageUrl('/pic 6.jpg'),
      alt: 'Imagen 6 del carrusel'
    },
    { 
      id: 7,
      url: getImageUrl('/pic 7.jpg'),
      alt: 'Imagen 7 del carrusel'
    },
    { 
      id: 8,
      url: getImageUrl('/pic 8.jpg'),
      alt: 'Imagen 8 del carrusel'
    },
    { 
      id: 9,
      url: getImageUrl('/pic 9.jpg'),
      alt: 'Imagen 9 del carrusel'
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
    <div className="bg-white">
      {/* Navbar is already included in the Layout component */}
      
      {/* Hero Section con Carrusel de Fondo */}
      <section style={heroSectionStyle}>
        {/* Carrusel de Fondo */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((image, index) => (
            <div 
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                style={carouselStyle}
                onError={() => !failedImages.includes(image.id) && 
                  setFailedImages(prev => [...prev, image.id])}
              />
            </div>
          ))}
        </div>
        
        {/* Overlay oscuro para mejorar la legibilidad */}
        <div style={overlayStyle}></div>
        
        {/* Contenido sobre el carrusel */}
        <div style={contentStyle}>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                <span className="block">Viaja de forma</span>
                <span className="text-blue-300">segura y económica</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                Conectamos conductores con pasajeros que van en la misma dirección. Ahorra dinero, reduce la huella de carbono y viaja cómodamente.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate(currentUser ? '/passenger' : '/login', { state: { role: 'passenger' } })}
                  className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg"
                >
                  Soy pasajero
                </button>
                
                <button
                  onClick={async () => {
                    if (currentUser) {
                      if (!currentUser.uid) {
                        alert('User ID not found. Please log in again.');
                        console.error('currentUser.uid is missing.');
                        return;
                      }
                      const success = await updateUserRole('driver');
                      if (success) {
                        navigate('/driver');
                      } else {
                        alert('Failed to update your role to driver. Please try again.');
                        console.error('Failed to update user role');
                      }
                    } else {
                      navigate('/login', { 
                        state: { 
                          role: 'driver',
                          from: '/driver' 
                        } 
                      });
                    }
                  }}
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg border-2 border-white"
                >
                  Soy conductor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
