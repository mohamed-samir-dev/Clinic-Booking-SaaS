'use client';

import { useState, useMemo } from 'react';
import { Doctor } from '@/app/types/index';
import { useDoctorData } from './hooks/useDoctorData';
import { generateTimeSlots, categorizeTimeSlots, getDaysInMonth } from './utils/timeUtils';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import BookingSummary from './components/BookingSummary';

interface TimeSelectionProps {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedDoctor?: Doctor | string;
  selectedService: string;
}

export default function TimeSelection({ selectedTime, setSelectedTime, selectedDoctor, selectedService }: TimeSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAllMorning, setShowAllMorning] = useState(false);
  const [showAllAfternoon, setShowAllAfternoon] = useState(false);
  const [showAllEvening, setShowAllEvening] = useState(false);

  const doctorId = useMemo(() => 
    typeof selectedDoctor === 'string' ? selectedDoctor : selectedDoctor?._id,
    [selectedDoctor]
  );

  const { availability, consultationDuration, loading, doctorData } = useDoctorData(doctorId, selectedDoctor);
  
  const doctorObject = typeof selectedDoctor === 'object' ? selectedDoctor : doctorData;

  const availableSlots = useMemo(() => 
    generateTimeSlots(selectedDate, availability, consultationDuration),
    [selectedDate, availability, consultationDuration]
  );

  const { morning: morningSlots, afternoon: afternoonSlots, evening: eveningSlots } = categorizeTimeSlots(availableSlots);

  const displayedMorningSlots = showAllMorning ? morningSlots : morningSlots.slice(0, 4);
  const displayedAfternoonSlots = showAllAfternoon ? afternoonSlots : afternoonSlots.slice(0, 4);
  const displayedEveningSlots = showAllEvening ? eveningSlots : eveningSlots.slice(0, 4);

  const days = getDaysInMonth(currentMonth, availability);

  const today = new Date();
  const maxMonth = new Date();
  maxMonth.setMonth(maxMonth.getMonth() + 2);
  
  const canGoPrevious = currentMonth > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoNext = currentMonth < new Date(maxMonth.getFullYear(), maxMonth.getMonth(), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="material-icons text-lg">public</span>
            <span>Cairo Time (GMT+3)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Calendar
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            days={days}
            doctorObject={doctorObject}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
          />
          <TimeSlots
            loading={loading}
            doctorObject={doctorObject}
            selectedDate={selectedDate}
            morningSlots={morningSlots}
            afternoonSlots={afternoonSlots}
            eveningSlots={eveningSlots}
            displayedMorningSlots={displayedMorningSlots}
            displayedAfternoonSlots={displayedAfternoonSlots}
            displayedEveningSlots={displayedEveningSlots}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            showAllMorning={showAllMorning}
            setShowAllMorning={setShowAllMorning}
            showAllAfternoon={showAllAfternoon}
            setShowAllAfternoon={setShowAllAfternoon}
            showAllEvening={showAllEvening}
            setShowAllEvening={setShowAllEvening}
          />
        </div>
      </div>

      <BookingSummary
        doctorObject={doctorObject}
        selectedService={selectedService}
        consultationDuration={consultationDuration}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </div>
  );
}
