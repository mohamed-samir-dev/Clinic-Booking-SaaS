import Link from 'next/link';

export const ScheduleHeader = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mb-5 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="material-icons text-3xl text-teal-600">calendar_month</span>
            My Schedule
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-medium">Manage your appointments and availability</p>
        </div>
        <Link
          href="/pages/doctor"
          className="px-4 py-2 bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-1"
        >
          <span className="material-icons text-base">arrow_back</span>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
