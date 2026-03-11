import { MessageSquare } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

const translations = {
  ar: {
    title: 'طلبات النقل',
    subtitle: 'عرض وإدارة طلبات نقل الأطباء'
  },
  en: {
    title: 'Transfer Requests',
    subtitle: 'View and manage doctor transfer requests'
  }
};

export default function PageHeader() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <div className="mb-4 md:mb-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <MessageSquare className="text-teal-400" size={24} />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{t.title}</h1>
      </div>
      <p className="text-sm sm:text-base text-gray-400">{t.subtitle}</p>
    </div>
  );
}
