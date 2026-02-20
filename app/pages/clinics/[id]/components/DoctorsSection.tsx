import { useState } from 'react';
import Image from 'next/image';
import { Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  doctors: Doctor[];
}

export default function DoctorsSection({ doctors }: DoctorsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  if (!doctors || doctors.length === 0) return null;

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <Stethoscope className="text-teal-600" size={20} />
        Our Doctors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {currentDoctors.map((doctor) => (
          <div key={doctor._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-3 sm:p-4 border border-gray-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-teal-500">
                  <Image src={doctor.photoUrl} alt={doctor.name.en} fill sizes="(max-width: 640px) 64px, 80px" className="object-cover" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-lg ${
                  doctor.isAvailableToday ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 truncate">{doctor.name.en}</h3>
                <p className="text-teal-600 font-semibold text-xs sm:text-sm mb-1 truncate">{doctor.specialty.en}</p>
                <p className="text-gray-600 text-xs">{doctor.experienceYears} Years Experience</p>
              </div>
            </div>
            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <a href={`/doctors/${doctor._id}/book`} className="flex-1 px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all font-semibold text-xs sm:text-sm text-center">
                Book Now
              </a>
              <a href={`/pages/doctors/${doctor._id}`} className="flex-1 px-3 py-2 border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition-all font-semibold text-xs sm:text-sm text-center">
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
          </button>
          <span className="text-xs sm:text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
