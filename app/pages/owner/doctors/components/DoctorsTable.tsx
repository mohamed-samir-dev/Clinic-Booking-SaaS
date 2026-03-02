import { Doctor } from '../types/types';
import DoctorRow from './DoctorRow';

interface DoctorsTableProps {
  doctors: Doctor[];
  onDelete: (id: string, name: string) => void;
}

export default function DoctorsTable({ doctors, onDelete }: DoctorsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-700 border-b border-gray-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Doctor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Specialty
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Fee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {doctors.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                No doctors found
              </td>
            </tr>
          ) : (
            doctors.map((doctor) => (
              <DoctorRow key={doctor._id} doctor={doctor} onDelete={onDelete} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
