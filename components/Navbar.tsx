'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaHeartbeat, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Moon, Sun } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { logout } from '@/app/store/slices/authSlice';

export default function Navbar() {
  const [lang, setLang] = useState<'AR' | 'EN'>('EN');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="w-full px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              <FaHeartbeat className="text-white text-xl md:text-2xl" />
            </div>
            <span className="text-xl md:text-2xl font-bold transition-colors">
              <span className="text-teal-600">Care</span>
              <span className="text-gray-800 group-hover:text-teal-700">Sync</span>
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden xl:flex items-center gap-2">
            {['Home', 'Services', 'Doctors', 'About Us', 'Contact'].map((item) => {
              const href = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={item}
                  href={href}
                  className={`px-5 py-2 rounded-lg transition-all font-medium ${
                    isActive ? 'text-teal-600' : 'text-gray-700 hover:text-teal-700'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 xl:gap-4">
            {/* Book Now Button */}
            <Link
              href="/book"
              className="hidden min-[500px]:block px-4 md:px-7 py-2 md:py-2.5 bg-[#2D8BDA] rounded-full text-white hover:bg-[#1F70B2] transition-colors font-semibold shadow-md hover:shadow-lg text-sm md:text-base"
            >
              Book Now
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="hidden min-[350px]:flex w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center text-gray-700 transition-all hover:scale-105"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
              className="hidden min-[350px]:flex px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all hover:scale-105 text-sm font-semibold text-gray-700 min-w-[50px]"
            >
              {lang === 'EN' ? 'EN' : 'عربي'}
            </button>
            {/* Log In Button or Avatar */}
            {user ? (
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
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/pages/login"
                className="hidden xl:block px-7 py-2.5 bg-[#2D8BDA] rounded-full text-white hover:bg-[#1F70B2] transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                Log In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all"
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Links Only */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-4 pb-4 border-t border-gray-100">
            {/* Book Now Button - Mobile */}
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="min-[500px]:hidden mt-4 block px-6 py-2.5 bg-[#2D8BDA] rounded-full text-white hover:bg-[#1F70B2] transition-colors font-semibold shadow-md text-center"
            >
              Book Now
            </Link>

            <div className="flex flex-col gap-2 mt-4">
              {['Home', 'Services', 'Doctors', 'About Us', 'Contact'].map((item) => {
                const href = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={item}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-all font-medium ${
                      isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-700 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            {/* Theme & Language - Mobile */}
            <div className="min-[350px]:hidden flex items-center gap-2 mt-4 px-4 py-3 bg-gray-50 rounded-lg">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
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

            {/* User Section */}
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
                className="mt-4 block px-6 py-2.5 bg-[#2D8BDA] rounded-full text-white hover:bg-[#1F70B2] transition-colors font-semibold shadow-md text-center"
              >
                Log In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
