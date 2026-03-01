'use client';

import Sidebar from './components/Sidebar';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <div className={`flex ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-[calc(100vh-73px)]">
        {children}
      </main>
    </div>
  );
}
