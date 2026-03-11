import { X, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface BlockTimeModalProps {
  onClose: () => void;
  onSuccess: () => void;
  language?: 'ar' | 'en';
}

interface Doctor {
  _id: string;
  name: string | { en: string; ar: string };
}

const translations = {
  ar: {
    title: 'حجز فترة زمنية',
    doctor: 'الطبيب',
    selectDoctor: 'اختر الطبيب',
    date: 'التاريخ',
    startTime: 'وقت البداية',
    endTime: 'وقت النهاية',
    reason: 'السبب',
    surgery: 'عملية جراحية',
    doctorBreak: 'استراحة الطبيب',
    meeting: 'اجتماع',
    emergency: 'طوارئ',
    training: 'تدريب',
    personalLeave: 'إجازة شخصية',
    other: 'أخرى',
    cancel: 'إلغاء',
    blocking: 'جاري الحجز...',
    blockTimeSlot: 'حجز الفترة الزمنية',
    failedLoadDoctors: 'فشل تحميل الأطباء',
    fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',
    successMessage: 'تم حجز الفترة الزمنية بنجاح',
    failedBlock: 'فشل حجز الفترة الزمنية',
    required: '*'
  },
  en: {
    title: 'Block Time Slot',
    doctor: 'Doctor',
    selectDoctor: 'Select Doctor',
    date: 'Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    reason: 'Reason',
    surgery: 'Surgery',
    doctorBreak: 'Doctor Break',
    meeting: 'Meeting',
    emergency: 'Emergency',
    training: 'Training',
    personalLeave: 'Personal Leave',
    other: 'Other',
    cancel: 'Cancel',
    blocking: 'Blocking...',
    blockTimeSlot: 'Block Time Slot',
    failedLoadDoctors: 'Failed to load doctors',
    fillAllFields: 'Please fill all required fields',
    successMessage: 'Time slot blocked successfully',
    failedBlock: 'Failed to block time slot',
    required: '*'
  }
};

export function BlockTimeModal({ onClose, onSuccess, language = 'ar' }: BlockTimeModalProps) {
  const t = translations[language];
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    startTime: '',
    endTime: '',
    reason: 'Meeting'
  });
  const [loading, setLoading] = useState(false);

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
        toast.error(t.failedLoadDoctors);
      }
    };
    fetchDoctors();
  }, [t.failedLoadDoctors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.date || !formData.startTime || !formData.endTime) {
      toast.error(t.fillAllFields);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/manager/blocked-slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(t.successMessage);
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || t.failedBlock);
      }
    } catch {
      toast.error(t.failedBlock);
    } finally {
      setLoading(false);
    }
  };

  const getName = (name: string | { en: string; ar: string }) =>
    typeof name === 'string' ? name : name[language];

  const reasons = [
    { value: 'Surgery', label: t.surgery },
    { value: 'Doctor Break', label: t.doctorBreak },
    { value: 'Meeting', label: t.meeting },
    { value: 'Emergency', label: t.emergency },
    { value: 'Training', label: t.training },
    { value: 'Personal Leave', label: t.personalLeave },
    { value: 'Other', label: t.other }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-md w-full max-h-[95vh] overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <Clock className="text-teal-400" size={20} />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{t.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t.doctor} {t.required}</label>
            <select
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              required
            >
              <option value="">{t.selectDoctor}</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {getName(doctor.name)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t.date} {t.required}</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t.startTime} {t.required}</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t.endTime} {t.required}</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t.reason} {t.required}</label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              required
            >
              {reasons.map((reason) => (
                <option key={reason.value} value={reason.value}>{reason.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 py-2 text-sm sm:text-base bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 px-4 py-2 text-sm sm:text-base bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors disabled:opacity-50"
            >
              {loading ? t.blocking : t.blockTimeSlot}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
