import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { getNextAvailableDay, getDoctorName, getDoctorSpecialty } from '../../utils/doctorHelpers';
import {DoctorCardProps}from '../../types/type'
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';


export default function DoctorCard({ doctor, selectedDoctor, onSelect }: DoctorCardProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.doctorSelection;
  const tc = t.card;
  const nextAvailable = getNextAvailableDay(doctor.availability || [], locale);
  const doctorName = getDoctorName(doctor.name, locale);
  const doctorSpecialty = getDoctorSpecialty(doctor.specialty, locale);

  return (
    <div
      className={`rounded-xl shadow-md hover:shadow-lg transition-all p-3 sm:p-4 border-2 ${
        selectedDoctor === doctor._id ? 'border-teal-500' : theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      } ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="shrink-0">
          <Image
            src={doctor.photoUrl}
            alt={doctorName}
            width={128}
            height={128}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-lg object-cover"
          />
        </div>
        
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between mb-1 gap-2">
              <h3 className={`text-base sm:text-lg lg:text-xl font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{doctorName}</h3>
              <span className="text-sm sm:text-base lg:text-lg font-bold text-teal-600 shrink-0">${doctor.fees}</span>
            </div>
            <p className={`text-xs sm:text-sm mb-2 truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{doctorSpecialty}</p>
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-sm">★</span>
                <span className={`text-xs sm:text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{doctor.ratingAvg ? doctor.ratingAvg.toFixed(1) : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-teal-600 text-xs sm:text-sm font-semibold">{doctor.experienceYears} {tc.years}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            {nextAvailable ? (
              <div className="bg-green-50 border border-green-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5">{tc.nextAvailable}</p>
                <p className="text-xs sm:text-sm font-semibold text-green-700 truncate">
                  {nextAvailable.isToday ? translations[locale].booking.timeSelection.calendar.today : nextAvailable.dayDisplay}
                  {' '}{nextAvailable.workingHours.from} - {nextAvailable.workingHours.to}
                </p>
              </div>
            ) : (
              <div className={`border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{translations[locale].booking.timeSelection.calendar.notAvailable}</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Link href={`/pages/doctors/${doctor._id}`} className="flex-1">
                <button className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 text-xs sm:text-sm ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{translations[locale].doctors.viewProfile}</span>
                </button>
              </Link>
              <button
                onClick={() => onSelect(doctor._id)}
                className={`flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                  selectedDoctor === doctor._id
                    ? 'bg-teal-500 text-white'
                    : theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-teal-900/50 hover:text-teal-300' : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                {selectedDoctor === doctor._id ? tc.selected : tc.select}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
