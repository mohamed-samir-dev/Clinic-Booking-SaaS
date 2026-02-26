'use client';

export const StatusLegend = () => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 mb-3 sm:mb-5 border border-gray-100">
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <span className="material-icons text-white text-sm sm:text-base">palette</span>
        </div>
        <h3 className="text-sm sm:text-base font-bold text-gray-900">Status Legend</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500 shrink-0"></div>
          <span className="text-[10px] sm:text-xs font-bold text-yellow-700">Pending</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-teal-50 rounded-lg border border-teal-200">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-teal-500 shrink-0"></div>
          <span className="text-[10px] sm:text-xs font-bold text-teal-700">Confirmed</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gray-500 shrink-0"></div>
          <span className="text-[10px] sm:text-xs font-bold text-gray-700">Completed</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-red-50 rounded-lg border border-red-200">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 shrink-0"></div>
          <span className="text-[10px] sm:text-xs font-bold text-red-700">Cancelled</span>
        </div>
      </div>
    </div>
  );
};
