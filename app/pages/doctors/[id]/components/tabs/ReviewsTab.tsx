import { FaStar, FaCheckCircle } from 'react-icons/fa';

interface Review {
  rating: number;
  patientName?: string;
  comment?: string;
  date: string;
  isVerified?: boolean;
}

interface Doctor {
  reviews?: Review[];
}

interface ReviewsTabProps {
  doctor: Doctor;
}

export default function ReviewsTab({ doctor }: ReviewsTabProps) {
  const totalReviews = doctor.reviews?.length || 0;
  const averageRating = totalReviews > 0
    ? ((doctor.reviews?.reduce((sum: number, r: Review) => sum + r.rating, 0) || 0) / totalReviews).toFixed(1)
    : '0.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: doctor.reviews?.filter((r: Review) => r.rating === star).length || 0,
    percentage: totalReviews > 0
      ? ((doctor.reviews?.filter((r: Review) => r.rating === star).length || 0) / totalReviews) * 100
      : 0
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-lg sm:rounded-xl p-5 sm:p-8 border border-teal-200">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
          <div className="flex flex-col items-center">
            <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{averageRating}</div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`text-lg sm:text-xl ${i < Math.round(parseFloat(averageRating)) ? 'text-teal-500' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">{totalReviews} reviews</p>
          </div>

          <div className="flex-1 w-full space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-medium text-gray-700 w-6 sm:w-8">{star} ★</span>
                <div className="flex-1 h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-teal-500 to-cyan-500 transition-all" style={{ width: `${percentage}%` }} />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 w-8 sm:w-10 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {doctor.reviews && doctor.reviews.length > 0 ? (
          doctor.reviews.map((review: Review, index: number) => {
            const initials = review.patientName
              ? review.patientName.split(' ').map((n: string) => n[0]).join('').toUpperCase()
              : 'AN';
            
            return (
              <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base shrink-0">
                    {initials}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2">
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-gray-900">{review.patientName || 'Anonymous'}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={`text-xs sm:text-sm ${i < review.rating ? 'text-teal-500' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          {review.isVerified && (
                            <span className="inline-flex items-center gap-1 text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                              <FaCheckCircle />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {review.comment && (
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">&quot;{review.comment}&quot;</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">No reviews yet</div>
        )}
      </div>
    </div>
  );
}
