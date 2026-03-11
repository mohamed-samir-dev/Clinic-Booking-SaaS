import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Doctor } from '../page';
import toast from 'react-hot-toast';

interface ScheduleModalProps {
  doctor: Doctor;
  onClose: () => void;
  onSuccess: () => void;
  language?: 'ar' | 'en';
}

interface ScheduleSlot {
  day: string;
  startTime: string;
  endTime: string;
}

const translations = {
  ar: {
    title: 'تعديل الجدول',
    noSchedule: 'لم يتم تعيين جدول. انقر على "إضافة فترة زمنية" لإنشاء واحدة.',
    day: 'اليوم',
    startTime: 'وقت البداية',
    endTime: 'وقت النهاية',
    remove: 'حذف',
    addTimeSlot: 'إضافة فترة زمنية',
    cancel: 'إلغاء',
    saveSchedule: 'حفظ الجدول',
    updateSuccess: 'تم تحديث الجدول بنجاح',
    updateFailed: 'فشل تحديث الجدول'
  },
  en: {
    title: 'Edit Schedule',
    noSchedule: 'No schedule set. Click "Add Time Slot" to create one.',
    day: 'Day',
    startTime: 'Start Time',
    endTime: 'End Time',
    remove: 'Remove',
    addTimeSlot: 'Add Time Slot',
    cancel: 'Cancel',
    saveSchedule: 'Save Schedule',
    updateSuccess: 'Schedule updated successfully',
    updateFailed: 'Failed to update schedule'
  }
};

const daysTranslations = {
  ar: {
    Sunday: 'الأحد',
    Monday: 'الإثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت'
  },
  en: {
    Sunday: 'Sunday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday'
  }
};

export const ScheduleModal = ({ doctor, onClose, onSuccess, language = 'en' }: ScheduleModalProps) => {
  const t = translations[language];
  const days = daysTranslations[language];
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(
    doctor.schedule || []
  );

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const addSlot = () => {
    setSchedule([...schedule, { day: 'Sunday', startTime: '09:00', endTime: '17:00' }]);
  };

  const removeSlot = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const updateSlot = (index: number, field: keyof ScheduleSlot, value: string) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setSchedule(newSchedule);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/manager/doctors/${doctor._id}/schedule`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ schedule }),
      });

      if (response.ok) {
        toast.success(t.updateSuccess);
        onSuccess();
        onClose();
      } else {
        toast.error(t.updateFailed);
      }
    } catch {
      toast.error(t.updateFailed);
    }
  };

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-700 gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{t.title}</h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1 truncate">{getName(doctor.name)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors shrink-0"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {schedule.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm sm:text-base">
                {t.noSchedule}
              </div>
            ) : (
              schedule.map((slot, index) => (
                <div key={index} className="bg-gray-750 rounded-lg p-3 sm:p-4 border border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-400 mb-2">{t.day}</label>
                      <select
                        value={slot.day}
                        onChange={(e) => updateSlot(index, 'day', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      >
                        {daysOfWeek.map((day) => (
                          <option key={day} value={day}>{days[day as keyof typeof days]}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm text-gray-400 mb-2">{t.startTime}</label>
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateSlot(index, 'startTime', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="block text-xs sm:text-sm text-gray-400 mb-2">{t.endTime}</label>
                      <div className="flex gap-2">
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => updateSlot(index, 'endTime', e.target.value)}
                          className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                        />
                        <button
                          onClick={() => removeSlot(index)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors shrink-0"
                          title={t.remove}
                        >
                          <Trash2 size={18} className="text-white sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={addSlot}
            className="mt-4 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white text-sm sm:text-base transition-colors"
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            <span>{t.addTimeSlot}</span>
          </button>
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
            onClick={handleSave}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white text-sm sm:text-base transition-colors"
          >
            {t.saveSchedule}
          </button>
        </div>
      </div>
    </div>
  );
};
