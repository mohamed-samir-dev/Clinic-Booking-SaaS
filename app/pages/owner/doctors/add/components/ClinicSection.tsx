import { Building2 } from 'lucide-react';
import { Clinic } from '../types';

interface ClinicSectionProps {
  clinics: Clinic[];
  selectedClinicId: string;
  onChange: (clinicId: string) => void;
}

export default function ClinicSection({ clinics, selectedClinicId, onChange }: ClinicSectionProps) {
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Building2 size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">Clinic Selection</h3>
      </div>
      <select
        required
        value={selectedClinicId}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white"
      >
        <option value="">-- Select Clinic --</option>
        {clinics.map((clinic) => (
          <option key={clinic._id} value={clinic._id}>
            {clinic.name.ar} - {clinic.name.en}
          </option>
        ))}
      </select>
    </div>
  );
}
