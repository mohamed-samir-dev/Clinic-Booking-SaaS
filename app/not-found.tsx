'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useAppSelector } from '@/app/store/hooks';
import { Home, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import messagesEn from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

function getDashboardLink(role?: string) {
  switch (role) {
    case 'manager': return '/pages/manager/dashboard';
    case 'doctor': return '/pages/doctor';
    case 'owner': return '/pages/owner/dashboard';
    default: return null;
  }
}

export default function NotFound() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const user = useAppSelector((state) => state.auth.user);
  const dark = theme === 'dark';
  const t = locale === 'ar' ? messagesAr.notFound : messagesEn.notFound;
  const dashboardLink = getDashboardLink(user?.role);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Floating background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${dark ? 'bg-teal-500' : 'bg-teal-300'}`} />
        <div className={`absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 ${dark ? 'bg-teal-700' : 'bg-teal-200'}`} />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* Animated 404 with pulse ring */}
        <div className="relative inline-block mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className={`absolute inset-0 rounded-full blur-2xl opacity-30 ${dark ? 'bg-teal-500' : 'bg-teal-400'}`}
            style={{ transform: 'scale(1.5)' }}
          />
          <h1 className={`text-[10rem] leading-none font-black relative ${dark ? 'text-teal-400' : 'text-teal-600'}`}>
            {t.title}
          </h1>
        </div>

        {/* Stethoscope icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="text-6xl mb-4"
        >
          🩺
        </motion.div>

        <p className={`text-sm font-medium mb-2 ${dark ? 'text-teal-400' : 'text-teal-600'}`}>
          {t.lostMessage}
        </p>
        <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
          {t.heading}
        </h2>
        <p className={`mb-8 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.description}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition-all hover:scale-105 shadow-lg shadow-teal-600/25"
          >
            <Home size={18} />
            {t.goHome}
          </Link>

          {dashboardLink && (
            <Link
              href={dashboardLink}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 ${dark ? 'bg-gray-800 text-teal-400 hover:bg-gray-700' : 'bg-white text-teal-600 hover:bg-gray-100 shadow-md'}`}
            >
              <LayoutDashboard size={18} />
              {t.goToDashboard}
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
