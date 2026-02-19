'use client';

import { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Do you accept international insurance?',
      answer: 'Yes, we accept most international insurance plans. Please contact our billing department with your insurance details, and we will verify your coverage before your appointment.'
    },
    {
      question: 'How can I book a same-day appointment?',
      answer: 'You can book a same-day appointment by calling our hotline at +20 123 456 789 or using our WhatsApp service. Subject to doctor availability.'
    },
    {
      question: 'What documents do I need for my first visit?',
      answer: 'Please bring a valid ID, insurance card (if applicable), any previous medical records, and a list of current medications you are taking.'
    },
    {
      question: 'Where is the nearest parking area?',
      answer: 'We have a dedicated parking area in the building basement with 2 hours of free parking for patients. Additional parking is available on the street.'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-2 border-teal-100">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Common Questions</h3>
      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-teal-50 transition-all text-left gap-3"
            >
              <span className="text-sm sm:text-base text-gray-900 font-semibold">{faq.question}</span>
              {openFaq === index ? (
                <FaChevronDown className="text-teal-500 transition-transform shrink-0" />
              ) : (
                <FaChevronRight className="text-teal-500 transition-transform shrink-0" />
              )}
            </button>
            {openFaq === index && (
              <div className="p-3 sm:p-4 bg-white border-t-2 border-gray-200">
                <p className="text-sm sm:text-base text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
