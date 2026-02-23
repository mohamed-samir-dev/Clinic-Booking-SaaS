import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { FaUser } from 'react-icons/fa';
import { NAV_ITEMS } from './constants';
import { MobileMenuProps } from '../../types/index';



export default function MobileMenu({
  pathname,
  user,
  lang,
  theme,
  setLang,
  setTheme,
  setMobileMenuOpen,
  handleLogout,
}: MobileMenuProps) {
  return (
    <div className="xl:hidden mt-4 pb-4 border-t border-gray-100">
      <Link
        href="/book"
        onClick={() => setMobileMenuOpen(false)}
        className="min-[500px]:hidden mt-4 block px-6 py-2.5 bg-teal-600 rounded-full text-white hover:bg-teal-800 transition-colors font-semibold shadow-md text-center"
      >
        Book Now
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {NAV_ITEMS.map((item) => {
          const href = item === 'Home' ? '/' : item === 'Services' ? '/pages/services' : item === 'About Us' ? '/pages/about' : item === 'Doctors' ? '/pages/doctors' : item === 'Contact' ? '/pages/contact' : `/${item.toLowerCase().replace(' ', '-')}`;
          const isActive = pathname === href;
          return (
            <Link
              key={item}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                isActive ? 'text-teal-600 bg-teal-50' : theme === 'dark' ? 'text-gray-200 hover:text-teal-400 hover:bg-gray-800' : 'text-gray-700 hover:text-teal-700 hover:bg-gray-50'
              }`}
            >
              {item}
            </Link>
          );
        })}
      </div>

      <div className="min-[350px]:hidden flex items-center gap-2 mt-4 px-4 py-3 bg-gray-50 rounded-lg">
        <button
          onClick={setTheme}
          className="flex-1 py-2 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-all"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button
          onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
          className="flex-1 py-2 rounded-lg bg-white hover:bg-gray-100 transition-all text-sm font-semibold text-gray-700"
        >
          {lang === 'EN' ? 'EN' : 'عربي'}
        </button>
      </div>

      {user ? (
        <div className="mt-4 px-4 py-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold">
              {user.name?.charAt(0).toUpperCase() || <FaUser />}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm text-red-600 bg-white hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/pages/login"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-4 block px-6 py-2.5 bg-teal-600 rounded-full text-white hover:bg-teal-800 transition-colors font-semibold shadow-md text-center"
        >
          Log In
        </Link>
      )}
    </div>
  );
}
