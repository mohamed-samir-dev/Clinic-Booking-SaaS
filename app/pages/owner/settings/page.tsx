'use client';

import { useSettingsData } from './hooks/useSettingsData';
import { OwnerAccountSection, ClinicInfoSection } from './components';
import { useLanguage } from '@/app/contexts/LanguageContext';

const t = {
  ar: {
    title: 'إعدادات النظام',
    subtitle: 'إدارة إعدادات النظام والتفضيلات',
  },
  en: {
    title: 'System Settings',
    subtitle: 'Manage system configuration and preferences',
  },
} as const;

export default function SystemSettingsPage() {
  const { loading, clinicData, setClinicData, ownerData, setOwnerData, fetchData } = useSettingsData();
  const { locale } = useLanguage();
  const tr = t[locale as 'ar' | 'en'];
  const isRtl = locale === 'ar';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{tr.title}</h1>
          <p className="text-gray-400">{tr.subtitle}</p>
        </div>

        <div className="space-y-6">
          <OwnerAccountSection 
            ownerData={ownerData} 
            setOwnerData={setOwnerData} 
            fetchData={fetchData} 
          />
          <ClinicInfoSection 
            clinicData={clinicData} 
            setClinicData={setClinicData} 
            fetchData={fetchData} 
          />
        </div>
      </div>
    </div>
  );
}
