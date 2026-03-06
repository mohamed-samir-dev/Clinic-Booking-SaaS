import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Doctor } from '../page';
import toast from 'react-hot-toast';

interface ScheduleModalProps {
  doctor: Doctor;
  onClose: () => void;
  onSuccess: () => void;
}

interface ScheduleSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export const ScheduleModal = ({ doctor, onClose, onSuccess }: ScheduleModalProps) => {
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
        toast.success('Schedule updated successfully');
        onSuccess();
        onClose();
      } else {
        toast.error('Failed to update schedule');
      }
    } catch {
      toast.error('Failed to update schedule');
    }
  };

  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Schedule</h2>
            <p className="text-gray-400 mt-1">{getName(doctor.name)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {schedule.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No schedule set. Click &rdquo;Add Time Slot&rdquo; to create one.
              </div>
            ) : (
              schedule.map((slot, index) => (
                <div key={index} className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Day</label>
                      <select
                        value={slot.day}
                        onChange={(e) => updateSlot(index, 'day', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      >
                        {daysOfWeek.map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Start Time</label>
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateSlot(index, 'startTime', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">End Time</label>
                      <div className="flex gap-2">
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => updateSlot(index, 'endTime', e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500"
                        />
                        <button
                          onClick={() => removeSlot(index)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          title="Remove"
                        >
                          <Trash2 size={20} className="text-white" />
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
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors"
          >
            <Plus size={20} />
            <span>Add Time Slot</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-colors"
          >
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
