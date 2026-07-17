'use client';
import { useState, useEffect } from 'react';
import { LogOut, Menu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface OwnerData {
  name: string;
  profileImage: string | null;
}

const PROFILE_CACHE_KEY = 'owner_profile_cache';

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [ownerData, setOwnerData] = useState<OwnerData>({ name: '', profileImage: null });
  const router = useRouter();
  const { locale, toggleLanguage } = useLanguage();
  const isRtl = locale === 'ar';

  useEffect(() => {
    try {
      const cached = localStorage.getItem(PROFILE_CACHE_KEY);
      if (cached) setOwnerData(JSON.parse(cached));
    } catch {}
  }, []);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setOwnerData(data);
          localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(data));
        }
      } catch {}
    };
    fetchOwnerData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const loadingText = isRtl ? 'جاري التحميل...' : 'Loading...';
  const adminText = isRtl ? 'مدير النظام' : 'Admin';
  const logoutTitle = isRtl ? 'تسجيل الخروج' : 'Logout';

  return (
    <nav className={`bg-gray-800 h-16 fixed top-0 z-10 ${isRtl ? 'right-0 left-0 xl:right-64' : 'left-0 right-0 xl:left-64'}`}>
      <div className="h-full px-6 flex items-center justify-between xl:justify-end" dir={isRtl ? 'rtl' : 'ltr'}>
        <button
          onClick={onMenuClick}
          className="xl:hidden p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-semibold transition-colors"
          >
            {locale === 'en' ? 'عربي' : 'EN'}
          </button>
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <p className="text-sm font-semibold text-white">{ownerData.name || loadingText}</p>
              <p className="text-xs text-gray-400">{adminText}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
              {ownerData.profileImage ? (
                <Image src={ownerData.profileImage} alt={ownerData.name} width={40} height={40} className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-teal-600 text-white font-semibold">
                  {ownerData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors" title={logoutTitle}>
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
