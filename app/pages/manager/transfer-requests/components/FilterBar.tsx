import { useLanguage } from '@/app/contexts/LanguageContext';

interface FilterBarProps {
  filter: 'all' | 'pending' | 'accepted' | 'rejected';
  setFilter: (filter: 'all' | 'pending' | 'accepted' | 'rejected') => void;
}

const translations = {
  ar: {
    all: 'الكل',
    pending: 'قيد الانتظار',
    accepted: 'مقبول',
    rejected: 'مرفوض'
  },
  en: {
    all: 'All',
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected'
  }
};

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 mb-4 md:mb-6">
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'accepted', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
              filter === status
                ? 'bg-teal-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {t[status]}
          </button>
        ))}
      </div>
    </div>
  );
}
