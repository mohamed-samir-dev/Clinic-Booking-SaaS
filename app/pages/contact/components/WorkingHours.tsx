export default function WorkingHours() {
  const schedule = [
    { day: 'Sunday', hours: '09:00 AM - 09:00 PM' },
    { day: 'Monday', hours: '09:00 AM - 09:00 PM' },
    { day: 'Tuesday', hours: '09:00 AM - 09:00 PM' },
    { day: 'Wednesday', hours: '09:00 AM - 09:00 PM' },
    { day: 'Thursday', hours: '09:00 AM - 06:00 PM' },
    { day: 'Friday', hours: 'Closed', closed: true },
    { day: 'Saturday', hours: '10:00 AM - 04:00 PM' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-teal-100">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Working Hours</h3>
      <div className="space-y-2 sm:space-y-3">
        {schedule.map((item) => (
          <div key={item.day} className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200 last:border-0">
            <span className="text-sm sm:text-base font-semibold text-gray-900">{item.day}</span>
            <span className={`text-sm sm:text-base ${item.closed ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
              {item.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
