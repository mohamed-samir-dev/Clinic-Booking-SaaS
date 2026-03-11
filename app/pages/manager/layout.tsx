'use client';

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

type Language = 'ar' | 'en';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-900">
      <Toaster position="top-center" toastOptions={{
        style: {
          marginTop: '50vh',
          transform: 'translateY(-50%)',
        },
      }} />
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} style={{ isolation: 'isolate' }}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
      </div>
      <main className={language === 'ar' ? 'xl:mr-64 pt-16 bg-gray-900' : 'xl:ml-64 pt-16 bg-gray-900'}>
        {children}
      </main>
    </div>
  );
}
