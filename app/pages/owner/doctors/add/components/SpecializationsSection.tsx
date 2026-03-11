import { Stethoscope, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Specialization {
  en: string;
  ar: string;
}

interface SpecializationsSectionProps {
  specializations: Specialization[];
  onUpdate: (specializations: Specialization[]) => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    title: 'التخصصات الفرعية',
    specializationEn: 'التخصص (إنجليزي)',
    specializationAr: 'التخصص (عربي)',
    addSpecialization: 'إضافة تخصص',
    placeholderEn: 'مثال: Pediatric Cardiology',
    placeholderAr: 'مثال: أمراض قلب الأطفال'
  },
  en: {
    title: 'Specializations',
    specializationEn: 'Specialization (English)',
    specializationAr: 'Specialization (Arabic)',
    addSpecialization: 'Add Specialization',
    placeholderEn: 'e.g., Pediatric Cardiology',
    placeholderAr: 'مثال: أمراض قلب الأطفال'
  }
};

export default function SpecializationsSection({ specializations, onUpdate, language = 'en' }: SpecializationsSectionProps) {
  const t = translations[language];
  const [newSpecialization, setNewSpecialization] = useState<Specialization>({ en: '', ar: '' });

  const handleAdd = () => {
    if (newSpecialization.en.trim()) {
      onUpdate([...specializations, { en: newSpecialization.en.trim(), ar: newSpecialization.ar.trim() }]);
      setNewSpecialization({ en: '', ar: '' });
    }
  };

  const handleRemove = (index: number) => {
    onUpdate(specializations.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Stethoscope size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{t.title}</h3>
      </div>
      
      {specializations.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {specializations.map((spec, index) => (
            <div key={index} className="bg-gray-800 px-4 py-2 rounded-full border-2 border-gray-600 flex items-center gap-2">
              <span className="text-white font-medium">{spec.en} {spec.ar && `- ${spec.ar}`}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-600 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">{t.specializationEn}</label>
            <input
              type="text"
              value={newSpecialization.en}
              onChange={(e) => setNewSpecialization({ ...newSpecialization, en: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
              placeholder={t.placeholderEn}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">{t.specializationAr}</label>
            <input
              type="text"
              value={newSpecialization.ar}
              onChange={(e) => setNewSpecialization({ ...newSpecialization, ar: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
              placeholder={t.placeholderAr}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all font-semibold"
        >
          <Plus size={18} />
          {t.addSpecialization}
        </button>
      </div>
    </div>
  );
}
