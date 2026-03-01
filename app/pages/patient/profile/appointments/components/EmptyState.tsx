import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useTranslations } from 'next-intl';

interface EmptyStateProps {
  loading: boolean;
  activeTab: string;
}

export function EmptyState({ loading, activeTab }: EmptyStateProps) {
  const { theme } = useTheme();
  const t = useTranslations('patient.appointments.emptyState');
  
  if (loading) {
    return (
      <div className="text-center py-16">
        <FaSpinner className="animate-spin text-4xl text-teal-600 mx-auto mb-4" />
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl shadow-sm p-12 text-center ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <FaCalendarAlt className={`text-6xl mx-auto mb-4 ${
        theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
      }`} />
      <h3 className={`text-xl font-semibold mb-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>{t('title')}</h3>
      <p className={`mb-6 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>{t('noAppointments', { tab: activeTab })}</p>
      <Link href="/pages/booking" className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors">
        {t('bookAppointment')}
      </Link>
    </div>
  );
}
