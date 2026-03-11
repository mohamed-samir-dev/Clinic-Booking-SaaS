import { X, User, Phone, Mail, Calendar, Clock, UserCheck } from 'lucide-react';
import { useState } from 'react';

interface Appointment {
  _id: string;
  doctorName: string;
  patientName: string;
  patientPhone?: string;
  patientEmail?: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  reason?: string;
}

interface AppointmentModalProps {
  appointment: Appointment;
  onClose: () => void;
  onCancel: (appointmentId: string) => void;
  onReschedule: (appointmentId: string, newDate: string, newTime: string) => void;
}

export function AppointmentModal({ appointment, onClose, onCancel, onReschedule }: AppointmentModalProps) {
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState(appointment.date.split('T')[0]);
  const [newTime, setNewTime] = useState(appointment.time);

  const handleReschedule = () => {
    onReschedule(appointment._id, newDate, newTime);
    onClose();
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      onCancel(appointment._id);
    }
  };

  const getStatusColor = () => {
    switch (appointment.status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Appointment Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span className={`${getStatusColor()} text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>

          {/* Patient Information */}
          <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <User size={18} className="text-teal-400" />
              Patient Information
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <User size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base truncate">{appointment.patientName}</span>
              </div>
              {appointment.patientPhone && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">{appointment.patientPhone}</span>
                </div>
              )}
              {appointment.patientEmail && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base truncate">{appointment.patientEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Information */}
          <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-teal-400" />
              Appointment Information
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <UserCheck size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">Doctor:</span>
                <span className="text-white text-sm sm:text-base truncate">{appointment.doctorName}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">Date:</span>
                <span className="text-white text-sm sm:text-base">{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Clock size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">Time:</span>
                <span className="text-white text-sm sm:text-base">{appointment.time}</span>
              </div>
              {appointment.reason && (
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-gray-400 text-sm sm:text-base">Reason:</span>
                  <span className="text-white text-sm sm:text-base">{appointment.reason}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reschedule Form */}
          {showReschedule && (
            <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Reschedule Appointment</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-gray-400 text-xs sm:text-sm mb-2">New Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs sm:text-sm mb-2">New Time</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6 border-t border-gray-700 flex flex-col sm:flex-row gap-2 sm:gap-3">
          {!showReschedule ? (
            <>
              <button
                onClick={() => setShowReschedule(true)}
                className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors text-sm sm:text-base"
              >
                Reschedule Appointment
              </button>
              {appointment.status !== 'cancelled' && (
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors text-sm sm:text-base"
                >
                  Cancel Appointment
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleReschedule}
                className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors text-sm sm:text-base"
              >
                Confirm Reschedule
              </button>
              <button
                onClick={() => setShowReschedule(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
