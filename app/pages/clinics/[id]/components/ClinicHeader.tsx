import Image from 'next/image';
import { MapPin, Phone, Users } from 'lucide-react';
import { Clinic } from '../types';

interface ClinicHeaderProps {
  clinic: Clinic;
}

export default function ClinicHeader({ clinic }: ClinicHeaderProps) {
  return (
    <div className="relative bg-linear-to-r from-teal-600 to-emerald-600">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex items-center gap-4 sm:gap-6 mb-3">
          {clinic.logo && (
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-xl shadow-lg p-3 sm:p-4 shrink-0">
              <div className="relative w-full h-full">
                <Image src={clinic.logo} alt={clinic.name.en} fill sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 128px" className="object-contain" />
              </div>
            </div>
          )}
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">{clinic.name.en}</h1>
        </div>
        {clinic.brief?.en && (
          <p className="text-teal-100 text-sm sm:text-base md:text-lg max-w-2xl">{clinic.brief.en}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
          {clinic.address?.en && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <MapPin className="text-white shrink-0" size={20} />
              <div className="text-white min-w-0">
                <p className="text-xs sm:text-sm text-teal-100">Location</p>
                <p className="font-semibold text-sm sm:text-base truncate">{clinic.address.en}</p>
              </div>
            </div>
          )}
          {clinic.phone && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <Phone className="text-white shrink-0" size={20} />
              <div className="text-white min-w-0">
                <p className="text-xs sm:text-sm text-teal-100">Phone</p>
                <p className="font-semibold text-sm sm:text-base">{clinic.phone}</p>
              </div>
            </div>
          )}
          {clinic.capacity && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 sm:col-span-2 md:col-span-1">
              <Users className="text-white shrink-0" size={20} />
              <div className="text-white min-w-0">
                <p className="text-xs sm:text-sm text-teal-100">Capacity</p>
                <p className="font-semibold text-sm sm:text-base">{clinic.capacity.doctors} Doctors • {clinic.capacity.rooms} Rooms</p>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
  );
}
