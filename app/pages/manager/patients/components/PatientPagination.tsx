import { ChevronLeft, ChevronRight } from 'lucide-react';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    showing: 'عرض',
    to: 'إلى',
    of: 'من',
    patients: 'مريض',
    perPage: 'لكل صفحة'
  },
  en: {
    showing: 'Showing',
    to: 'to',
    of: 'of',
    patients: 'patients',
    perPage: 'per page'
  }
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  language?: Language;
}

export const PatientPagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  language = 'ar'
}: PaginationProps) => {
  const t = translations[language];
  const isRTL = language === 'ar';
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile View */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="text-gray-400 text-xs text-center">
          {t.showing} {Math.min((currentPage - 1) * pageSize + 1, totalItems)} {t.to}{' '}
          {Math.min(currentPage * pageSize, totalItems)} {t.of} {totalItems} {t.patients}
        </div>
        
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
        >
          <option value={10}>10 {t.perPage}</option>
          <option value={25}>25 {t.perPage}</option>
          <option value={50}>50 {t.perPage}</option>
          <option value={100}>100 {t.perPage}</option>
        </select>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRTL ? <ChevronRight size={18} className="text-white" /> : <ChevronLeft size={18} className="text-white" />}
          </button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 3) {
                pageNum = i + 1;
              } else if (currentPage <= 2) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 1) {
                pageNum = totalPages - 2 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
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
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRTL ? <ChevronLeft size={18} className="text-white" /> : <ChevronRight size={18} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">
            {t.showing} {Math.min((currentPage - 1) * pageSize + 1, totalItems)} {t.to}{' '}
            {Math.min(currentPage * pageSize, totalItems)} {t.of} {totalItems} {t.patients}
          </span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-teal-500"
          >
            <option value={10}>10 {t.perPage}</option>
            <option value={25}>25 {t.perPage}</option>
            <option value={50}>50 {t.perPage}</option>
            <option value={100}>100 {t.perPage}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRTL ? <ChevronRight size={20} className="text-white" /> : <ChevronLeft size={20} className="text-white" />}
          </button>

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
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === pageNum
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRTL ? <ChevronLeft size={20} className="text-white" /> : <ChevronRight size={20} className="text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
};
