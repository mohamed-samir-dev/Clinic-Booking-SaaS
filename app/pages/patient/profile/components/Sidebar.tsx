'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaHeartbeat, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

const menuItems = [
  { href: '/pages/patient/profile', label: 'Personal Info', labelAr: 'المعلومات الشخصية', icon: FaUser },
  { href: '/pages/patient/profile/medical', label: 'Medical Info', labelAr: 'المعلومات الطبية', icon: FaHeartbeat },
  { href: '/pages/patient/profile/appointments', label: 'Appointments', labelAr: 'المواعيد', icon: FaCalendarAlt },
  { href: '/pages/patient/profile/favorites', label: 'Favorites', labelAr: 'المفضلة', icon: FaHeart },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-teal-600 text-white p-3 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-[73px] left-0 z-40
        w-64 bg-white shadow-lg h-[calc(100vh-73px)]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
