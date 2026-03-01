import { FaMapMarkerAlt } from 'react-icons/fa';
import { FormData } from '../types';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useTranslations } from '../hooks/useTranslations';

interface AddressInfoProps {
  formData: FormData;
  isEditing: boolean;
  onChange: (data: FormData) => void;
}

export const AddressInfo = ({ formData, isEditing, onChange }: AddressInfoProps) => {
  const { theme } = useTheme();
  const t = useTranslations();
  
  return (
    <div className={`rounded-2xl shadow-lg p-4 sm:p-6 border ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
          <FaMapMarkerAlt className="text-orange-600 text-base sm:text-lg" />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium mb-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>{t.address}</p>
          {isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" placeholder={t.street} value={formData.address.street} onChange={(e) => onChange({...formData, address: {...formData.address, street: e.target.value}})} className={`px-3 py-2 border rounded-lg text-sm sm:text-base ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'
              }`} />
              <input type="text" placeholder={t.city} value={formData.address.city} onChange={(e) => onChange({...formData, address: {...formData.address, city: e.target.value}})} className={`px-3 py-2 border rounded-lg text-sm sm:text-base ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'
              }`} />
              <input type="text" placeholder={t.state} value={formData.address.state} onChange={(e) => onChange({...formData, address: {...formData.address, state: e.target.value}})} className={`px-3 py-2 border rounded-lg text-sm sm:text-base ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'
              }`} />
              <input type="text" placeholder={t.zipCode} value={formData.address.zipCode} onChange={(e) => onChange({...formData, address: {...formData.address, zipCode: e.target.value}})} className={`px-3 py-2 border rounded-lg text-sm sm:text-base ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900'
              }`} />
            </div>
          ) : (
            <p className={`font-semibold leading-relaxed text-sm sm:text-base ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {formData.address.street || formData.address.city || formData.address.state || formData.address.zipCode
                ? (
                  <>
                    {formData.address.street && <span className="block">{formData.address.street}</span>}
                    {(formData.address.city || formData.address.state || formData.address.zipCode) && (
                      <span className="block">{[formData.address.city, formData.address.state, formData.address.zipCode].filter(Boolean).join(', ')}</span>
                    )}
                  </>
                )
                : t.notProvided}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
