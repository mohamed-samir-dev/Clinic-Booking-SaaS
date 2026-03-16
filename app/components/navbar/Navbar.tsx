'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { logout } from '@/app/store/slices/authSlice';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import Logo from './Logo';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

export default function Navbar() {
  const { locale, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const user = authUser?.role !== 'owner' ? authUser : null;

  const t = locale === 'ar' ? messagesAr.navbar : messages.navbar;

  useEffect(() => {
    setShowDropdown(false);
  }, [user]);

  const handleLogout = () => {
    setShowDropdown(false);
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <nav className={`shadow-sm transition-colors ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="w-full px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          <Logo />
          <NavLinks pathname={pathname} />

          <div className="flex items-center gap-2 xl:gap-4">
            <Link
              href="/pages/booking"
              className="hidden min-[500px]:block px-4 md:px-7 py-2 md:py-2.5 bg-teal-700 rounded-full text-white hover:bg-teal-800 transition-colors font-semibold shadow-md hover:shadow-lg text-sm md:text-base"
            >
              {t.bookNow}
            </Link>

            <button
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className={`hidden min-[350px]:flex w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center transition-all hover:scale-105 ${
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={toggleLanguage}
              className={`hidden min-[350px]:flex px-3 py-2 rounded-full transition-all hover:scale-105 text-sm font-semibold min-w-[50px] ${
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {locale === 'en' ? 'EN' : 'عربي'}
            </button>

            <UserMenu
              user={user}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              handleLogout={handleLogout}
            />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={`xl:hidden w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <MobileMenu
            pathname={pathname}
            user={user}
            locale={locale}
            theme={theme}
            toggleLanguage={toggleLanguage}
            setTheme={toggleTheme}
            setMobileMenuOpen={setMobileMenuOpen}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </nav>
  );
}
