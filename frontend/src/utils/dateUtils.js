/**
 * Formatea una fecha para mostrarla al usuario
 * @param {Date|string|number|Object} dateInput - Fecha a formatear
 * @param {boolean} showTime - Si es true, muestra la hora
 * @returns {string} Fecha formateada
 */
export const formatDate = (dateInput, showTime = false) => {
  if (!dateInput) return 'Fecha no disponible';
  
  try {
    // Si es un timestamp de Firestore
    let date;
    if (dateInput.toDate) {
      date = dateInput.toDate();
    } 
    // Si es un string ISO
    else if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    } 
    // Si ya es un objeto Date
    else if (dateInput instanceof Date) {
      date = dateInput;
    } 
    // Si es un timestamp numérico
    else if (typeof dateInput === 'number') {
      date = new Date(dateInput);
    } 
    // Si es un objeto con segundos y nanosegundos
    else if (dateInput.seconds) {
      date = new Date(dateInput.seconds * 1000);
    } else {
      return 'Formato de fecha no válido';
    }

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      ...(showTime && {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    return date.toLocaleDateString('es-ES', options);
  } catch (error) {
    console.error('Error al formatear la fecha:', error, dateInput);
    return 'Error en la fecha';
  }
};

/**
 * Obtiene la fecha y hora actual en formato ISO
 * @returns {string} Fecha y hora actual en formato ISO
 */
export const getCurrentISODate = () => {
  return new Date().toISOString();
};

/**
 * Convierte una fecha a un objeto de fecha de Firestore
 * @param {Date|string|number} date - Fecha a convertir
 * @returns {Object} Objeto con segundos y nanosegundos
 */
export const toFirestoreTimestamp = (date) => {
  const d = date ? new Date(date) : new Date();
  return {
    seconds: Math.floor(d.getTime() / 1000),
    nanoseconds: 0
  };
};
