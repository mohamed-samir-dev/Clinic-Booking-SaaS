interface FilterBarProps {
  filter: 'all' | 'pending' | 'accepted' | 'rejected';
  setFilter: (filter: 'all' | 'pending' | 'accepted' | 'rejected') => void;
}

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 mb-6">
      <div className="flex gap-2">
        {(['all', 'pending', 'accepted', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              filter === status
                ? 'bg-teal-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
