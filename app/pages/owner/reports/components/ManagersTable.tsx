import { Manager } from '../hooks/useReportsData';
import { UserCog, Mail, Phone, Building2, Calendar } from 'lucide-react';

interface ManagersTableProps {
  managers: Manager[];
}

type MultilingualField = { en?: string; ar?: string } | string;

const getDisplayValue = (field: MultilingualField): string => {
  if (typeof field === 'object' && field !== null) {
    return field.en || field.ar || '';
  }
  return field || '';
};

export const ManagersTable = ({ managers }: ManagersTableProps) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <UserCog className="text-teal-400" size={24} />
          <h2 className="text-xl font-bold text-white">All Managers</h2>
          <span className="ml-auto bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {managers.length} Total
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Manager
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Clinic
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Assigned Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {managers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  No managers found
                </td>
              </tr>
            ) : (
              managers.map((manager) => (
                <tr
                  key={manager._id || manager.id}
                  className="hover:bg-gray-750 transition-colors"
                >
                  <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
                      <UserCog size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{getDisplayValue(manager.name as MultilingualField)}</p>
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
                    <span className="text-white">{getDisplayValue(manager.clinicName as MultilingualField)}</span>
                  </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} className="text-gray-400" />
                      {manager.assignedDate ? new Date(manager.assignedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      manager.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {manager.status}
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
