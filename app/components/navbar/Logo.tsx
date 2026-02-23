'use client';
import Link from 'next/link';
import { FaHeartbeat } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/" className="flex items-center gap-2 md:gap-3 group">
      <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
        <FaHeartbeat className="text-white text-xl md:text-2xl" />
      </div>
      <span className="text-xl md:text-2xl font-bold transition-colors">
        <span className="text-teal-600">Care</span>
        <span className={`group-hover:text-teal-700 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Sync</span>
      </span>
    </Link>
  );
}
