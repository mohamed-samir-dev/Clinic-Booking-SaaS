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
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-linear-to-r from-teal-500 to-teal-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold mb-1">Appointment Details</h2>
              <p className="text-teal-100 text-sm">Complete information about your appointment</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Booking ID & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
              <p className="text-xs text-teal-700 font-medium mb-1">BOOKING ID</p>
              <p className="font-mono font-bold text-teal-900 text-sm">{appointment._id}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-700 font-medium mb-2">STATUS</p>
              {getStatusBadge(appointment.status)}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="bg-linear-to-br from-blue-50 to-teal-50 border border-teal-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <FaStethoscope className="text-teal-600 text-lg" />
              <h3 className="font-bold text-gray-900 text-lg">Doctor Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-gray-600 font-medium">Name</span>
                <span className="font-bold text-gray-900">{getText(appointment.doctorId?.name)}</span>
              </div>
              {appointment.doctorId?.specialty && (
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600 font-medium">Specialization</span>
                  <span className="font-bold text-gray-900">{getText(appointment.doctorId.specialty)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Info */}
          <div className="bg-linear-to-br from-purple-50 to-blue-50 border border-blue-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <FaCalendarAlt className="text-blue-600 text-lg" />
              <h3 className="font-bold text-gray-900 text-lg">Appointment Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-gray-600 font-medium">Clinic</span>
                <span className="font-bold text-gray-900">
                  {appointment.doctorId?.clinicId?.name 
                    ? getText(appointment.doctorId.clinicId.name) 
                    : (appointment.businessId?.name ? getText(appointment.businessId.name) : 'N/A')}
                </span>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-gray-600 font-medium">Date</span>
                <span className="font-bold text-gray-900">{fullDate}</span>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-gray-600 font-medium">Time</span>
                <span className="font-bold text-gray-900">{appointment.startTime} - {appointment.endTime}</span>
              </div>
              {appointment.service && (
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600 font-medium">Service</span>
                  <span className="font-bold text-gray-900">{getText(appointment.service)}</span>
                </div>
              )}
              {appointment.type && (
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600 font-medium">Type</span>
                  <span className="font-bold text-gray-900 capitalize">{appointment.type}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Info */}
          {appointment.fee && (
            <div className="bg-linear-to-br from-green-50 to-teal-50 border border-green-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <FaMoneyBillWave className="text-green-600 text-lg" />
                <h3 className="font-bold text-gray-900 text-lg">Payment Information</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600 font-medium">Fee</span>
                  <span className="font-bold text-gray-900">${appointment.fee}</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600 font-medium">Payment Method</span>
                  <span className="font-bold text-gray-900">{appointment.paid ? 'Online' : 'Cash'}</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-600 font-medium">Payment Status</span>
                  <span className={`font-bold ${appointment.paid ? 'text-teal-600' : 'text-yellow-600'}`}>
                    {appointment.paid ? '✓ Paid' : '⏳ Pending'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {appointment.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-yellow-600">📝</span>
                Notes
              </h3>
              <p className="text-gray-700 leading-relaxed">{appointment.notes}</p>
            </div>
          )}

          {/* Cancellation Info */}
          {appointment.status === 'cancelled' && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
              <h3 className="font-bold text-red-900 mb-3 text-lg">❌ Cancellation Information</h3>
              <div className="space-y-2">
                {appointment.cancelledBy && (
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="text-red-700 font-medium">Cancelled by</span>
                    <span className="font-bold text-red-900 capitalize">{appointment.cancelledBy}</span>
                  </div>
                )}
                {appointment.cancelledAt && (
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="text-red-700 font-medium">Cancelled at</span>
                    <span className="font-bold text-red-900">{new Date(appointment.cancelledAt).toLocaleString()}</span>
                  </div>
                )}
                {appointment.cancellationReason && (
                  <div className="bg-white rounded-lg p-3">
                    <span className="text-red-700 font-medium block mb-1">Reason</span>
                    <span className="font-bold text-red-900">{appointment.cancellationReason}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cancellation Policy */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <span>ℹ️</span>
              Cancellation Policy
            </h3>
            <p className="text-blue-800 leading-relaxed">
              Appointments can be cancelled up to 24 hours before the scheduled time. 
              Cancellations made less than 24 hours in advance may be subject to a cancellation fee.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {appointment.paid && (
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-bold shadow-lg hover:shadow-xl">
                <FaFileInvoice />
                Download Invoice
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
