import { useState } from 'react';
import { ClinicPerformance } from '../types';
import { ArrowUpDown, Eye, UserCog, Ban, Download } from 'lucide-react';

interface ClinicsTableProps {
  clinics: ClinicPerformance[];
  onViewClinic: (clinicId: string) => void;
  onAssignManager: (clinicId: string) => void;
  onDisableManager: (clinicId: string) => void;
}

type SortField = 'revenue' | 'appointments' | 'rating' | 'clinicName';
type SortOrder = 'asc' | 'desc';

export const ClinicsTable = ({ clinics, onViewClinic, onAssignManager, onDisableManager }: ClinicsTableProps) => {
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    if (typeof name === 'object' && name !== null) return name.en || name.ar || '';
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
    const headers = ['Clinic Name', 'Manager', 'Revenue', 'Appointments', 'Doctors', 'Rating'];
    const rows = filteredClinics.map(c => [
      getClinicName(c.clinicName),
      `${c.managerName} (${c.managerEmail})`,
      c.revenue,
      c.appointments,
      c.doctors,
      c.rating
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Clinics Performance</h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search clinics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
            />
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort('clinicName')}
              >
                <div className="flex items-center gap-2">
                  Clinic Name
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Manager
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center gap-2">
                  Revenue
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort('appointments')}
              >
                <div className="flex items-center gap-2">
                  Appointments
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Doctors
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center gap-2">
                  Rating
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedClinics.map((clinic) => (
              <tr key={clinic.clinicId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onViewClinic(clinic.clinicId)}
                    className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
                  >
                    {getClinicName(clinic.clinicName)}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{clinic.managerName || 'N/A'}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{clinic.managerEmail || 'No manager'}</div>
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
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 dark:text-white">{typeof clinic.rating === 'number' ? clinic.rating.toFixed(1) : 'N/A'}</span>
                    <span className="text-yellow-400 ml-1">★</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewClinic(clinic.clinicId)}
                      className="text-teal-600 hover:text-teal-700 dark:text-teal-400 p-1"
                      title="View Clinic"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAssignManager(clinic.clinicId)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 p-1"
                      title="Assign Manager"
                    >
                      <UserCog className="w-4 h-4" />
                    </button>
                    {clinic.managerEmail && (
                      <button
                        onClick={() => onDisableManager(clinic.clinicId)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 p-1"
                        title="Disable Manager"
                      >
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
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredClinics.length)} of {filteredClinics.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
