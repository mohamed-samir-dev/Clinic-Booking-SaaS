'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaClock, FaEye, FaTimes, FaRedo, FaStar, FaMoneyBillWave, FaStethoscope, FaHospital } from 'react-icons/fa';
import { Appointment, AppointmentStatus } from '@/app/types/appointment';
import { saveQuickBookingData } from '@/app/pages/booking/utils/quickBooking';
import { getServiceKeyFromSpecialty } from '@/app/pages/booking/utils/serviceHelpers';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTranslations } from 'next-intl';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: () => void;
  onViewDetails: () => void;
  onReschedule: () => void;
  onReview: () => void;
  formatDate: (date: string) => { day: string; fullDate: string };
  getStatusBadge: (status: AppointmentStatus) => React.ReactElement;
}

export function AppointmentCard({ 
  appointment, 
  onCancel, 
  onViewDetails,
  onReschedule,
  onReview,
  formatDate, 
  getStatusBadge 
}: AppointmentCardProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = useTranslations('patient.appointments.card');
  const router = useRouter();
  const { day } = formatDate(appointment.appointmentDate);
  const isUpcoming = ['pending', 'confirmed'].includes(appointment.status);
  const isCompleted = appointment.status === 'completed';
  const isCancelled = appointment.status === 'cancelled';

  // Get localized text
  const getName = (name: string | { en: string; ar: string } | undefined) => {
    if (!name) return '';
    if (typeof name === 'string') return name;
    return locale === 'ar' && name.ar ? name.ar : name.en;
  };

  const displayName = getName(appointment.doctorId?.name);
  const displaySpecialty = getName(appointment.doctorId?.specialty);
  const specialtyEn = typeof appointment.doctorId?.specialty === 'string' 
    ? appointment.doctorId.specialty 
    : appointment.doctorId?.specialty?.en || '';
  
  const displayClinicName = appointment.doctorId?.clinicId?.name
    ? getName(appointment.doctorId.clinicId.name)
    : appointment.businessId?.name
    ? getName(appointment.businessId.name)
    : 'N/A';
  
  const displayService = appointment.service ? getName(appointment.service) : '';

  const handleBookAgain = () => {
    saveQuickBookingData({
      doctorId: appointment.doctorId._id,
      doctorName: displayName,
      specialty: displaySpecialty,
      serviceId: getServiceKeyFromSpecialty(specialtyEn),
      skipSteps: true
    });
    router.push('/pages/booking?quick=true');
  };

  return (
    <div className={`rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Date Badge */}
        <div className="shrink-0 self-start">
          <div className="bg-teal-50 rounded-lg p-2 sm:p-3 text-center w-16 sm:w-20">
            <p className="text-teal-600 font-bold text-xl sm:text-2xl">{new Date(appointment.appointmentDate).getDate()}</p>
            <p className="text-teal-600 text-xs font-medium">{day}</p>
          </div>
        </div>

        {/* Appointment Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3">
            <div className="min-w-0">
              <h3 className={`text-base sm:text-lg font-semibold mb-1 truncate ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {displayName}
              </h3>
              {displaySpecialty && (
                <p className={`text-xs sm:text-sm flex items-center gap-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <FaStethoscope className="text-teal-600 shrink-0" />
                  <span className="truncate">{displaySpecialty}</span>
                </p>
              )}
            </div>
            <div className="self-start">{getStatusBadge(appointment.status)}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className={`flex items-center gap-2 text-xs sm:text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <FaHospital className="text-teal-600 shrink-0" />
              <span className="truncate">{displayClinicName}</span>
            </div>
            <div className={`flex items-center gap-2 text-xs sm:text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <FaClock className="text-teal-600 shrink-0" />
              <span>{appointment.startTime} - {appointment.endTime}</span>
            </div>
            {displayService && (
              <div className={`flex items-center gap-2 text-xs sm:text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FaStethoscope className="text-teal-600 shrink-0" />
                <span className="truncate">{displayService}</span>
              </div>
            )}
            {appointment.fee && (
              <div className={`flex items-center gap-2 text-xs sm:text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FaMoneyBillWave className="text-teal-600 shrink-0" />
                <span>${appointment.fee} {appointment.paid ? `(${t('paid')})` : `(${t('cash')})`}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onViewDetails}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm font-medium"
            >
              <FaEye />
              <span className="hidden sm:inline">{t('viewDetails')}</span>
              <span className="sm:hidden">{t('details')}</span>
            </button>

            {isUpcoming && (
              <>
                <button
                  onClick={onReschedule}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-xs sm:text-sm font-medium"
                >
                  <FaRedo />
                  {t('reschedule')}
                </button>
                <button
                  onClick={onCancel}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-xs sm:text-sm font-medium"
                >
                  <FaTimes />
                  {t('cancel')}
                </button>
              </>
            )}

            {isCompleted && (
              <>
                <button
                  onClick={onReview}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-xs sm:text-sm font-medium"
                >
                  <FaStar />
                  <span className="hidden sm:inline">{t('leaveReview')}</span>
                  <span className="sm:hidden">{t('review')}</span>
                </button>
                <button 
                  onClick={handleBookAgain}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-xs sm:text-sm font-medium"
                >
                  <FaRedo />
                  <span className="hidden sm:inline">{t('bookAgain')}</span>
                  <span className="sm:hidden">{t('book')}</span>
                </button>
              </>
            )}

            {isCancelled && (
              <button 
                onClick={handleBookAgain}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-xs sm:text-sm font-medium"
              >
                <FaRedo />
                <span className="hidden sm:inline">{t('bookAgain')}</span>
                <span className="sm:hidden">{t('book')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
