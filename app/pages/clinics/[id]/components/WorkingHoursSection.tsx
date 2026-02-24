import { Clock } from 'lucide-react';
import { Clinic } from '../types';
import { useTranslations } from 'next-intl';

interface WorkingHoursSectionProps {
  workingHours: Clinic['workingHours'];
  theme: 'light' | 'dark';
}

export default function WorkingHoursSection({ workingHours, theme }: WorkingHoursSectionProps) {
  const t = useTranslations('clinics.details');
  
  if (!workingHours || Object.keys(workingHours).length === 0) return null;

  return (
    <div className={`rounded-xl shadow p-4 sm:p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <Clock className="text-teal-600" size={20} />
        {t('workingHours')}
      </h2>
      <div className="space-y-2">
        {Object.entries(workingHours).map(([day, hours]) => (
          <div key={day} className={`flex justify-between items-center p-2 sm:p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <span className={`font-medium capitalize text-sm sm:text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t(`days.${day.toLowerCase()}`)}</span>
            {hours && hours.isOpen && hours.openTime && hours.closeTime ? (
              <span className="text-teal-600 font-semibold text-xs sm:text-sm">
                {hours.openTime} - {hours.closeTime}
              </span>
            ) : (
              <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{t('closed')}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
