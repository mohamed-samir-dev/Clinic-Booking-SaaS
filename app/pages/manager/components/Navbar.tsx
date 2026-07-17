'use client';
import { useState, useEffect } from 'react';
import { LogOut, Menu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ManagerData {
  name: string;
  profileImage: string | null;
  clinicName: string | { ar?: string; en?: string };
}

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [managerData, setManagerData] = useState<ManagerData>({ 
    name: '', 
    profileImage: null, 
    clinicName: '' 
  });
  const { locale, toggleLanguage } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setManagerData({
            name: data.name,
            profileImage: data.profileImage,
            clinicName: data.clinicName
          });
        }
      } catch  {}
    };
    fetchManagerData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/pages/login');
  };

  const getClinicName = () => {
    if (!managerData.clinicName) return locale === 'ar' ? 'جاري التحميل...' : 'Loading...';
    if (typeof managerData.clinicName === 'object') {
      return locale === 'ar' 
        ? (managerData.clinicName.ar || managerData.clinicName.en || 'N/A')
        : (managerData.clinicName.en || managerData.clinicName.ar || 'N/A');
    }
    return managerData.clinicName;
  };

  return (
    <nav className={`bg-gray-800 h-16 fixed top-0 z-20 border-b border-gray-700 ${
      locale === 'ar' ? 'right-0 left-0 xl:right-64' : 'left-0 right-0 xl:left-64'
    }`}>
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="xl:hidden p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
            <Menu size={24} />
          </button>
          <div className="text-white">
            <p className="text-sm text-gray-400 hidden sm:block">{locale === 'ar' ? 'إدارة' : 'Managing'}</p>
            <p className="font-semibold text-sm sm:text-base">{getClinicName()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-semibold transition-colors"
          >
            {locale === 'en' ? 'عربي' : 'EN'}
          </button>
          <div className={`hidden sm:flex items-center gap-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
              <p className="text-sm font-semibold text-white">{managerData.name || (locale === 'ar' ? 'جاري التحميل...' : 'Loading...')}</p>
              <p className="text-xs text-gray-400">{locale === 'ar' ? 'مدير' : 'Manager'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
              {managerData.profileImage ? (
                <Image src={managerData.profileImage} alt={managerData.name} width={40} height={40} className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-teal-600 text-white font-semibold">
                  {managerData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <div className="sm:hidden w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
            {managerData.profileImage ? (
              <Image src={managerData.profileImage} alt={managerData.name} width={32} height={32} className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-teal-600 text-white text-sm font-semibold">
                {managerData.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors" title={locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}>
            <LogOut size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>
      </div>
    </nav>
  );
}
