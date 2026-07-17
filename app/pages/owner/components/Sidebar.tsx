'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Building2, UserCog, Settings, FileText } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

const t = {
  ar: {
    dashboard: 'لوحة التحكم',
    clinics: 'إدارة العيادات',
    doctors: 'إدارة الأطباء',
    managers: 'إدارة المديرين',
    reports: 'التقارير',
    settings: 'إعدادات النظام',
  },
  en: {
    dashboard: 'Dashboard',
    clinics: 'Manage Clinics',
    doctors: 'Manage Doctors',
    managers: 'Manage Managers',
    reports: 'Reports',
    settings: 'System Settings',
  },
} as const;

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'];
  const isRtl = locale === 'ar';

  const menuItems = [
    { name: tr.dashboard, icon: LayoutDashboard, href: '/pages/owner/dashboard' },
    { name: tr.clinics, icon: Building2, href: '/pages/owner/clinics' },
    { name: tr.doctors, icon: Users, href: '/pages/owner/doctors' },
    { name: tr.managers, icon: UserCog, href: '/pages/owner/managers' },
    { name: tr.reports, icon: FileText, href: '/pages/owner/reports' },
    { name: tr.settings, icon: Settings, href: '/pages/owner/settings' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 xl:hidden" onClick={onClose} />
      )}
      <aside className={`w-64 bg-gray-800 border-gray-700 h-screen fixed top-0 z-30 transition-transform duration-300 ${
        isRtl
          ? 'right-0 border-l ' + (isOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0')
          : 'left-0 border-r ' + (isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0')
      }`}>
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-teal-400">CareSync</h2>
        </div>
        <nav className="p-4" dir={isRtl ? 'rtl' : 'ltr'}>
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
