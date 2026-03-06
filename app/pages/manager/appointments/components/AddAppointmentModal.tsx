import { X, Calendar, Clock, User, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface AddAppointmentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddAppointmentModal = ({ onClose, onSuccess }: AddAppointmentModalProps) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<Array<{ _id: string; name: { en: string; ar: string }; specialty?: string; consultationDuration?: number }>>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/manager/doctors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setDoctors(data.doctors || data);
        }
      } catch {
        toast.error('Failed to load doctors');
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (formData.doctorId) {
      const fetchAvailableDates = async () => {
        setLoadingSlots(true);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:5000/api/manager/doctors/${formData.doctorId}/available-dates`, {
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
      };
      fetchAvailableDates();
      setFormData(prev => ({ ...prev, date: '', time: '' }));
      setAvailableTimes([]);
    }
  }, [formData.doctorId]);

  useEffect(() => {
    if (formData.doctorId && formData.date) {
      const fetchAvailableTimes = async () => {
        setLoadingSlots(true);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:5000/api/manager/doctors/${formData.doctorId}/available-times?date=${formData.date}`, {
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
      };
      fetchAvailableTimes();
      setFormData(prev => ({ ...prev, time: '' }));
    }
  }, [formData.doctorId, formData.date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Convert 12-hour time to 24-hour format
      const convertTo24Hour = (time12h: string) => {
        const [time, modifier] = time12h.split(' ');
        let [hours] = time.split(':');
        const minutes = time.split(':')[1];
        if (hours === '12') {
          hours = modifier === 'AM' ? '00' : '12';
        } else if (modifier === 'PM') {
          hours = String(parseInt(hours, 10) + 12);
        }
        return `${hours}:${minutes}`;
      };

      const startTime = convertTo24Hour(formData.time);
      const doctor = doctors.find(d => d._id === formData.doctorId);
      const duration = doctor?.consultationDuration || 20;
      
      // Calculate end time
      const [startHour, startMin] = startTime.split(':').map(Number);
      const endMinutes = startHour * 60 + startMin + duration;
      const endHour = Math.floor(endMinutes / 60);
      const endMin = endMinutes % 60;
      const endTime = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

      const response = await fetch('http://localhost:5000/api/manager/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          doctorId: formData.doctorId,
          appointmentDate: formData.date,
          startTime,
          endTime,
          reason: formData.reason,
          service: formData.reason,
          type: 'consultation',
          patientData: {
            fullName: formData.patientId,
            phone: '',
            email: ''
          }
        })
      });

      if (response.ok) {
        toast.success('Appointment request sent successfully');
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to create appointment');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add New Appointment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <X className="text-gray-400" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <User size={16} className="text-teal-400" />
              Patient
            </label>
            <input
              type="text"
              required
              placeholder="Search and select patient..."
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <User size={16} className="text-teal-400" />
              Doctor
            </label>
            <select
              required
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              disabled={loadingDoctors}
            >
              <option value="">{loadingDoctors ? 'Loading doctors...' : 'Select doctor...'}</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {typeof doctor.name === 'string' ? doctor.name : doctor.name.en}
                  {doctor.specialty ? ` - ${doctor.specialty}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Calendar size={16} className="text-teal-400" />
                Date
              </label>
              <select
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                disabled={!formData.doctorId || loadingSlots}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!formData.doctorId ? 'Select doctor first' : loadingSlots ? 'Loading...' : 'Select date'}
                </option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Clock size={16} className="text-teal-400" />
                Time
              </label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                disabled={!formData.date || loadingSlots}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!formData.date ? 'Select date first' : loadingSlots ? 'Loading...' : 'Select time'}
                </option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <FileText size={16} className="text-teal-400" />
              Reason for Visit
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Regular checkup, Follow-up..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Optional Notes
            </label>
            <textarea
              rows={3}
              placeholder="Add any additional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 resize-none"
            />
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
              disabled={loading}
              className="flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
