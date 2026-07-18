import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import { Sun, CloudSun, Moon } from 'lucide-react';

export const useMonthNames = () => {
  const { locale } = useLanguage();
  const t = translations[locale].booking.timeSelection.calendar;
  return locale === 'ar' 
    ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
};

export const useDayNames = () => {
  const { locale } = useLanguage();
  return locale === 'ar'
    ? ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
};

export const FULL_DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const useTimePeriods = () => {
  const { locale } = useLanguage();
  const t = translations[locale].booking.timeSelection.timeSlots;
  return {
    MORNING: { icon: Sun, color: 'text-yellow-500', label: t.morning },
    AFTERNOON: { icon: CloudSun, color: 'text-orange-500', label: t.afternoon },
    EVENING: { icon: Moon, color: 'text-indigo-500', label: t.evening }
  };
};
