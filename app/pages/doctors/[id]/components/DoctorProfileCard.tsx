'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaStar, FaUserInjured, FaStethoscope, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { Doctor } from '../../../../types';
import { saveQuickBookingData } from '../../../booking/utils/quickBooking';
import { getServiceKeyFromSpecialty } from '../../../booking/utils/serviceHelpers';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useLanguage } from '../../../../contexts/LanguageContext';
import translations from '@/messages/translations';

interface DoctorProfileCardProps {
  doctor: Doctor;
}

export default function DoctorProfileCard({ doctor }: DoctorProfileCardProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].doctors.profile;

  const getText = (value: string | { en: string; ar: string } | undefined): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[locale] || value.en || value.ar || '';
  };

  const doctorName = getText(doctor.name) || 'Doctor';
  const doctorSpecialty = getText(doctor.specialty) || 'Specialist';
  const doctorBrief = getText(doctor.brief) || '';
  const clinicName = getText(doctor.clinicId?.name) || '';
  const clinicId = doctor.clinicId?._id || '';

  const handleQuickBook = () => {
    saveQuickBookingData({
      doctorId: doctor._id,
      doctorName: doctorName,
      specialty: doctorSpecialty,
      serviceId: getServiceKeyFromSpecialty(doctorSpecialty),
      skipSteps: true
    });
    router.push('/pages/booking?quick=true');
  };

  return (
    <div className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden mb-4 sm:mb-6 lg:mb-8 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-linear-to-br from-teal-100/30 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-linear-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl -z-10" />
      
      {/* Header Section */}
      <div className="relative bg-linear-to-br from-teal-500 via-teal-600 to-cyan-600 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8">
            {/* Doctor Image */}
            <div className="relative shrink-0 group">
              <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-pink-400 rounded-2xl lg:rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-32 h-40 sm:w-36 sm:h-48 lg:w-44 lg:h-56 ring-4 ring-white/50 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={doctor.photoUrl}
                  alt={doctorName}
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 176px"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 lg:-bottom-3 lg:-right-3 bg-linear-to-br from-green-400 to-emerald-500 text-white p-2 lg:p-3 rounded-xl lg:rounded-2xl shadow-xl">
                <FaCheckCircle className="text-lg lg:text-2xl" />
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 w-full text-center sm:text-start">
              <div className={`inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl lg:rounded-2xl shadow-lg border border-white/30 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                <FaStethoscope className="text-white text-sm lg:text-lg" />
                <span className="text-white font-semibold text-sm lg:text-base">{doctorSpecialty}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white drop-shadow-lg leading-tight">Dr. {doctorName}</h1>
              <p className="text-teal-50 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">{doctorBrief}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {clinicName && clinicId && (
                  <Link href={`/pages/clinics/${clinicId}`} className={`flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm px-4 lg:px-5 py-2.5 lg:py-3 rounded-xl border border-white/30 shadow-lg hover:bg-white/30 transition-all group ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-semibold text-sm lg:text-base">{locale === 'ar' ? 'العيادة: ' : 'Clinic: '}{clinicName}</span>
                    <FaArrowRight className={`text-white text-sm group-hover:translate-x-1 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
                  </Link>
                )}
                <button 
                  onClick={handleQuickBook}
                  className={`inline-flex items-center justify-center gap-2 bg-white text-teal-600 px-6 lg:px-8 py-2.5 lg:py-3.5 rounded-xl font-bold text-sm lg:text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <FaCalendarAlt className="text-lg lg:text-xl" />
                  <span>{t.bookAppointment}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-8 sm:-mt-10 lg:-mt-12 px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          <div className={`rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-lg hover:shadow-xl transition-shadow border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex flex-col items-center gap-2 lg:gap-3">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-teal-900/50' : 'bg-teal-50'}`}>
                <FaStethoscope className="text-teal-600 text-base lg:text-xl" />
              </div>
              <div className="text-center">
                <p className={`text-xl lg:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{doctor.experienceYears}+</p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.yearsExp}</p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-lg hover:shadow-xl transition-shadow border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex flex-col items-center gap-2 lg:gap-3">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-amber-900/50' : 'bg-amber-50'}`}>
                <FaStar className="text-amber-500 text-base lg:text-xl" />
              </div>
              <div className="text-center">
                <p className={`text-xl lg:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{doctor.ratingAvg?.toFixed(1) || '5.0'}</p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{doctor.ratingCount || 0} {t.reviews}</p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-lg hover:shadow-xl transition-shadow border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex flex-col items-center gap-2 lg:gap-3">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-50'}`}>
                <FaUserInjured className="text-blue-600 text-base lg:text-xl" />
              </div>
              <div className="text-center">
                <p className={`text-xl lg:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>5000+</p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.patients}</p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-lg hover:shadow-xl transition-shadow border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex flex-col items-center gap-2 lg:gap-3">
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-emerald-900/50' : 'bg-emerald-50'}`}>
                <span className="text-xl lg:text-2xl">💰</span>
              </div>
              <div className="text-center">
                <p className={`text-xl lg:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${doctor.fees || 150}</p>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.perVisit}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
