export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-md p-4 sm:p-6 animate-pulse">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-9 sm:h-10 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}
