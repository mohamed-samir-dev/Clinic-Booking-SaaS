import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { AppointmentFilters as IAppointmentFilters, AppointmentStatus } from '@/app/types/appointment';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useTranslations } from 'next-intl';

interface AppointmentFiltersProps {
  filters: IAppointmentFilters;
  setFilters: (filters: IAppointmentFilters) => void;
}

export function AppointmentFilters({ filters, setFilters }: AppointmentFiltersProps) {
  const { theme } = useTheme();
  const t = useTranslations('patient.appointments.filters');
  const tStatus = useTranslations('patient.appointments.status');
  
  return (
    <div className={`rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        <div className="relative">
          <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:outline-none text-xs sm:text-sm ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400/20' 
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:ring-teal-200'
            }`}
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <select
          className={`px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:outline-none text-xs sm:text-sm ${
            theme === 'dark' 
              ? 'bg-gray-900 border-gray-600 text-white focus:border-teal-400 focus:ring-teal-400/20' 
              : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500 focus:ring-teal-200'
          }`}
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as AppointmentStatus })}
        >
          <option value="">{t('allStatus')}</option>
          <option value="pending">{tStatus('pending')}</option>
          <option value="confirmed">{tStatus('confirmed')}</option>
          <option value="completed">{tStatus('completed')}</option>
          <option value="cancelled">{tStatus('cancelled')}</option>
        </select>
        <select
          className={`px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:outline-none text-xs sm:text-sm ${
            theme === 'dark' 
              ? 'bg-gray-900 border-gray-600 text-white focus:border-teal-400 focus:ring-teal-400/20' 
              : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500 focus:ring-teal-200'
          }`}
          value={filters.sortBy || ''}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as 'newest' | 'oldest' })}
        >
          <option value="">{t('sortBy')}</option>
          <option value="newest">{t('dateDesc')}</option>
          <option value="oldest">{t('dateAsc')}</option>
        </select>
      </div>
    </div>
  );
}
