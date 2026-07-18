import { Search } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

const t = {
  ar: { placeholder: 'بحث عن طبيب...' },
  en: { placeholder: 'Search doctors...' },
};

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'] ?? t.en;
  const isRtl = locale === 'ar';

  return (
    <div className="p-4 border-b border-gray-700">
      <div className="relative">
        <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
        <input
          type="text"
          placeholder={tr.placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
        />
      </div>
    </div>
  );
}
