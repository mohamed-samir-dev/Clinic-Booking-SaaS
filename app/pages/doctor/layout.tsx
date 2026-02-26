'use client';

import Sidebar from './components/Sidebar';
import { useState } from 'react';
import { ThemeProvider, useTheme } from '@/app/contexts/ThemeContext';

function LayoutContent({ 
  children, 
  sidebarOpen, 
  setSidebarOpen 
}: { 
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen overflow-hidden transition-colors ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-linear-to-br from-teal-50 via-cyan-50 to-emerald-50'
    }`}>
      <button
        onClick={() => setSidebarOpen(true)}
        className={`fixed top-4 left-4 z-50 p-2 rounded-xl shadow-lg border xl:hidden ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-teal-100'
        }`}
      >
        <span className={`material-icons ${
          theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
        }`}>menu</span>
      </button>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 h-screen overflow-y-auto p-2 md:p-4">
        <div className={`h-full rounded-2xl md:rounded-3xl shadow-2xl border overflow-hidden xl:mt-0 mt-14 ${
          theme === 'dark'
            ? 'bg-gray-800 shadow-gray-900/50 border-gray-700'
            : 'bg-white shadow-teal-200/50 border-teal-100/50'
        }`}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <LayoutContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        {children}
      </LayoutContent>
    </ThemeProvider>
  );
}
