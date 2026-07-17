'use client';

import { Plus, UserCog, Building2, Users, FileText, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuickActionsTilesProps {
  locale: 'ar' | 'en';
  onAddClinic: () => void;
  onAssignManager: () => void;
  onViewClinics: () => void;
  onViewManagers: () => void;
}

const t = {
  ar: {
    title: 'إجراءات سريعة',
    addClinic: 'إضافة عيادة جديدة',
    addClinicDesc: 'تسجيل عيادة جديدة',
    assignManager: 'تعيين مدير',
    assignManagerDesc: 'تعيين مدير للعيادة',
    viewClinics: 'عرض جميع العيادات',
    viewClinicsDesc: 'إدارة جميع العيادات',
    viewManagers: 'عرض جميع المديرين',
    viewManagersDesc: 'إدارة جميع المديرين',
    reports: 'التقارير المالية',
    reportsDesc: 'عرض التقارير التفصيلية',
    settings: 'إعدادات النظام',
    settingsDesc: 'تكوين النظام',
  },
  en: {
    title: 'Quick Actions',
    addClinic: 'Add New Clinic',
    addClinicDesc: 'Register a new clinic',
    assignManager: 'Assign Manager',
    assignManagerDesc: 'Assign manager to clinic',
    viewClinics: 'View All Clinics',
    viewClinicsDesc: 'Manage all clinics',
    viewManagers: 'View All Managers',
    viewManagersDesc: 'Manage all managers',
    reports: 'Financial Reports',
    reportsDesc: 'View detailed reports',
    settings: 'System Settings',
    settingsDesc: 'Configure system',
  },
} as const;

export const QuickActionsTiles = ({ locale, onAddClinic, onAssignManager, onViewClinics, onViewManagers }: QuickActionsTilesProps) => {
  const router = useRouter();
  const tr = t[locale];

  const actions = [
    { title: tr.addClinic, description: tr.addClinicDesc, icon: Plus, color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400', action: onAddClinic },
    { title: tr.assignManager, description: tr.assignManagerDesc, icon: UserCog, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400', action: onAssignManager },
    { title: tr.viewClinics, description: tr.viewClinicsDesc, icon: Building2, color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400', action: onViewClinics },
    { title: tr.viewManagers, description: tr.viewManagersDesc, icon: Users, color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400', action: onViewManagers },
    { title: tr.reports, description: tr.reportsDesc, icon: FileText, color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400', action: () => router.push('/pages/owner/reports') },
    { title: tr.settings, description: tr.settingsDesc, icon: Settings, color: 'bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400', action: () => router.push('/pages/owner/settings') },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{tr.title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={action.action}
              className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-md transition-all ${locale === 'ar' ? 'text-right' : 'text-left'} group`}
            >
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{action.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
