'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { LanguageProvider, useLanguage } from '@/app/contexts/LanguageContext';

function OwnerContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { locale } = useLanguage();
  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <main className={`pt-16 bg-gray-900 ${isRtl ? 'xl:mr-64' : 'xl:ml-64'}`}>
        {children}
      </main>
    </div>
  );
}

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRaw = localStorage.getItem('user');

    if (!token || !userRaw) {
      router.replace('/pages/login');
      return;
    }

    try {
      const user = JSON.parse(userRaw);
      if (user.role !== 'owner') {
        const roleRedirects: Record<string, string> = {
          manager: '/pages/manager',
          doctor: '/pages/doctor',
          patient: '/',
        };
        router.replace(roleRedirects[user.role] || '/');
        return;
      }
      setAuthorized(true);
    } catch {
      router.replace('/pages/login');
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <LanguageProvider>
      <OwnerContent>{children}</OwnerContent>
    </LanguageProvider>
  );
}
