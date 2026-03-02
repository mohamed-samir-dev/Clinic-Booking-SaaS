import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Doctor } from '../types/types';
import { isAvailable } from '../utils/utils';

interface DoctorRowProps {
  doctor: Doctor;
  onDelete: (id: string, name: string) => void;
}

export default function DoctorRow({ doctor, onDelete }: DoctorRowProps) {
  return (
    <tr className="hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
            {doctor.photoUrl ? (
              <Image
                src={doctor.photoUrl}
                alt={doctor.name?.en || doctor.name?.ar || 'Doctor'}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-teal-600 text-white font-semibold">
                {(doctor.name?.en || doctor.name?.ar || 'D').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-white">{doctor.name?.en || doctor.name?.ar}</div>
            {doctor.name?.ar && doctor.name?.en && (
              <div className="text-xs text-gray-400">{doctor.name.ar}</div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {doctor.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {doctor.phone || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {doctor.specialty?.en || doctor.specialty?.ar || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {doctor.fees ? `${doctor.fees} EGP` : 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isAvailable(doctor) 
            ? 'bg-green-900/30 text-green-400' 
            : 'bg-red-900/30 text-red-400'
        }`}>
          {isAvailable(doctor) ? '✓ Available / متاح' : '✗ Unavailable / غير متاح'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link 
          href={`/pages/owner/doctors/edit/${doctor._id}`}
          className="text-teal-400 hover:text-teal-300 mr-4 inline-block"
        >
          <Edit size={18} />
        </Link>
        <button 
          onClick={() => onDelete(doctor._id, doctor.name?.en || doctor.name?.ar || 'Doctor')}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
