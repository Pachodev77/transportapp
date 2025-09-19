import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  browserPopupRedirectResolver
} from 'firebase/auth';
import { 
  auth, 
  googleProvider, 
  facebookProvider,
  createOrUpdateUser,
  db
} from '../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signup = useCallback(async (email, password, displayName, role = 'passenger') => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      
      await updateProfile(user, { 
        displayName,
        photoURL: user.photoURL || ''
      });
      
      await createOrUpdateUser(user.uid, {
        email: user.email,
        displayName,
        role,
        photoURL: user.photoURL || '',
        provider: 'email',
        createdAt: new Date().toISOString()
      });
      
      return userCredential;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      let errorMessage = 'Error al registrar el usuario';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'El correo electrónico ya está en uso';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo electrónico no es válido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es demasiado débil';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'La operación no está permitida';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (userCredential?.user?.uid) {
        await updateDoc(doc(db, 'users', userCredential.user.uid), {
          lastLogin: new Date().toISOString()
        });
      }
      
      return userCredential;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      let errorMessage = 'Error al iniciar sesión';
      
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Correo o contraseña incorrectos';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Por favor, inténtalo más tarde';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Esta cuenta ha sido deshabilitada';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(
        auth, 
        googleProvider,
        browserPopupRedirectResolver
      );
      
      const { user } = result;
      
      if (user) {
        await createOrUpdateUser(user.uid, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'passenger',
          provider: 'google.com',
          lastLogin: new Date().toISOString()
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      let errorMessage = 'Error al iniciar sesión con Google';
      
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'Ya existe una cuenta con el mismo correo pero con otro proveedor';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'La ventana de autenticación fue cerrada';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Solicitud de autenticación cancelada';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'El navegador bloqueó la ventana emergente. Por favor, permite ventanas emergentes para este sitio';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      throw new Error(errorMessage);
    }
  }, [createOrUpdateUser]);
  
  const loginWithFacebook = useCallback(async () => {
    try {
      const result = await signInWithPopup(
        auth, 
        facebookProvider,
        browserPopupRedirectResolver
      );
      
      const { user } = result;
      
      if (user) {
        await createOrUpdateUser(user.uid, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'passenger',
          provider: 'facebook.com',
          lastLogin: new Date().toISOString()
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
      let errorMessage = 'Error al iniciar sesión con Facebook';
      
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'Ya existe una cuenta con el mismo correo pero con otro proveedor';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'La ventana de autenticación fue cerrada';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Solicitud de autenticación cancelada';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'El navegador bloqueó la ventana emergente. Por favor, permite ventanas emergentes para este sitio';
          break;
        case 'auth/facebook-auth-already-in-use':
          errorMessage = 'Esta cuenta de Facebook ya está en uso';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      throw new Error(errorMessage);
    }
  }, [createOrUpdateUser]);

  const logout = () => {
    return signOut(auth);
  };
  
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const verifyAndUpdateUser = useCallback(async (user) => {
    if (!user) return null;
    
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          await createOrUpdateUser(user.uid, {
            email: user.email,
            displayName: user.displayName || 'Usuario',
            photoURL: user.photoURL || '',
            role: 'passenger',
            provider: user.providerData?.[0]?.providerId || 'email',
            lastLogin: new Date().toISOString(),
            createdAt: new Date().toISOString()
          });
        } else {
          await updateDoc(doc(db, 'users', user.uid), {
            lastLogin: new Date().toISOString()
          });
        }
        
        return user;
      } catch (error) {
        console.error(`Error en verificación de usuario (intento ${retryCount + 1}):`, error);
        retryCount++;
        
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
        } else {
          console.error('Número máximo de reintentos alcanzado para verificación de usuario');
          throw error;
        }
      }
    }
  }, [createOrUpdateUser, db]);

  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          await verifyAndUpdateUser(user);
          
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || userData.displayName,
              photoURL: user.photoURL || userData.photoURL,
              role: userData.role || 'passenger',
              provider: user.providerData?.[0]?.providerId || 'email'
            });
          } else {
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'Usuario',
              photoURL: user.photoURL || '',
              role: 'passenger',
              provider: user.providerData?.[0]?.providerId || 'email'
            });
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Error al verificar el estado de autenticación:', error);
        setError('Error al cargar la información del usuario');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [verifyAndUpdateUser]);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    resetPassword,
    loading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
