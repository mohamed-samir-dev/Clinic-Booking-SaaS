import { useState, useEffect, useCallback } from 'react';
import { Clock, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface Doctor {
  _id: string;
  name: string | { en: string; ar: string };
  schedule?: Array<{ day: string; startTime: string; endTime: string }>;
}

interface WorkingHoursPanelProps {
  language?: 'ar' | 'en';
}

export function WorkingHoursPanel({ language = 'en' }: WorkingHoursPanelProps) {
  const t = useTranslations('manager.schedule.workingHours');
  const tDays = useTranslations('manager.schedule.days');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editingDoctor, setEditingDoctor] = useState<string | null>(null);
  const [editSchedule, setEditSchedule] = useState<Array<{ day: string; startTime: string; endTime: string }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/manager/doctors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Transform doctors data to include schedule from availability
        const transformedDoctors = (data.doctors || []).map((doc: Doctor) => ({
          _id: doc._id,
          name: doc.name,
          schedule: doc.schedule || []
        }));
        setDoctors(transformedDoctors);
      }
    } catch {
      toast.error(t('failedToLoad'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor._id);
    setEditSchedule(doctor.schedule || []);
  };

  const handleSave = async (doctorId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/manager/doctors/${doctorId}/schedule`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ schedule: editSchedule })
      });

      if (response.ok) {
        toast.success(t('updated'));
        setEditingDoctor(null);
        fetchDoctors();
      }
    } catch {
      toast.error(t('failedToUpdate'));
    }
  };

  const handleCancel = () => {
    setEditingDoctor(null);
    setEditSchedule([]);
  };

  const updateScheduleTime = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setEditSchedule(prev => {
      const existing = prev.find(s => s.day === day);
      if (existing) {
        return prev.map(s => s.day === day ? { ...s, [field]: value } : s);
      } else {
        return [...prev, { day, startTime: field === 'startTime' ? value : '09:00', endTime: field === 'endTime' ? value : '17:00' }];
      }
    });
  };

  const getName = (name: string | { en: string; ar: string }) =>
    typeof name === 'string' ? name : name[language];

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const getDayName = (day: string) => {
    const dayMap: { [key: string]: string } = {
      'Sunday': tDays('sunday'),
      'Monday': tDays('monday'),
      'Tuesday': tDays('tuesday'),
      'Wednesday': tDays('wednesday'),
      'Thursday': tDays('thursday'),
      'Friday': tDays('friday'),
      'Saturday': tDays('saturday')
    };
    return dayMap[day] || day;
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Clock className="text-teal-400" size={20} />
        <h3 className="text-lg sm:text-xl font-bold text-white">{t('title')}</h3>
      </div>

      <div className="space-y-4 sm:space-y-6 max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto">
        {doctors.map((doctor) => {
          const isEditing = editingDoctor === doctor._id;
          const schedule = isEditing ? editSchedule : (doctor.schedule || []);

          return (
            <div key={doctor._id} className="bg-gray-700/30 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h4 className="text-white font-semibold text-sm sm:text-base truncate pr-2">{getName(doctor.name)}</h4>
                {!isEditing ? (
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors shrink-0"
                  >
                    <Edit2 className="text-gray-400" size={16} />
                  </button>
                ) : (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleSave(doctor._id)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Save className="text-green-400" size={16} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="text-red-400" size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {weekDays.map((day) => {
                  const daySchedule = schedule.find(s => s.day === day);
                  
                  return (
                    <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-1 sm:gap-0">
                      <span className="text-gray-400 w-full sm:w-20 md:w-24">{getDayName(day)}</span>
                      {isEditing ? (
                        <div className="flex gap-1 sm:gap-2 items-center">
                          <input
                            type="time"
                            value={daySchedule?.startTime || ''}
                            onChange={(e) => updateScheduleTime(day, 'startTime', e.target.value)}
                            className="flex-1 sm:flex-none px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs focus:outline-none focus:border-teal-500"
                          />
                          <span className="text-gray-400">→</span>
                          <input
                            type="time"
                            value={daySchedule?.endTime || ''}
                            onChange={(e) => updateScheduleTime(day, 'endTime', e.target.value)}
                            className="flex-1 sm:flex-none px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      ) : daySchedule ? (
                        <span className="text-white">
                          {daySchedule.startTime} → {daySchedule.endTime}
                        </span>
                      ) : (
                        <span className="text-gray-500">{t('off')}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
