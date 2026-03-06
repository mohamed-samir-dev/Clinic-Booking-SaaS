import { Check, X, Eye, Calendar, UserX } from 'lucide-react';
import {AppointmentsTableProps}from '../types'

export const AppointmentsTable = ({ appointments, loading, onConfirm, onCancel, onView, onReschedule, onNoShow }: AppointmentsTableProps) => {
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name.en;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'rescheduled': return 'bg-purple-500/20 text-purple-400';
      case 'no-show': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Patient</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Doctor</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Time</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt._id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 text-white">{getName(apt.patientName)}</td>
                  <td className="px-6 py-4 text-white">{getName(apt.doctorName)}</td>
                  <td className="px-6 py-4 text-gray-300">{new Date(apt.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-300">{apt.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(apt)}
                        className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} className="text-white" />
                      </button>
                      
                      {apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onConfirm(apt._id)}
                            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <Check size={16} className="text-white" />
                          </button>
                          <button
                            onClick={() => onCancel(apt._id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <X size={16} className="text-white" />
                          </button>
                        </>
                      )}
                      
                      {apt.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => onReschedule(apt)}
                            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                            title="Reschedule"
                          >
                            <Calendar size={16} className="text-white" />
                          </button>
                          <button
                            onClick={() => onCancel(apt._id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <X size={16} className="text-white" />
                          </button>
                          <button
                            onClick={() => onNoShow(apt._id)}
                            className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                            title="Mark as No-show"
                          >
                            <UserX size={16} className="text-white" />
                          </button>
                        </>
                      )}
                    </div>
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
