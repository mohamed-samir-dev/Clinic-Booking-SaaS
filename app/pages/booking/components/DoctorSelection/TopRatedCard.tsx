import { Star } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

interface TopRatedCardProps {
  onSelect: () => void;
}

export default function TopRatedCard({ onSelect }: TopRatedCardProps) {
  const { theme } = useTheme();
  return (
    <div className={`rounded-xl shadow-md p-3 sm:p-5 mb-4 sm:mb-6 border ${
      theme === 'dark' ? 'bg-teal-900/30 border-teal-800' : 'bg-linear-to-br from-teal-50 to-cyan-50 border-teal-200'
    }`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className={`rounded-full p-2 sm:p-2.5 shadow-sm shrink-0 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-white'
          }`}>
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500" />
          </div>
          <div className="flex-1 sm:flex-initial">
            <h3 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Top Rated Doctor</h3>
            <p className={`text-xs sm:text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Select the highest rated available doctor</p>
          </div>
        </div>
        <button
          onClick={onSelect}
          className="w-full sm:w-auto bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap text-sm"
        >
          Select Top Rated
        </button>
      </div>
    </div>
  );
}
