import { Star } from 'lucide-react';

interface TopRatedCardProps {
  onSelect: () => void;
}

export default function TopRatedCard({ onSelect }: TopRatedCardProps) {
  return (
    <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md p-5 mb-6 border border-teal-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2.5 shadow-sm">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Top Rated Doctor</h3>
            <p className="text-sm font-semibold text-gray-600">Select the highest rated available doctor</p>
          </div>
        </div>
        <button
          onClick={onSelect}
          className="bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
        >
          Select Top Rated
        </button>
      </div>
    </div>
  );
}
