import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaFacebook, FaEnvelope, FaUser, FaLock, FaUserTie, FaUserShield, FaSpinner } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('passenger');
  const [isLogin, setIsLogin] = useState(true);
  const { 
    login, 
    signup, 
    loginWithGoogle, 
    loginWithFacebook,
    resetPassword,
    loading,
    error,
    clearError
  } = useAuth();
  
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  
  // Clear any existing errors when switching between login/register
  useEffect(() => {
    if (error) clearError();
  }, [isLogin]);

  async function handleLogin(e) {
    e.preventDefault();
    
    if (!email || !password) {
      return; // El error se manejará en el AuthContext
    }
    
    try {
      await login(email, password);
      // La redirección se manejará con el listener de autenticación
    } catch (error) {
      // El error ya está manejado en el AuthContext
      console.error('Login error:', error);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    
    if (password.length < 6) {
      return; // El error se manejará en el AuthContext
    }
    
    if (!displayName) {
      return; // El error se manejará en el AuthContext
    }
    
    try {
      await signup(email, password, displayName, role);
      // Mostrar mensaje de éxito
      setIsLogin(true);
    } catch (error) {
      console.error('Registration error:', error);
    }
  }
  
  async function handleGoogleSignIn() {
    try {
      await loginWithGoogle();
      // La redirección se manejará con el listener de autenticación
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  }
  
  async function handleFacebookSignIn() {
    try {
      await loginWithFacebook();
      // La redirección se manejará con el listener de autenticación
    } catch (error) {
      console.error('Facebook sign in error:', error);
    }
  }
  
  async function handlePasswordReset() {
    if (!email) {
      return; // El error se manejará en el AuthContext
    }
    
    try {
      await resetPassword(email);
      // El mensaje de éxito se manejará en el AuthContext
    } catch (error) {
      console.error('Password reset error:', error);
    }
  }
  
  function toggleAuthMode() {
    setError('');
    setIsLogin(!isLogin);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                <FaSpinner className="animate-spin text-blue-600 text-3xl mb-4" />
                <p className="text-gray-700">Procesando, por favor espera...</p>
              </div>
            </div>
          )}
          
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-red-500 text-xl" />
              Continuar con Google
            </button>
            
            <button
              type="button"
              onClick={handleFacebookSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#166FE5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#166FE5] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaFacebook className="text-white text-xl" />
              Continuar con Facebook
            </button>
          </div>
          
          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O continúa con</span>
            </div>
          </div>
          
          {/* Formulario */}
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="displayName"
                    ref={nameRef}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Tu nombre completo"
                    required={!isLogin}
                    disabled={loading}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="tu@email.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    disabled={loading}
                    className="text-xs text-blue-600 hover:text-blue-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                  required
                  minLength={isLogin ? 1 : 6}
                  disabled={loading}
                />
              </div>
            </div>
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de cuenta
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('passenger')}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border ${
                      role === 'passenger' 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <FaUserTie />
                    <span>Pasajero</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('driver')}
                    disabled={loading}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border ${
                      role === 'driver' 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <FaUserShield />
                    <span>Conductor</span>
                  </button>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Procesando...
                </>
              ) : isLogin ? (
                'Iniciar sesión'
              ) : (
                'Registrarse'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
            <button
              type="button"
              onClick={toggleAuthMode}
              disabled={loading}
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </div>
          
          {/* Loading overlay for form submission */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
              <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                <FaSpinner className="animate-spin text-blue-600 text-3xl mb-4" />
                <p className="text-gray-700">Procesando tu solicitud...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
