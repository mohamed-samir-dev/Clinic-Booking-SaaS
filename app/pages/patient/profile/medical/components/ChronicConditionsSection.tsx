import { FaFileMedical, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import { MedicalFormData } from '../types';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';
import { useState } from 'react';

interface ChronicConditionsSectionProps {
  formData: MedicalFormData;
  setFormData: (data: MedicalFormData) => void;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  loading: boolean;
  handleSubmit: () => void;
  handleChronicConditionToggle: (condition: string) => void;
}

export const ChronicConditionsSection = ({ formData, setFormData, editingSection, setEditingSection, loading, handleSubmit, handleChronicConditionToggle }: ChronicConditionsSectionProps) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.patient.medical : messages.patient.medical;
  const [otherCondition, setOtherCondition] = useState(formData.chronicConditionsOther || '');
  
  const chronicConditionsList = [
    { key: 'Diabetes', label: t.chronicConditions.diabetes },
    { key: 'Hypertension', label: t.chronicConditions.hypertension },
    { key: 'Asthma', label: t.chronicConditions.asthma },
    { key: 'Heart Disease', label: t.chronicConditions.heartDisease },
    { key: 'Kidney Disease', label: t.chronicConditions.kidneyDisease },
    { key: 'Liver Disease', label: t.chronicConditions.liverDisease },
    { key: 'Thyroid Disorder', label: t.chronicConditions.thyroidDisorder },
    { key: 'Cancer', label: t.chronicConditions.cancer }
  ];
  
  const handleOtherConditionChange = (value: string) => {
    setOtherCondition(value);
    setFormData({ ...formData, chronicConditionsOther: value });
  };
  
  return (
    <div className={`rounded-2xl shadow-lg p-4 sm:p-6 border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-lg flex items-center justify-center">
            <FaFileMedical className="text-teal-600 text-sm sm:text-base" />
          </div>
          {t.chronicConditions.title}
        </h2>
        {editingSection !== 'chronic' ? (
          <button onClick={() => setEditingSection('chronic')} className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
            <FaEdit /> {t.actions.edit}
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditingSection(null)} className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-300 transition-all">
              <FaTimes />
            </button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 sm:flex-none px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
              <FaSave /> {loading ? '...' : t.actions.save}
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {chronicConditionsList.map(({ key, label }) => (
          <label key={key} className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.chronicConditions.includes(key) ? 'bg-teal-50 border-teal-500' : theme === 'dark' ? 'bg-gray-700 border-gray-600 hover:border-teal-400' : 'bg-gray-50 border-gray-200 hover:border-teal-300'} ${editingSection !== 'chronic' && 'cursor-default'}`}>
            <input type="checkbox" checked={formData.chronicConditions.includes(key)} onChange={() => editingSection === 'chronic' && handleChronicConditionToggle(key)} disabled={editingSection !== 'chronic'} className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 rounded focus:ring-teal-500" />
            <span className={`font-medium text-sm sm:text-base ${formData.chronicConditions.includes(key) ? 'text-teal-900' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
          </label>
        ))}
      </div>

      {editingSection === 'chronic' && (
        <div className="mt-4">
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t.chronicConditions.other}
          </label>
          <input
            type="text"
            value={otherCondition}
            onChange={(e) => handleOtherConditionChange(e.target.value)}
            placeholder={t.chronicConditions.otherPlaceholder}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-500'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-teal-500'
            } focus:outline-none`}
          />
        </div>
      )}

      {!editingSection && otherCondition && (
        <div className={`mt-4 p-3 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>{t.chronicConditions.other}: </span>
          <span className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{otherCondition}</span>
        </div>
      )}

      {formData.chronicConditions.length === 0 && !otherCondition && editingSection !== 'chronic' && (
        <p className={`italic text-sm sm:text-base mt-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>{t.chronicConditions.noConditions}</p>
      )}
    </div>
  );
};
