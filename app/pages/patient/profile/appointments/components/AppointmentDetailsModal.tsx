import React from 'react';
import { FaTimes, FaFileInvoice, FaMoneyBillWave, FaStethoscope, FaCalendarAlt } from 'react-icons/fa';
import { Appointment, AppointmentStatus } from '@/app/types/appointment';
import { getText } from '@/app/utils/i18n';

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
  const { fullDate } = formatDate(appointment.appointmentDate);

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-linear-to-r from-teal-500 to-teal-600 p-4 sm:p-6 rounded-t-2xl">
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Appointment Details</h2>
              <p className="text-teal-100 text-xs sm:text-sm">Complete information about your appointment</p>
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
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 sm:p-4">
              <p className="text-xs text-teal-700 font-medium mb-1">BOOKING ID</p>
              <p className="font-mono font-bold text-teal-900 text-xs sm:text-sm break-all">{appointment._id}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4">
              <p className="text-xs text-gray-700 font-medium mb-2">STATUS</p>
              {getStatusBadge(appointment.status)}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="bg-linear-to-br from-blue-50 to-teal-50 border border-teal-100 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <FaStethoscope className="text-teal-600 text-base sm:text-lg" />
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">Doctor Information</h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                <span className="text-gray-600 font-medium text-xs sm:text-sm">Name</span>
                <span className="font-bold text-gray-900 text-sm sm:text-base">{getText(appointment.doctorId?.name)}</span>
              </div>
              {appointment.doctorId?.specialty && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm">Specialization</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{getText(appointment.doctorId.specialty)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Info */}
          <div className="bg-linear-to-br from-purple-50 to-blue-50 border border-blue-100 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <FaCalendarAlt className="text-blue-600 text-base sm:text-lg" />
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">Appointment Information</h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                <span className="text-gray-600 font-medium text-xs sm:text-sm">Clinic</span>
                <span className="font-bold text-gray-900 text-sm sm:text-base wrap-break-word">
                  {appointment.doctorId?.clinicId?.name 
                    ? getText(appointment.doctorId.clinicId.name) 
                    : (appointment.businessId?.name ? getText(appointment.businessId.name) : 'N/A')}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                <span className="text-gray-600 font-medium text-xs sm:text-sm">Date</span>
                <span className="font-bold text-gray-900 text-sm sm:text-base">{fullDate}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                <span className="text-gray-600 font-medium text-xs sm:text-sm">Time</span>
                <span className="font-bold text-gray-900 text-sm sm:text-base">{appointment.startTime} - {appointment.endTime}</span>
              </div>
              {appointment.service && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm">Service</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{getText(appointment.service)}</span>
                </div>
              )}
              {appointment.type && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm">Type</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base capitalize">{appointment.type}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Info */}
          {appointment.fee && (
            <div className="bg-linear-to-br from-green-50 to-teal-50 border border-green-100 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <FaMoneyBillWave className="text-green-600 text-base sm:text-lg" />
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Payment Information</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm">Fee</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">${appointment.fee}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm">Payment Method</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{appointment.paid ? 'Online' : 'Cash'}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm">Payment Status</span>
                  <span className={`font-bold text-sm sm:text-base ${appointment.paid ? 'text-teal-600' : 'text-yellow-600'}`}>
                    {appointment.paid ? '✓ Paid' : '⏳ Pending'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {appointment.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                <span className="text-yellow-600">📝</span>
                Notes
              </h3>
              <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">{appointment.notes}</p>
            </div>
          )}

          {/* Cancellation Info */}
          {appointment.status === 'cancelled' && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-red-900 mb-3 text-base sm:text-lg">❌ Cancellation Information</h3>
              <div className="space-y-2">
                {appointment.cancelledBy && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                    <span className="text-red-700 font-medium text-xs sm:text-sm">Cancelled by</span>
                    <span className="font-bold text-red-900 capitalize text-sm sm:text-base">{appointment.cancelledBy}</span>
                  </div>
                )}
                {appointment.cancelledAt && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-3 gap-1 sm:gap-0">
                    <span className="text-red-700 font-medium text-xs sm:text-sm">Cancelled at</span>
                    <span className="font-bold text-red-900 text-xs sm:text-sm">{new Date(appointment.cancelledAt).toLocaleString()}</span>
                  </div>
                )}
                {appointment.cancellationReason && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="text-red-700 font-medium block mb-1 text-xs sm:text-sm">Reason</span>
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
              Cancellation Policy
            </h3>
            <p className="text-blue-800 leading-relaxed text-xs sm:text-sm">
              Appointments can be cancelled up to 24 hours before the scheduled time. 
              Cancellations made less than 24 hours in advance may be subject to a cancellation fee.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            {appointment.paid && (
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-bold text-sm sm:text-base shadow-lg hover:shadow-xl">
                <FaFileInvoice />
                Download Invoice
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-bold text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
