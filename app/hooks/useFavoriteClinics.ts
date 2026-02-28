'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useFavoriteClinics = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const fetchFavorites = useCallback(async () => {
    if (!token || user?.role !== 'patient') return;

    try {
      const response = await fetch('http://localhost:5000/api/patients/favorites/clinics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        const favoriteIds = result.data.map((clinic: any) => clinic._id);
        setFavorites(favoriteIds);
      }
    } catch (error) {
      console.error('Error fetching favorite clinics:', error);
    }
  }, [token, user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (clinicId: string) => {
    if (!token || user?.role !== 'patient') {
      return { success: false, message: 'يجب تسجيل الدخول كمريض لإضافة العيادات للمفضلة' };
    }

    setLoading(true);
    const isFavorite = favorites.includes(clinicId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/patients/favorites/clinics/${clinicId}`,
        {
          method: isFavorite ? 'DELETE' : 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (isFavorite) {
          setFavorites(prev => prev.filter(id => id !== clinicId));
          // Dispatch event to remove from favorites page
          window.dispatchEvent(new CustomEvent('favoriteChanged', {
            detail: { type: 'clinic', id: clinicId, action: 'remove' }
          }));
        } else {
          setFavorites(prev => [...prev, clinicId]);
        }
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Error toggling favorite clinic:', error);
      return { success: false, message: 'حدث خطأ أثناء تحديث المفضلة' };
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (clinicId: string) => favorites.includes(clinicId);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    isAuthenticated: !!token && user?.role === 'patient',
    refetchFavorites: fetchFavorites
  };
};
