import { Star, TrendingUp } from 'lucide-react';

interface RatingOverviewProps {
  avgRating: number;
  totalReviews: number;
}

export const RatingOverview = ({ avgRating, totalReviews }: RatingOverviewProps) => {
  const rating = Number(avgRating) || 0;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star size={32} className="text-yellow-400 fill-yellow-400" />
            <span className="text-4xl font-bold text-white">{rating.toFixed(1)}</span>
          </div>
          <p className="text-gray-400">Average Rating</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp size={32} className="text-teal-400" />
            <span className="text-4xl font-bold text-white">{totalReviews}</span>
          </div>
          <p className="text-gray-400">Total Reviews</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className={i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
              />
            ))}
          </div>
          <p className="text-gray-400">Clinic Rating</p>
        </div>
      </div>
    </div>
  );
};
