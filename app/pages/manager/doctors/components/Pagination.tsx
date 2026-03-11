import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    showing: 'عرض',
    to: 'إلى',
    of: 'من',
    results: 'نتيجة',
    show: 'عرض:'
  },
  en: {
    showing: 'Showing',
    to: 'to',
    of: 'of',
    results: 'results',
    show: 'Show:'
  }
};

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  language = 'en'
}: PaginationProps) => {
  const t = translations[language];
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 mt-4 md:mt-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Items Info */}
        <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
          {t.showing} {startItem} {t.to} {endItem} {t.of} {totalItems} {t.results}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs sm:text-sm">{t.show}</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 sm:px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:border-teal-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 sm:p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} className="text-white sm:w-5 sm:h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors ${
                      currentPage === pageNum
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 sm:p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} className="text-white sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
