'use client';
import Link from 'next/link';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

interface NavLinksProps {
  pathname: string;
}

export default function NavLinks({ pathname }: NavLinksProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.navbar : messages.navbar;

  const navItems = [
    { label: t.home, href: '/' },
    { label: t.services, href: '/pages/services' },
    { label: t.doctors, href: '/pages/doctors' },
    { label: t.about, href: '/pages/about' },
    { label: t.contact, href: '/pages/contact' },
  ];

  return (
    <div className="hidden xl:flex items-center gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-5 py-2 rounded-lg transition-all font-medium ${
              isActive ? 'text-teal-700' : theme === 'dark' ? 'text-gray-200 hover:text-teal-400' : 'text-gray-700 hover:text-teal-700'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
