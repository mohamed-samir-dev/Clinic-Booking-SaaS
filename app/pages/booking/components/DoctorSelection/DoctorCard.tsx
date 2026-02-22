import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { getNextAvailableDay, getDoctorName, getDoctorSpecialty } from '../../utils/doctorHelpers';
import {DoctorCardProps}from '../../types/type'


export default function DoctorCard({ doctor, selectedDoctor, onSelect }: DoctorCardProps) {
  const nextAvailable = getNextAvailableDay(doctor.availability || []);
  const doctorName = getDoctorName(doctor.name);
  const doctorSpecialty = getDoctorSpecialty(doctor.specialty);

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 border-2 ${
        selectedDoctor === doctor._id ? 'border-teal-500' : 'border-gray-200'
      }`}
    >
      <div className="flex gap-4">
        <div className="shrink-0">
          <Image
            src={doctor.photoUrl}
            alt={doctorName}
            width={128}
            height={128}
            className="w-32 h-32 rounded-lg object-cover"
          />
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xl font-bold text-gray-900">{doctorName}</h3>
              <span className="text-lg font-bold text-teal-600">${doctor.fees}</span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{doctorSpecialty}</p>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-semibold text-gray-700">4.8</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-teal-600 text-sm font-semibold">{doctor.experienceYears} Years</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            {nextAvailable ? (
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-600 mb-0.5">Next Available</p>
                <p className="text-sm font-semibold text-green-700">
                  {nextAvailable.isToday ? 'Today' : nextAvailable.day.charAt(0).toUpperCase() + nextAvailable.day.slice(1)}
                  {' '}{nextAvailable.workingHours.from} - {nextAvailable.workingHours.to}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <p className="text-sm text-gray-500">No availability</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Link href={`/pages/doctors/${doctor._id}`} className="flex-1">
                <button className="w-full px-3 py-2 rounded-lg font-semibold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center gap-1">
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </Link>
              <button
                onClick={() => onSelect(doctor._id)}
                className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all ${
                  selectedDoctor === doctor._id
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                {selectedDoctor === doctor._id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
