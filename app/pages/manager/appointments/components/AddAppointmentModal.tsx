import { X, Calendar, Clock, User, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface AddAppointmentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    title: 'إضافة موعد جديد',
    patient: 'المريض',
    patientPlaceholder: 'البحث واختيار المريض...',
    doctor: 'الطبيب',
    selectDoctor: 'اختر الطبيب...',
    loadingDoctors: 'جاري تحميل الأطباء...',
    date: 'التاريخ',
    selectDoctorFirst: 'اختر الطبيب أولاً',
    loading: 'جاري التحميل...',
    selectDate: 'اختر التاريخ',
    time: 'الوقت',
    selectDateFirst: 'اختر التاريخ أولاً',
    selectTime: 'اختر الوقت',
    reasonForVisit: 'سبب الزيارة',
    reasonPlaceholder: 'مثال: فحص دوري، متابعة...',
    optionalNotes: 'ملاحظات اختيارية',
    notesPlaceholder: 'أضف أي ملاحظات إضافية...',
    cancel: 'إلغاء',
    creating: 'جاري الإنشاء...',
    createAppointment: 'إنشاء موعد',
    failedLoadDoctors: 'فشل تحميل الأطباء',
    failedLoadDates: 'فشل تحميل التواريخ المتاحة',
    failedLoadTimes: 'فشل تحميل الأوقات المتاحة',
    successMessage: 'تم إرسال طلب الموعد بنجاح',
    failedCreate: 'فشل إنشاء الموعد',
    errorOccurred: 'حدث خطأ'
  },
  en: {
    title: 'Add New Appointment',
    patient: 'Patient',
    patientPlaceholder: 'Search and select patient...',
    doctor: 'Doctor',
    selectDoctor: 'Select doctor...',
    loadingDoctors: 'Loading doctors...',
    date: 'Date',
    selectDoctorFirst: 'Select doctor first',
    loading: 'Loading...',
    selectDate: 'Select date',
    time: 'Time',
    selectDateFirst: 'Select date first',
    selectTime: 'Select time',
    reasonForVisit: 'Reason for Visit',
    reasonPlaceholder: 'e.g., Regular checkup, Follow-up...',
    optionalNotes: 'Optional Notes',
    notesPlaceholder: 'Add any additional notes...',
    cancel: 'Cancel',
    creating: 'Creating...',
    createAppointment: 'Create Appointment',
    failedLoadDoctors: 'Failed to load doctors',
    failedLoadDates: 'Failed to load available dates',
    failedLoadTimes: 'Failed to load available times',
    successMessage: 'Appointment request sent successfully',
    failedCreate: 'Failed to create appointment',
    errorOccurred: 'An error occurred'
  }
};

export const AddAppointmentModal = ({ onClose, onSuccess, language = 'ar' }: AddAppointmentModalProps) => {
  const t = translations[language];
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/doctors`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setDoctors(data.doctors || data);
        }
      } catch {
        toast.error(t.failedLoadDoctors);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, [t.failedLoadDoctors]);

  useEffect(() => {
    if (formData.doctorId) {
      const fetchAvailableDates = async () => {
        setLoadingSlots(true);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/doctors/${formData.doctorId}/available-dates`, {
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
      };
      fetchAvailableDates();
      setFormData(prev => ({ ...prev, date: '', time: '' }));
      setAvailableTimes([]);
    }
  }, [formData.doctorId, t.failedLoadDates]);

  useEffect(() => {
    if (formData.doctorId && formData.date) {
      const fetchAvailableTimes = async () => {
        setLoadingSlots(true);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/doctors/${formData.doctorId}/available-times?date=${formData.date}`, {
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
      };
      fetchAvailableTimes();
      setFormData(prev => ({ ...prev, time: '' }));
    }
  }, [formData.doctorId, formData.date, t.failedLoadTimes]);

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/appointments`, {
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
        toast.success(t.successMessage);
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || t.failedCreate);
      }
    } catch {
      toast.error(t.errorOccurred);
    } finally {
      setLoading(false);
    }
  };

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{t.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 mb-2">
              <User size={14} className="text-teal-400" />
              {t.patient}
            </label>
            <input
              type="text"
              required
              placeholder={t.patientPlaceholder}
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 mb-2">
              <User size={14} className="text-teal-400" />
              {t.doctor}
            </label>
            <select
              required
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              disabled={loadingDoctors}
            >
              <option value="">{loadingDoctors ? t.loadingDoctors : t.selectDoctor}</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {getName(doctor.name)}
                  {doctor.specialty ? ` - ${doctor.specialty}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 mb-2">
                <Calendar size={14} className="text-teal-400" />
                {t.date}
              </label>
              <select
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                disabled={!formData.doctorId || loadingSlots}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!formData.doctorId ? t.selectDoctorFirst : loadingSlots ? t.loading : t.selectDate}
                </option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 mb-2">
                <Clock size={14} className="text-teal-400" />
                {t.time}
              </label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                disabled={!formData.date || loadingSlots}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!formData.date ? t.selectDateFirst : loadingSlots ? t.loading : t.selectTime}
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
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300 mb-2">
              <FileText size={14} className="text-teal-400" />
              {t.reasonForVisit}
            </label>
            <input
              type="text"
              required
              placeholder={t.reasonPlaceholder}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              {t.optionalNotes}
            </label>
            <textarea
              rows={3}
              placeholder={t.notesPlaceholder}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 resize-none"
            />
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
              disabled={loading}
              className="w-full sm:flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? t.creating : t.createAppointment}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
