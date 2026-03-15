import { X, Calendar, Clock } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

interface RescheduleModalProps {
  appointmentId: string;
  doctorId: string;
  currentDate: string;
  currentTime: string;
  onClose: () => void;
  onSuccess: () => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    title: 'إعادة جدولة الموعد',
    currentAppointment: 'الموعد الحالي',
    at: 'في',
    newDate: 'التاريخ الجديد',
    loading: 'جاري التحميل...',
    selectNewDate: 'اختر التاريخ الجديد',
    newTime: 'الوقت الجديد',
    selectDateFirst: 'اختر التاريخ أولاً',
    selectNewTime: 'اختر الوقت الجديد',
    cancel: 'إلغاء',
    rescheduling: 'جاري إعادة الجدولة...',
    reschedule: 'إعادة الجدولة',
    failedLoadDates: 'فشل تحميل التواريخ المتاحة',
    failedLoadTimes: 'فشل تحميل الأوقات المتاحة',
    successMessage: 'تم إعادة جدولة الموعد بنجاح',
    failedReschedule: 'فشل إعادة الجدولة',
    errorOccurred: 'حدث خطأ'
  },
  en: {
    title: 'Reschedule Appointment',
    currentAppointment: 'Current Appointment',
    at: 'at',
    newDate: 'New Date',
    loading: 'Loading...',
    selectNewDate: 'Select new date',
    newTime: 'New Time',
    selectDateFirst: 'Select date first',
    selectNewTime: 'Select new time',
    cancel: 'Cancel',
    rescheduling: 'Rescheduling...',
    reschedule: 'Reschedule',
    failedLoadDates: 'Failed to load available dates',
    failedLoadTimes: 'Failed to load available times',
    successMessage: 'Appointment rescheduled successfully',
    failedReschedule: 'Failed to reschedule',
    errorOccurred: 'An error occurred'
  }
};

export const RescheduleModal = ({ appointmentId, doctorId, currentDate, currentTime, onClose, onSuccess, language = 'ar' }: RescheduleModalProps) => {
  const t = translations[language];
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const fetchAvailableDates = useCallback(async () => {
    setLoadingSlots(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/doctors/${doctorId}/available-dates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableDates(data.dates || []);
      }
    } catch {
      toast.error(t.failedLoadDates);
    } finally {
      setLoadingSlots(false);
    }
  }, [doctorId, t.failedLoadDates]);

  const fetchAvailableTimes = useCallback(async () => {
    setLoadingSlots(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/doctors/${doctorId}/available-times?date=${newDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableTimes(data.times || []);
      }
    } catch {
      toast.error(t.failedLoadTimes);
    } finally {
      setLoadingSlots(false);
    }
  }, [doctorId, newDate, t.failedLoadTimes]);

  useEffect(() => {
    fetchAvailableDates();
  }, [fetchAvailableDates]);

  useEffect(() => {
    if (newDate) {
      fetchAvailableTimes();
    }
  }, [newDate, fetchAvailableTimes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const convertTo24Hour = (time12h: string) => {
        const [time, modifier] = time12h.split(' ');
        const timeParts = time.split(':');
        let hours = timeParts[0];
        const minutes = timeParts[1];
        if (hours === '12') {
          hours = modifier === 'AM' ? '00' : '12';
        } else if (modifier === 'PM') {
          hours = String(parseInt(hours, 10) + 12);
        }
        return `${hours}:${minutes}`;
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/appointments/${appointmentId}/reschedule`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          appointmentDate: newDate,
          startTime: convertTo24Hour(newTime)
        })
      });

      if (response.ok) {
        toast.success(t.successMessage);
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || t.failedReschedule);
      }
    } catch {
      toast.error(t.errorOccurred);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-700 max-w-md w-full max-h-[95vh] overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white">{t.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="bg-gray-750 rounded-lg p-3 sm:p-4 border border-gray-600">
            <p className="text-xs sm:text-sm text-gray-400 mb-1">{t.currentAppointment}</p>
            <p className="text-sm sm:text-base text-white font-medium">
              {new Date(currentDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })} {t.at} {currentTime}
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 mb-2">
              <Calendar size={14} className="text-teal-400" />
              {t.newDate}
            </label>
            <select
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              disabled={loadingSlots}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 disabled:opacity-50"
            >
              <option value="">{loadingSlots ? t.loading : t.selectNewDate}</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 mb-2">
              <Clock size={14} className="text-teal-400" />
              {t.newTime}
            </label>
            <select
              required
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              disabled={!newDate || loadingSlots}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 disabled:opacity-50"
            >
              <option value="">{!newDate ? t.selectDateFirst : loadingSlots ? t.loading : t.selectNewTime}</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={loading || !newDate || !newTime}
              className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? t.rescheduling : t.reschedule}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
