import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import './index.css';
import { enablePersistence } from './firebase/config';

enablePersistence();


// Lazy load pages for better performance
const Login = React.lazy(() => import('./pages/Login'));
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Passenger = React.lazy(() => import('./pages/Passenger'));
const Driver = React.lazy(() => import('./pages/Driver'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Cargando...</p>
    </div>
  </div>
);

// Componente para manejar el scroll al inicio de la página
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Componente para redirigir según el rol del usuario
const RoleBasedRedirect = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  // Si el usuario acaba de iniciar sesión, redirigir según su rol
  if (location.state?.from) {
    return <Navigate to={location.state.from} replace />;
  }
  
  // Redirigir según el rol por defecto
  const defaultPath = currentUser?.role === 'driver' ? '/driver' : '/passenger';
  return <Navigate to={defaultPath} replace />;
};

// Layout component that includes the Navbar and main content
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>© {new Date().getFullYear()} TransportApp. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componente para verificar autenticación en la página de login
function AuthCheck({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  // Si el usuario ya está autenticado, redirigir según su rol
  if (currentUser) {
    const from = location.state?.from?.pathname || (currentUser.role === 'driver' ? '/driver' : '/passenger');
    return <Navigate to={from} state={{ from: location }} replace />;
  }
  
  return children;
}

function App() {
  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <React.Suspense fallback={<Loading />}>
        <Routes>
          {/* Rutas públicas */}
          <Route 
            path="/" 
            element={
              <Layout>
                <LandingPage />
              </Layout>
            } 
          />
          
          <Route 
            path="/login" 
            element={
              <AuthCheck>
                <Login />
              </AuthCheck>
            } 
          />
          
          {/* Rutas protegidas */}
          <Route
            path="/passenger/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Passenger />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/driver/*"
            element={
              <ProtectedRoute roles={['driver']}>
                <Layout>
                  <Driver />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* Ruta de redirección después del login */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <RoleBasedRedirect />
              </ProtectedRoute>
            }
          />
          
          {/* Redirigir rutas no encontradas */}
          <Route 
            path="*" 
            element={
              <Layout>
                <Navigate to="/" replace />
              </Layout>
            } 
          />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

// Asegurar que el contenedor raíz exista
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
}
