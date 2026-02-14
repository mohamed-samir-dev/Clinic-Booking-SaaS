'use client';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />
      <main className="ml-64 pt-16">
        {children}
      </main>
    </div>
  );
}
