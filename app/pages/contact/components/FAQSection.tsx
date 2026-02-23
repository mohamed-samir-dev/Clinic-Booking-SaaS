'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import translations from '@/messages/translations';

export default function FAQSection() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].contact.faq;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: t.q1,
      answer: t.a1
    },
    {
      question: t.q2,
      answer: t.a2
    },
    {
      question: t.q3,
      answer: t.a3
    },
    {
      question: t.q4,
      answer: t.a4
    }
  ];

  return (
    <div className={`rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'}`}>
      <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className={`border-2 rounded-lg overflow-hidden ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className={`w-full flex items-center justify-between p-3 sm:p-4 transition-all text-left gap-3 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-teal-50'}`}
            >
              <span className={`text-sm sm:text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{faq.question}</span>
              {openFaq === index ? (
                <FaChevronDown className="text-teal-500 transition-transform shrink-0" />
              ) : (
                <FaChevronRight className="text-teal-500 transition-transform shrink-0" />
              )}
            </button>
            {openFaq === index && (
              <div className={`p-3 sm:p-4 border-t-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
