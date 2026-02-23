'use client';

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

export default function FAQ() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].services.faq;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center px-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {t.title}
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {t.questions.map((faq, index) => (
            <div key={index} className={`rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left gap-3"
              >
                <span className={`text-base sm:text-lg font-semibold pr-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{faq.question}</span>
                {openFaq === index ? <FaMinus className="text-teal-600 shrink-0" /> : <FaPlus className="text-teal-600 shrink-0" />}
              </button>
              {openFaq === index && (
                <div className={`px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
