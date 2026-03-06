import { Star, Calendar, Edit, Power } from 'lucide-react';
import { Doctor } from '../page';
import Image from 'next/image';

interface DoctorCardProps {
  doctor: Doctor;
  onToggleStatus: (id: string) => void;
}

export const DoctorCard = ({ doctor, onToggleStatus }: DoctorCardProps) => {
  const getText = (text: string | { en: string; ar: string }) => 
    typeof text === 'string' ? text : text.en;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden shrink-0">
            {doctor.image ? (
              <Image src={doctor.image} alt={getText(doctor.name)} width={64} height={64} className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-teal-600 text-white text-xl font-bold">
                {getText(doctor.name).charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">{getText(doctor.name)}</h3>
            <p className="text-teal-400 text-sm mb-2">{getText(doctor.specialty)}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{doctor.experience} years exp.</span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white">{doctor.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">Availability</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            doctor.status === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {doctor.status === 'available' ? 'Available' : 'Unavailable'}
          </span>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Edit size={16} className="text-white" />
            <span className="text-white text-sm">Edit</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Calendar size={16} className="text-white" />
            <span className="text-white text-sm">Schedule</span>
          </button>
          <button
            onClick={() => onToggleStatus(doctor._id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              doctor.status === 'available' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
            title={doctor.status === 'available' ? 'Deactivate' : 'Activate'}
          >
            <Power size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
