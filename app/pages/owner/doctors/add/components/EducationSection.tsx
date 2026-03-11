import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface EducationSectionProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    title: 'التعليم والتدريب',
    degree: 'الدرجة العلمية',
    institution: 'الجامعة/المؤسسة',
    year: 'السنة',
    addEducation: 'إضافة تعليم',
    degreePlaceholder: 'MBBS, MD, PhD',
    institutionPlaceholder: 'جامعة القاهرة',
    yearPlaceholder: '2015'
  },
  en: {
    title: 'Education & Training',
    degree: 'Degree',
    institution: 'Institution',
    year: 'Year',
    addEducation: 'Add Education',
    degreePlaceholder: 'MBBS, MD, PhD',
    institutionPlaceholder: 'Cairo University',
    yearPlaceholder: '2015'
  }
};

export default function EducationSection({ education, onUpdate, language = 'en' }: EducationSectionProps) {
  const t = translations[language];
  const [newEducation, setNewEducation] = useState<Education>({
    degree: '',
    institution: '',
    year: ''
  });

  const handleAdd = () => {
    if (newEducation.degree && newEducation.institution) {
      onUpdate([...education, { ...newEducation }]);
      setNewEducation({ degree: '', institution: '', year: '' });
    }
  };

  const handleRemove = (index: number) => {
    onUpdate(education.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <GraduationCap size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{t.title}</h3>
      </div>
      
      {education.length > 0 && (
        <div className="space-y-3 mb-4">
          {education.map((edu, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg border-2 border-gray-600 flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold text-white">{edu.degree}</div>
                <div className="text-gray-300 text-sm">{edu.institution}</div>
                <div className="text-gray-400 text-xs">{edu.year}</div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700 p-1 ml-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-600 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">{t.degree}</label>
            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
              placeholder={t.degreePlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">{t.institution}</label>
            <input
              type="text"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
              placeholder={t.institutionPlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">{t.year}</label>
            <input
              type="text"
              value={newEducation.year}
              onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
              placeholder={t.yearPlaceholder}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all font-semibold"
        >
          <Plus size={18} />
          {t.addEducation}
        </button>
      </div>
    </div>
  );
}
