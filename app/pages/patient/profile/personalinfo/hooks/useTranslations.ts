import { useLanguage } from '@/app/contexts/LanguageContext';
import ar from '@/messages/ar.json';
import en from '@/messages/en.json';

export const useTranslations = () => {
  const { locale } = useLanguage();
  const messages = locale === 'ar' ? ar : en;
  
  return messages.patient.profile.personalInfo;
};
