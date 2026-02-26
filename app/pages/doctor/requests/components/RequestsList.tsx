'use client';

import { Appointment, FilterType } from '../types';
import { RequestCard } from './RequestCard';

interface RequestsListProps {
  requests: Appointment[];
  loading: boolean;
  filter: FilterType;
  onStatusUpdate: (id: string, status: string) => void;
  theme: 'light' | 'dark';
}

export const RequestsList = ({ requests, loading, filter, onStatusUpdate, theme }: RequestsListProps) => {
  return (
    <div className={`rounded-xl sm:rounded-2xl shadow-lg border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className={`p-3 sm:p-5 border-b ${
        theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-linear-to-r from-gray-50 to-white'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="material-icons text-white text-base sm:text-xl">list_alt</span>
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {filter === 'all' ? 'All Requests' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
              </h3>
              <p className={`text-xs sm:text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>{requests.length} total</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className={`text-xs sm:text-sm font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Loading requests...</p>
          </div>
        ) : requests.length > 0 ? (
          <div className="space-y-2 sm:space-y-2.5">
            {requests.map((request) => (
              <RequestCard 
                key={request._id} 
                request={request} 
                onStatusUpdate={onStatusUpdate}
                theme={theme}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-gray-400">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-2 sm:mb-3 shadow-sm">
              <span className="material-icons text-2xl sm:text-3xl text-gray-300">inbox</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-gray-500">No requests found</p>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
              {filter === 'all' ? 'You have no appointment requests' : `No ${filter} requests`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
