import { X, Mail, Phone, Award, Calendar, CheckCircle, Star, UserX } from 'lucide-react';
import Image from 'next/image';
import { Doctor } from '../page';

interface DoctorProfileModalProps {
  doctor: Doctor;
  onClose: () => void;
}

export const DoctorProfileModal = ({ doctor, onClose }: DoctorProfileModalProps) => {
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Doctor Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Doctor Info */}
          <div className="flex items-start gap-6 mb-6">
            {doctor.image ? (
              <Image src={doctor.image} alt={getName(doctor.name)} width={96} height={96} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-teal-500/20 flex items-center justify-center">
                <span className="text-teal-400 text-3xl font-semibold">
                  {getName(doctor.name).charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{getName(doctor.name)}</h3>
              <p className="text-teal-400 text-lg mb-3">{doctor.specialty}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doctor.phone && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={16} className="text-gray-400" />
                    <span>{doctor.phone}</span>
                  </div>
                )}
                
                {doctor.email && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={16} className="text-gray-400" />
                    <span>{doctor.email}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Award size={16} className="text-gray-400" />
                  <span>{doctor.experience} years experience</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span>{doctor.rating.toFixed(1)} rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biography */}
          {doctor.bio && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">Biography</h4>
              <p className="text-gray-300 leading-relaxed">{doctor.bio}</p>
            </div>
          )}

          {/* Statistics */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-4">Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} className="text-blue-400" />
                  <span className="text-gray-400 text-sm">Total</span>
                </div>
                <div className="text-2xl font-bold text-white">{doctor.totalAppointments || 0}</div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={18} className="text-green-400" />
                  <span className="text-gray-400 text-sm">Completed</span>
                </div>
                <div className="text-2xl font-bold text-white">{doctor.completedAppointments || 0}</div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={18} className="text-yellow-400" />
                  <span className="text-gray-400 text-sm">Avg Rating</span>
                </div>
                <div className="text-2xl font-bold text-white">{doctor.rating.toFixed(1)}</div>
              </div>
              
              <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <UserX size={18} className="text-red-400" />
                  <span className="text-gray-400 text-sm">No-show</span>
                </div>
                <div className="text-2xl font-bold text-white">{doctor.noShowRate || 0}%</div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          {doctor.schedule && doctor.schedule.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Working Schedule</h4>
              <div className="space-y-2">
                {doctor.schedule.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-750 rounded-lg p-3 border border-gray-700">
                    <span className="text-white font-medium">{slot.day}</span>
                    <span className="text-gray-300">{slot.startTime} → {slot.endTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
