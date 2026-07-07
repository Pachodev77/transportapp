import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

// In-memory cache to avoid redundant Firestore fetches for the same user
const avatarCache = {};

export default function UserAvatar({ userId, fallbackName, className, size = 'w-10 h-10' }) {
  const [photoURL, setPhotoURL] = useState(() => avatarCache[userId] ?? null);
  const [loading, setLoading] = useState(!avatarCache[userId] && !!userId);

  useEffect(() => {
    if (!userId) return;

    // Already cached — no fetch needed
    if (avatarCache[userId] !== undefined) {
      setPhotoURL(avatarCache[userId]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        const url = userDoc.exists() ? (userDoc.data().photoURL || '') : '';
        avatarCache[userId] = url;
        if (!cancelled) {
          setPhotoURL(url);
        }
      } catch (err) {
        console.error('Error fetching user avatar:', err);
        avatarCache[userId] = '';
        if (!cancelled) setPhotoURL('');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUser();
    return () => { cancelled = true; };
  }, [userId]);

  // Skeleton while loading
  if (loading) {
    return (
      <div className={`${size} rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse shadow ${className || ''}`} />
    );
  }

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={fallbackName || 'Usuario'}
        loading="lazy"
        decoding="async"
        className={`${size} rounded-full object-cover shadow ${className || ''}`}
        onError={(e) => {
          // If the image fails to load, clear cache and show fallback
          avatarCache[userId] = '';
          e.currentTarget.style.display = 'none';
        }}
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
