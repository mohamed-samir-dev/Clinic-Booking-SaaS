import { FaAllergies, FaEdit, FaTimes, FaSave, FaPlus } from 'react-icons/fa';
import { MedicalFormData } from '../types';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

interface AllergiesSectionProps {
  formData: MedicalFormData;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  loading: boolean;
  handleSubmit: () => void;
  newAllergy: string;
  setNewAllergy: (value: string) => void;
  handleAddAllergy: () => void;
  handleRemoveAllergy: (index: number) => void;
}

export const AllergiesSection = ({ formData, editingSection, setEditingSection, loading, handleSubmit, newAllergy, setNewAllergy, handleAddAllergy, handleRemoveAllergy }: AllergiesSectionProps) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.patient.medical : messages.patient.medical;
  
  return (
    <div className={`rounded-2xl shadow-lg p-4 sm:p-6 border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <FaAllergies className="text-orange-600 text-sm sm:text-base" />
          </div>
          {t.allergies.title}
        </h2>
        {editingSection !== 'allergies' ? (
          <button onClick={() => setEditingSection('allergies')} className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
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
      
      {editingSection === 'allergies' && (
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
          <input type="text" value={newAllergy} onChange={(e) => setNewAllergy(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAllergy())} placeholder={locale === 'ar' ? 'أضف حساسية (مثل: بنسلين، فول سوداني)' : 'Add allergy (e.g., Penicillin, Peanuts)'} className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none ${
            theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white focus:border-teal-400 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500'
          }`} />
          <button type="button" onClick={handleAddAllergy} className="px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
            <FaPlus /> {t.actions.add}
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {formData.allergies.length > 0 ? (
          formData.allergies.map((allergy, index) => (
            <div key={index} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-50 text-orange-700 rounded-full text-xs sm:text-sm font-medium border border-orange-200 flex items-center gap-2">
              {allergy}
              {editingSection === 'allergies' && (
                <button type="button" onClick={() => handleRemoveAllergy(index)} className="text-orange-600 hover:text-orange-800">
                  <FaTimes />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className={`italic text-sm sm:text-base ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>{t.allergies.noAllergies}</p>
        )}
      </div>
    </div>
  );
};
