import React from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useTranslations } from 'next-intl';

interface AppointmentTabsProps {
  activeTab: 'upcoming' | 'past' | 'cancelled';
  setActiveTab: (tab: 'upcoming' | 'past' | 'cancelled') => void;
}

export function AppointmentTabs({ activeTab, setActiveTab }: AppointmentTabsProps) {
  const { theme } = useTheme();
  const t = useTranslations('patient.appointments.tabs');
  
  return (
    <div className={`rounded-xl shadow-sm p-1 mb-6 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex flex-col min-[400px]:flex-row gap-1">
        {(['upcoming', 'past', 'cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all text-sm ${
              activeTab === tab
                ? 'bg-teal-600 text-white shadow-md'
                : theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t(tab)}
          </button>
        ))}
      </div>
    </div>
  );
}
