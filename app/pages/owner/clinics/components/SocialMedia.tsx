import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function SocialMedia({ formData, setFormData }: Props) {
  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">10</span>
        Social Media
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Facebook</label>
          <input
            type="url"
            value={formData.socialMedia.facebook}
            onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, facebook: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="https://facebook.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Instagram</label>
          <input
            type="url"
            value={formData.socialMedia.instagram}
            onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, instagram: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="https://instagram.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Twitter</label>
          <input
            type="url"
            value={formData.socialMedia.twitter}
            onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, twitter: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="https://twitter.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Website</label>
          <input
            type="url"
            value={formData.socialMedia.website}
            onChange={(e) => setFormData({ ...formData, socialMedia: { ...formData.socialMedia, website: e.target.value } })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
            placeholder="https://example.com"
          />
        </div>
      </div>
    </div>
  );
}
