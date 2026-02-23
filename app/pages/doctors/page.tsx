'use client';

import { useState } from 'react';
import { useDoctors } from './hooks/useDoctors';
import { useFilterOptions } from './hooks/useFilterOptions';
import { useIsMobile } from './hooks/useIsMobile';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import { paginateData, getTotalPages } from './utils/pagination';
import PageHeader from './components/PageHeader';
import DoctorFilters from './components/DoctorFilters';
import AvailabilityLegend from './components/AvailabilityLegend';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import DoctorsList from './components/DoctorsList';
import Pagination from './components/Pagination';

export default function DoctorsPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].doctors.page;
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    specialty: '',
    gender: '',
    isAvailableToday: false,
    minExperience: 0
  });
  const [showFilters, setShowFilters] = useState(true);

  const isMobile = useIsMobile();
  const filterOptions = useFilterOptions();
  const { doctors, loading } = useDoctors(filters);

  const ITEMS_PER_PAGE = isMobile ? 6 : 8;
  const totalPages = getTotalPages(doctors.length, ITEMS_PER_PAGE);
  const currentDoctors = paginateData(doctors, currentPage, ITEMS_PER_PAGE);

  const resetFilters = () => {
    setFilters({
      specialty: '',
      gender: '',
      isAvailableToday: false,
      minExperience: 0
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = !!(filters.specialty || filters.gender || filters.isAvailableToday || filters.minExperience > 0);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <PageHeader />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <DoctorFilters
          filters={filters}
          setFilters={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
          filterOptions={filterOptions}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          resetFilters={resetFilters}
        />

        <AvailabilityLegend />

        {loading ? (
          <LoadingSkeleton />
        ) : doctors.length === 0 ? (
          <EmptyState hasActiveFilters={hasActiveFilters} resetFilters={resetFilters} />
        ) : (
          <>
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <p className={`text-sm sm:text-base font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                {t.found} <span className="text-teal-600">{doctors.length}</span> {doctors.length !== 1 ? t.doctors : t.doctor}
              </p>
              <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.page} {currentPage} {t.of} {totalPages}
              </p>
            </div>
            <DoctorsList doctors={currentDoctors} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </div>
    </div>
  );
}
