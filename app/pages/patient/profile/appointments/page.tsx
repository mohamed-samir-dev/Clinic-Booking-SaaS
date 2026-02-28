'use client';

import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import RescheduleModal from '@/app/components/patient/RescheduleModal';
import ReviewModal from '@/app/components/patient/ReviewModal';
import CancelConfirmModal from '@/app/components/patient/CancelConfirmModal';
import Toast from '@/app/components/patient/Toast';
import { getText } from '@/app/utils/i18n';
import { Appointment } from '@/app/types/appointment';

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
      message: result.message || (result.success ? 'Appointment cancelled successfully' : 'Failed to cancel appointment'),
      type: result.success ? 'success' : 'error'
    });
  };

  const getNextAppointment = () => {
    const upcoming = filteredAppointments;
    return upcoming.length > 0 ? upcoming[0] : null;
  };

  const nextAppointment = activeTab === 'upcoming' ? getNextAppointment() : null;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaCalendarAlt className="text-teal-600" />
            My Appointments
          </h1>
          <p className="text-gray-600 mt-1">View and manage your medical appointments</p>
        </div>

        {/* Tabs */}
        <AppointmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Filters */}
        <AppointmentFilters filters={filters} setFilters={setFilters} />

        {/* Next Appointment Highlight */}
        {nextAppointment && activeTab === 'upcoming' && (
          <NextAppointmentCard appointment={nextAppointment} formatDate={formatDate} />
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
                formatDate={formatDate}
                getStatusBadge={getStatusBadge}
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
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
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
          doctorName={getText(selectedAppointment.doctorId?.name)}
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
