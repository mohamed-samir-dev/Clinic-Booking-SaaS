import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { UserMenuProps } from '../../types/index';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';



export default function UserMenu({ user, showDropdown, setShowDropdown, handleLogout }: UserMenuProps) {
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.navbar : messages.navbar;

  if (!user) {
    return (
      <Link
        href="/pages/login"
        className="hidden xl:block px-7 py-2.5 bg-teal-600 rounded-full text-white hover:bg-teal-800 transition-colors font-semibold shadow-md hover:shadow-lg"
      >
        {t.login}
      </Link>
    );
  }

  return (
    <div className="relative hidden xl:block">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-10 h-10 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
      >
        {user.name?.charAt(0).toUpperCase() || <FaUser />}
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            {t.logout}
          </button>
        </div>
      )}
    </div>
  );
}
