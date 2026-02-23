'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaCheckCircle, FaPlus } from 'react-icons/fa';
import { useTheme } from '../../../../../contexts/ThemeContext';
import ReviewModal from '../ReviewModal';

interface Review {
  rating: number;
  patientName?: string;
  comment?: string;
  date: string;
  isVerified?: boolean;
}

interface Doctor {
  _id?: string;
  name?: string | { en?: string; ar?: string };
  reviews?: Review[];
}

interface ReviewsTabProps {
  doctor: Doctor;
}

export default function ReviewsTab({ doctor }: ReviewsTabProps) {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(doctor.reviews || []);
  
  useEffect(() => {
    if (!doctor._id) return;

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/doctor/${doctor._id}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.data || []);
        }
      } catch {
        console.error('Failed to fetch reviews');
      }
    };

    fetchReviews();
  }, [doctor._id]);

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? ((reviews.reduce((sum: number, r: Review) => sum + r.rating, 0)) / totalReviews).toFixed(1)
    : '0.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter((r: Review) => r.rating === star).length,
    percentage: totalReviews > 0
      ? (reviews.filter((r: Review) => r.rating === star).length / totalReviews) * 100
      : 0
  }));

  return (
    <>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctorId={doctor._id || ''}
        doctorName={typeof doctor.name === 'string' ? doctor.name : doctor.name?.en || 'Doctor'}
        onSuccess={async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews/doctor/${doctor._id}`);
            if (response.ok) {
              const data = await response.json();
              setReviews(data.data || []);
            }
          } catch {
            console.error('Failed to fetch reviews');
          }
        }}
      />
      
      <div className="space-y-4 sm:space-y-6">
        <div className={`rounded-lg sm:rounded-xl p-5 sm:p-8 border ${theme === 'dark' ? 'bg-linear-to-br from-gray-800 to-gray-700 border-teal-700' : 'bg-linear-to-br from-teal-50 to-cyan-50 border-teal-200'}`}>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
            <div className="flex flex-col items-center">
              <div className={`text-4xl sm:text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{averageRating}</div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`text-lg sm:text-xl ${i < Math.round(parseFloat(averageRating)) ? 'text-teal-500' : theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{totalReviews} reviews</p>
            </div>

            <div className="flex-1 w-full space-y-2">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-2 sm:gap-3">
                  <span className={`text-xs sm:text-sm font-medium w-6 sm:w-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{star} ★</span>
                  <div className={`flex-1 h-2 sm:h-2.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className="h-full bg-linear-to-r from-teal-500 to-cyan-500 transition-all" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className={`text-xs sm:text-sm w-8 sm:w-10 text-right ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className={`text-lg sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Patient Reviews</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <FaPlus className="text-sm" />
            Write Review
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((review: Review, index: number) => {
              const initials = review.patientName
                ? review.patientName.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                : 'AN';
              
              return (
                <div key={index} className={`rounded-lg sm:rounded-xl p-4 sm:p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base shrink-0">
                      {initials}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-2">
                        <div>
                          <h4 className={`font-bold text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{review.patientName || 'Anonymous'}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`text-xs sm:text-sm ${i < review.rating ? 'text-teal-500' : theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
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
                        <p className={`text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>&quot;{review.comment}&quot;</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={`text-center py-6 sm:py-8 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No reviews yet</div>
          )}
        </div>
      </div>
    </>
  );
}
