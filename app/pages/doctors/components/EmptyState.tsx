interface EmptyStateProps {
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

export default function EmptyState({ hasActiveFilters, resetFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12 sm:py-16 px-4">
      <div className="text-5xl sm:text-6xl mb-4">🔍</div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Doctors Found</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4">Try adjusting your filters to see more results</p>
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="px-5 sm:px-6 py-2.5 sm:py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all font-semibold text-sm sm:text-base"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
