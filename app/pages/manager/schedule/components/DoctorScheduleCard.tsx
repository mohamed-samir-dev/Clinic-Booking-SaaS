import { useState } from 'react';
import { Clock, Calendar, Edit, Save, X } from 'lucide-react';

interface DoctorSchedule {
  _id: string;
  doctorName: string | { en: string; ar: string };
  specialty: string | { en: string; ar: string };
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  slotDuration: number;
}

interface DoctorScheduleCardProps {
  schedule: DoctorSchedule;
  onUpdate: (doctorId: string, data: Partial<DoctorSchedule>) => void;
}

export const DoctorScheduleCard = ({ schedule, onUpdate }: DoctorScheduleCardProps) => {
  const getText = (text: string | { en: string; ar: string }) => 
    typeof text === 'string' ? text : text.en;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(schedule);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSave = () => {
    onUpdate(schedule._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(schedule);
    setIsEditing(false);
  };

  const toggleDay = (day: string) => {
    const newDays = editData.workingDays.includes(day)
      ? editData.workingDays.filter((d: string) => d !== day)
      : [...editData.workingDays, day];
    setEditData({ ...editData, workingDays: newDays });
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{getText(schedule.doctorName)}</h3>
          <p className="text-teal-400 text-sm">{getText(schedule.specialty)}</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
          >
            <Edit size={16} className="text-white" />
            <span className="text-white text-sm">Edit</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Save size={16} className="text-white" />
              <span className="text-white text-sm">Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <X size={16} className="text-white" />
              <span className="text-white text-sm">Cancel</span>
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">Working Days</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    editData.workingDays.includes(day)
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Start Time</label>
              <input
                type="time"
                value={editData.workingHours.start}
                onChange={(e) => setEditData({
                  ...editData,
                  workingHours: { ...editData.workingHours, start: e.target.value }
                })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">End Time</label>
              <input
                type="time"
                value={editData.workingHours.end}
                onChange={(e) => setEditData({
                  ...editData,
                  workingHours: { ...editData.workingHours, end: e.target.value }
                })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Slot Duration (min)</label>
              <input
                type="number"
                value={editData.slotDuration}
                onChange={(e) => setEditData({ ...editData, slotDuration: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Working Days</p>
              <p className="text-white">{schedule.workingDays.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Working Hours</p>
              <p className="text-white">{schedule.workingHours.start} - {schedule.workingHours.end}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-400">Slot Duration</p>
              <p className="text-white">{schedule.slotDuration} minutes</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
