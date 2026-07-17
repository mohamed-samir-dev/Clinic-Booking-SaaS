import { useState } from 'react';
import { ClinicPerformance } from '../types';
import { ArrowUpDown, Eye, UserCog, Ban, Download } from 'lucide-react';

interface ClinicsTableProps {
  locale: 'ar' | 'en';
  clinics: ClinicPerformance[];
  onViewClinic: (clinicId: string) => void;
  onAssignManager: (clinicId: string) => void;
  onDisableManager: (clinicId: string) => void;
}

type SortField = 'revenue' | 'appointments' | 'rating' | 'clinicName';
type SortOrder = 'asc' | 'desc';

const t = {
  ar: {
    title: 'أداء العيادات',
    search: 'بحث عن عيادة...',
    allStatus: 'جميع الحالات',
    active: 'نشط',
    inactive: 'غير نشط',
    exportCSV: 'تصدير CSV',
    clinicName: 'اسم العيادة',
    manager: 'المدير',
    revenue: 'الإيرادات',
    appointments: 'المواعيد',
    doctors: 'الأطباء',
    rating: 'التقييم',
    actions: 'الإجراءات',
    noManager: 'لا يوجد مدير',
    showing: 'عرض',
    to: 'إلى',
    of: 'من',
    results: 'نتيجة',
    previous: 'السابق',
    next: 'التالي',
  },
  en: {
    title: 'Clinics Performance',
    search: 'Search clinics...',
    allStatus: 'All Status',
    active: 'Active',
    inactive: 'Inactive',
    exportCSV: 'Export CSV',
    clinicName: 'Clinic Name',
    manager: 'Manager',
    revenue: 'Revenue',
    appointments: 'Appointments',
    doctors: 'Doctors',
    rating: 'Rating',
    actions: 'Actions',
    noManager: 'No manager',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    results: 'results',
    previous: 'Previous',
    next: 'Next',
  },
} as const;

export const ClinicsTable = ({ locale, clinics, onViewClinic, onAssignManager, onDisableManager }: ClinicsTableProps) => {
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const tr = t[locale];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getClinicName = (name: string | { en?: string; ar?: string } | null | undefined): string => {
    if (typeof name === 'string') return name;
    if (typeof name === 'object' && name !== null) {
      return locale === 'ar' ? (name.ar || name.en || '') : (name.en || name.ar || '');
    }
    return '';
  };

  const filteredClinics = clinics
    .filter(clinic => {
      const clinicName = getClinicName(clinic.clinicName);
      const matchesSearch = clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           String(clinic.managerEmail || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' ||
                           (filterStatus === 'active' && clinic.isActive) ||
                           (filterStatus === 'inactive' && !clinic.isActive);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'clinicName') {
        return multiplier * getClinicName(a.clinicName).localeCompare(getClinicName(b.clinicName));
      }
      return multiplier * ((a[sortField] || 0) - (b[sortField] || 0));
    });

  const totalPages = Math.ceil(filteredClinics.length / itemsPerPage);
  const paginatedClinics = filteredClinics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportToCSV = () => {
    const headers = [tr.clinicName, tr.manager, tr.revenue, tr.appointments, tr.doctors, tr.rating];
    const rows = filteredClinics.map(c => [
      getClinicName(c.clinicName),
      `${c.managerName} (${c.managerEmail})`,
      c.revenue, c.appointments, c.doctors, c.rating
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clinics-performance.csv';
    a.click();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tr.title}</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder={tr.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">{tr.allStatus}</option>
              <option value="active">{tr.active}</option>
              <option value="inactive">{tr.inactive}</option>
            </select>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {tr.exportCSV}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {[
                { label: tr.clinicName, field: 'clinicName' as SortField, sortable: true },
                { label: tr.manager, field: null, sortable: false },
                { label: tr.revenue, field: 'revenue' as SortField, sortable: true },
                { label: tr.appointments, field: 'appointments' as SortField, sortable: true },
                { label: tr.doctors, field: null, sortable: false },
                { label: tr.rating, field: 'rating' as SortField, sortable: true },
              ].map(({ label, field, sortable }) => (
                <th
                  key={label}
                  className={`px-6 py-3 text-${locale === 'ar' ? 'right' : 'left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''}`}
                  onClick={() => sortable && field && handleSort(field)}
                >
                  <div className={`flex items-center gap-2 ${locale === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                    {label}
                    {sortable && <ArrowUpDown className="w-4 h-4" />}
                  </div>
                </th>
              ))}
              <th className={`px-6 py-3 text-${locale === 'ar' ? 'left' : 'right'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                {tr.actions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedClinics.map((clinic) => (
              <tr key={clinic.clinicId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{getClinicName(clinic.clinicName)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{clinic.managerName || 'N/A'}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{clinic.managerEmail || tr.noManager}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  ${clinic.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {clinic.appointments}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {clinic.doctors}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-900 dark:text-white">{typeof clinic.rating === 'number' ? clinic.rating.toFixed(1) : 'N/A'}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-${locale === 'ar' ? 'left' : 'right'} text-sm font-medium`}>
                  <div className={`flex items-center ${locale === 'ar' ? 'justify-start' : 'justify-end'} gap-2`}>
                    <button onClick={() => onViewClinic(clinic.clinicId)} className="text-teal-600 hover:text-teal-700 dark:text-teal-400 p-1" title={locale === 'ar' ? 'عرض العيادة' : 'View Clinic'}>
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onAssignManager(clinic.clinicId)} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 p-1" title={locale === 'ar' ? 'تعيين مدير' : 'Assign Manager'}>
                      <UserCog className="w-4 h-4" />
                    </button>
                    {clinic.managerEmail && (
                      <button onClick={() => onDisableManager(clinic.clinicId)} className="text-red-600 hover:text-red-700 dark:text-red-400 p-1" title={locale === 'ar' ? 'تعطيل المدير' : 'Disable Manager'}>
                        <Ban className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {tr.showing} {((currentPage - 1) * itemsPerPage) + 1} {tr.to} {Math.min(currentPage * itemsPerPage, filteredClinics.length)} {tr.of} {filteredClinics.length} {tr.results}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
            >
              {tr.previous}
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
            >
              {tr.next}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
