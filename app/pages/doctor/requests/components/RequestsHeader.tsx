import Link from 'next/link';

export const RequestsHeader = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            <span className="material-icons text-2xl text-blue-600">notification_important</span>
            Appointment Requests
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-medium">Manage and respond to patient appointment requests</p>
        </div>
        <Link
          href="/pages/doctor"
          className="px-4 py-2 bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-1"
        >
          <span className="material-icons text-sm">arrow_back</span>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};
