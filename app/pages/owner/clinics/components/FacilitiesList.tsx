import { Plus, Trash2 } from 'lucide-react';
import { ClinicFormData } from '../types';

interface Props {
  formData: ClinicFormData;
  setFormData: (data: ClinicFormData) => void;
}

export default function FacilitiesList({ formData, setFormData }: Props) {
  return (
    <div className="bg-gray-700 border-2 border-gray-600 rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center text-sm">6</span>
          Facilities
        </h2>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, facilities: [...formData.facilities, { name: { en: '', ar: '' }, icon: '' }] })}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all shadow-sm"
        >
          <Plus size={18} /> Add Facility
        </button>
      </div>
      <div className="space-y-3">
        {formData.facilities.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No facilities added yet. Click &ldquo;Add Facility&ldquo; to get started.</p>
          </div>
        ) : (
          formData.facilities.map((facility, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-600 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-300">Facility #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, facilities: formData.facilities.filter((_, i) => i !== index) })}
                  className="text-red-400 hover:text-red-300 p-1 hover:bg-red-900/30 rounded transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={facility.name.en}
                  onChange={(e) => {
                    const newFacilities = formData.facilities.map((f, i) =>
                      i === index ? { ...f, name: { ...f.name, en: e.target.value } } : f
                    );
                    setFormData({ ...formData, facilities: newFacilities });
                  }}
                  className="px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm text-white font-medium"
                  placeholder="Facility Name (English)"
                />
                <input
                  type="text"
                  value={facility.name.ar}
                  onChange={(e) => {
                    const newFacilities = formData.facilities.map((f, i) =>
                      i === index ? { ...f, name: { ...f.name, ar: e.target.value } } : f
                    );
                    setFormData({ ...formData, facilities: newFacilities });
                  }}
                  className="px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm text-white font-medium"
                  placeholder="Facility Name (Arabic)"
                />
                <input
                  type="text"
                  value={facility.icon}
                  onChange={(e) => {
                    const newFacilities = formData.facilities.map((f, i) =>
                      i === index ? { ...f, icon: e.target.value } : f
                    );
                    setFormData({ ...formData, facilities: newFacilities });
                  }}
                  className="px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm text-white font-medium"
                  placeholder="Icon"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
