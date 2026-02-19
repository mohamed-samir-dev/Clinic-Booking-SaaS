import Image from 'next/image';
import { FaCheckCircle, FaStar, FaUserInjured, FaStethoscope, FaCalendarAlt } from 'react-icons/fa';
import { Doctor } from '../../../../types';

interface DoctorProfileCardProps {
  doctor: Doctor;
}

export default function DoctorProfileCard({ doctor }: DoctorProfileCardProps) {
  const doctorName = typeof doctor.name === 'string' ? doctor.name : doctor.name?.en || 'Doctor';
  const doctorSpecialty = typeof doctor.specialty === 'string' ? doctor.specialty : doctor.specialty?.en || 'Specialist';
  const doctorBrief = typeof doctor.brief === 'string' ? doctor.brief : doctor.brief?.en || '';

  return (
    <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 border border-gray-100">
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-linear-to-br from-teal-100/30 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-linear-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl -z-10" />
      
      {/* Header Section */}
      <div className="relative bg-linear-to-br from-teal-500 via-teal-600 to-cyan-600 px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-16 sm:pb-20">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
          {/* Doctor Image */}
          <div className="relative shrink-0 group">
            <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-pink-400 rounded-2xl sm:rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 ring-4 ring-white/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={doctor.photoUrl}
                alt={doctorName}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-linear-to-br from-green-400 to-emerald-500 text-white p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl">
              <FaCheckCircle className="text-lg sm:text-2xl" />
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 text-center md:text-left space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-lg border border-white/30">
              <FaStethoscope className="text-white text-sm sm:text-lg" />
              <span className="text-white font-semibold text-xs sm:text-sm">{doctorSpecialty}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">Dr. {doctorName}</h1>
            <p className="text-teal-50 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">{doctorBrief}</p>
            <button className="inline-flex items-center gap-2 bg-white text-teal-600 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 mt-2">
              <FaCalendarAlt className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-8 sm:-mt-10 px-4 sm:px-6 md:px-8 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-teal-50 flex items-center justify-center">
                <FaStethoscope className="text-teal-600 text-base sm:text-lg" />
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{doctor.experienceYears}+</p>
                <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">Years Exp.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-amber-50 flex items-center justify-center">
                <FaStar className="text-amber-500 text-base sm:text-lg" />
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{doctor.ratingAvg?.toFixed(1) || '5.0'}</p>
                <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">{doctor.ratingCount || 0} Reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-blue-50 flex items-center justify-center">
                <FaUserInjured className="text-blue-600 text-base sm:text-lg" />
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">5000+</p>
                <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">Patients</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-emerald-50 flex items-center justify-center">
                <span className="text-lg sm:text-xl">💰</span>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">${doctor.fees || 150}</p>
                <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">Per Visit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
