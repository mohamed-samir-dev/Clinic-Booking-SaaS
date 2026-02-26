'use client';

import { FilterType } from '../types';

interface StatsCardsProps {
  stats: {
    all: number;
    pending: number;
    confirmed: number;
    cancelled: number;
  };
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const StatsCards = ({ stats, filter, onFilterChange }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-5">
      <div 
        onClick={() => onFilterChange('all')}
        className={`cursor-pointer bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border transition-all ${
          filter === 'all' ? 'border-purple-500 shadow-lg' : 'border-gray-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5">All Requests</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stats.all}</h3>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-base sm:text-xl">inbox</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onFilterChange('pending')}
        className={`cursor-pointer bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border transition-all ${
          filter === 'pending' ? 'border-yellow-500 shadow-lg' : 'border-gray-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5">Pending</p>
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pending}</h3>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-base sm:text-xl">pending_actions</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onFilterChange('confirmed')}
        className={`cursor-pointer bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border transition-all ${
          filter === 'confirmed' ? 'border-teal-500 shadow-lg' : 'border-gray-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5">Confirmed</p>
            <h3 className="text-xl sm:text-2xl font-bold text-teal-600">{stats.confirmed}</h3>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-base sm:text-xl">check_circle</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onFilterChange('cancelled')}
        className={`cursor-pointer bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border transition-all ${
          filter === 'cancelled' ? 'border-red-500 shadow-lg' : 'border-gray-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5">Cancelled</p>
            <h3 className="text-xl sm:text-2xl font-bold text-red-600">{stats.cancelled}</h3>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-base sm:text-xl">cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
