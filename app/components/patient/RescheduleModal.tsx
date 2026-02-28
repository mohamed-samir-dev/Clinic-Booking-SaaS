'use client';

import { useState, useEffect, useMemo } from 'react';
import { FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface TimeSlot {
  from: string;
  to: string;
}

interface DayAvailability {
  day: string;
  slots: TimeSlot[];
}

interface RescheduleModalProps {
  appointmentId: string;
  currentDate: string;
  currentStartTime: string;
  currentEndTime: string;
  doctorId: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface BookedSlot {
  appointmentId: string;
  startTime: string;
}

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isAvailable: boolean;
  isPast: boolean;
  date?: Date;
}

const FULL_DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function RescheduleModal({
  appointmentId,
  doctorId,
  onClose,
  onSuccess,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [consultationDuration, setConsultationDuration] = useState(30);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch doctor availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}/availability`);
        const data = await response.json();
        setAvailability(data.availability || []);
        setConsultationDuration(data.consultationDuration || 30);
      } catch (err) {
        console.error('Error fetching availability:', err);
      }
    };
    fetchAvailability();
  }, [doctorId]);

  // Fetch blocked dates
  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/appointments/blocked-dates?doctorId=${doctorId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.blockedDates) setBlockedDates(data.blockedDates);
      } catch (err) {
        console.error('Error fetching blocked dates:', err);
      }
    };
    fetchBlockedDates();
  }, [doctorId]);

  // Fetch booked slots for selected date (excluding current appointment)
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    const fetchBookedSlots = async () => {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/booked-slots?doctorId=${doctorId}&date=${dateStr}`);
        const data = await response.json();
        if (data.bookedSlots) {
          const slots = data.bookedSlots
            .filter((slot: BookedSlot) => slot.appointmentId !== appointmentId)
            .map((slot: BookedSlot) => {
              const [hours, minutes] = slot.startTime.split(':');
              const hour = parseInt(hours);
              const period = hour >= 12 ? 'PM' : 'AM';
              const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
              return `${displayHour.toString().padStart(2, '0')}:${minutes} ${period}`;
            });
          setBookedSlots(slots);
        }
      } catch (err) {
        console.error('Error fetching booked slots:', err);
      }
    };
    fetchBookedSlots();
  }, [selectedDate, doctorId, appointmentId]);

  // Generate time slots
  const availableSlots = useMemo(() => {
    if (!selectedDate || !availability.length) return [];

    const dayName = FULL_DAY_NAMES[selectedDate.getDay()];
    const daySchedule = availability.find(a => a.day === dayName);
    if (!daySchedule || !daySchedule.slots?.length) return [];

    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();

    const slots: string[] = [];
    daySchedule.slots.forEach(slot => {
      const [startHour, startMin] = slot.from.split(':').map(Number);
      const [endHour, endMin] = slot.to.split(':').map(Number);
      
      let currentTime = startHour * 60 + startMin;
      const endTime = endHour * 60 + endMin;

      while (currentTime + consultationDuration <= endTime) {
        const hour = Math.floor(currentTime / 60);
        const min = currentTime % 60;
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const timeSlot = `${String(displayHour).padStart(2, '0')}:${String(min).padStart(2, '0')} ${period}`;
        
        // Check if time has passed (only for today)
        if (isToday) {
          const slotTime = new Date();
          slotTime.setHours(hour, min, 0, 0);
          if (slotTime <= now) {
            currentTime += consultationDuration;
            continue;
          }
        }
        
        slots.push(timeSlot);
        currentTime += consultationDuration;
      }
    });

    return slots.filter(slot => !bookedSlots.includes(slot));
  }, [selectedDate, availability, consultationDuration, bookedSlots]);

  // Generate calendar days
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    
    const days: CalendarDay[] = [];
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isAvailable: false, isPast: true });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      date.setHours(0, 0, 0, 0);
      const dateStr = date.toISOString().split('T')[0];
      
      const isPast = date < today;
      const isTooFar = date > maxDate;
      const isBlocked = blockedDates.includes(dateStr);
      const dayName = FULL_DAY_NAMES[date.getDay()];
      const isAvailable = availability.some(a => a.day === dayName && a.slots?.length > 0) && !isPast && !isTooFar && !isBlocked;
      
      days.push({ day: i, isCurrentMonth: true, isAvailable, isPast: isPast || isTooFar, date });
    }
    
    return days;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const [time, period] = selectedTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let hour24 = hours;
      if (period === 'PM' && hours !== 12) hour24 = hours + 12;
      if (period === 'AM' && hours === 12) hour24 = 0;

      const startTime = `${String(hour24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      
      // Calculate end time properly
      const totalMinutes = hour24 * 60 + minutes + consultationDuration;
      const endHour = Math.floor(totalMinutes / 60);
      const endMin = totalMinutes % 60;
      const endTime = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

      // Format date without timezone conversion
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const appointmentDate = `${year}-${month}-${day}`;

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/patient/appointments/${appointmentId}/reschedule`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentDate,
          startTime,
          endTime,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        onClose();
      } else {
        setError(data.message || 'Failed to reschedule appointment');
      }
    } catch {
      setError('Error rescheduling appointment');
    } finally {
      setLoading(false);
    }
  };

  const days = getDaysInMonth();
  const today = new Date();
  const maxMonth = new Date();
  maxMonth.setMonth(maxMonth.getMonth() + 2);
  
  const canGoPrevious = currentMonth > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoNext = currentMonth < new Date(maxMonth.getFullYear(), maxMonth.getMonth(), 1);

  // Categorize time slots
  const categorizeSlots = (slots: string[]) => {
    const morning = slots.filter(time => time.includes('AM') && !time.startsWith('12'));
    const afternoon = slots.filter(time => 
      (time.startsWith('12') && time.includes('PM')) || 
      (time.includes('PM') && ['01', '02', '03'].some(h => time.startsWith(h)))
    );
    const evening = slots.filter(time => 
      time.includes('PM') && ['04', '05', '06', '07', '08', '09', '10', '11'].some(h => time.startsWith(h))
    );
    return { morning, afternoon, evening };
  };

  const { morning, afternoon, evening } = categorizeSlots(availableSlots);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-linear-to-r from-teal-500 to-teal-600 p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-xl font-bold mb-1">Reschedule Appointment</h2>
              <p className="text-teal-100 text-sm">Choose from available dates and times</p>
            </div>
            <button onClick={onClose} className="text-white  cursor-pointer  p-2 rounded-lg transition-colors">
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <FaCalendarAlt className="inline mr-2 text-teal-600" />
                Select Date
              </label>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    disabled={!canGoPrevious}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-bold text-lg"
                  >
                    ←
                  </button>
                  <h3 className="font-semibold text-gray-900">
                    {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    disabled={!canGoNext}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-bold text-lg"
                  >
                    →
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAY_NAMES.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => day.isAvailable && day.date && setSelectedDate(day.date)}
                      disabled={!day.isAvailable}
                      className={`
                        aspect-square p-2 text-sm rounded-lg transition-all
                        ${!day.isCurrentMonth ? 'text-gray-300' : ''}
                        ${day.isPast || !day.isAvailable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-teal-50'}
                        ${selectedDate && day.date && selectedDate.toDateString() === day.date.toDateString() ? 'bg-teal-600 text-white font-bold' : ''}
                        ${day.isAvailable && day.isCurrentMonth ? 'font-medium text-gray-900' : ''}
                      `}
                    >
                      {day.day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <FaClock className="inline mr-2 text-teal-600" />
                Select Time
              </label>
              <div className="bg-white border border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto">
                {!selectedDate ? (
                  <p className="text-gray-500 text-center py-8">Please select a date first</p>
                ) : availableSlots.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No available slots for this date</p>
                ) : (
                  <div className="space-y-4">
                    {morning.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">🌅</span>
                          <h4 className="text-sm font-semibold text-gray-700">Morning</h4>
                          <span className="text-xs text-gray-500">({morning.length})</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {morning.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedTime === slot ? 'bg-teal-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {afternoon.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">☀️</span>
                          <h4 className="text-sm font-semibold text-gray-700">Afternoon</h4>
                          <span className="text-xs text-gray-500">({afternoon.length})</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {afternoon.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedTime === slot ? 'bg-teal-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {evening.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">🌙</span>
                          <h4 className="text-sm font-semibold text-gray-700">Evening</h4>
                          <span className="text-xs text-gray-500">({evening.length})</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {evening.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedTime === slot ? 'bg-teal-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedDate && selectedTime && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-sm text-teal-800 font-medium">
                New appointment: {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}
              </p>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              Note: You can reschedule your appointment to any future date and time.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedDate || !selectedTime}
              className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Rescheduling...' : 'Reschedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
