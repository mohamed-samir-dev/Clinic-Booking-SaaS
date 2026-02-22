import { Doctor } from '@/app/types/index';
import { CalendarDay } from '../types';
import { MONTH_NAMES, DAY_NAMES } from '../constants';

interface CalendarProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  days: CalendarDay[];
  doctorObject: Doctor | null;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export default function Calendar({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
  days,
  doctorObject,
  canGoPrevious,
  canGoNext
}: CalendarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-black font-semibold">{MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => canGoPrevious && setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} 
            disabled={!canGoPrevious}
            className={`p-2 rounded-lg ${canGoPrevious ? 'hover:bg-gray-100' : 'opacity-30 cursor-not-allowed'}`}
          >
            <span className="material-icons text-gray-600">chevron_left</span>
          </button>
          <button 
            onClick={() => canGoNext && setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} 
            disabled={!canGoNext}
            className={`p-2 rounded-lg ${canGoNext ? 'hover:bg-gray-100' : 'opacity-30 cursor-not-allowed'}`}
          >
            <span className="material-icons text-gray-600">chevron_right</span>
          </button>
        </div>
      </div>

      {!doctorObject && (
        <div className="mb-3 p-2 font-semibold bg-amber-50 rounded-lg text-xs text-amber-700 text-center">
          Select a doctor to see available dates
        </div>
      )}

      {doctorObject && (
        <>
          <div className="mb-3 flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600 font-semibold">Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-gray-600 font-semibold">Not Available</span>
            </div>
          </div>
          <div className="mb-3 p-2 font-semibold bg-blue-50 rounded-lg text-xs text-blue-700 text-center">
            Booking available for the next 2 months
          </div>
        </>
      )}

      <div className="grid grid-cols-7 gap-2">
        {DAY_NAMES.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">{day}</div>
        ))}
        {days.map((d, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <button
              onClick={() => d.isCurrentMonth && d.isAvailable && !d.isPast && setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d.day))}
              disabled={!d.isCurrentMonth || !d.isAvailable || d.isPast}
              className={`w-full aspect-square rounded-lg text-sm font-medium transition-all relative ${
                !d.isCurrentMonth ? 'text-gray-300 cursor-not-allowed' :
                d.isPast ? 'text-gray-400 cursor-not-allowed line-through' :
                !d.isAvailable ? 'text-gray-400 cursor-not-allowed' :
                selectedDate?.getDate() === d.day && selectedDate?.getMonth() === currentMonth.getMonth() 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {d.day}
            </button>
            {d.isCurrentMonth && doctorObject && !d.isPast && (
              <div className={`w-1.5 h-1.5 rounded-full mt-1 ${d.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
