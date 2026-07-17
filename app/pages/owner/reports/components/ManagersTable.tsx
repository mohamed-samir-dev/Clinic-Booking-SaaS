'use client';

import { useTranslations } from 'next-intl';
import { Manager } from '../hooks/useReportsData';
import { UserCog, Mail, Phone, Building2, Calendar } from 'lucide-react';

interface ManagersTableProps {
  managers: Manager[];
  locale: string;
}

type MultilingualField = { en?: string; ar?: string } | string;

const getDisplayValue = (field: MultilingualField, locale: string): string => {
  if (typeof field === 'object' && field !== null) {
    return locale === 'ar' ? (field.ar || field.en || '') : (field.en || field.ar || '');
  }
  return field || '';
};

export const ManagersTable = ({ managers, locale }: ManagersTableProps) => {
  const t = useTranslations('owner.reports');
  const isRtl = locale === 'ar';

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <UserCog className="text-teal-400" size={24} />
          <h2 className="text-xl font-bold text-white">{t('managersTable.title')}</h2>
          <span className="ms-auto bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {managers.length} {t('managersTable.total')}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className={`px-6 py-4 text-${isRtl ? 'right' : 'left'} text-xs font-semibold text-gray-400 uppercase tracking-wider`}>
                {t('managersTable.columns.manager')}
              </th>
              <th className={`px-6 py-4 text-${isRtl ? 'right' : 'left'} text-xs font-semibold text-gray-400 uppercase tracking-wider`}>
                {t('managersTable.columns.contact')}
              </th>
              <th className={`px-6 py-4 text-${isRtl ? 'right' : 'left'} text-xs font-semibold text-gray-400 uppercase tracking-wider`}>
                {t('managersTable.columns.clinic')}
              </th>
              <th className={`px-6 py-4 text-${isRtl ? 'right' : 'left'} text-xs font-semibold text-gray-400 uppercase tracking-wider`}>
                {t('managersTable.columns.assignedDate')}
              </th>
              <th className={`px-6 py-4 text-${isRtl ? 'right' : 'left'} text-xs font-semibold text-gray-400 uppercase tracking-wider`}>
                {t('managersTable.columns.status')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {managers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  {t('managersTable.noManagers')}
                </td>
              </tr>
            ) : (
              managers.map((manager) => (
                <tr key={manager._id || manager.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                        <UserCog size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{getDisplayValue(manager.name as MultilingualField, locale)}</p>
                        <p className="text-gray-400 text-sm">ID: {manager._id || manager.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Mail size={14} className="text-gray-400" />
                        {manager.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Phone size={14} className="text-gray-400" />
                        {manager.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-teal-400" />
                      <span className="text-white">{getDisplayValue(manager.clinicName as MultilingualField, locale)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} className="text-gray-400" />
                      {manager.assignedDate
                        ? new Date(manager.assignedDate).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : t('managersTable.notAvailable')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      manager.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {manager.status === 'active' ? t('status.active') : t('status.inactive')}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
