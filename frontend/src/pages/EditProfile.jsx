import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, auth } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaUser, FaPhone, FaMapMarkerAlt, FaCar, FaMotorcycle, FaTruck, FaCamera } from 'react-icons/fa';

export default function EditProfile() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    displayName: '',
    phoneNumber: '',
    address: '',
    vehicleType: 'car',
    licensePlate: '',
    vehicleColor: '',
    vehicleYear: ''
  });
  const [photoBase64, setPhotoBase64] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        displayName: currentUser.displayName || '',
        phoneNumber: currentUser.phoneNumber || '',
        address: currentUser.address || '',
        vehicleType: currentUser.vehicleType || 'car',
        licensePlate: currentUser.licensePlate || '',
        vehicleColor: currentUser.vehicleColor || '',
        vehicleYear: currentUser.vehicleYear || ''
      }));
      setPhotoPreview(currentUser.photoURL || '');
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecciona una imagen válida.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Resize image using Canvas to save directly to Firestore (bypass Storage/CORS)
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 250;
          const MAX_HEIGHT = 250;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Get compressed base64 string
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          setPhotoBase64(compressedBase64);
          setPhotoPreview(compressedBase64);
          setError('');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      setError('El nombre completo es requerido');
      return false;
    }
    
    if (formData.phoneNumber && !/^[0-9+\-\s()]*$/.test(formData.phoneNumber)) {
      setError('Por favor ingresa un número de teléfono válido');
      return false;
    }
    
    if (currentUser?.role === 'driver') {
      if (!formData.licensePlate) {
        setError('La placa del vehículo es requerida');
        return false;
      }
      
      if (formData.vehicleYear && (formData.vehicleYear < 1900 || formData.vehicleYear > new Date().getFullYear() + 1)) {
        setError('Por favor ingresa un año de vehículo válido');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let updatedPhotoURL = currentUser.photoURL;

      // If we have a new base64 photo
      if (photoBase64) {
        updatedPhotoURL = photoBase64;
      }

      const userRef = doc(db, 'users', currentUser.uid);
      const updateData = {
        displayName: formData.displayName.trim(),
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        updatedAt: new Date()
      };

      if (updatedPhotoURL !== currentUser.photoURL) {
        updateData.photoURL = updatedPhotoURL;
      }

      if (currentUser.role === 'driver') {
        updateData.vehicleType = formData.vehicleType;
        updateData.licensePlate = formData.licensePlate;
        updateData.vehicleColor = formData.vehicleColor;
        updateData.vehicleYear = formData.vehicleYear;
      }

      await updateDoc(userRef, updateData);

      // Update Auth Profile using Firebase v9 API and auth.currentUser
      // Note: Firebase Auth has a strict length limit for photoURL, so we can't save base64 data URLs there.
      // We only update displayName in Auth, and rely on Firestore for the photoURL.
      if (formData.displayName !== currentUser.displayName) {
        const authUpdate = {
          displayName: formData.displayName.trim()
        };
        
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, authUpdate);
        }
      }

      setSuccess('Perfil actualizado correctamente');
      setTimeout(() => window.location.assign('/profile?success=true'), 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error al actualizar el perfil. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaArrowLeft className="text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Perfil</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Información Personal</h3>
                
                {/* Photo Upload */}
                <div className="flex flex-col items-center mb-6">
                  <div 
                    className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <FaUser className="text-3xl text-blue-500 dark:text-blue-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaCamera className="text-white text-xl" />
                    </div>
                  </div>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Toca para cambiar la foto (Max 5MB)</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nombre completo
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="displayName"
                        id="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md"
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Número de teléfono
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md"
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Dirección
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-start pt-3 pointer-events-none">
                        <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        name="address"
                        id="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md"
                        placeholder="Tu dirección completa"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {currentUser?.role === 'driver' && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Información del Vehículo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tipo de vehículo
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {renderVehicleIcon(formData.vehicleType)}
                        </div>
                        <select
                          id="vehicleType"
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md"
                          required
                        >
                          <option value="car">Automóvil</option>
                          <option value="motorcycle">Motocicleta</option>
                          <option value="suv">Camioneta/SUV</option>
                          <option value="van">Camioneta de carga</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Placa del vehículo
                      </label>
                      <input
                        type="text"
                        name="licensePlate"
                        id="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleChange}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md"
                        placeholder="ABC123"
                        required={currentUser?.role === 'driver'}
                      />
                    </div>

                    <div>
                      <label htmlFor="vehicleColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Color del vehículo
                      </label>
                      <input
                        type="text"
                        name="vehicleColor"
                        id="vehicleColor"
                        value={formData.vehicleColor}
                        onChange={handleChange}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md"
                        placeholder="Ej: Rojo, Azul, Negro..."
                      />
                    </div>

                    <div>
                      <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Año del vehículo
                      </label>
                      <input
                        type="number"
                        name="vehicleYear"
                        id="vehicleYear"
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md"
                        placeholder="2020"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <FaSave className="-ml-1 mr-2 h-4 w-4" />
                      Guardar cambios
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
