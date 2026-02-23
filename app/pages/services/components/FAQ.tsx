'use client';

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';

const faqData = [
  {
    question: 'Do you accept health insurance?',
    answer: 'Yes, we work with major insurance providers. Please contact us with your provider details to confirm coverage for specific treatments.'
  },
  {
    question: 'How can I reschedule my appointment?',
    answer: 'You can reschedule your appointment through your patient portal or by calling our clinic directly at least 24 hours in advance.'
  },
  {
    question: 'What should I bring for my first visit?',
    answer: 'Please bring a valid ID, your insurance card, a list of current medications, and any relevant medical records or test results.'
  }
];

export default function FAQ() {
  const { theme } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center px-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {faqData.map((faq, index) => (
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
