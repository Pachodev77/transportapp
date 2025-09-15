import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, roles = [] }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Mostrar un spinner o pantalla de carga
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar roles si se especificaron
  if (roles.length > 0) {
    const userRole = currentUser.role || 'passenger';
    if (!roles.includes(userRole)) {
      // Redirigir a la página de inicio si no tiene el rol necesario
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
