import { Clock } from 'lucide-react';
import { DoctorProfile, EditData, ClinicWorkingHours } from '../types';
import { getClinicDayData } from '../utils/scheduleHelpers';

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
  onUpdateTimeSlot
}: WorkingHoursProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          Working Hours
        </h3>
        {!editingSchedule ? (
          <button
            onClick={onEditSchedule}
            className="px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-semibold hover:bg-cyan-200 transition-all"
          >
            Edit Schedule
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onCancelSchedule}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onSaveSchedule}
              disabled={savingSchedule}
              className="px-3 py-1.5 bg-linear-to-r from-green-500 to-green-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {savingSchedule ? 'Saving...' : 'Save Schedule'}
            </button>
          </div>
        )}
      </div>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 font-semibold">{errorMessage}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 font-semibold">{successMessage}</p>
        </div>
      )}
      
      <div className="space-y-3">
        {daysOfWeek.map(day => {
          const clinicDay = getClinicDayData(day, clinicHours);
          const daySchedule = (editingSchedule ? editData.availability : profile.availability)?.find(a => a.day === day);
          const isClinicOpen = clinicDay?.isOpen === true;
          
          return (
            <div key={day} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900 capitalize">{day}</h4>
                  {isClinicOpen ? (
                    <p className="text-xs text-gray-500">Clinic: {clinicDay.openTime} - {clinicDay.closeTime}</p>
                  ) : (
                    <p className="text-xs text-red-500">Clinic Closed</p>
                  )}
                </div>
                {editingSchedule && isClinicOpen && !daySchedule && (
                  <button
                    onClick={() => onAddTimeSlot(day)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200"
                  >
                    + Add Slot
                  </button>
                )}
              </div>
              
              {daySchedule?.slots && daySchedule.slots.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {daySchedule.slots.map((slot, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-cyan-50 p-2 rounded-lg">
                      {editingSchedule ? (
                        <>
                          <input
                            type="time"
                            value={slot.from}
                            onChange={(e) => onUpdateTimeSlot(day, idx, 'from', e.target.value)}
                            min={clinicDay?.openTime}
                            max={clinicDay?.closeTime}
                            className="px-2 py-1 text-black border border-cyan-300 rounded text-sm"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="time"
                            value={slot.to}
                            onChange={(e) => onUpdateTimeSlot(day, idx, 'to', e.target.value)}
                            min={clinicDay?.openTime}
                            max={clinicDay?.closeTime}
                            className="px-2 py-1 text-black border border-cyan-300 rounded text-sm"
                          />
                          <button
                            onClick={() => onRemoveTimeSlot(day, idx)}
                            className="ml-auto px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-semibold hover:bg-red-200"
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <span className="text-sm font-semibold text-cyan-700">
                          {slot.from} - {slot.to}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic mt-2">No working hours set</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
