export default function LoadingSpinner() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div role="status" aria-label="Loading">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}



