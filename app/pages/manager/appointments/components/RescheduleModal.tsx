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
}

export const RescheduleModal = ({ appointmentId, doctorId, currentDate, currentTime, onClose, onSuccess }: RescheduleModalProps) => {
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
      const response = await fetch(`http://localhost:5000/api/manager/doctors/${doctorId}/available-dates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableDates(data.dates || []);
      }
    } catch {
      toast.error('Failed to load available dates');
    } finally {
      setLoadingSlots(false);
    }
  }, [doctorId]);

  const fetchAvailableTimes = useCallback(async () => {
    setLoadingSlots(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/manager/doctors/${doctorId}/available-times?date=${newDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableTimes(data.times || []);
      }
    } catch {
      toast.error('Failed to load available times');
    } finally {
      setLoadingSlots(false);
    }
  }, [doctorId, newDate]);

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

      const response = await fetch(`http://localhost:5000/api/manager/appointments/${appointmentId}/reschedule`, {
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
        toast.success('Appointment rescheduled successfully');
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to reschedule');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-md w-full">
        <div className="border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Reschedule Appointment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-gray-750 rounded-lg p-4 border border-gray-600">
            <p className="text-sm text-gray-400 mb-1">Current Appointment</p>
            <p className="text-white font-medium">
              {new Date(currentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {currentTime}
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Calendar size={16} className="text-teal-400" />
              New Date
            </label>
            <select
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              disabled={loadingSlots}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 disabled:opacity-50"
            >
              <option value="">{loadingSlots ? 'Loading...' : 'Select new date'}</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Clock size={16} className="text-teal-400" />
              New Time
            </label>
            <select
              required
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              disabled={!newDate || loadingSlots}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 disabled:opacity-50"
            >
              <option value="">{!newDate ? 'Select date first' : loadingSlots ? 'Loading...' : 'Select new time'}</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !newDate || !newTime}
              className="flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Rescheduling...' : 'Reschedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
