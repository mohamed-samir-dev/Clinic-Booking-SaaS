import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { FaUser } from 'react-icons/fa';
import { MobileMenuProps } from '../../types/index';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';



export default function MobileMenu({
  pathname,
  user,
  locale,
  theme,
  toggleLanguage,
  setTheme,
  setMobileMenuOpen,
  handleLogout,
}: MobileMenuProps) {
  const t = locale === 'ar' ? messagesAr.navbar : messages.navbar;

  const navItems = [
    { label: t.home, href: '/' },
    { label: t.services, href: '/pages/services' },
    { label: t.doctors, href: '/pages/doctors' },
    { label: t.about, href: '/pages/about' },
    { label: t.contact, href: '/pages/contact' },
  ];
  return (
    <div className={`xl:hidden mt-4 pb-4 border-t ${
      theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
    }`}>
      <Link
        href="/book"
        onClick={() => setMobileMenuOpen(false)}
        className="min-[500px]:hidden mt-4 block px-6 py-2.5 bg-teal-600 rounded-full text-white hover:bg-teal-800 transition-colors font-semibold shadow-md text-center"
      >
        {t.bookNow}
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                isActive ? 'text-teal-600 bg-teal-50' : theme === 'dark' ? 'text-gray-200 hover:text-teal-400 hover:bg-gray-800' : 'text-gray-700 hover:text-teal-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className={`min-[350px]:hidden flex items-center gap-2 mt-4 px-4 py-3 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <button
          onClick={setTheme}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-white hover:bg-gray-100 text-gray-700'
          }`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button
          onClick={toggleLanguage}
          className={`flex-1 py-2 rounded-lg transition-all text-sm font-semibold ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-white hover:bg-gray-100 text-gray-700'
          }`}
        >
          {locale === 'en' ? 'EN' : 'عربي'}
        </button>
      </div>

      {user ? (
        <div className={`mt-4 px-4 py-3 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold">
              {user.name?.charAt(0).toUpperCase() || <FaUser />}
            </div>
            <div>
              <p className={`text-sm font-semibold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>{user.name}</p>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>{user.email}</p>
            </div>
          </div>
          {user.role === 'patient' && (
            <Link
              href="/pages/patient/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full block px-4 py-2 text-sm rounded-lg transition-colors font-medium mb-2 text-center ${
                theme === 'dark' ? 'text-gray-200 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-white hover:bg-gray-100'
              }`}
            >
              {locale === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </Link>
          )}
          <button
            onClick={handleLogout}
            className={`w-full px-4 py-2 text-sm rounded-lg transition-colors font-medium ${
              theme === 'dark' ? 'text-red-400 bg-gray-700 hover:bg-red-900/30' : 'text-red-600 bg-white hover:bg-red-50'
            }`}
          >
            {t.logout}
          </button>
        </div>
      ) : (
        <Link
          href="/pages/login"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-4 block px-6 py-2.5 bg-teal-600 rounded-full text-white hover:bg-teal-800 transition-colors font-semibold shadow-md text-center"
        >
          {t.login}
        </Link>
      )}
    </div>
  );
}
