import { FaSpinner } from 'react-icons/fa';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <FaSpinner className="animate-spin text-4xl text-teal-500" />
    </div>
  );
}
