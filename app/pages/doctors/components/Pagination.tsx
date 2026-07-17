'use client';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  dir?: 'ltr' | 'rtl';
}

export default function Pagination({ currentPage, totalPages, onPageChange, dir = 'ltr' }: PaginationProps) {
  const { theme } = useTheme();
  if (totalPages <= 1) return null;

  const isRtl = dir === 'rtl';
  const PrevIcon = isRtl ? FaChevronRight : FaChevronLeft;
  const NextIcon = isRtl ? FaChevronLeft : FaChevronRight;
  const prevLabel = isRtl ? 'السابق' : 'Previous';
  const prevLabelShort = isRtl ? 'السابق' : 'Prev';
  const nextLabel = isRtl ? 'التالي' : 'Next';
  const pageLabel = isRtl ? `${currentPage} / ${totalPages}` : `${currentPage} / ${totalPages}`;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap" dir={dir}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 sm:px-4 py-2 border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'}`}
      >
        <PrevIcon className="text-xs sm:text-sm" />
        <span className="hidden sm:inline">{prevLabel}</span>
        <span className="sm:hidden">{prevLabelShort}</span>
      </button>
      <span className={`px-3 sm:px-4 py-2 font-semibold text-sm sm:text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
        {pageLabel}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 sm:px-4 py-2 border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'}`}
      >
        <span>{nextLabel}</span>
        <NextIcon className="text-xs sm:text-sm" />
      </button>
    </div>
  );
}
