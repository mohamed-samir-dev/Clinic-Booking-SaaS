'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaClock, FaEye, FaTimes, FaRedo, FaStar, FaMoneyBillWave, FaStethoscope, FaHospital } from 'react-icons/fa';
import { Appointment, AppointmentStatus } from '@/app/types/appointment';
import { getText } from '@/app/utils/i18n';
import { saveQuickBookingData } from '@/app/pages/booking/utils/quickBooking';
import { getServiceKeyFromSpecialty } from '@/app/pages/booking/utils/serviceHelpers';

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
  const router = useRouter();
  const { day } = formatDate(appointment.appointmentDate);
  const isUpcoming = ['pending', 'confirmed'].includes(appointment.status);
  const isCompleted = appointment.status === 'completed';
  const isCancelled = appointment.status === 'cancelled';

  const handleBookAgain = () => {
    const doctorName = getText(appointment.doctorId?.name);
    const specialty = getText(appointment.doctorId?.specialty);
    const specialtyValue = typeof appointment.doctorId?.specialty === 'string' 
      ? appointment.doctorId.specialty 
      : appointment.doctorId?.specialty?.en || '';
    
    saveQuickBookingData({
      doctorId: appointment.doctorId._id,
      doctorName,
      specialty,
      serviceId: getServiceKeyFromSpecialty(specialtyValue),
      skipSteps: true
    });
    router.push('/pages/booking?quick=true');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 border border-gray-100">
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
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                {getText(appointment.doctorId?.name)}
              </h3>
              {appointment.doctorId?.specialty && (
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                  <FaStethoscope className="text-teal-600 shrink-0" />
                  <span className="truncate">{getText(appointment.doctorId.specialty)}</span>
                </p>
              )}
            </div>
            <div className="self-start">{getStatusBadge(appointment.status)}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FaHospital className="text-teal-600 shrink-0" />
              <span className="truncate">
                {appointment.doctorId?.clinicId?.name 
                  ? getText(appointment.doctorId.clinicId.name) 
                  : (appointment.businessId?.name ? getText(appointment.businessId.name) : 'N/A')}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FaClock className="text-teal-600 shrink-0" />
              <span>{appointment.startTime} - {appointment.endTime}</span>
            </div>
            {appointment.service && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <FaStethoscope className="text-teal-600 shrink-0" />
                <span className="truncate">{getText(appointment.service)}</span>
              </div>
            )}
            {appointment.fee && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <FaMoneyBillWave className="text-teal-600 shrink-0" />
                <span>${appointment.fee} {appointment.paid ? '(Paid)' : '(Cash)'}</span>
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
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">Details</span>
            </button>

            {isUpcoming && (
              <>
                <button
                  onClick={onReschedule}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-xs sm:text-sm font-medium"
                >
                  <FaRedo />
                  Reschedule
                </button>
                <button
                  onClick={onCancel}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-xs sm:text-sm font-medium"
                >
                  <FaTimes />
                  Cancel
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
                  <span className="hidden sm:inline">Leave Review</span>
                  <span className="sm:hidden">Review</span>
                </button>
                <button 
                  onClick={handleBookAgain}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-xs sm:text-sm font-medium"
                >
                  <FaRedo />
                  <span className="hidden sm:inline">Book Again</span>
                  <span className="sm:hidden">Book</span>
                </button>
              </>
            )}

            {isCancelled && (
              <button 
                onClick={handleBookAgain}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-xs sm:text-sm font-medium"
              >
                <FaRedo />
                <span className="hidden sm:inline">Book Again</span>
                <span className="sm:hidden">Book</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
