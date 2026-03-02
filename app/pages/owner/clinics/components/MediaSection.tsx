import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function MediaSection({ formData, setFormData }: Props) {
  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
        Media & Branding
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Logo URL</label>
          <input
            type="url"
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Images (comma separated)</label>
          <input
            type="text"
            value={formData.images.join(', ')}
            onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').map(img => img.trim()) })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="https://example.com/img1.png, https://example.com/img2.png"
          />
        </div>
      </div>
    </div>
  );
}
