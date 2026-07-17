'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <main className="xl:ml-64 pt-16 bg-gray-900">
        {children}
      </main>
    </div>
  );
}
