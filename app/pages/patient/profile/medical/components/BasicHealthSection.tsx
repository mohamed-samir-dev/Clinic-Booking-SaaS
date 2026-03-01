import { FaHeartbeat, FaTint, FaRulerVertical, FaWeight, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import { MedicalFormData } from '../types';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

interface BasicHealthSectionProps {
  formData: MedicalFormData;
  setFormData: (data: MedicalFormData) => void;
  editingSection: string | null;
  setEditingSection: (section: string | null) => void;
  loading: boolean;
  handleSubmit: () => void;
}

export const BasicHealthSection = ({ formData, setFormData, editingSection, setEditingSection, loading, handleSubmit }: BasicHealthSectionProps) => {
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
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <FaHeartbeat className="text-red-600 text-sm sm:text-base" />
          </div>
          {t.basicHealth.title}
        </h2>
        {editingSection !== 'basic' ? (
          <button onClick={() => setEditingSection('basic')} className="w-full sm:w-auto px-4 py-2 bg-teal-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className={`text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <FaTint className="text-red-500" />
            {t.basicHealth.bloodType}
          </label>
          {editingSection === 'basic' ? (
            <select value={formData.bloodType} onChange={(e) => setFormData({...formData, bloodType: e.target.value})} className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none ${
              theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white focus:border-teal-400' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500'
            }`}>
              <option value="">{t.basicHealth.selectBloodType}</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          ) : (
            <div className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`font-semibold text-sm sm:text-base ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{formData.bloodType || t.basicHealth.notProvided}</p>
            </div>
          )}
        </div>

        <div>
          <label className={`text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <FaRulerVertical className="text-purple-500" />
            {t.basicHealth.height}
          </label>
          {editingSection === 'basic' ? (
            <input type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} placeholder="170" className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none ${
              theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white focus:border-teal-400 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500'
            }`} />
          ) : (
            <div className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`font-semibold text-sm sm:text-base ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{formData.height ? `${formData.height} cm` : t.basicHealth.notProvided}</p>
            </div>
          )}
        </div>

        <div>
          <label className={`text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <FaWeight className="text-green-500" />
            {t.basicHealth.weight}
          </label>
          {editingSection === 'basic' ? (
            <input type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} placeholder="70" className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none ${
              theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white focus:border-teal-400 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:border-teal-500'
            }`} />
          ) : (
            <div className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`font-semibold text-sm sm:text-base ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{formData.weight ? `${formData.weight} kg` : t.basicHealth.notProvided}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
