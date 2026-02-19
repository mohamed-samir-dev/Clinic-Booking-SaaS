interface EmptyStateProps {
  specialty: string;
}

export default function EmptyState({ specialty }: EmptyStateProps) {
  return (
    <div className="bg-gray-50 py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            {specialty} Specialists
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto px-4">
            Our team of experts dedicated to your care
          </p>
        </div>
        <p className="text-center text-gray-400 text-base sm:text-lg px-4">No doctors available at the moment.</p>
      </div>
    </div>
  );
}
