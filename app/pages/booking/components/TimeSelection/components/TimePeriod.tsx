interface TimePeriodProps {
  title: string;
  icon: string;
  iconColor: string;
  slots: string[];
  displayedSlots: string[];
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  showAll: boolean;
  setShowAll: (show: boolean) => void;
  bookedSlots: string[];
}

export default function TimePeriod({
  title,
  icon,
  iconColor,
  slots,
  displayedSlots,
  selectedTime,
  setSelectedTime,
  showAll,
  setShowAll,
  bookedSlots
}: TimePeriodProps) {
  if (slots.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className={`material-icons text-${iconColor}`}>{icon}</span>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        {slots.length > 4 && (
          <span className="text-xs text-gray-500">({slots.length} slots)</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {displayedSlots.map(time => {
          const isBooked = bookedSlots.includes(time);
          return (
            <button
              key={time}
              onClick={() => !isBooked && setSelectedTime(time)}
              disabled={isBooked}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                isBooked
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                  : selectedTime === time
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
      {slots.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-2 py-2 text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center justify-center gap-1"
        >
          <span>{showAll ? 'Show Less' : `Show ${slots.length - 4} More`}</span>
          <span className="material-icons text-sm">{showAll ? 'expand_less' : 'expand_more'}</span>
        </button>
      )}
    </div>
  );
}
