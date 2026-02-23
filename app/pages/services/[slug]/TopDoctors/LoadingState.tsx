import { useTheme } from '@/app/contexts/ThemeContext';

export default function LoadingState() {
  const { theme } = useTheme();
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} py-12 sm:py-16 md:py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="animate-pulse text-teal-600 text-base sm:text-lg">Loading doctors...</div>
        </div>
      </div>
    </div>
  );
}
