'use client';

import { useTranslations } from 'next-intl';
import { Clinic } from '../hooks/useReportsData';
import { Building2, MapPin, UserCog, Users, Stethoscope, Calendar, DollarSign } from 'lucide-react';

interface ClinicsTableProps {
  clinics: Clinic[];
  locale: string;
}

type MultilingualField = { en?: string; ar?: string } | string;

const getDisplayValue = (field: MultilingualField, locale: string): string => {
  if (typeof field === 'object' && field !== null) {
    return locale === 'ar' ? (field.ar || field.en || '') : (field.en || field.ar || '');
  }
  return field || '';
};

export const ClinicsTable = ({ clinics, locale }: ClinicsTableProps) => {
  const t = useTranslations('owner.reports');
  const isRtl = locale === 'ar';

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Building2 className="text-teal-400" size={24} />
          <h2 className="text-xl font-bold text-white">{t('clinicsTable.title')}</h2>
          <span className="ms-auto bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {clinics.length} {t('clinicsTable.total')}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className={`px-6 py-4 text-${isRtl ? 'right' : 'left'} text-xs font-semibold text-gray-400 uppercase tracking-wider`}>
                {t('clinicsTable.columns.clinic')}
              </th>
              <th className={`px-6 py-4 text-${isRtl ? 'right' : 'left'} text-xs font-semibold text-gray-400 uppercase tracking-wider`}>
                {t('clinicsTable.columns.manager')}
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t('clinicsTable.columns.doctors')}
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t('clinicsTable.columns.patients')}
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t('clinicsTable.columns.appointments')}
              </th>
              <th className={`px-6 py-4 text-${isRtl ? 'left' : 'right'} text-xs font-semibold text-gray-400 uppercase tracking-wider`}>
                {t('clinicsTable.columns.revenue')}
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t('clinicsTable.columns.status')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {clinics.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  {t('clinicsTable.noClinics')}
                </td>
              </tr>
            ) : (
              clinics.map((clinic) => {
                const revenue = clinic.revenue ?? clinic.monthlyRevenue ?? 0;
                return (
                  <tr key={clinic._id || clinic.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                          <Building2 size={24} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{getDisplayValue(clinic.name as MultilingualField, locale)}</p>
                          <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                            <MapPin size={12} />
                            {getDisplayValue(clinic.location as MultilingualField, locale)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <UserCog size={16} className="text-teal-400" />
                        <span className="text-white">
                          {getDisplayValue(clinic.manager as MultilingualField, locale) || t('clinicsTable.notAssigned')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Stethoscope size={16} className="text-blue-400" />
                        <span className="text-white font-medium">{clinic.doctors}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Users size={16} className="text-purple-400" />
                        <span className="text-white font-medium">{clinic.patients}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar size={16} className="text-orange-400" />
                        <span className="text-white font-medium">{clinic.appointments}</span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-${isRtl ? 'left' : 'right'}`}>
                      <div className={`flex items-center justify-${isRtl ? 'start' : 'end'} gap-2`}>
                        <DollarSign size={16} className="text-green-400" />
                        <span className="text-white font-semibold">
                          ${revenue.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        clinic.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {clinic.status === 'active' ? t('status.active') : t('status.inactive')}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
