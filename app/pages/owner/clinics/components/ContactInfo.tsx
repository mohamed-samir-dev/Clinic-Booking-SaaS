import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function ContactInfo({ formData, setFormData }: Props) {
  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">3</span>
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Address (English)</label>
          <input
            type="text"
            value={formData.address.en}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, en: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="123 University Street, Nasr City"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Address (Arabic)</label>
          <input
            type="text"
            value={formData.address.ar}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, ar: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="123 شارع الجامعة، مدينة نصر"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="+20123456789"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="clinic@example.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Longitude</label>
          <input
            type="number"
            step="any"
            value={formData.location.coordinates[0]}
            onChange={(e) => setFormData({ ...formData, location: { ...formData.location, coordinates: [parseFloat(e.target.value) || 0, formData.location.coordinates[1]] } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="31.2357"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Latitude</label>
          <input
            type="number"
            step="any"
            value={formData.location.coordinates[1]}
            onChange={(e) => setFormData({ ...formData, location: { ...formData.location, coordinates: [formData.location.coordinates[0], parseFloat(e.target.value) || 0] } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="30.0444"
          />
        </div>
      </div>
    </div>
  );
}
