import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function BasicInfo({ formData, setFormData }: Props) {
  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
        Basic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Clinic Name (English) *</label>
          <input
            type="text"
            required
            value={formData.name.en}
            onChange={(e) => setFormData({ ...formData, name: { ...formData.name, en: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="Al-Noor Medical Clinic"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Clinic Name (Arabic) *</label>
          <input
            type="text"
            required
            value={formData.name.ar}
            onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="عيادة النور الطبية"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Brief (English)</label>
          <input
            type="text"
            value={formData.brief.en}
            onChange={(e) => setFormData({ ...formData, brief: { ...formData.brief, en: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="Short description (max 200 characters)"
            maxLength={200}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Brief (Arabic)</label>
          <input
            type="text"
            value={formData.brief.ar}
            onChange={(e) => setFormData({ ...formData, brief: { ...formData.brief, ar: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="نبذة مختصرة (حد أقصى 200 حرف)"
            maxLength={200}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Description (English)</label>
          <textarea
            value={formData.description.en}
            onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            rows={3}
            placeholder="Clinic description..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Description (Arabic)</label>
          <textarea
            value={formData.description.ar}
            onChange={(e) => setFormData({ ...formData, description: { ...formData.description, ar: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            rows={3}
            placeholder="وصف العيادة..."
          />
        </div>
      </div>
    </div>
  );
}
