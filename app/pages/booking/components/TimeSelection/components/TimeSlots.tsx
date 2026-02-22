import { Doctor } from '@/app/types/index';
import TimePeriod from './TimePeriod';
import { TIME_PERIODS } from '../constants';

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
  setShowAllEvening
}: TimeSlotsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (!doctorObject) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="text-center py-12 text-gray-500">
          <span className="material-icons text-4xl mb-2">person_search</span>
          <p>Please select a doctor first</p>
        </div>
      </div>
    );
  }

  if (!selectedDate) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="text-center py-12 text-gray-500">
          <span className="material-icons text-4xl mb-2">event</span>
          <p>Please select a date first</p>
        </div>
      </div>
    );
  }

  const hasSlots = morningSlots.length > 0 || afternoonSlots.length > 0 || eveningSlots.length > 0;

  if (!hasSlots) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="text-center py-12 text-gray-500">
          <span className="material-icons text-4xl mb-2">event_busy</span>
          <p>No available slots for this day</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="space-y-6">
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
        />
      </div>
    </div>
  );
}
