'use client';

import { useTranslations } from 'next-intl';
import { useReportsData } from './hooks/useReportsData';
import { ManagersTable } from './components/ManagersTable';
import { ClinicsTable } from './components/ClinicsTable';
import { StatCard } from './components/StatCard';
import { Building2, UserCog, Users, FileText } from 'lucide-react';

export default function ReportsPage() {
  const { managers, clinics, loading } = useReportsData();
  const t = useTranslations('owner.reports');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const totalDoctors = clinics.reduce((sum, clinic) => sum + (clinic.doctors || 0), 0);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-full">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-teal-400" size={32} />
            <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
          </div>
          <p className="text-gray-400">{t('description')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title={t('stats.totalClinics')}
            value={clinics.length}
            icon={Building2}
            color="bg-gradient-to-br from-teal-500 to-teal-600"
            href="/pages/owner/clinics"
          />
          <StatCard
            title={t('stats.totalManagers')}
            value={managers.length}
            icon={UserCog}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            href="/pages/owner/managers"
          />
          <StatCard
            title={t('stats.totalDoctors')}
            value={totalDoctors}
            icon={Users}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            href="/pages/owner/doctors"
          />
        </div>

        <div className="space-y-6">
          <ManagersTable managers={managers} />
          <ClinicsTable clinics={clinics} />
        </div>
      </div>
    </div>
  );
}
