import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { UserMenuProps } from '../../types/index';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';



const getDisplayName = (name: unknown, locale: string): string => {
  if (!name) return '';
  if (typeof name === 'string') return name;
  if (typeof name === 'object' && name !== null) {
    const n = name as { en?: string; ar?: string };
    return (locale === 'ar' ? n.ar : n.en) || n.en || '';
  }
  return '';
};

export default function UserMenu({ user, showDropdown, setShowDropdown, handleLogout }: UserMenuProps) {
  const { locale } = useLanguage();
  const { theme } = useTheme();
  const t = locale === 'ar' ? messagesAr.navbar : messages.navbar;
  const displayName = getDisplayName(user?.name, locale);

  const handleProfileClick = () => {
    setShowDropdown(false);
  };

  if (!user) {
    return (
      <Link
        href="/pages/login"
        className="hidden xl:block px-7 py-2.5 bg-teal-700 rounded-full text-white hover:bg-teal-800 transition-colors font-semibold shadow-md hover:shadow-lg"
      >
        {t.login}
      </Link>
    );
  }

  const isRTL = locale === 'ar';

  return (
    <div className="relative hidden xl:block">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-10 h-10 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
      >
        {displayName ? displayName.charAt(0).toUpperCase() : <FaUser />}
      </button>
      {showDropdown && (
        <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg py-3 z-50`}>
          <div className={`px-5 py-3 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
            <p className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{displayName}</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{user.email}</p>
          </div>
          {user.role === 'patient' && (
            <Link
              href="/pages/patient/profile"
              onClick={handleProfileClick}
              className={`block w-full text-left px-5 py-3 text-base ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
            >
              {locale === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </Link>
          )}
          <button
            onClick={handleLogout}
            className={`w-full text-left px-5 py-3 text-base text-red-600 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-red-50'} transition-colors`}
          >
            {t.logout}
          </button>
        </div>
      )}
    </div>
  );
}
