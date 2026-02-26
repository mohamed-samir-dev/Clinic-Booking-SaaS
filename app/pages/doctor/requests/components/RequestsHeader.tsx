'use client';

import Link from 'next/link';

export const RequestsHeader = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            <span className="material-icons text-xl sm:text-2xl text-blue-600">notification_important</span>
            Appointment Requests
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Manage and respond to patient appointment requests</p>
        </div>
        <Link
          href="/pages/doctor"
          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1"
        >
          <span className="material-icons text-xs sm:text-sm">arrow_back</span>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
