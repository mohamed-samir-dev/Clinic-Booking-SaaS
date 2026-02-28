import { FaSearch } from 'react-icons/fa';
import { TabType } from '../types';

interface SearchAndSortProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'recent' | 'alphabetical';
  setSortBy: (sort: 'recent' | 'alphabetical') => void;
  activeTab: TabType;
  theme: string;
  locale: string;
}

export default function SearchAndSort({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  activeTab,
  theme,
  locale
}: SearchAndSortProps) {
  return (
    <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="flex-1 relative">
        <FaSearch className={`absolute ${locale === 'ar' ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} top-1/2 transform -translate-y-1/2 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          type="text"
          placeholder={activeTab === 'doctors' 
            ? (locale === 'ar' ? 'ابحث عن طبيب...' : 'Search for a doctor...') 
            : (locale === 'ar' ? 'ابحث عن عيادة...' : 'Search for a clinic...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full ${locale === 'ar' ? 'pr-10 sm:pr-12 pl-3 sm:pl-4' : 'pl-10 sm:pl-12 pr-3 sm:pr-4'} py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
        />
      </div>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as 'recent' | 'alphabetical')}
        className={`px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
      >
        <option value="recent">{locale === 'ar' ? 'الأحدث' : 'Most Recent'}</option>
        <option value="alphabetical">{locale === 'ar' ? 'أبجدي' : 'Alphabetical'}</option>
      </select>
    </div>
  );
}
