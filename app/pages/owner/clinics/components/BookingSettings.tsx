import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function BookingSettings({ formData, setFormData }: Props) {
  const bookingSettings = formData.bookingSettings || {};
  const cancellationPolicy = bookingSettings.cancellationPolicy || { en: '', ar: '' };

  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">9</span>
        Booking Settings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
          <input
            type="checkbox"
            id="allowOnlineBooking"
            checked={bookingSettings.allowOnlineBooking || false}
            onChange={(e) => setFormData({ ...formData, bookingSettings: { ...bookingSettings, allowOnlineBooking: e.target.checked } })}
            className="w-5 h-5 text-teal-600 border-gray-600 rounded focus:ring-teal-500"
          />
          <label htmlFor="allowOnlineBooking" className="text-sm font-semibold text-gray-300">Allow Online Booking</label>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
          <input
            type="checkbox"
            id="requiresConfirmation"
            checked={bookingSettings.requiresConfirmation || false}
            onChange={(e) => setFormData({ ...formData, bookingSettings: { ...bookingSettings, requiresConfirmation: e.target.checked } })}
            className="w-5 h-5 text-teal-600 border-gray-600 rounded focus:ring-teal-500"
          />
          <label htmlFor="requiresConfirmation" className="text-sm font-semibold text-gray-300">Requires Confirmation</label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Advance Booking Days</label>
        <input
          type="number"
          min="1"
          value={bookingSettings.advanceBookingDays || 30}
          onChange={(e) => setFormData({ ...formData, bookingSettings: { ...bookingSettings, advanceBookingDays: parseInt(e.target.value) || 30 } })}
          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Cancellation Policy (English)</label>
          <textarea
            value={cancellationPolicy.en || ''}
            onChange={(e) => setFormData({ ...formData, bookingSettings: { ...bookingSettings, cancellationPolicy: { ...cancellationPolicy, en: e.target.value } } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            rows={3}
            placeholder="Cancellation policy..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Cancellation Policy (Arabic)</label>
          <textarea
            value={cancellationPolicy.ar || ''}
            onChange={(e) => setFormData({ ...formData, bookingSettings: { ...bookingSettings, cancellationPolicy: { ...cancellationPolicy, ar: e.target.value } } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            rows={3}
            placeholder="سياسة الإلغاء..."
          />
        </div>
      </div>
    </div>
  );
}
