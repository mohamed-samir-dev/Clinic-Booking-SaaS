import { DollarSign } from 'lucide-react';
import { FormData } from '../types';

interface BookingInfoSectionProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
}

export default function BookingInfoSection({ formData, onUpdate }: BookingInfoSectionProps) {
  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <DollarSign size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">Booking Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Consultation Fee *
          </label>
          <input
            type="number"
            min="0"
            required
            value={formData.fees}
            onChange={(e) => onUpdate({ fees: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white"
            placeholder="200"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Currency
          </label>
          <input
            type="text"
            value={formData.currency}
            onChange={(e) => onUpdate({ currency: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white"
            placeholder="EGP"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Slot Duration (minutes)
          </label>
          <input
            type="number"
            min="5"
            value={formData.slotDuration}
            onChange={(e) => onUpdate({ slotDuration: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white"
            placeholder="30"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Buffer Before (min)
          </label>
          <input
            type="number"
            min="0"
            value={formData.bufferBefore}
            onChange={(e) => onUpdate({ bufferBefore: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Buffer After (min)
          </label>
          <input
            type="number"
            min="0"
            value={formData.bufferAfter}
            onChange={(e) => onUpdate({ bufferAfter: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Patients Per Slot
          </label>
          <input
            type="number"
            min="1"
            value={formData.maxPatientsPerSlot}
            onChange={(e) => onUpdate({ maxPatientsPerSlot: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white"
            placeholder="1"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Min Notice (min)
          </label>
          <input
            type="number"
            min="0"
            value={formData.minNoticeMinutes}
            onChange={(e) => onUpdate({ minNoticeMinutes: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white"
            placeholder="60"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl border-2 border-gray-600 cursor-pointer hover:bg-gray-700 transition-all">
        <input
          type="checkbox"
          checked={formData.allowOnlineBooking}
          onChange={(e) => onUpdate({ allowOnlineBooking: e.target.checked })}
          className="w-5 h-5 text-teal-600 border-gray-500 rounded focus:ring-teal-500"
        />
        <span className="text-sm font-semibold text-gray-300">Allow Online Booking</span>
      </label>
    </div>
  );
}
