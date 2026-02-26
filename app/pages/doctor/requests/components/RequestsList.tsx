import { Appointment, FilterType } from '../types';
import { RequestCard } from './RequestCard';

interface RequestsListProps {
  requests: Appointment[];
  loading: boolean;
  filter: FilterType;
  onStatusUpdate: (id: string, status: string) => void;
}

export const RequestsList = ({ requests, loading, filter, onStatusUpdate }: RequestsListProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="material-icons text-white text-xl">list_alt</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {filter === 'all' ? 'All Requests' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requests`}
              </h3>
              <p className="text-sm text-gray-600 font-medium">{requests.length} total</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-600 font-medium">Loading requests...</p>
          </div>
        ) : requests.length > 0 ? (
          <div className="space-y-2.5">
            {requests.map((request) => (
              <RequestCard 
                key={request._id} 
                request={request} 
                onStatusUpdate={onStatusUpdate}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3 shadow-sm">
              <span className="material-icons text-3xl text-gray-300">inbox</span>
            </div>
            <p className="text-sm font-bold text-gray-500">No requests found</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {filter === 'all' ? 'You have no appointment requests' : `No ${filter} requests`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
