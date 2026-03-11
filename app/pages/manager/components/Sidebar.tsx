'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, UserCog, Star, Settings, Clock, MessageSquare, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Language = 'ar' | 'en';

const translations = {
  ar: {
    careSync: 'كير سينك',
    managerPortal: 'بوابة المدير',
    dashboard: 'لوحة التحكم',
    appointments: 'المواعيد',
    doctors: 'الأطباء',
    schedule: 'الجدول',
    patients: 'المرضى',
    reviews: 'التقييمات',
    transferRequests: 'طلبات التحويل',
    clinicSettings: 'إعدادات العيادة'
  },
  en: {
    careSync: 'CareSync',
    managerPortal: 'Manager Portal',
    dashboard: 'Dashboard',
    appointments: 'Appointments',
    doctors: 'Doctors',
    schedule: 'Schedule',
    patients: 'Patients',
    reviews: 'Reviews',
    transferRequests: 'Transfer Requests',
    clinicSettings: 'Clinic Settings'
  }
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('managerLang') as Language;
    return savedLang || 'ar';
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLang = localStorage.getItem('managerLang') as Language;
      if (newLang) {
        setLanguage(newLang);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const t = translations[language];

  const menuItems = [
    { name: t.dashboard, icon: LayoutDashboard, href: '/pages/manager/dashboard' },
    { name: t.appointments, icon: Calendar, href: '/pages/manager/appointments' },
    { name: t.doctors, icon: UserCog, href: '/pages/manager/doctors' },
    { name: t.schedule, icon: Clock, href: '/pages/manager/schedule' },
    { name: t.patients, icon: Users, href: '/pages/manager/patients' },
    { name: t.reviews, icon: Star, href: '/pages/manager/reviews' },
    { name: t.transferRequests, icon: MessageSquare, href: '/pages/manager/transfer-requests' },
    { name: t.clinicSettings, icon: Settings, href: '/pages/manager/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile - only shows when sidebar is open */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 xl:hidden ${
          isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside className={`w-64 bg-gray-800 border-gray-700 h-screen fixed top-0 z-50 transition-transform duration-300 ${
        language === 'ar' ? 'right-0 border-l' : 'left-0 border-r'
      } ${
        isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full xl:translate-x-0' : '-translate-x-full xl:translate-x-0'
      }`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-teal-400">{t.careSync}</h2>
            <p className="text-xs text-gray-400 mt-1">{t.managerPortal}</p>
          </div>
          <button onClick={onClose} className="xl:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100vh-88px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
