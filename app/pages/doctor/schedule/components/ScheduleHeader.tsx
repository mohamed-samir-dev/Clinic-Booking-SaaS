'use client';

import Link from 'next/link';

export const ScheduleHeader = () => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-5 mb-3 sm:mb-5 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="material-icons text-2xl sm:text-3xl text-teal-600">calendar_month</span>
            My Schedule
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">Manage your appointments and availability</p>
        </div>
        <Link
          href="/pages/doctor"
          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1"
        >
          <span className="material-icons text-sm sm:text-base">arrow_back</span>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
