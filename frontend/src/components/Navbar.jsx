import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaUser, FaSignOutAlt, FaCarSide, FaTruck } from 'react-icons/fa';
import { FaMotorcycle } from 'react-icons/fa';
import { FaMotorcycle as FaMoto } from 'react-icons/fa6';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const carControls = useAnimation();
  const motoControls = useAnimation();
  const truckControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Initially hide all icons
      carControls.set({ opacity: 0 });
      motoControls.set({ opacity: 0 });
      truckControls.set({ opacity: 0 });
      await new Promise(resolve => setTimeout(resolve, 500));

      while (true) {
        // --- Car Animation ---
        carControls.set({ x: -50, opacity: 1 }); // Start off-screen left
        await carControls.start({
            x: 0, // Move to original position
            transition: { duration: 0.5, ease: 'easeOut' }
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        await carControls.start({
            x: 120,
            opacity: 0,
            transition: {
                x: { duration: 0.8, ease: 'linear' },
                opacity: { duration: 0.2, delay: 0.6, ease: 'easeIn' }
            }
        });
        await new Promise(resolve => setTimeout(resolve, 200));

        // --- Motorcycle Animation ---
        motoControls.set({ x: -50, opacity: 1 });
        await motoControls.start({
            x: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await motoControls.start({
            x: 120,
            opacity: 0,
            transition: {
                x: { duration: 0.8, ease: 'linear' },
                opacity: { duration: 0.2, delay: 0.6, ease: 'easeIn' }
            }
        });
        await new Promise(resolve => setTimeout(resolve, 200));

        // --- Truck Animation ---
        truckControls.set({ x: -50, opacity: 1 });
        await truckControls.start({
            x: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        await truckControls.start({
            x: 120,
            opacity: 0,
            transition: {
                x: { duration: 0.8, ease: 'linear' },
                opacity: { duration: 0.2, delay: 0.6, ease: 'easeIn' }
            }
        });

        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };
    sequence();
  }, [carControls, motoControls, truckControls]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="relative flex items-center" style={{ minWidth: '220px' }}> {/* Container to keep layout stable */}
                {/* Animated Car/Moto Container */}
                <div className="absolute left-0 top-0">
                  <motion.div animate={carControls} style={{ zIndex: 1 }}>
                    <FaCarSide className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <motion.div animate={motoControls} className="absolute top-0 left-0" style={{ zIndex: 1 }}>
                    <FaMoto className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <motion.div animate={truckControls} className="absolute top-0 left-0" style={{ zIndex: 1 }}>
                    <FaTruck className="h-6 w-6 text-blue-600" />
                  </motion.div>
                </div>

                {/* Title - higher z-index and padding to avoid overlap */}
                <span className="ml-6 text-xl font-bold text-gray-900 relative bg-white px-2" style={{ zIndex: 2 }}>
                  TransportApp
                </span>
              </div>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Inicio
              </Link>
              {currentUser && (
                <Link
                  to={currentUser.role === 'driver' ? '/driver' : '/passenger'}
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  {currentUser.role === 'driver' ? 'Mis Viajes' : 'Buscar Viaje'}
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center">
            {currentUser ? (
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Hola, {currentUser.displayName || currentUser.email}
                  </span>
                  <div className="relative group">
                    <button 
                      className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                        <FaUser className="h-5 w-5" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Mi perfil
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <FaSignOutAlt className="mr-2" />
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  state={{ from: window.location.pathname }}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  state={{ from: window.location.pathname, register: true }}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              <FaBars className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute right-0 top-full z-50 mt-0.5 bg-white shadow-lg rounded-b-lg w-64">
          {/* User info section */}
          <div className="pt-4 pb-3 px-4 border-b border-gray-200">
            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      <FaUser className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {currentUser.displayName || currentUser.email}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {currentUser.role === 'driver' ? 'Conductor' : 'Pasajero'}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Mi perfil
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  state={{ from: window.location.pathname }}
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <p className="text-center text-sm text-gray-600">
                  ¿No tienes cuenta?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    state={{ from: window.location.pathname, register: true }}
                    onClick={() => setIsOpen(false)}
                  >
                    Regístrate
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Navigation links */}
          <div className="py-2 border-b border-gray-200">
            <Link
              to="/"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            {currentUser && (
              <Link
                to={currentUser.role === 'driver' ? '/driver' : '/passenger'}
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {currentUser.role === 'driver' ? 'Mis Viajes' : 'Buscar Viaje'}
              </Link>
            )}
          </div>

          {/* Logout option */}
          {currentUser && (
            <div className="py-2">
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
