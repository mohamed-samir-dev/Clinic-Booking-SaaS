'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUserMd, FaCalendarCheck, FaCalendarTimes, FaBriefcase, FaClock, FaHospital } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import {DoctorCardProps}from '../../types/index'
import { saveQuickBookingData } from '../../pages/booking/utils/quickBooking';
import { getServiceKeyFromSpecialty } from '../../pages/booking/utils/serviceHelpers';

const checkIsAvailableNow = (availability?: Array<{ day: string; slots?: Array<{ from: string; to: string }>; workingHours?: { from: string; to: string } }>) => {
  if (!availability || availability.length === 0) return false;
  
  const now = new Date();
  const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = daysOrder[now.getDay()];
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const todaySchedule = availability.find(a => a.day === currentDay);
  if (!todaySchedule) return false;
  
  let hours = todaySchedule.workingHours;
  if (!hours && todaySchedule.slots && todaySchedule.slots.length > 0) {
    const validSlot = todaySchedule.slots.find(slot => slot.from && slot.to);
    if (validSlot) hours = validSlot;
  }
  
  if (!hours || !hours.from || !hours.to) return false;
  
  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [h, m] = time.split(':').map(Number);
    let hrs = h;
    if (period === 'PM' && hrs !== 12) hrs += 12;
    if (period === 'AM' && hrs === 12) hrs = 0;
    return hrs * 60 + m;
  };
  
  const startTime = parseTime(hours.from);
  const endTime = parseTime(hours.to);
  
  return currentTime >= startTime && currentTime <= endTime;
};

const getNextAvailableDay = (availability?: Array<{ day: string; slots?: Array<{ from: string; to: string }>; workingHours?: { from: string; to: string } }>, locale: string = 'en') => {
  if (!availability || availability.length === 0) return null;
  
  const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const daysArabic: Record<string, string> = {
    'sunday': 'الأحد',
    'monday': 'الإثنين',
    'tuesday': 'الثلاثاء',
    'wednesday': 'الأربعاء',
    'thursday': 'الخميس',
    'friday': 'الجمعة',
    'saturday': 'السبت'
  };
  const today = new Date().getDay();
  
  for (let i = 0; i < 7; i++) {
    const dayIndex = (today + i) % 7;
    const dayName = daysOrder[dayIndex];
    const daySchedule = availability.find(a => a.day === dayName);
    
    if (daySchedule) {
      let hours = daySchedule.workingHours;
      
      if (!hours && daySchedule.slots && daySchedule.slots.length > 0) {
        const validSlot = daySchedule.slots.find(slot => slot.from && slot.to);
        if (validSlot) {
          hours = validSlot;
        }
      }
      
      if (hours && hours.from && hours.to) {
        return {
          day: dayName,
          dayDisplay: locale === 'ar' ? daysArabic[dayName] : dayName.charAt(0).toUpperCase() + dayName.slice(1),
          isToday: i === 0,
          workingHours: hours
        };
      }
    }
  }
  
  return null;
};

export default function DoctorCard({  
  id,
  name, 
  specialty, 
  experienceYears, 
  photoUrl, 
  availability,
  clinicName,
  hideBookButton = false,
  quickBook = false
}: DoctorCardProps & { hideBookButton?: boolean; quickBook?: boolean }) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].doctors;
  const router = useRouter();
  const nextAvailable = getNextAvailableDay(availability, locale);
  const isCurrentlyAvailable = checkIsAvailableNow(availability);
  
  const displayName = locale === 'ar' && name.ar ? name.ar : name.en;
  const displaySpecialty = locale === 'ar' && specialty.ar ? specialty.ar : specialty.en;
  const displayClinicName = clinicName ? (locale === 'ar' && clinicName.ar ? clinicName.ar : clinicName.en) : '';

  const handleQuickBook = () => {
    saveQuickBookingData({
      doctorId: id,
      doctorName: displayName,
      specialty: displaySpecialty,
      serviceId: getServiceKeyFromSpecialty(specialty.en),
      skipSteps: true
    });
    router.push('/pages/booking?quick=true');
  };
  
  return (
    <div className={`mb-8 sm:mb-10 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-5 sm:p-6 md:p-8 group ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'} border`}>
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4 sm:mb-5">
          <div className="absolute inset-0 bg-linear-to-br from-teal-400 to-teal-600 rounded-full animate-pulse opacity-20"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-3 sm:border-4 border-teal-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Image
              src={photoUrl}
              alt={displayName}
              fill
              sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
              className="object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg ${
            isCurrentlyAvailable ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {isCurrentlyAvailable ? (
              <FaCalendarCheck className="text-white text-xs sm:text-sm" />
            ) : (
              <FaCalendarTimes className="text-white text-xs sm:text-sm" />
            )}
          </div>
        </div>
        
        <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{displayName}</h3>
        
        <div className="flex items-center gap-1.5 sm:gap-2 text-teal-600 font-semibold mb-2">
          <FaUserMd className="text-base sm:text-lg" />
          <span className="text-sm sm:text-base">{displaySpecialty}</span>
        </div>
        
        {displayClinicName && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-teal-600 mb-3 sm:mb-4">
            <FaHospital className="text-sm sm:text-base" />
            <span className="text-xs sm:text-sm font-semibold">{displayClinicName}</span>
          </div>
        )}
        
        <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 ${theme === 'dark' ? 'bg-teal-900/30' : 'bg-teal-50'}`}>
          <FaBriefcase className="text-teal-600 text-xs sm:text-sm" />
          <span className={`text-xs sm:text-sm font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{experienceYears} {t.yearsExperience}</span>
        </div>
        
        {nextAvailable && (
          <div className={`w-full mb-4 px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-linear-to-r from-green-50 to-emerald-50 border-green-200'}`}>
            <div className="flex items-center gap-2 justify-center">
              <FaClock className="text-green-600 text-sm" />
              <span className={`text-xs sm:text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                {t.nextAvailable} {nextAvailable.isToday ? t.today : nextAvailable.dayDisplay}
                {' '}
                <span className="text-green-600">
                  {nextAvailable.workingHours.from} - {nextAvailable.workingHours.to}
                </span>
              </span>
            </div>
          </div>
        )}
        
        <div className="w-full space-y-2 ">
          {!hideBookButton && (
            quickBook ? (
              <button
                onClick={handleQuickBook}
                className="block w-full mb-3 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base text-center"
              >
                {t.bookAppointment}
              </button>
            ) : (
              <Link 
                href={`/doctors/${id}/book`}
                className="block w-full mb-3 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-linear-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base text-center"
              >
                {t.bookAppointment}
              </Link>
            )
          )}
          <Link 
            href={`/pages/doctors/${id}`}
            className="block w-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 border-2 border-teal-500 text-teal-600 rounded-full hover:bg-teal-50 transition-all font-semibold text-sm sm:text-base text-center"
          >
            {t.viewProfile}
          </Link>
        </div>
      </div>
    </div>
  );
}
