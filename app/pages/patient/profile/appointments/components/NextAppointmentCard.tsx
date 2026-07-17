import React from 'react';
import { FaClock } from 'react-icons/fa';
import { Appointment } from '@/app/types/appointment';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTranslations } from 'next-intl';

interface NextAppointmentCardProps {
  appointment: Appointment;
  formatDate: (date: string) => { day: string; fullDate: string };
}

export function NextAppointmentCard({ appointment, formatDate }: NextAppointmentCardProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = useTranslations('patient.appointments.nextAppointment');
  const tCard = useTranslations('patient.appointments.card');
  
  // Get localized text
  const getName = (name: string | { en: string; ar: string } | undefined) => {
    if (!name) return '';
    if (typeof name === 'string') return name;
    return locale === 'ar' && name.ar ? name.ar : name.en;
  };

  const displayName = getName(appointment.doctorId?.name);
  const displaySpecialty = getName(appointment.doctorId?.specialty);
  
  const displayClinicName = appointment.doctorId?.clinicId?.name
    ? getName(appointment.doctorId.clinicId.name)
    : appointment.businessId?.name
    ? getName(appointment.businessId.name)
    : 'N/A';
  
  return (
    <div className={`rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 text-white ${
      theme === 'dark' ? 'bg-linear-to-r from-teal-600 to-teal-700' : 'bg-linear-to-r from-teal-500 to-teal-600'
    }`}>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <FaClock className="text-lg sm:text-xl" />
        <h3 className="text-base sm:text-lg font-bold">{t('title')}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <p className="text-teal-100 text-xs mb-1">{tCard('doctor') ?? 'Doctor'}</p>
          <p className="font-semibold text-sm sm:text-base truncate">{displayName}</p>
          {displaySpecialty && (
            <p className="text-teal-100 text-xs sm:text-sm truncate">{displaySpecialty}</p>
          )}
        </div>
        <div>
          <p className="text-teal-100 text-xs mb-1">{t('dateTime') ?? 'Date & Time'}</p>
          <p className="font-semibold text-sm sm:text-base">
            {formatDate(appointment.appointmentDate).fullDate}
          </p>
          <p className="text-teal-100 text-xs sm:text-sm">{appointment.startTime}</p>
        </div>
        <div>
          <p className="text-teal-100 text-xs mb-1">{t('clinic') ?? 'Clinic'}</p>
          <p className="font-semibold text-sm sm:text-base truncate">{displayClinicName}</p>
        </div>
      </div>
    </div>
  );
}
