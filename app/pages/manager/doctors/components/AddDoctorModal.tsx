import { useState, useEffect, useCallback } from 'react';
import { X, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddDoctorModalProps {
  onClose: () => void;
  onSuccess: () => void;
  language?: 'ar' | 'en';
}

interface AvailableDoctor {
  _id: string;
  name: string | { en: string; ar: string };
  specialty: string;
  experience: number;
  email: string;
}

const translations = {
  ar: {
    title: 'إضافة طبيب إلى العيادة',
    subtitle: 'اختر طبيبًا موجودًا من النظام لإرسال طلب نقل',
    searchPlaceholder: 'البحث عن الأطباء...',
    messageLabel: 'رسالة إلى الطبيب *',
    messagePlaceholder: 'اكتب رسالتك إلى الطبيب لتوضيح سبب رغبتك في انضمامه إلى عيادتك...',
    characters: 'حرف',
    loading: 'جاري تحميل الأطباء...',
    noDoctors: 'لم يتم العثور على أطباء متاحين',
    yearsExperience: 'سنوات خبرة',
    cancel: 'إلغاء',
    sendRequest: 'إرسال الطلب',
    selectDoctor: 'يرجى اختيار طبيب',
    writeMessage: 'يرجى كتابة رسالة إلى الطبيب',
    requestSent: 'تم إرسال طلب النقل بنجاح',
    requestFailed: 'فشل إرسال طلب النقل',
    loadFailed: 'فشل تحميل الأطباء المتاحين'
  },
  en: {
    title: 'Add Doctor to Clinic',
    subtitle: 'Select an existing doctor from the system to send a transfer request',
    searchPlaceholder: 'Search doctors...',
    messageLabel: 'Message to Doctor *',
    messagePlaceholder: 'Write your message to the doctor explaining why you want them to join your clinic...',
    characters: 'characters',
    loading: 'Loading doctors...',
    noDoctors: 'No available doctors found',
    yearsExperience: 'years experience',
    cancel: 'Cancel',
    sendRequest: 'Send Request',
    selectDoctor: 'Please select a doctor',
    writeMessage: 'Please write a message to the doctor',
    requestSent: 'Transfer request sent successfully',
    requestFailed: 'Failed to send transfer request',
    loadFailed: 'Failed to load available doctors'
  }
};

export const AddDoctorModal = ({ onClose, onSuccess, language = 'en' }: AddDoctorModalProps) => {
  const t = translations[language];
  const [availableDoctors, setAvailableDoctors] = useState<AvailableDoctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [message, setMessage] = useState('');

  const fetchAvailableDoctors = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/doctors/available`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableDoctors(data);
      }
    } catch {
      toast.error(t.loadFailed);
    } finally {
      setLoading(false);
    }
  }, [t.loadFailed]);

  useEffect(() => {
    fetchAvailableDoctors();
  }, [fetchAvailableDoctors]);

  const handleAssign = async () => {
    if (!selectedDoctor) {
      toast.error(t.selectDoctor);
      return;
    }

    if (!message.trim()) {
      toast.error(t.writeMessage);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/transfer-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId: selectedDoctor, message }),
      });

      if (response.ok) {
        toast.success(t.requestSent);
        onSuccess();
        onClose();
      } else {
        toast.error(t.requestFailed);
      }
    } catch {
      toast.error(t.requestFailed);
    }
  };

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  const filteredDoctors = availableDoctors.filter(doc =>
    getName(doc.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{t.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors shrink-0"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <p className="text-sm sm:text-base text-gray-400 mb-4">
            {t.subtitle}
          </p>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Message Textarea */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              {t.messageLabel}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.messagePlaceholder}
              rows={4}
              maxLength={1000}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 resize-none"
            />
            <p className="text-gray-500 text-xs mt-1">{message.length}/1000 {t.characters}</p>
          </div>

          {/* Doctors List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
              <p className="text-gray-400 mt-4 text-sm">{t.loading}</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              {t.noDoctors}
            </div>
          ) : (
            <div className="space-y-2 max-h-64 sm:max-h-96 overflow-y-auto">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  onClick={() => setSelectedDoctor(doctor._id)}
                  className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedDoctor === doctor._id
                      ? 'bg-teal-500/20 border-teal-500'
                      : 'bg-gray-750 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white font-semibold text-sm sm:text-base truncate">{getName(doctor.name)}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm truncate">{doctor.specialty}</p>
                      <p className="text-gray-500 text-xs mt-1">{doctor.experience} {t.yearsExperience}</p>
                    </div>
                    {selectedDoctor === doctor._id && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-teal-500 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm sm:text-base transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDoctor || !message.trim()}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.sendRequest}
          </button>
        </div>
      </div>
    </div>
  );
};
