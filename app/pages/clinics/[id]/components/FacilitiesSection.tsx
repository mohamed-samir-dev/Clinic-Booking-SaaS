import Image from 'next/image';
import { Clinic } from '../types';

interface FacilitiesSectionProps {
  facilities: Clinic['facilities'];
}

export default function FacilitiesSection({ facilities }: FacilitiesSectionProps) {
  if (!facilities || facilities.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Facilities & Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {facilities.map((facility, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-teal-50 rounded-lg">
            {facility.icon && (
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0">
                <Image src={facility.icon} alt={facility.name.en} fill sizes="20px" className="object-contain" />
              </div>
            )}
            <p className="font-semibold text-gray-900 text-sm sm:text-base">{facility.name.en}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
