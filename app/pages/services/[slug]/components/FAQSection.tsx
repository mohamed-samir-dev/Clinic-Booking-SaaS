import { useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

interface FAQSectionProps {
  faqs: { question: string; answer: string }[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].services.serviceDetails.faqs;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={`bg-linear-to-b ${theme === 'dark' ? 'from-gray-900 to-gray-800' : 'from-teal-50 to-white'} py-12 sm:py-16 md:py-20`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3 px-2`}>{t.title}</h3>
          <div className="w-16 sm:w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => (
            <div key={index} className="relative">
              <div
                className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border-l-4 border-teal-500`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left ${theme === 'dark' ? 'hover:bg-gray-600/50' : 'hover:bg-teal-50/50'} transition-colors group`}
                >
                  <span className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} pr-3 sm:pr-4 group-hover:text-teal-600 transition-colors`}>{faq.question}</span>
                  <div
                    className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${openFaq === index ? 'rotate-45 scale-110' : ''}`}
                  >
                    <span className="text-white text-xl sm:text-2xl font-bold">+</span>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="overflow-hidden">
                    <div className={`px-4 sm:px-8 pb-4 sm:pb-6 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300 from-gray-600/30' : 'text-gray-600 from-teal-50/30'} leading-relaxed bg-linear-to-br to-transparent`}>
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
