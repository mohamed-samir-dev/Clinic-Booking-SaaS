interface LoadingStateProps {
  theme: string;
  locale?: string;
}

const translations = {
  ar: {
    loading: 'جاري تحميل الطلبات...'
  },
  en: {
    loading: 'Loading requests...'
  }
};

export const LoadingState = ({ theme, locale = 'en' }: LoadingStateProps) => {
  const t = translations[locale as 'ar' | 'en'] || translations.en;
  
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
      <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.loading}</p>
    </div>
  );
};
