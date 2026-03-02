import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function StatusSection({ formData, setFormData }: Props) {
  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">11</span>
        Status
      </h2>
      <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="w-5 h-5 text-teal-600 border-gray-600 rounded focus:ring-teal-500"
        />
        <label htmlFor="isActive" className="text-sm font-semibold text-gray-300">Clinic is Active</label>
      </div>
    </div>
  );
}
