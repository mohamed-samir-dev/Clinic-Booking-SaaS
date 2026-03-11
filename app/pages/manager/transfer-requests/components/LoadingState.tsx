import { useLanguage } from '@/app/contexts/LanguageContext';

const translations = {
  ar: {
    loading: 'جاري تحميل الطلبات...'
  },
  en: {
    loading: 'Loading requests...'
  }
};

export default function LoadingState() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <div className="text-center py-8 sm:py-12">
      <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-teal-400 mx-auto"></div>
      <p className="text-gray-400 mt-4 text-sm sm:text-base">{t.loading}</p>
    </div>
  );
}
