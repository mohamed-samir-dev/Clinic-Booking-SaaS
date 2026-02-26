import Link from 'next/link';
import { DoctorHeaderProps } from '../types';
import { getText } from '../utils/helpers';


export default function DoctorHeader({
  userName,
  pendingCount,
  showNotifications,
  setShowNotifications,
  newRequests
}: DoctorHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 relative z-40">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome back, Dr. {getText(userName).split(' ')[0] || 'Doctor'}! 👋
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-medium">Here&rsquo;s what&rsquo;s happening with your practice today</p>
        </div>
        <div className="flex items-center gap-2 relative z-50">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-linear-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all shadow-sm hover:shadow-md"
            >
              <span className="material-icons text-teal-600 text-lg">notifications</span>
              {pendingCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {pendingCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-9999">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900">New Booking Requests</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{pendingCount} pending requests</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {newRequests.length > 0 ? (
                    newRequests.map((request) => (
                      <div key={request.id} className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center shrink-0">
                            <span className="material-icons text-white text-sm">person</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 truncate">{getText(request.patientName)}</h4>
                            <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                              <span className="material-icons text-xs">schedule</span>
                              <span className="truncate">{request.time}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500 whitespace-nowrap">{request.requestedAgo}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <span className="material-icons text-3xl text-gray-300">inbox</span>
                      <p className="text-sm text-gray-500 mt-2">No new requests</p>
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-gray-100">
                  <Link href="/pages/doctor/requests" onClick={() => setShowNotifications(false)}>
                    <button className="w-full text-center text-sm font-bold text-teal-600 hover:text-teal-700 py-1.5">
                      View All Requests
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <button className="p-2 rounded-xl bg-linear-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all shadow-sm hover:shadow-md">
            <span className="material-icons text-gray-600 text-lg">settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
