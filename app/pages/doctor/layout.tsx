'use client';

import Sidebar from './components/Sidebar';
import { useState } from 'react';

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-emerald-50 overflow-hidden">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-teal-100 xl:hidden"
      >
        <span className="material-icons text-teal-600">menu</span>
      </button>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 h-screen overflow-y-auto p-2 md:p-4">
        <div className="h-full bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-teal-200/50 border border-teal-100/50 overflow-hidden xl:mt-0 mt-14">
          {children}
        </div>
      </main>
    </div>
  );
}
