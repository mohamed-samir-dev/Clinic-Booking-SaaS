'use client';

import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import RescheduleModal from '@/app/components/patient/RescheduleModal';
import ReviewModal from '@/app/components/patient/ReviewModal';
import CancelConfirmModal from '@/app/components/patient/CancelConfirmModal';
import Toast from '@/app/components/patient/Toast';
import { Appointment } from '@/app/types/appointment';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTranslations } from 'next-intl';

// Hooks
import { useAppointments } from './hooks/useAppointments';
import { useAppointmentFilters } from './hooks/useAppointmentFilters';

// Components
import {
  AppointmentCard,
  AppointmentDetailsModal,
  AppointmentFilters,
  NextAppointmentCard,
  AppointmentTabs,
  EmptyState,
} from './components';

// Utils
import { getStatusBadge, formatDate } from './utils/appointmentHelpers';

export default function AppointmentsPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = useTranslations('patient.appointments');
  const tStatus = useTranslations('patient.appointments.status');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { appointments, loading, fetchAppointments, handleCancelAppointment } = useAppointments();
  const { filters, setFilters, filteredAppointments } = useAppointmentFilters(appointments, activeTab);

  const getName = (name: string | { en: string; ar: string } | undefined) => {
    if (!name) return '';
    if (typeof name === 'string') return name;
    return locale === 'ar' && name.ar ? name.ar : name.en;
  };

  const localizedFormatDate = (date: string) => formatDate(date, locale);

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelConfirm(true);
  };

  const confirmCancel = async () => {
    if (!selectedAppointment) return;
    
    setCancelLoading(true);
    const result = await handleCancelAppointment(selectedAppointment._id);
    setCancelLoading(false);
    setShowCancelConfirm(false);
    setSelectedAppointment(null);
    
    setToast({
      message: result.message || (result.success ? t('messages.cancelSuccess') : t('messages.cancelError')),
      type: result.success ? 'success' : 'error'
    });
  };

  const getNextAppointment = () => {
    const upcoming = filteredAppointments;
    return upcoming.length > 0 ? upcoming[0] : null;
  };

  const nextAppointment = activeTab === 'upcoming' ? getNextAppointment() : null;

  return (
    <div className={`min-h-screen py-4 sm:py-6 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className={`text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <FaCalendarAlt className="text-teal-600 text-xl sm:text-2xl" />
            {t('title')}
          </h1>
          <p className={`mt-1 text-sm sm:text-base ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{t('subtitle')}</p>
        </div>

        {/* Tabs */}
        <AppointmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Filters */}
        <AppointmentFilters filters={filters} setFilters={setFilters} />

        {/* Next Appointment Highlight */}
        {nextAppointment && activeTab === 'upcoming' && (
          <NextAppointmentCard appointment={nextAppointment} formatDate={localizedFormatDate} />
        )}

        {/* Appointments List */}
        {loading || filteredAppointments.length === 0 ? (
          <EmptyState loading={loading} activeTab={activeTab} />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onCancel={() => handleCancelClick(appointment)}
                onViewDetails={() => {
                  setSelectedAppointment(appointment);
                  setShowDetails(true);
                }}
                onReschedule={() => {
                  setSelectedAppointment(appointment);
                  setShowReschedule(true);
                }}
                onReview={() => {
                  setSelectedAppointment(appointment);
                  setShowReview(true);
                }}
                formatDate={localizedFormatDate}
                getStatusBadge={(status) => getStatusBadge(status, tStatus)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedAppointment && (
        <AppointmentDetailsModal
          appointment={selectedAppointment}
          onClose={() => {
            setShowDetails(false);
            setSelectedAppointment(null);
          }}
          formatDate={localizedFormatDate}
          getStatusBadge={(status) => getStatusBadge(status, tStatus)}
        />
      )}

      {/* Reschedule Modal */}
      {showReschedule && selectedAppointment && (
        <RescheduleModal
          appointmentId={selectedAppointment._id}
          currentDate={selectedAppointment.appointmentDate}
          currentStartTime={selectedAppointment.startTime}
          currentEndTime={selectedAppointment.endTime}
          doctorId={selectedAppointment.doctorId._id}
          onClose={() => {
            setShowReschedule(false);
            setSelectedAppointment(null);
          }}
          onSuccess={fetchAppointments}
        />
      )}

      {/* Review Modal */}
      {showReview && selectedAppointment && (
        <ReviewModal
          appointmentId={selectedAppointment._id}
          doctorName={getName(selectedAppointment.doctorId?.name)}
          onClose={() => {
            setShowReview(false);
            setSelectedAppointment(null);
          }}
          onSuccess={fetchAppointments}
        />
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <CancelConfirmModal
          onConfirm={confirmCancel}
          onClose={() => {
            setShowCancelConfirm(false);
            setSelectedAppointment(null);
          }}
          loading={cancelLoading}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
