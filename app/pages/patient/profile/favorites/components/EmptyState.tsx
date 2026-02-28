import Link from 'next/link';
import { FaHeart, FaHospital } from 'react-icons/fa';

interface EmptyStateProps {
  type: 'doctors' | 'clinics';
  theme: string;
  locale: string;
}

export default function EmptyState({ type, theme, locale }: EmptyStateProps) {
  const isDoctors = type === 'doctors';
  
  return (
    <div className={`rounded-lg shadow-md p-6 sm:p-8 md:p-12 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      {isDoctors ? (
        <FaHeart className="text-4xl sm:text-5xl md:text-6xl text-gray-300 mx-auto mb-3 sm:mb-4" />
      ) : (
        <FaHospital className="text-4xl sm:text-5xl md:text-6xl text-gray-300 mx-auto mb-3 sm:mb-4" />
      )}
      <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {isDoctors 
          ? (locale === 'ar' ? 'لا توجد أطباء مفضلون' : 'No Favorite Doctors')
          : (locale === 'ar' ? 'لا توجد عيادات مفضلة' : 'No Favorite Clinics')
        }
      </h3>
      <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        {isDoctors
          ? (locale === 'ar' ? 'ابدأ بإضافة الأطباء المفضلين لديك من صفحة الأطباء' : 'Start adding your favorite doctors from the doctors page')
          : (locale === 'ar' ? 'ابدأ بإضافة العيادات المفضلة لديك من صفحة العيادات' : 'Start adding your favorite clinics from the clinics page')
        }
      </p>
      <Link
        href={isDoctors ? '/pages/doctors' : '/pages/clinics'}
        className="inline-block px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all"
      >
        {isDoctors
          ? (locale === 'ar' ? 'استكشف الأطباء' : 'Explore Doctors')
          : (locale === 'ar' ? 'استكشف العيادات' : 'Explore Clinics')
        }
      </Link>
    </div>
  );
}
