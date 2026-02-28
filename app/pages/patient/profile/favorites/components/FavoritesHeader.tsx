import { FaHeart } from 'react-icons/fa';

interface FavoritesHeaderProps {
  theme: string;
  locale: string;
}

export default function FavoritesHeader({ theme, locale }: FavoritesHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <FaHeart className="text-2xl sm:text-3xl text-red-500" />
        <h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {locale === 'ar' ? 'المفضلة' : 'My Favorites'}
        </h1>
      </div>
      <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {locale === 'ar' ? 'احفظ الأطباء والعيادات المفضلة لديك للوصول السريع' : 'Save your favorite doctors and clinics for quick access'}
      </p>
    </div>
  );
}
