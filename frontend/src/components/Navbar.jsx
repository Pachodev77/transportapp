import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaBars, FaUser, FaSignOutAlt, FaCarSide, FaTruck, FaMoon, FaSun } from 'react-icons/fa';
import { FaMotorcycle } from 'react-icons/fa';
import { FaMotorcycle as FaMoto } from 'react-icons/fa6';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const carControls = useAnimation();
  const motoControls = useAnimation();
  const truckControls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    let animationTimeout;
    let animationFrame;

    const sequence = async () => {
      if (!isMounted) return;
      
      try {
        // Initially hide all icons
        await Promise.all([
          carControls.start({ opacity: 0 }),
          motoControls.start({ opacity: 0 }),
          truckControls.start({ opacity: 0 })
        ]);

        await new Promise(resolve => setTimeout(resolve, 500));

        const animateVehicle = async (controls, delay = 0) => {
          if (!isMounted) return;
          
          // Reset position off-screen
          await controls.start({ x: -50, opacity: 1 });
          
          // Slide in
          await controls.start({
            x: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
          });
          
          // Wait before sliding out
          await new Promise(resolve => {
            if (!isMounted) return;
            animationTimeout = setTimeout(resolve, 4000);
          });
          
          if (!isMounted) return;
          
          // Slide out
          await controls.start({
            x: 18,
            opacity: 0,
            transition: {
              x: { duration: 1.2, ease: 'easeInOut' },
              opacity: { duration: 0.4, delay: 0.8, ease: 'easeIn' }
            }
          });
          
          // Small delay between animations
          await new Promise(resolve => {
            if (!isMounted) return;
            animationTimeout = setTimeout(resolve, 200);
          });
        };

        // Run the animation sequence in a loop
        const runAnimationLoop = async () => {
          if (!isMounted) return;
          
          try {
            await animateVehicle(carControls);
            if (!isMounted) return;
            await animateVehicle(motoControls);
            if (!isMounted) return;
            await animateVehicle(truckControls);
            
            // Schedule next iteration
            if (isMounted) {
              animationFrame = requestAnimationFrame(runAnimationLoop);
            }
          } catch (error) {
            console.error('Animation error:', error);
          }
        };

        runAnimationLoop();
      } catch (error) {
        console.error('Error in animation sequence:', error);
      }
    };

    // Start the animation sequence
    sequence();

    // Cleanup function
    return () => {
      isMounted = false;
      if (animationTimeout) clearTimeout(animationTimeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      
      // Reset all animations
      carControls.stop();
      motoControls.stop();
      truckControls.stop();
    };
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
    <nav className="bg-white dark:bg-gray-900 shadow-lg fixed w-full z-40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="relative flex items-center" style={{ minWidth: '280px' }}> {/* Container to keep layout stable */}
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

                {/* Title with transparent background */}
                <span className="ml-8 text-xl font-bold text-gray-900 dark:text-white relative" style={{ zIndex: 2 }}>
                  TransportApp
                </span>

                {/* Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
                </button>
              </div>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              >
                Inicio
              </Link>
              {currentUser && (
                <Link
                  to={currentUser.role === 'driver' ? '/driver' : '/passenger'}
                  className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
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
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Hola, {currentUser.displayName || currentUser.email}
                  </span>
                  <div className="relative group">
                    <button 
                      className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300">
                        <FaUser className="h-5 w-5" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Mi perfil
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-colors"
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
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
                  state={{ from: window.location.pathname }}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            >
              <span className="sr-only">Abrir menú principal</span>
              <FaBars className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute right-0 top-full z-50 mt-0.5 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg w-64 transition-colors">
          {/* User info section */}
          <div className="pt-4 pb-3 px-4 border-b border-gray-200 dark:border-gray-700">
            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300">
                      <FaUser className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                      {currentUser.displayName || currentUser.email}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {currentUser.role === 'driver' ? 'Conductor' : 'Pasajero'}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
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
                  className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  state={{ from: window.location.pathname }}
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  ¿No tienes cuenta?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
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
          <div className="py-2 border-b border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            {currentUser && (
              <Link
                to={currentUser.role === 'driver' ? '/driver' : '/passenger'}
                className="block px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                className="w-full text-left px-4 py-2 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 flex items-center transition-colors"
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
