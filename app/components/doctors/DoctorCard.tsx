'use client';

import Image from 'next/image';
import { FaUserMd, FaCalendarCheck, FaCalendarTimes, FaBriefcase } from 'react-icons/fa';
import {DoctorCardProps}from '../../types/index'


export default function DoctorCard({  
  name, 
  specialty, 
  experienceYears, 
  photoUrl, 
  isAvailableToday 
}: DoctorCardProps) {
  return (
    <div className="bg-white mb-10 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 group border border-gray-100">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-5">
          <div className="absolute inset-0 bg-linear-to-br from-teal-400 to-teal-600 rounded-full animate-pulse opacity-20"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-teal-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Image
              src={photoUrl}
              alt={name.en}
              fill
              className="object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
            isAvailableToday ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {isAvailableToday ? (
              <FaCalendarCheck className="text-white text-sm" />
            ) : (
              <FaCalendarTimes className="text-white text-sm" />
            )}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-1 text-center">{name.en}</h3>
        
        <div className="flex items-center gap-2 text-teal-600 font-semibold mb-4">
          <FaUserMd className="text-lg" />
          <span>{specialty.en}</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-6">
          <FaBriefcase className="text-teal-600" />
          <span className="text-sm font-bold text-gray-700">{experienceYears} Years Experience</span>
        </div>
        
        <div className="w-full space-y-2">
          <button className="w-full px-6 py-3 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Book Appointment
          </button>
          <button className="w-full px-6 py-3 border-2 border-teal-500 text-teal-600 rounded-full hover:bg-teal-50 transition-all font-semibold">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
