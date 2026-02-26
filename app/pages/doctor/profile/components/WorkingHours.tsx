import { Clock } from 'lucide-react';
import { DoctorProfile, EditData, ClinicWorkingHours } from '../types';
import { getClinicDayData } from '../utils/scheduleHelpers';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface WorkingHoursProps {
  profile: DoctorProfile;
  editData: EditData;
  clinicHours: ClinicWorkingHours;
  editingSchedule: boolean;
  savingSchedule: boolean;
  errorMessage: string;
  successMessage: string;
  onEditSchedule: () => void;
  onCancelSchedule: () => void;
  onSaveSchedule: () => void;
  onAddTimeSlot: (day: string) => void;
  onRemoveTimeSlot: (day: string, index: number) => void;
  onUpdateTimeSlot: (day: string, index: number, field: 'from' | 'to', value: string) => void;
  theme: 'light' | 'dark';
}

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const WorkingHours = ({
  profile,
  editData,
  clinicHours,
  editingSchedule,
  savingSchedule,
  errorMessage,
  successMessage,
  onEditSchedule,
  onCancelSchedule,
  onSaveSchedule,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onUpdateTimeSlot,
  theme
}: WorkingHoursProps) => {
  const { locale } = useLanguage();
  const t = translations[locale].doctor.profile;
  
  return (
    <div className={`rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6 lg:p-8 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-5 lg:mb-6 gap-3">
        <h3 className={`text-base sm:text-lg lg:text-xl font-bold flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          {t.workingHours}
        </h3>
        {!editingSchedule ? (
          <button
            onClick={onEditSchedule}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-100 text-cyan-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-cyan-200 transition-all w-full sm:w-auto"
          >
            {t.editSchedule}
          </button>
        ) : (
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onCancelSchedule}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-300 transition-all"
            >
              {t.cancel}
            </button>
            <button
              onClick={onSaveSchedule}
              disabled={savingSchedule}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {savingSchedule ? `${t.loading}` : t.save}
            </button>
          </div>
        )}
      </div>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs sm:text-sm text-red-700 font-semibold">{errorMessage}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs sm:text-sm text-green-700 font-semibold">{successMessage}</p>
        </div>
      )}
      
      <div className="space-y-2.5 sm:space-y-3">
        {daysOfWeek.map(day => {
          const clinicDay = getClinicDayData(day, clinicHours);
          const daySchedule = (editingSchedule ? editData.availability : profile.availability)?.find(a => a.day === day);
          const isClinicOpen = clinicDay?.isOpen === true;
          
          return (
            <div key={day} className={`border rounded-xl p-3 sm:p-4 ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                <div className="flex-1">
                  <h4 className={`font-bold capitalize text-sm sm:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{t.days[day as keyof typeof t.days]}</h4>
                  {isClinicOpen ? (
                    <p className="text-xs sm:text-sm text-gray-500">{t.clinicHours}: {clinicDay.openTime} - {clinicDay.closeTime}</p>
                  ) : (
                    <p className="text-xs sm:text-sm text-red-500">{t.closed}</p>
                  )}
                </div>
                {editingSchedule && isClinicOpen && !daySchedule && (
                  <button
                    onClick={() => onAddTimeSlot(day)}
                    className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-green-200 w-full sm:w-auto"
                  >
                    + {t.addTimeSlot}
                  </button>
                )}
              </div>
              
              {daySchedule?.slots && daySchedule.slots.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {daySchedule.slots.map((slot, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-cyan-50 p-2 sm:p-2.5 rounded-lg">
                      {editingSchedule ? (
                        <>
                          <input
                            type="time"
                            value={slot.from}
                            onChange={(e) => onUpdateTimeSlot(day, idx, 'from', e.target.value)}
                            min={clinicDay?.openTime}
                            max={clinicDay?.closeTime}
                            className="flex-1 px-2 py-1.5 text-black border border-cyan-300 rounded text-xs sm:text-sm"
                          />
                          <span className="text-gray-500 text-center sm:text-left text-sm">-</span>
                          <input
                            type="time"
                            value={slot.to}
                            onChange={(e) => onUpdateTimeSlot(day, idx, 'to', e.target.value)}
                            min={clinicDay?.openTime}
                            max={clinicDay?.closeTime}
                            className="flex-1 px-2 py-1.5 text-black border border-cyan-300 rounded text-xs sm:text-sm"
                          />
                          <button
                            onClick={() => onRemoveTimeSlot(day, idx)}
                            className="px-2 py-1.5 bg-red-100 text-red-600 rounded text-xs sm:text-sm font-semibold hover:bg-red-200 w-full sm:w-auto sm:ml-auto"
                          >
                            {t.remove}
                          </button>
                        </>
                      ) : (
                        <span className="text-xs sm:text-sm font-semibold text-cyan-700">
                          {slot.from} - {slot.to}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-400 italic mt-2">{t.noWorkingHoursSet}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
