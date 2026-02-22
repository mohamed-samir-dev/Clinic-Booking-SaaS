import { DayAvailability, CalendarDay } from '../types';
import { FULL_DAY_NAMES } from '../constants';

export const generateTimeSlots = (
  selectedDate: Date | null,
  availability: DayAvailability[],
  consultationDuration: number
): string[] => {
  if (!selectedDate || !availability.length) return [];

  const dayName = FULL_DAY_NAMES[selectedDate.getDay()];
  const daySchedule = availability.find(a => a.day === dayName);

  if (!daySchedule || !daySchedule.slots?.length) return [];

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
      slots.push(`${String(displayHour).padStart(2, '0')}:${String(min).padStart(2, '0')} ${period}`);
      currentTime += consultationDuration;
    }
  });

  return slots;
};

export const categorizeTimeSlots = (slots: string[]) => {
  const morning = slots.filter(time => time.includes('AM') && !time.startsWith('12'));
  const afternoon = slots.filter(time => time.startsWith('12') && time.includes('PM') || (time.includes('PM') && ['01', '02', '03'].some(h => time.startsWith(h))));
  const evening = slots.filter(time => time.includes('PM') && ['04', '05', '06', '07', '08', '09', '10', '11'].some(h => time.startsWith(h)));

  return { morning, afternoon, evening };
};

export const getDaysInMonth = (date: Date, availability: DayAvailability[]): CalendarDay[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  maxDate.setHours(23, 59, 59, 999);
  
  const days: CalendarDay[] = [];
  
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isAvailable: false, isPast: true });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    date.setHours(0, 0, 0, 0);
    
    const isPast = date < today;
    const isTooFar = date > maxDate;
    const dayName = FULL_DAY_NAMES[date.getDay()];
    const isAvailable = availability.some(a => a.day === dayName && a.slots?.length > 0) && !isPast && !isTooFar;
    
    days.push({ day: i, isCurrentMonth: true, isAvailable, isPast: isPast || isTooFar });
  }
  
  return days;
};
