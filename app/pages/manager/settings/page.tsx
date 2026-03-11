'use client';

import { useState, useEffect, useCallback } from 'react';
import { Settings, Save } from 'lucide-react';
import { ClinicInfoForm } from './components/ClinicInfoForm';
import { WorkingHoursForm } from './components/WorkingHoursForm';
import toast from 'react-hot-toast';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    title: 'إعدادات العيادة',
    subtitle: 'إدارة معلومات وإعدادات عيادتك',
    saveChanges: 'حفظ التغييرات',
    saving: 'جاري الحفظ...',
    errorLoading: 'خطأ في تحميل الإعدادات',
    failedToLoad: 'فشل تحميل بيانات العيادة',
    loadingFailed: 'فشل تحميل بيانات العيادة',
    updateSuccess: 'تم تحديث إعدادات العيادة بنجاح',
    updateFailed: 'فشل تحديث إعدادات العيادة'
  },
  en: {
    title: 'Clinic Settings',
    subtitle: 'Manage your clinic information and settings',
    saveChanges: 'Save Changes',
    saving: 'Saving...',
    errorLoading: 'Error Loading Settings',
    failedToLoad: 'Failed to load clinic data',
    loadingFailed: 'Failed to load clinic data',
    updateSuccess: 'Clinic settings updated successfully',
    updateFailed: 'Failed to update clinic settings'
  }
};

export interface ClinicData {
  name: string | { en: string; ar: string };
  address: string | { en: string; ar: string };
  phone: string;
  email: string;
  description: string | { en: string; ar: string };
  facilities: Array<string | { en: string; ar: string }>;
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  slotDuration: number;
}

export default function SettingsPage() {
  const [clinicData, setClinicData] = useState<ClinicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState<Language>('ar');

  const fetchClinicData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/manager/clinic', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setClinicData(data);
      }
    } catch {
      toast.error(translations[language].loadingFailed);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    const savedLang = localStorage.getItem('managerLang') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }

    const handleLanguageChange = () => {
      const newLang = localStorage.getItem('managerLang') as Language;
      if (newLang) {
        setLanguage(newLang);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    fetchClinicData();
    
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, [fetchClinicData]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/manager/clinic', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clinicData),
      });
      if (response.ok) {
        toast.success(translations[language].updateSuccess);
      }
    } catch {
      toast.error(translations[language].updateFailed);
    } finally {
      setSaving(false);
    }
  };

  const t = translations[language];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-3 sm:p-4 md:p-6">
        <div className="animate-pulse space-y-4 sm:space-y-6">
          <div className="h-8 bg-gray-800 rounded w-48 sm:w-64"></div>
          <div className="h-64 sm:h-96 bg-gray-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!clinicData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{t.errorLoading}</h2>
          <p className="text-sm sm:text-base text-gray-400">{t.failedToLoad}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-3 sm:p-4 md:p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Settings className="text-teal-400" size={24} />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{t.title}</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400">{t.subtitle}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50 w-full sm:w-auto justify-center"
        >
          <Save size={18} className="text-white sm:w-5 sm:h-5" />
          <span className="text-white font-medium text-sm sm:text-base">{saving ? t.saving : t.saveChanges}</span>
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <ClinicInfoForm clinicData={clinicData} setClinicData={setClinicData} language={language} />
        <WorkingHoursForm clinicData={clinicData} setClinicData={setClinicData} language={language} />
      </div>
    </div>
  );
}
