import React from 'react';

interface AppointmentTabsProps {
  activeTab: 'upcoming' | 'past' | 'cancelled';
  setActiveTab: (tab: 'upcoming' | 'past' | 'cancelled') => void;
}

export function AppointmentTabs({ activeTab, setActiveTab }: AppointmentTabsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-1 mb-6">
      <div className="flex flex-col min-[400px]:flex-row gap-1">
        {(['upcoming', 'past', 'cancelled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all text-sm ${
              activeTab === tab
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
