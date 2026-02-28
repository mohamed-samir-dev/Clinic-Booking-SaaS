'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { TabType } from './types';
import { useFavorites } from './hooks/useFavorites';
import { filterAndSortDoctors, filterAndSortClinics } from './utils/filters';
import FavoritesHeader from './components/FavoritesHeader';
import FavoritesTabs from './components/FavoritesTabs';
import SearchAndSort from './components/SearchAndSort';
import DoctorsList from './components/DoctorsList';
import ClinicsList from './components/ClinicsList';
import LoadingSpinner from './components/LoadingSpinner';

export default function FavoritesPage() {
  const { locale } = useLanguage();
  const { theme } = useTheme();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<TabType>('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical'>('recent');

  const { favoriteDoctors, favoriteClinics, loading } = useFavorites(token, user?.role, activeTab);

  const filteredAndSortedDoctors = filterAndSortDoctors(favoriteDoctors, searchQuery, sortBy, locale);
  const filteredAndSortedClinics = filterAndSortClinics(favoriteClinics, searchQuery, sortBy, locale);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
      <FavoritesHeader theme={theme} locale={locale} />
      <FavoritesTabs activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} locale={locale} />
      
      {((activeTab === 'doctors' && favoriteDoctors.length > 0) || (activeTab === 'clinics' && favoriteClinics.length > 0)) && (
        <SearchAndSort
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          activeTab={activeTab}
          theme={theme}
          locale={locale}
        />
      )}

      {activeTab === 'doctors' ? (
        <DoctorsList doctors={filteredAndSortedDoctors} theme={theme} locale={locale} />
      ) : (
        <ClinicsList clinics={filteredAndSortedClinics} theme={theme} locale={locale} />
      )}
    </div>
  );
}
