import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import {MedicalContextProps}from '../types/types'

export default function MedicalContext({ reason, setReason, files, handleFileChange, handleFileRemove }: MedicalContextProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].booking.detailsForm.medicalContext;
  
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <span className="material-icons text-teal-600 text-lg sm:text-xl">medical_information</span>
        <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{t.reasonForVisit}</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 focus:outline-none resize-none text-sm sm:text-base ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:border-teal-500' : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500'
            }`}
            placeholder={locale === 'ar' ? 'صف باختصار مخاوفك أو أعراضك...' : 'Briefly describe your concerns or symptoms...'}
          />
        </div>
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{locale === 'ar' ? 'التقارير أو الوصفات السابقة (اختياري)' : 'Previous Reports or Prescriptions (Optional)'}</label>
          <div className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-colors cursor-pointer ${
            theme === 'dark' ? 'border-gray-600 hover:border-teal-500' : 'border-gray-300 hover:border-teal-500'
          }`}>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <span className={`material-icons text-3xl sm:text-4xl mb-2 block ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>upload_file</span>
              <p className={`text-sm sm:text-base font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{locale === 'ar' ? 'انقر للتحميل أو اسحب وأفلت' : 'Click to upload or drag and drop'}</p>
              <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{locale === 'ar' ? 'PDF أو JPG أو PNG (بحد أقصى 10 ميجابايت لكل ملف)' : 'PDF, JPG or PNG (max. 10MB each)'}</p>
              {/* <button type="button" className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-semibold">
                {locale === 'ar' ? 'تصفح الملفات' : 'Browse files'}
              </button> */}
            </label>
          </div>
          {files && files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="material-icons text-teal-600 text-lg">description</span>
                    <span className={`text-sm truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFileRemove(index)}
                    className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors shrink-0"
                  >
                    <span className="material-icons text-lg">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
