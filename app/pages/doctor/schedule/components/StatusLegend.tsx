export const StatusLegend = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-5 border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-lg bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <span className="material-icons text-white text-base">palette</span>
        </div>
        <h3 className="text-base font-bold text-gray-900">Status Legend</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <span className="text-xs font-bold text-yellow-700">Pending</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-teal-50 rounded-lg border border-teal-200">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>
          <span className="text-xs font-bold text-teal-700">Confirmed</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div>
          <span className="text-xs font-bold text-gray-700">Completed</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-200">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <span className="text-xs font-bold text-red-700">Cancelled</span>
        </div>
      </div>
    </div>
  );
};
