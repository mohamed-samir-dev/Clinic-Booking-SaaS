import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { useTranslations } from 'next-intl';

interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  date: string;
  time: string;
  endTime?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

interface BlockedSlot {
  _id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}

interface CalendarViewProps {
  appointments: Appointment[];
  blockedSlots: BlockedSlot[];
  viewMode: 'day' | 'week' | 'month';
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onAppointmentClick: (appointment: Appointment) => void;
  onReschedule: (appointmentId: string, newDate: string, newTime: string) => void;
  loading: boolean;
  language?: 'ar' | 'en';
}

export function CalendarView({
  appointments,
  blockedSlots,
  viewMode,
  currentDate,
  onDateChange,
  onAppointmentClick,
  onReschedule,
  loading,
  language = 'en'
}: CalendarViewProps) {
  const t = useTranslations('manager.schedule');
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    onDateChange(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const formatDateHeader = () => {
    const locale = language === 'ar' ? 'ar-EG' : 'en-US';
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString(locale, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (viewMode === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="h-96 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-700 flex flex-col sm:flex-row gap-3 sm:gap-0 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 justify-center sm:justify-start">
          <button
            onClick={navigatePrevious}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="text-gray-400" size={20} />
          </button>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white text-center">{formatDateHeader()}</h2>
          <button
            onClick={navigateNext}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className="text-gray-400" size={20} />
          </button>
        </div>
        <button
          onClick={goToToday}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors text-sm sm:text-base"
        >
          {t('today')}
        </button>
      </div>

      {/* Calendar Content */}
      <div className="p-2 sm:p-3 md:p-4">
        {viewMode === 'day' && (
          <DayView
            appointments={appointments}
            blockedSlots={blockedSlots}
            currentDate={currentDate}
            onAppointmentClick={onAppointmentClick}
            onReschedule={onReschedule}
          />
        )}
        {viewMode === 'week' && (
          <WeekView
            appointments={appointments}
            blockedSlots={blockedSlots}
            currentDate={currentDate}
            onAppointmentClick={onAppointmentClick}
            onReschedule={onReschedule}
          />
        )}
        {viewMode === 'month' && (
          <MonthView
            appointments={appointments}
            blockedSlots={blockedSlots}
            currentDate={currentDate}
            onAppointmentClick={onAppointmentClick}
          />
        )}
      </div>
    </div>
  );
}
