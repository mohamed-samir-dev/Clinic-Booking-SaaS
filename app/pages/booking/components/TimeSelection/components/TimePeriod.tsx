import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import { isTimePassed } from '../utils/timeUtils';

interface TimePeriodProps {
  title: string;
  icon: string;
  iconColor: string;
  slots: string[];
  displayedSlots: string[];
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  showAll: boolean;
  setShowAll: (show: boolean) => void;
  bookedSlots: string[];
  blockedRanges: Array<{start: number; end: number; reason: string}>;
  selectedDate: Date | null;
}

export default function TimePeriod({
  title,
  icon,
  iconColor,
  slots,
  displayedSlots,
  selectedTime,
  setSelectedTime,
  showAll,
  setShowAll,
  bookedSlots,
  blockedRanges,
  selectedDate
}: TimePeriodProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.timeSelection.timeSlots;
  
  const isTimeBlocked = (time: string) => {
    const [timeStr, period] = time.split(' ');
    const [hours, minutes] = timeStr.split(':').map(Number);
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 = hours + 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    const timeInMinutes = hour24 * 60 + minutes;
    
    const blockedRange = blockedRanges.find(range => timeInMinutes >= range.start && timeInMinutes < range.end);
    return blockedRange ? blockedRange.reason : null;
  };

  const formatBlockReason = (reason: string) => {
    const reasonLower = reason.toLowerCase();
    if (locale === 'ar') {
      if (reasonLower.includes('meeting') || reasonLower.includes('ميتنج') || reasonLower.includes('اجتماع')) {
        return 'الدكتور في اجتماع';
      }
      if (reasonLower.includes('emergency') || reasonLower.includes('طوارئ')) {
        return 'الدكتور في حالة طوارئ';
      }
      if (reasonLower.includes('surgery') || reasonLower.includes('عملية') || reasonLower.includes('جراحة')) {
        return 'الدكتور في عملية جراحية';
      }
      if (reasonLower.includes('vacation') || reasonLower.includes('إجازة') || reasonLower.includes('اجازة')) {
        return 'الدكتور في إجازة';
      }
      return reason;
    } else {
      if (reasonLower.includes('meeting') || reasonLower.includes('ميتنج') || reasonLower.includes('اجتماع')) {
        return 'Doctor is in a meeting';
      }
      if (reasonLower.includes('emergency') || reasonLower.includes('طوارئ')) {
        return 'Doctor is handling an emergency';
      }
      if (reasonLower.includes('surgery') || reasonLower.includes('عملية') || reasonLower.includes('جراحة')) {
        return 'Doctor is in surgery';
      }
      if (reasonLower.includes('vacation') || reasonLower.includes('إجازة') || reasonLower.includes('اجازة')) {
        return 'Doctor is on vacation';
      }
      return reason;
    }
  };

  const hasBlockedSlots = displayedSlots.some(time => isTimeBlocked(time));
  const blockReason = hasBlockedSlots ? formatBlockReason(isTimeBlocked(displayedSlots.find(time => isTimeBlocked(time))!)!) : null;
  
  if (slots.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <span className={`material-icons text-${iconColor} text-base sm:text-lg`}>{icon}</span>
        <h4 className={`font-semibold text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
        {slots.length > 4 && (
          <span className={`text-[10px] sm:text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>({slots.length} {locale === 'ar' ? 'موعد' : 'slots'})</span>
        )}
      </div>
      {hasBlockedSlots && blockReason && (
        <div className={`mb-2 p-2 rounded-lg flex items-start gap-2 text-xs ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
          <Info className="text-amber-600 mt-0.5 shrink-0" size={16} />
          <p className={theme === 'dark' ? 'text-amber-200' : 'text-amber-800'}>
            {locale === 'ar' ? 'بعض الأوقات غير متاحة لأن ' : 'Some times unavailable because '}{blockReason}
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {displayedSlots.map(time => {
          const isBooked = bookedSlots.includes(time);
          const blockReason = isTimeBlocked(time);
          const isPassed = isTimePassed(time, selectedDate);
          const isDisabled = isBooked || !!blockReason || isPassed;
          return (
            <button
              key={time}
              onClick={() => !isDisabled && setSelectedTime(time)}
              disabled={isDisabled}
              title={blockReason ?? undefined}
              className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isDisabled
                  ? theme === 'dark' ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50' : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                  : selectedTime === time
                  ? 'bg-teal-500 text-white'
                  : theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
      {slots.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-1.5 sm:mt-2 py-1.5 sm:py-2 text-xs sm:text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center justify-center gap-1"
        >
          <span>{showAll ? t.showLess : `${t.showMore} ${slots.length - 4}`}</span>
          {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      )}
    </div>
  );
}
