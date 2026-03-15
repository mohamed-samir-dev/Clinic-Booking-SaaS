import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface BlockTimeModalProps {
  onClose: () => void;
  onSuccess: () => void;
  language?: 'ar' | 'en';
}

interface Doctor {
  _id: string;
  name: string | { en: string; ar: string };
}

export function BlockTimeModal({ onClose, onSuccess, language = 'en' }: BlockTimeModalProps) {
  const t = useTranslations('manager.schedule.blockModal');
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
    fetchDoctors();
  }, []);

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
      toast.error('Failed to load doctors');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.date || !formData.startTime || !formData.endTime) {
      toast.error(t('fillAllFields'));
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/blocked-slots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(t('success'));
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.message || t('failed'));
      }
    } catch {
      toast.error(t('failed'));
    } finally {
      setLoading(false);
    }
  };

  const getName = (name: string | { en: string; ar: string }) =>
    typeof name === 'string' ? name : name[language];

  const reasons = [
    { value: 'Surgery', label: t('reasons.surgery') },
    { value: 'Doctor Break', label: t('reasons.doctorBreak') },
    { value: 'Meeting', label: t('reasons.meeting') },
    { value: 'Emergency', label: t('reasons.emergency') },
    { value: 'Training', label: t('reasons.training') },
    { value: 'Personal Leave', label: t('reasons.personalLeave') },
    { value: 'Other', label: t('reasons.other') }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{t('title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t('doctor')} *</label>
            <select
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-teal-500"
              required
            >
              <option value="">{t('selectDoctor')}</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {getName(doctor.name)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t('date')} *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t('startTime')} *</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-2 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t('endTime')} *</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-2 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-teal-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs sm:text-sm mb-2">{t('reason')} *</label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-teal-500"
              required
            >
              {reasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors text-sm sm:text-base"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? t('blocking') : t('block')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
