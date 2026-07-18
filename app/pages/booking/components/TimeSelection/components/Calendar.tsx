import { Doctor } from '@/app/types/index';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CalendarDay } from '../types';
import { useMonthNames, useDayNames } from '../constants';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface CalendarProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  days: CalendarDay[];
  doctorObject: Doctor | null;
  canGoPrevious: boolean;
  canGoNext: boolean;
  blockedDates: string[];
}

export default function Calendar({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
  days,
  doctorObject,
  canGoPrevious,
  canGoNext,
  blockedDates
}: CalendarProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.timeSelection.calendar;
  const MONTH_NAMES = useMonthNames();
  const DAY_NAMES = useDayNames();
  
  return (
    <div className={`rounded-2xl shadow-sm p-4 sm:p-6 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className={`text-base sm:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <div className="flex gap-1 sm:gap-2">
          <button 
            onClick={() => canGoPrevious && setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} 
            disabled={!canGoPrevious}
            className={`p-1.5 sm:p-2 rounded-lg ${canGoPrevious ? theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100' : 'opacity-30 cursor-not-allowed'}`}
          >
            {locale === 'ar' ? <ChevronRight className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} size={20} /> : <ChevronLeft className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} size={20} />}
          </button>
          <button 
            onClick={() => canGoNext && setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} 
            disabled={!canGoNext}
            className={`p-1.5 sm:p-2 rounded-lg ${canGoNext ? theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100' : 'opacity-30 cursor-not-allowed'}`}
          >
            {locale === 'ar' ? <ChevronLeft className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} size={20} /> : <ChevronRight className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} size={20} />}
          </button>
        </div>
      </div>

      {!doctorObject && (
        <div className={`mb-2 sm:mb-3 p-2 font-semibold rounded-lg text-[10px] sm:text-xs text-center ${
          theme === 'dark' ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-700'
        }`}>
          {t.selectDate}
        </div>
      )}

      {doctorObject && (
        <>
          <div className="mb-2 sm:mb-3 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{locale === 'ar' ? 'متاح' : 'Available'}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.notAvailable}</span>
            </div>
          </div>
          <div className={`mb-2 sm:mb-3 p-2 font-semibold rounded-lg text-[10px] sm:text-xs text-center ${
            theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
          }`}>
            {locale === 'ar' ? 'الحجز متاح للشهرين القادمين' : 'Booking available for the next 2 months'}
          </div>
        </>
      )}

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {DAY_NAMES.map(day => (
          <div key={day} className={`text-center text-[10px] sm:text-xs font-semibold py-1 sm:py-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>{day}</div>
        ))}
        {days.map((d, idx) => {
          const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d.day).toISOString().split('T')[0];
          const isBlocked = blockedDates.includes(dateStr);
          
          return (
          <div key={idx} className="flex flex-col items-center">
            <button
              onClick={() => d.isCurrentMonth && d.isAvailable && !d.isPast && !isBlocked && setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d.day))}
              disabled={!d.isCurrentMonth || !d.isAvailable || d.isPast || isBlocked}
              className={`w-full aspect-square rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                !d.isCurrentMonth ? theme === 'dark' ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed' :
                d.isPast ? theme === 'dark' ? 'text-gray-600 cursor-not-allowed line-through' : 'text-gray-400 cursor-not-allowed line-through' :
                isBlocked ? 'text-red-400 cursor-not-allowed bg-red-50' :
                !d.isAvailable ? theme === 'dark' ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed' :
                selectedDate?.getDate() === d.day && selectedDate?.getMonth() === currentMonth.getMonth() 
                  ? 'bg-teal-500 text-white' 
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {d.day}
            </button>
            {d.isCurrentMonth && doctorObject && !d.isPast && (
              <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mt-0.5 sm:mt-1 ${isBlocked ? 'bg-red-500' : d.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
            )}
          </div>
        )})}
      </div>
    </div>
  );
}
