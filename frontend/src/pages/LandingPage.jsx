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
  
  // Efecto para cambiar la imagen automáticamente cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambiado de 2000ms a 4000ms
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
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
      icon: <FaSearch className="w-8 h-8 text-blue-600 mb-4" />,
      title: 'Soy pasajero',
      description: 'Encuentra viajes disponibles en tiempo real y viaja cómodamente'
    },
    {
      icon: <FaCar className="w-8 h-8 text-green-600 mb-4" />,
      title: 'Soy conductor',
      description: 'Comparte tu viaje y ayuda a otros a llegar a su destino'
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8 text-yellow-600 mb-4" />,
      title: 'Ahorra dinero',
      description: 'Divide los costos del viaje con otros pasajeros'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-red-600 mb-4" />,
      title: 'Viaja seguro',
      description: 'Perfiles verificados y sistema de valoraciones'
    }
  ];

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

      {/* Features */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Características</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Una mejor manera de viajar
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              TransportApp hace que viajar sea más fácil, económico y ecológico.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">¿Cómo funciona?</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Empieza a viajar en 3 sencillos pasos
            </p>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute top-0 h-full w-6 inset-0 left-1/2 transform -translate-x-1/2 bg-blue-500 rounded-full md:hidden"></div>
              <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative md:flex md:flex-col">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white text-xl font-bold z-10">
                        {step.number}
                      </div>
                      <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900 md:mt-4">
                        {step.title}
                      </h3>
                    </div>
                    <div className="mt-2 ml-16 md:ml-0 md:mt-4">
                      <p className="text-base text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
