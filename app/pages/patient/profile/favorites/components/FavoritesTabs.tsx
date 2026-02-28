import { FaUserMd, FaHospital } from 'react-icons/fa';
import { TabType } from '../types';

interface FavoritesTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  theme: string;
  locale: string;
}

export default function FavoritesTabs({ activeTab, setActiveTab, theme, locale }: FavoritesTabsProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className={`flex w-full sm:inline-flex rounded-lg p-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <button
          onClick={() => setActiveTab('doctors')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
            activeTab === 'doctors'
              ? 'bg-teal-600 text-white shadow-md'
              : `${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
          }`}
        >
          <FaUserMd className="text-sm sm:text-base" />
          {locale === 'ar' ? 'الأطباء' : 'Doctors'}
        </button>
        <button
          onClick={() => setActiveTab('clinics')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
            activeTab === 'clinics'
              ? 'bg-teal-600 text-white shadow-md'
              : `${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
          }`}
        >
          <FaHospital className="text-sm sm:text-base" />
          {locale === 'ar' ? 'العيادات' : 'Clinics'}
        </button>
      </div>
    </div>
  );
}
