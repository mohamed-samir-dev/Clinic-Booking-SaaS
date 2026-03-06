import { Eye, Calendar, Clock, UserX, Star } from 'lucide-react';
import Image from 'next/image';
import { Doctor } from '../page';

interface DoctorsTableProps {
  doctors: Doctor[];
  loading: boolean;
  onViewProfile: (doctor: Doctor) => void;
  onEditSchedule: (doctor: Doctor) => void;
  onViewAppointments: (doctorId: string) => void;
  onDeactivate: (id: string) => void;
}

export const DoctorsTable = ({ 
  doctors, 
  loading, 
  onViewProfile, 
  onEditSchedule, 
  onViewAppointments, 
  onDeactivate 
}: DoctorsTableProps) => {
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400';
      case 'busy': return 'bg-orange-500/20 text-orange-400';
      case 'off-duty': return 'bg-gray-500/20 text-gray-400';
      case 'on-leave': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Doctor Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Specialty</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Experience</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Today&rsquo;s Appointments</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Rating</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  No doctors found
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {doctor.image ? (
                        <Image src={doctor.image} alt={getName(doctor.name)} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                          <span className="text-teal-400 font-semibold">
                            {getName(doctor.name).charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-white font-medium">{getName(doctor.name)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{doctor.specialty}</td>
                  <td className="px-6 py-4 text-gray-300">{doctor.experience} years</td>
                  <td className="px-6 py-4 text-gray-300">{doctor.todayAppointments}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{doctor.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewProfile(doctor)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <Eye size={16} className="text-white" />
                      </button>
                      
                      <button
                        onClick={() => onEditSchedule(doctor)}
                        className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        title="Edit Schedule"
                      >
                        <Clock size={16} className="text-white" />
                      </button>
                      
                      <button
                        onClick={() => onViewAppointments(doctor._id)}
                        className="p-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                        title="View Appointments"
                      >
                        <Calendar size={16} className="text-white" />
                      </button>
                      
                      <button
                        onClick={() => onDeactivate(doctor._id)}
                        className={`p-2 rounded-lg transition-colors ${
                          doctor.status === 'off-duty' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-red-600 hover:bg-red-700'
                        }`}
                        title={doctor.status === 'off-duty' ? 'Activate Doctor' : 'Deactivate Doctor'}
                      >
                        <UserX size={16} className="text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
