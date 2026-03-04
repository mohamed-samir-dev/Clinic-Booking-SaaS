'use client';

import { useSettingsData } from './hooks/useSettingsData';
import { OwnerAccountSection, ClinicInfoSection } from './components';

export default function SystemSettingsPage() {
  const { loading, clinicData, setClinicData, ownerData, setOwnerData, fetchData } = useSettingsData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
          <p className="text-gray-400">Manage system configuration and preferences</p>
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
