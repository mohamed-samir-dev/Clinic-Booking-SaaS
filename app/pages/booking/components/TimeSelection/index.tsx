'use client';

import { useState, useMemo, useEffect } from 'react';
import { Doctor } from '@/app/types/index';
import { useDoctorData } from './hooks/useDoctorData';
import { generateTimeSlots, categorizeTimeSlots, getDaysInMonth } from './utils/timeUtils';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import BookingSummary from './components/BookingSummary';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import Toast from '@/app/components/Toast';
import { useTheme } from '@/app/contexts/ThemeContext';

interface TimeSelectionProps {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedDoctor?: Doctor | string;
  selectedService: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export default function TimeSelection({ selectedTime, setSelectedTime, selectedDoctor, selectedService, selectedDate, setSelectedDate }: TimeSelectionProps) {
  const { theme } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAllMorning, setShowAllMorning] = useState(false);
  const [showAllAfternoon, setShowAllAfternoon] = useState(false);
  const [showAllEvening, setShowAllEvening] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { token } = useSelector((state: RootState) => state.auth);

  const doctorId = useMemo(() => 
    typeof selectedDoctor === 'string' ? selectedDoctor : selectedDoctor?._id,
    [selectedDoctor]
  );

  const { availability, consultationDuration, loading, doctorData } = useDoctorData(doctorId, selectedDoctor);
  
  const doctorObject = typeof selectedDoctor === 'object' ? selectedDoctor : doctorData;

  useEffect(() => {
    const fetchBlockedDates = async () => {
      if (!doctorId) return;
      
      const guestId = localStorage.getItem('guestId');
      if (!guestId && !token) return;

      const params = new URLSearchParams({ doctorId });
      if (guestId) params.append('guestId', guestId);
      
      const url = `http://localhost:5000/api/appointments/blocked-dates?${params.toString()}`;
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      try {
        const response = await fetch(url, { headers });
        if (!response.ok) return;
        const data = await response.json();
        if (data.blockedDates) {
          setBlockedDates(data.blockedDates);
        }
      } catch (error) {
        console.error('Error fetching blocked dates:', error);
      }
    };

    fetchBlockedDates();
  }, [token, doctorId]);

  const handleDateSelect = (date: Date | null) => {
    if (!date) {
      setSelectedDate(null);
      return;
    }
    const dateStr = date.toISOString().split('T')[0];
    if (blockedDates.includes(dateStr)) {
      setErrorMessage('You already have an appointment with this doctor on this day.');
      return;
    }
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate || !doctorId) {
        setBookedSlots([]);
        return;
      }

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      const url = `http://localhost:5000/api/appointments/booked-slots?doctorId=${doctorId}&date=${dateStr}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          setBookedSlots([]);
          return;
        }
        const data = await response.json();
        
        if (data.bookedSlots) {
          const slots = data.bookedSlots.map((slot: { startTime: string }) => {
            const [hours, minutes] = slot.startTime.split(':');
            const hour = parseInt(hours);
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
            return `${displayHour.toString().padStart(2, '0')}:${minutes} ${period}`;
          });
          setBookedSlots(slots);
        }
      } catch (error) {
        console.error('Error fetching booked slots:', error);
        setBookedSlots([]);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, doctorId]);

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="lg:col-span-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <h2 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Select Date & Time</h2>
          <div className={`flex items-center gap-2 text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="material-icons text-base sm:text-lg">public</span>
            <span>Cairo Time (GMT+3)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Calendar
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
            setSelectedDate={handleDateSelect}
            days={days}
            doctorObject={doctorObject}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
            blockedDates={blockedDates}
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
            bookedSlots={bookedSlots}
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

      {errorMessage && (
        <Toast
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
}
