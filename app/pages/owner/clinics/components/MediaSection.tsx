import { Plus, Trash2 } from 'lucide-react';
import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

const isValidUrl = (val: string) => {
  try { new URL(val); return true; } catch { return false; }
};

export default function MediaSection({ formData, setFormData }: Props) {
  const images = formData.images.length > 0 ? formData.images : [''];

  const updateImage = (index: number, value: string) => {
    const updated = images.map((img, i) => (i === index ? value : img));
    setFormData({ ...formData, images: updated.filter(Boolean) });
  };

  const addImage = () => setFormData({ ...formData, images: [...formData.images, ''] });

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated.filter(Boolean) });
  };

  return (
    <div className="bg-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
        Media &amp; Branding
      </h2>
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Logo URL</label>
        <input
          type="url"
          value={formData.logo}
          onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-white font-medium"
          placeholder="https://example.com/logo.png"
        />
        {formData.logo && !isValidUrl(formData.logo) && (
          <p className="text-red-400 text-xs mt-1">Invalid URL</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-300">Clinic Images</label>
          <button
            type="button"
            onClick={addImage}
            className="flex items-center gap-1 text-sm text-teal-400 hover:text-teal-300"
          >
            <Plus size={16} /> Add Image
          </button>
        </div>
        <div className="space-y-2">
          {images.map((img, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="url"
                value={img}
                onChange={(e) => updateImage(index, e.target.value)}
                className={`flex-1 px-4 py-3 bg-gray-800 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all text-white font-medium ${
                  img && !isValidUrl(img) ? 'border-red-500' : 'border-gray-600 focus:border-teal-500'
                }`}
                placeholder="https://example.com/image.png"
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
