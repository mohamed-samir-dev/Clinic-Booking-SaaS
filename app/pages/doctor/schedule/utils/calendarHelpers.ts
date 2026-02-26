import { Appointment } from '../types';
import translations from '@/messages/translations';

export const getMonthNames = (locale: 'en' | 'ar') => {
  const t = translations[locale].doctor.schedule.months;
  return [
    t.january, t.february, t.march, t.april, t.may, t.june,
    t.july, t.august, t.september, t.october, t.november, t.december
  ];
};

export const getDayNames = (locale: 'en' | 'ar') => {
  const t = translations[locale].doctor.schedule.days;
  return [t.sun, t.mon, t.tue, t.wed, t.thu, t.fri, t.sat];
};

// Keep for backward compatibility
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getDaysInMonth = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days: (Date | null)[] = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  return days;
};

export const getAppointmentsForDate = (date: Date | null, appointments: Appointment[]) => {
  if (!date) return [];
  return appointments.filter(apt => {
    const aptDate = new Date(apt.appointmentDate);
    return aptDate.toDateString() === date.toDateString();
  });
};

export const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    confirmed: 'bg-teal-100 text-teal-700 border-teal-300',
    completed: 'bg-gray-100 text-gray-700 border-gray-300',
    cancelled: 'bg-red-100 text-red-700 border-red-300'
  };
  return colors[status as keyof typeof colors] || colors.pending;
};
