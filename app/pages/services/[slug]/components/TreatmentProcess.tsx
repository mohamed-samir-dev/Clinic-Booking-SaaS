import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface TreatmentProcessProps {
  steps: { title: string; description: string }[];
}

export default function TreatmentProcess({ steps }: TreatmentProcessProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].services.serviceDetails.treatmentProcess;
  return (
    <div className={`bg-linear-to-b ${theme === 'dark' ? 'from-gray-800 to-gray-900' : 'from-white to-teal-50'} py-12 sm:py-16 md:py-20`}>
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3 px-2`}>{t.title}</h3>
          <div className="w-16 sm:w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-teal-200 via-teal-400 to-teal-200 -translate-x-1/2"></div>
          
          <div className="space-y-8 sm:space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 sm:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1">
                  <div
                    className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-teal-100'} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all border`}
                  >
                    <h4 className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3`}>
                      <span className="text-teal-500">{step.title}</span>
                    </h4>
                    <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>{step.description}</p>
                  </div>
                </div>

                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-teal-400 via-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl border-2 sm:border-4 border-white">
                    <span className="text-white text-lg sm:text-2xl font-bold">{index + 1}</span>
                  </div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
