import Link from 'next/link';
import { Appointment } from '../types';
import { getText } from '../utils/helpers';

interface NewRequestsCardProps {
  requests: Appointment[];
}

export default function NewRequestsCard({ requests }: NewRequestsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md">
            <span className="material-icons text-white text-lg">notification_important</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">New Requests</h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Latest appointments</p>
          </div>
        </div>
        <Link 
          href="/pages/doctor/requests" 
          className="px-3 py-2 bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-1"
        >
          View All
          <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      </div>
      
      <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-2">
        {requests.length > 0 ? (
          <>
            {requests.map((request) => (
              <div 
                key={request.id}
                className="group bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-200"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-icons text-white text-lg">person</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm">{getText(request.patientName)}</h4>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <span className="material-icons text-xs">schedule</span>
                      <span className="font-medium">{request.requestedAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3 shadow-sm">
              <span className="material-icons text-3xl text-gray-300">inbox</span>
            </div>
            <p className="text-sm font-bold text-gray-500">No new requests</p>
            <p className="text-xs text-gray-400 mt-0.5">All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
