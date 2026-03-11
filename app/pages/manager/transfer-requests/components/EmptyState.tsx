import { MessageSquare } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

const translations = {
  ar: {
    noRequests: 'لا توجد طلبات'
  },
  en: {
    noRequests: 'No requests found'
  }
};

export default function EmptyState() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 sm:p-12 text-center">
      <MessageSquare className="mx-auto text-gray-600 mb-4" size={40} />
      <p className="text-gray-400 text-sm sm:text-base">{t.noRequests}</p>
    </div>
  );
}
