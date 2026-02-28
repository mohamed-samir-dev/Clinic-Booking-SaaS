'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaHeartbeat, FaCalendarAlt, FaHeart } from 'react-icons/fa';

const menuItems = [
  { href: '/pages/patient/profile', label: 'Personal Info', labelAr: 'المعلومات الشخصية', icon: FaUser },
  { href: '/pages/patient/profile/medical', label: 'Medical Info', labelAr: 'المعلومات الطبية', icon: FaHeartbeat },
  { href: '/pages/patient/profile/appointments', label: 'Appointments', labelAr: 'المواعيد', icon: FaCalendarAlt },
  { href: '/pages/patient/profile/favorites', label: 'Favorites', labelAr: 'المفضلة', icon: FaHeart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-lg h-[calc(100vh-73px)] sticky top-[73px]">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
  );
}
