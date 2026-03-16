import { FaStar, FaUserMd, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { Doctor } from '../../types/types';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

export default function DoctorCard({ doctor, index }: DoctorCardProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/pages/doctors/${doctor._id}`);
  };

  const doctorName = locale === 'ar' ? doctor.name.ar : doctor.name.en;
  const doctorSpecialty = locale === 'ar' ? doctor.specialty.ar : doctor.specialty.en;
  const doctorBio = locale === 'ar' ? doctor.bio?.ar : doctor.bio?.en;

  return (
    <div
      className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border`}
    >
      <div className="relative h-64 sm:h-72 md:h-80 bg-linear-to-br from-teal-50 to-cyan-50">
        {doctor.photoUrl ? (
          <Image
            src={doctor.photoUrl}
            alt={doctorName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaUserMd className="text-teal-200 text-7xl sm:text-8xl md:text-9xl" />
          </div>
        )}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <FaStar className="text-yellow-400 text-sm sm:text-base" />
            <span className="font-bold text-gray-900 text-sm sm:text-base">
              {(doctor.ratingAverage || 0).toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 md:p-8">
        <h4 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2 sm:mb-3`}>
          {locale === 'ar' ? `د. ${doctorName}` : `Dr. ${doctorName}`}
        </h4>
        
        <p className="text-teal-600 font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
          {doctorSpecialty}
        </p>

        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3`}>
          {doctorBio || `${doctor.experienceYears}+ ${locale === 'ar' ? 'سنوات خبرة في' : 'years of experience in'} ${doctorSpecialty}`}
        </p>

        <div className={`flex items-center justify-between pt-4 sm:pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
          <div>
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-1`}>{locale === 'ar' ? 'الخبرة' : 'Experience'}</p>
            <p className="text-xl sm:text-2xl font-bold text-teal-600">{doctor.experienceYears}<span className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} ml-1`}>{locale === 'ar' ? 'سنوات' : 'years'}</span></p>
          </div>
          <div className="text-right">
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-1`}>{locale === 'ar' ? 'التقييمات' : 'Reviews'}</p>
            <p className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{doctor.reviewsCount || 0}</p>
          </div>
        </div>

        <button
          onClick={handleViewProfile}
          className="w-full mt-4 sm:mt-6 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg font-semibold transition-all"
        >
          <FaUser className="text-sm" />
          <span className="text-sm">{locale === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}</span>
        </button>
      </div>
    </div>
  );
}
