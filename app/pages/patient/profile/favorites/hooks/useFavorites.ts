import { useEffect, useState } from 'react';
import { Doctor } from '@/app/types';
import { Clinic, TabType } from '../types';
import { fetchFavoriteDoctors, fetchFavoriteClinics } from '../utils/api';

export const useFavorites = (token: string | null, userRole: string | undefined, activeTab: TabType) => {
  const [favoriteDoctors, setFavoriteDoctors] = useState<Doctor[]>([]);
  const [favoriteClinics, setFavoriteClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [notAuthenticated, setNotAuthenticated] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token || userRole !== 'patient') {
        setLoading(false);
        setNotAuthenticated(true);
        return;
      }

      setNotAuthenticated(false);
      try {
        if (activeTab === 'doctors') {
          const data = await fetchFavoriteDoctors(token);
          setFavoriteDoctors(data);
        } else {
          const data = await fetchFavoriteClinics(token);
          setFavoriteClinics(data);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchFavorites();
  }, [token, userRole, activeTab]);

  useEffect(() => {
    const handleFavoriteChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ type: string; id: string; action: string }>;
      const { type, id, action } = customEvent.detail;
      
      if (action === 'remove') {
        if (type === 'doctor') {
          setFavoriteDoctors(prev => prev.filter(doc => doc._id !== id));
        } else if (type === 'clinic') {
          setFavoriteClinics(prev => prev.filter(clinic => clinic._id !== id));
        }
      }
    };

    window.addEventListener('favoriteChanged', handleFavoriteChange);
    return () => window.removeEventListener('favoriteChanged', handleFavoriteChange);
  }, []);

  return { favoriteDoctors, favoriteClinics, loading, notAuthenticated };
};
