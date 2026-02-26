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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
      <div 
        onClick={() => onFilterChange('all')}
        className={`cursor-pointer bg-white rounded-2xl p-5 shadow-sm border transition-all ${
          filter === 'all' ? 'border-purple-500 shadow-lg' : 'border-gray-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">All Requests</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.all}</h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-xl">inbox</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onFilterChange('pending')}
        className={`cursor-pointer bg-white rounded-2xl p-5 shadow-sm border transition-all ${
          filter === 'pending' ? 'border-yellow-500 shadow-lg' : 'border-gray-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Pending</p>
            <h3 className="text-2xl font-bold text-yellow-600">{stats.pending}</h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-xl">pending_actions</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onFilterChange('confirmed')}
        className={`cursor-pointer bg-white rounded-2xl p-5 shadow-sm border transition-all ${
          filter === 'confirmed' ? 'border-teal-500 shadow-lg' : 'border-gray-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Confirmed</p>
            <h3 className="text-2xl font-bold text-teal-600">{stats.confirmed}</h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-xl">check_circle</span>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onFilterChange('cancelled')}
        className={`cursor-pointer bg-white rounded-2xl p-5 shadow-sm border transition-all ${
          filter === 'cancelled' ? 'border-red-500 shadow-lg' : 'border-gray-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Cancelled</p>
            <h3 className="text-2xl font-bold text-red-600">{stats.cancelled}</h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-xl">cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
