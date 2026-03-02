import { GraduationCap } from 'lucide-react';

interface LocationSectionProps {
  address: string;
  city: string;
  onUpdate: (data: { address?: string; city?: string }) => void;
}

export default function LocationSection({ address, city, onUpdate }: LocationSectionProps) {
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <GraduationCap size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">Location</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => onUpdate({ address: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="123 Main St"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => onUpdate({ city: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
            placeholder="Cairo"
          />
        </div>
      </div>
    </div>
  );
}
