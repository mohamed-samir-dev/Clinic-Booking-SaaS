'use client';

import { useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import ar from '@/messages/ar.json';
import en from '@/messages/en.json';

interface PasswordChangedToastProps {
  show: boolean;
  onClose: () => void;
}

export const PasswordChangedToast = ({ show, onClose }: PasswordChangedToastProps) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';
  const messages = locale === 'ar' ? ar.patient.profile.personalInfo.messages : en.patient.profile.personalInfo.messages;

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

 

  if (!show) return null;

  return (
    <div className={`fixed ${isRTL ? 'left-4' : 'right-4'} top-4 z-9999 ${isRTL ? 'animate-slide-in-left' : 'animate-slideIn'}`}>
      <div className={`rounded-2xl shadow-2xl border-2 p-4 min-w-[320px] max-w-md ${
        theme === 'dark' 
          ? 'bg-gray-800 border-green-500/30' 
          : 'bg-white border-green-500/50'
      }`}>
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className={`font-bold text-base mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {messages.passwordChangedSuccess}
            </h3>
            <p className={`text-sm mb-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {messages.passwordRecentlyChanged}
            </p>
            
           
          </div>

          <button
            onClick={onClose}
            className={`shrink-0 p-1 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};
