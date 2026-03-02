import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function WorkingHours({ formData, setFormData }: Props) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">5</span>
        Working Hours
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((day) => (
          <div key={day} className="p-4 bg-gray-800 rounded-lg border border-gray-600 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-300">{day}</span>
              <input
                type="checkbox"
                checked={formData.workingHours[day]?.isOpen || false}
                onChange={(e) => {
                  const newHours = { ...formData.workingHours };
                  if (e.target.checked) {
                    newHours[day] = { isOpen: true, openTime: '09:00', closeTime: '17:00' };
                  } else {
                    newHours[day] = { isOpen: false, openTime: '', closeTime: '' };
                  }
                  setFormData({ ...formData, workingHours: newHours });
                }}
                className="w-4 h-4 text-teal-600 border-gray-600 rounded focus:ring-teal-500"
              />
            </div>
            {formData.workingHours[day]?.isOpen && (
              <div className="space-y-2">
                <input
                  type="time"
                  value={formData.workingHours[day]?.openTime || ''}
                  onChange={(e) => {
                    const newHours = { ...formData.workingHours };
                    newHours[day] = { ...newHours[day], openTime: e.target.value };
                    setFormData({ ...formData, workingHours: newHours });
                  }}
                  className="w-full px-2 py-1 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-xs text-white font-medium"
                />
                <input
                  type="time"
                  value={formData.workingHours[day]?.closeTime || ''}
                  onChange={(e) => {
                    const newHours = { ...formData.workingHours };
                    newHours[day] = { ...newHours[day], closeTime: e.target.value };
                    setFormData({ ...formData, workingHours: newHours });
                  }}
                  className="w-full px-2 py-1 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-xs text-white font-medium"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
