import React from 'react';
import { FaTimes, FaFileInvoice, FaMoneyBillWave, FaStethoscope, FaCalendarAlt } from 'react-icons/fa';
import { Appointment, AppointmentStatus } from '@/app/types/appointment';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTranslations } from 'next-intl';

interface AppointmentDetailsModalProps {
  appointment: Appointment;
  onClose: () => void;
  formatDate: (date: string) => { day: string; fullDate: string };
  getStatusBadge: (status: AppointmentStatus) => React.ReactElement;
}

export function AppointmentDetailsModal({ 
  appointment, 
  onClose, 
  formatDate, 
  getStatusBadge 
}: AppointmentDetailsModalProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = useTranslations('patient.appointments.details');
  const { fullDate } = formatDate(appointment.appointmentDate);

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
  
  const displayService = appointment.service ? getName(appointment.service) : '';

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
      <div className={`rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`p-4 sm:p-6 rounded-t-2xl ${
          theme === 'dark' ? 'bg-linear-to-r from-teal-600 to-teal-700' : 'bg-linear-to-r from-teal-500 to-teal-600'
        }`}>
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">{t('title')}</h2>
              <p className="text-teal-100 text-xs sm:text-sm">{t('subtitle')}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <FaTimes className="text-lg sm:text-xl" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Booking ID & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className={`border rounded-xl p-3 sm:p-4 ${
              theme === 'dark' ? 'bg-teal-900/30 border-teal-700' : 'bg-teal-50 border-teal-200'
            }`}>
              <p className={`text-xs font-medium mb-1 ${
                theme === 'dark' ? 'text-teal-300' : 'text-teal-700'
              }`}>{t('bookingId')}</p>
              <p className={`font-mono font-bold text-xs sm:text-sm break-all ${
                theme === 'dark' ? 'text-teal-200' : 'text-teal-900'
              }`}>{appointment._id}</p>
            </div>
            <div className={`border rounded-xl p-3 sm:p-4 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`text-xs font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>{t('status')}</p>
              {getStatusBadge(appointment.status)}
            </div>
          </div>

          {/* Doctor Info */}
          <div className={`border rounded-xl p-4 sm:p-5 ${
            theme === 'dark' ? 'bg-linear-to-br from-blue-900/30 to-teal-900/30 border-teal-700' : 'bg-linear-to-br from-blue-50 to-teal-50 border-teal-100'
          }`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <FaStethoscope className="text-teal-600 text-base sm:text-lg" />
              <h3 className={`font-bold text-base sm:text-lg ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{t('doctorInfo')}</h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              }`}>
                <span className={`font-medium text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{t('name')}</span>
                <span className={`font-bold text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{displayName}</span>
              </div>
              {displaySpecialty && (
                <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <span className={`font-medium text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t('specialization')}</span>
                  <span className={`font-bold text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{displaySpecialty}</span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Info */}
          <div className={`border rounded-xl p-4 sm:p-5 ${
            theme === 'dark' ? 'bg-linear-to-br from-purple-900/30 to-blue-900/30 border-blue-700' : 'bg-linear-to-br from-purple-50 to-blue-50 border-blue-100'
          }`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <FaCalendarAlt className="text-blue-600 text-base sm:text-lg" />
              <h3 className={`font-bold text-base sm:text-lg ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{t('appointmentInfo')}</h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              }`}>
                <span className={`font-medium text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{t('clinic')}</span>
                <span className={`font-bold text-sm sm:text-base wrap-break-word ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{displayClinicName}</span>
              </div>
              <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              }`}>
                <span className={`font-medium text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{t('date')}</span>
                <span className={`font-bold text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{fullDate}</span>
              </div>
              <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              }`}>
                <span className={`font-medium text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{t('time')}</span>
                <span className={`font-bold text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{appointment.startTime} - {appointment.endTime}</span>
              </div>
              {displayService && (
                <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <span className={`font-medium text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t('service')}</span>
                  <span className={`font-bold text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{displayService}</span>
                </div>
              )}
              {appointment.type && (
                <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <span className={`font-medium text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t('type')}</span>
                  <span className={`font-bold text-sm sm:text-base capitalize ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{appointment.type}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Info */}
          {appointment.fee && (
            <div className={`border rounded-xl p-4 sm:p-5 ${
              theme === 'dark' ? 'bg-gralineardient-to-br from-green-900/30 to-teal-900/30 border-green-700' : 'bg-linear-to-br from-green-50 to-teal-50 border-green-100'
            }`}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <FaMoneyBillWave className="text-green-600 text-base sm:text-lg" />
                <h3 className={`font-bold text-base sm:text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{t('paymentInfo')}</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <span className={`font-medium text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t('fee')}</span>
                  <span className={`font-bold text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>${appointment.fee}</span>
                </div>
                <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <span className={`font-medium text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t('paymentMethod')}</span>
                  <span className={`font-bold text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{appointment.paid ? t('online') : t('cash')}</span>
                </div>
                <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                }`}>
                  <span className={`font-medium text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{t('paymentStatus')}</span>
                  <span className={`font-bold text-sm sm:text-base ${appointment.paid ? 'text-teal-600' : 'text-yellow-600'}`}>
                    {appointment.paid ? `✓ ${t('paid')}` : `⏳ ${t('pending')}`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {appointment.notes && (
            <div className={`border rounded-xl p-3 sm:p-4 ${
              theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
            }`}>
              <h3 className={`font-bold mb-2 flex items-center gap-2 text-sm sm:text-base ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="text-yellow-600">📝</span>
                {t('notes')}
              </h3>
              <p className={`leading-relaxed text-xs sm:text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>{appointment.notes}</p>
            </div>
          )}

          {/* Cancellation Info */}
          {appointment.status === 'cancelled' && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-red-900 mb-3 text-base sm:text-lg">❌ {t('cancellationInfo')}</h3>
              <div className="space-y-2">
                {appointment.cancelledBy && (
                  <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    <span className="text-red-700 font-medium text-xs sm:text-sm">{t('cancelledBy')}</span>
                    <span className="font-bold text-red-900 capitalize text-sm sm:text-base">{appointment.cancelledBy}</span>
                  </div>
                )}
                {appointment.cancelledAt && (
                  <div className={`rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    <span className="text-red-700 font-medium text-xs sm:text-sm">{t('cancelledAt')}</span>
                    <span className="font-bold text-red-900 text-xs sm:text-sm">{new Date(appointment.cancelledAt).toLocaleString()}</span>
                  </div>
                )}
                {appointment.cancellationReason && (
                  <div className={`rounded-lg p-3 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    <span className="text-red-700 font-medium block mb-1 text-xs sm:text-sm">{t('reason')}</span>
                    <span className="font-bold text-red-900 text-sm sm:text-base">{appointment.cancellationReason}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cancellation Policy */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <span>ℹ️</span>
              {t('cancellationPolicy')}
            </h3>
            <p className="text-blue-800 leading-relaxed text-xs sm:text-sm">
              {t('policyText')}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            {appointment.paid && (
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-bold text-sm sm:text-base shadow-lg hover:shadow-xl">
                <FaFileInvoice />
                {t('downloadInvoice')}
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-bold text-sm sm:text-base"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


