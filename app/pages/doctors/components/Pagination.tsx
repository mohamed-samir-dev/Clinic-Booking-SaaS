import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 sm:px-4 py-2 bg-white border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
      >
        <FaChevronLeft className="text-xs sm:text-sm" /> 
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>
      <span className="px-3 sm:px-4 py-2 text-gray-700 font-semibold text-sm sm:text-base">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 sm:px-4 py-2 bg-white border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
      >
        Next <FaChevronRight className="text-xs sm:text-sm" />
      </button>
    </div>
  );
}
