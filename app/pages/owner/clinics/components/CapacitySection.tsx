import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function CapacitySection({ formData, setFormData }: Props) {
  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">4</span>
        Capacity
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Number of Rooms</label>
          <input
            type="number"
            min="0"
            value={formData.capacity.rooms}
            onChange={(e) => setFormData({ ...formData, capacity: { ...formData.capacity, rooms: parseInt(e.target.value) || 0 } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Number of Doctors</label>
          <input
            type="number"
            min="0"
            value={formData.capacity.doctors}
            onChange={(e) => setFormData({ ...formData, capacity: { ...formData.capacity, doctors: parseInt(e.target.value) || 0 } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Patients Per Day</label>
          <input
            type="number"
            min="0"
            value={formData.capacity.patientsPerDay}
            onChange={(e) => setFormData({ ...formData, capacity: { ...formData.capacity, patientsPerDay: parseInt(e.target.value) || 0 } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
          />
        </div>
      </div>
    </div>
  );
}
