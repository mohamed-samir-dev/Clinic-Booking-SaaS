import { X, Clock, User, Calendar, Phone, Mail, FileText } from 'lucide-react';
import { Appointment } from '../types';

interface PopulatedPatient {
  phone?: string;
  email?: string;
}

interface PopulatedDoctor {
  specialty?: string | { en: string; ar: string };
}

interface AppointmentDetailsModalProps {
  appointment: Appointment;
  onClose: () => void;
}

export const AppointmentDetailsModal = ({ appointment, onClose }: AppointmentDetailsModalProps) => {
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

  const getSpecialty = (specialty: string | { en: string; ar: string } | undefined) => {
    if (!specialty) return 'N/A';
    return typeof specialty === 'string' ? specialty : specialty.en;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'rescheduled': return 'bg-purple-500/20 text-purple-400';
      case 'no-show': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Appointment Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <X className="text-gray-400" size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Appointment Information */}
          <div className="bg-gray-750 rounded-xl p-5 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="text-teal-400" size={20} />
              Appointment Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Appointment ID</p>
                <p className="text-white font-medium">{appointment._id}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Date</p>
                <p className="text-white font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Time</p>
                <p className="text-white font-medium">{appointment.time}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Created At</p>
                <p className="text-white font-medium">{new Date(appointment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="bg-gray-750 rounded-xl p-5 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="text-teal-400" size={20} />
              Patient Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-1">Full Name</p>
                <p className="text-white font-medium">{getName(appointment.patientName)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <Phone size={14} /> Phone Number
                </p>
                <p className="text-white font-medium">
                  {appointment.patientPhone || 
                   (typeof appointment.patientId === 'object' && appointment.patientId !== null ? (appointment.patientId as PopulatedPatient).phone : null) || 
                   'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <Mail size={14} /> Email
                </p>
                <p className="text-white font-medium">
                  {appointment.patientEmail || 
                   (typeof appointment.patientId === 'object' && appointment.patientId !== null ? (appointment.patientId as PopulatedPatient).email : null) || 
                   'N/A'}
                </p>
              </div>
              {(appointment.reason || appointment.patientNotes) && (
                <div>
                  <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <FileText size={14} /> Notes / Reason
                  </p>
                  <p className="text-white">{appointment.reason || appointment.patientNotes || 'N/A'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Doctor Information */}
          <div className="bg-gray-750 rounded-xl p-5 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="text-teal-400" size={20} />
              Doctor Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-1">Doctor Name</p>
                <p className="text-white font-medium">{getName(appointment.doctorName)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Specialty</p>
                <p className="text-white font-medium">
                  {appointment.doctorSpecialty || 
                   (typeof appointment.doctorId === 'object' && appointment.doctorId !== null ? getSpecialty((appointment.doctorId as PopulatedDoctor).specialty) : null) || 
                   'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment History */}
          {appointment.history && appointment.history.length > 0 && (
            <div className="bg-gray-750 rounded-xl p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="text-teal-400" size={20} />
                Appointment History
              </h3>
              <div className="space-y-3">
                {appointment.history.map((entry, index: number) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-700 last:border-0">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{entry.action}</p>
                      <p className="text-gray-400 text-sm">{new Date(entry.timestamp).toLocaleString()}</p>
                      {entry.by && <p className="text-gray-500 text-xs">By: {entry.by}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
