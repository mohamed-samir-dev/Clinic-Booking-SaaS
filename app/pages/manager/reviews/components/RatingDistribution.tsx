import { Star } from 'lucide-react';

interface RatingDistributionProps {
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalReviews: number;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    ratingDistribution: 'توزيع التقييمات'
  },
  en: {
    ratingDistribution: 'Rating Distribution'
  }
};

export const RatingDistribution = ({ distribution, totalReviews, language = 'ar' }: RatingDistributionProps) => {
  const t = translations[language];
  const isRTL = language === 'ar';
  const getPercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  return (
    <div className={`bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6 mb-4 md:mb-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">{t.ratingDistribution}</h3>
      <div className="space-y-2 sm:space-y-3">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = distribution[rating as keyof typeof distribution];
          const percentage = getPercentage(count);
          
          return (
            <div key={rating} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 w-12 sm:w-16 shrink-0">
                <span className="text-white font-medium text-sm sm:text-base">{rating}</span>
                <Star size={12} className="text-yellow-400 fill-yellow-400 sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="flex-1 h-2.5 sm:h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-teal-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-16 sm:w-20 text-right shrink-0">
                <span className="text-gray-400 text-xs sm:text-sm">{count} ({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
