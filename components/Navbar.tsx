'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHeartbeat } from 'react-icons/fa';

export default function Navbar() {
  const [lang, setLang] = useState<'AR' | 'EN'>('EN');
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              <FaHeartbeat className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold transition-colors">
              <span className="text-teal-600">Care</span>
              <span className="text-gray-800 group-hover:text-teal-700">Sync</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-5">
            {/* Language Switch */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">{lang === 'AR' ? 'العربية' : 'English'}</span>
              <button
                onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
                className={`relative w-14 h-7 rounded-full transition-colors ${lang === 'EN' ? 'bg-[#2D8BDA]' : 'bg-gray-400'}`}
              >
                <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${lang === 'EN' ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>
  {/* Book Now Button */}
  <Link
              href="/book"
              className="px-7 py-2.5 bg-[#2D8BDA] rounded-full text-white hover:bg-[#1F70B2] transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              Book Now
            </Link>
            {/* Log In Button */}
            <Link
              href="/pages/login"
              className="px-7 py-2.5 bg-[#2D8BDA] rounded-full text-white hover:bg-[#1F70B2] transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              Log In
            </Link>

          
          </div>
        </div>
      </div>
    </nav>
  );
}
