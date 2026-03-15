'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { MdLocalHospital, MdSend } from 'react-icons/md';
import { useTheme } from '@/app/contexts/ThemeContext';
import translations from '@/messages/translations';

export default function ContactForm() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].contact.form;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: t.successMessage });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || t.errorMessage });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: t.networkError });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'}`}>
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-lg flex items-center justify-center shrink-0">
          <MdLocalHospital className="text-white text-xl sm:text-2xl" />
        </div>
        <h3 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {submitStatus && (
          <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
            {submitStatus.message}
          </div>
        )}
        <div>
          <label className={`block text-sm sm:text-base font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{t.fullName}</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={t.fullNamePlaceholder}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className={`block text-sm sm:text-base font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{t.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.emailPlaceholder}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm sm:text-base font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{t.phone}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.phonePlaceholder}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
              required
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm sm:text-base font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{t.subject}</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          >
            <option value="">{t.subjectPlaceholder}</option>
            <option value="general">{t.subjectGeneral}</option>
            <option value="appointment">{t.subjectAppointment}</option>
            <option value="feedback">{t.subjectFeedback}</option>
            <option value="complaint">{t.subjectComplaint}</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm sm:text-base font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{t.message}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.messagePlaceholder}
            rows={5}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
        >
          <MdSend className="text-lg sm:text-xl" />
          {isSubmitting ? t.sending : t.sendButton}
        </button>
      </form>
    </div>
  );
}
