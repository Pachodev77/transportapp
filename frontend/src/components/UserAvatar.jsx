import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function UserAvatar({ userId, fallbackName, className, size = 'w-10 h-10' }) {
  const [photoURL, setPhotoURL] = useState('');
  
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setPhotoURL(userDoc.data().photoURL || '');
        }
      } catch (err) {
        console.error('Error fetching user avatar:', err);
      }
    };
    fetchUser();
  }, [userId]);

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={fallbackName || 'Usuario'}
        className={`${size} rounded-full object-cover shadow ${className || ''}`}
      />
    );
  }

  return (
    <div className={`${size} rounded-full bg-white/20 flex items-center justify-center shadow ${className || ''}`}>
      <span className="text-white text-sm font-bold">
        {fallbackName?.charAt(0)?.toUpperCase() || '?'}
      </span>
    </div>
  );
}
