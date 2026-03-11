import { MessageSquare } from 'lucide-react';

interface PageHeaderProps {
  theme: string;
  locale: string;
}

const translations = {
  ar: {
    title: 'طلبات النقل',
    subtitle: 'إدارة طلبات النقل من المديرين'
  },
  en: {
    title: 'Transfer Requests',
    subtitle: 'Manage clinic transfer requests from managers'
  }
};

export const PageHeader = ({ theme, locale }: PageHeaderProps) => {
  const t = translations[locale as 'ar' | 'en'] || translations.en;
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <MessageSquare className="text-teal-400" size={32} />
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {t.title}
        </h1>
      </div>
      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
        {t.subtitle}
      </p>
    </div>
  );
};
