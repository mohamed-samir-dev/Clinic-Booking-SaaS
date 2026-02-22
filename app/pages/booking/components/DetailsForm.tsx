export default function DetailsForm() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Details</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-sm"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-sm"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-sm"
            placeholder="Enter your phone"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Notes (Optional)</label>
          <textarea
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-sm"
            placeholder="Any additional information"
          />
        </div>
      </div>
    </div>
  );
}
