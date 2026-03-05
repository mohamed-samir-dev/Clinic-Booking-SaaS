import { Doctor } from '@/app/types/index';
import TimePeriod from './TimePeriod';
import { useTimePeriods } from '../constants';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface TimeSlotsProps {
  loading: boolean;
  doctorObject: Doctor | null;
  selectedDate: Date | null;
  morningSlots: string[];
  afternoonSlots: string[];
  eveningSlots: string[];
  displayedMorningSlots: string[];
  displayedAfternoonSlots: string[];
  displayedEveningSlots: string[];
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  showAllMorning: boolean;
  setShowAllMorning: (show: boolean) => void;
  showAllAfternoon: boolean;
  setShowAllAfternoon: (show: boolean) => void;
  showAllEvening: boolean;
  setShowAllEvening: (show: boolean) => void;
  bookedSlots: string[];
  blockedRanges: Array<{start: number; end: number; reason: string}>;
}

export default function TimeSlots({
  loading,
  doctorObject,
  selectedDate,
  morningSlots,
  afternoonSlots,
  eveningSlots,
  displayedMorningSlots,
  displayedAfternoonSlots,
  displayedEveningSlots,
  selectedTime,
  setSelectedTime,
  showAllMorning,
  setShowAllMorning,
  showAllAfternoon,
  setShowAllAfternoon,
  showAllEvening,
  setShowAllEvening,
  bookedSlots,
  blockedRanges
}: TimeSlotsProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.timeSelection.timeSlots;
  const TIME_PERIODS = useTimePeriods();
  
  if (loading) {
    return (
      <div className={`rounded-2xl shadow-sm p-4 sm:p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (!doctorObject) {
    return (
      <div className={`rounded-2xl shadow-sm p-4 sm:p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`text-center py-8 sm:py-12 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="material-icons text-3xl sm:text-4xl mb-2">person_search</span>
          <p className="text-sm sm:text-base">{locale === 'ar' ? 'الرجاء اختيار طبيب أولاً' : 'Please select a doctor first'}</p>
        </div>
      </div>
    );
  }

  if (!selectedDate) {
    return (
      <div className={`rounded-2xl shadow-sm p-4 sm:p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`text-center py-8 sm:py-12 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="material-icons text-3xl sm:text-4xl mb-2">event</span>
          <p className="text-sm sm:text-base">{t.selectDate}</p>
        </div>
      </div>
    );
  }

  const hasSlots = morningSlots.length > 0 || afternoonSlots.length > 0 || eveningSlots.length > 0;

  if (!hasSlots) {
    return (
      <div className={`rounded-2xl shadow-sm p-4 sm:p-6 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`text-center py-8 sm:py-12 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="material-icons text-3xl sm:text-4xl mb-2">event_busy</span>
          <p className="text-sm sm:text-base">{t.noSlots}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl shadow-sm p-4 sm:p-6 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="space-y-4 sm:space-y-6">
        <TimePeriod
          title={TIME_PERIODS.MORNING.label}
          icon={TIME_PERIODS.MORNING.icon}
          iconColor={TIME_PERIODS.MORNING.color}
          slots={morningSlots}
          displayedSlots={displayedMorningSlots}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          showAll={showAllMorning}
          setShowAll={setShowAllMorning}
          bookedSlots={bookedSlots}
          blockedRanges={blockedRanges}
          selectedDate={selectedDate}
        />
        <TimePeriod
          title={TIME_PERIODS.AFTERNOON.label}
          icon={TIME_PERIODS.AFTERNOON.icon}
          iconColor={TIME_PERIODS.AFTERNOON.color}
          slots={afternoonSlots}
          displayedSlots={displayedAfternoonSlots}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          showAll={showAllAfternoon}
          setShowAll={setShowAllAfternoon}
          bookedSlots={bookedSlots}
          blockedRanges={blockedRanges}
          selectedDate={selectedDate}
        />
        <TimePeriod
          title={TIME_PERIODS.EVENING.label}
          icon={TIME_PERIODS.EVENING.icon}
          iconColor={TIME_PERIODS.EVENING.color}
          slots={eveningSlots}
          displayedSlots={displayedEveningSlots}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          showAll={showAllEvening}
          setShowAll={setShowAllEvening}
          bookedSlots={bookedSlots}
          blockedRanges={blockedRanges}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}
