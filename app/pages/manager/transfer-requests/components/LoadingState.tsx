export default function LoadingState() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
      <p className="text-gray-400 mt-4">Loading requests...</p>
    </div>
  );
}
