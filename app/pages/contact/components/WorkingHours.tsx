'use client';

import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import translations from '@/messages/translations';

export default function WorkingHours() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].contact.hours;
  const schedule = [
    { day: t.sunday, hours: '09:00 AM - 09:00 PM' },
    { day: t.monday, hours: '09:00 AM - 09:00 PM' },
    { day: t.tuesday, hours: '09:00 AM - 09:00 PM' },
    { day: t.wednesday, hours: '09:00 AM - 09:00 PM' },
    { day: t.thursday, hours: '09:00 AM - 06:00 PM' },
    { day: t.friday, hours: t.closed, closed: true },
    { day: t.saturday, hours: '10:00 AM - 04:00 PM' }
  ];

  return (
    <div className={`rounded-xl shadow-lg p-4 sm:p-6 border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'}`}>
      <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
      <div className="space-y-2 sm:space-y-3">
        {schedule.map((item) => (
          <div key={item.day} className={`flex justify-between items-center py-2 sm:py-3 border-b last:border-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <span className={`text-sm sm:text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.day}</span>
            <span className={`text-sm sm:text-base ${item.closed ? 'text-red-600 font-bold' : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}`}>
              {item.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
