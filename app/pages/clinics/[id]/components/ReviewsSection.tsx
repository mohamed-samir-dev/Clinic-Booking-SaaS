'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import ReviewForm from './ReviewForm';

interface Review {
  _id: string;
  patientId: {
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  clinicId: string;
  theme: string;
  locale: string;
  messages: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function ReviewsSection({ clinicId, theme, locale, messages }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  });
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clinics/${clinicId}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
          setAverageRating(data.averageRating || 0);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, [clinicId]);

  const handleReviewSuccess = () => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clinics/${clinicId}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
          setAverageRating(data.averageRating || 0);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };
    fetchReviews();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`rounded-xl shadow p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {messages.clinics.reviews.title}
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className={`ml-1 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                ({reviews.length} {messages.clinics.reviews.reviewsCount})
              </span>
            </div>
          )}
        </div>
        
        {isLoggedIn && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            {messages.clinics.reviews.writeReview}
          </button>
        )}
      </div>

      {!isLoggedIn && (
        <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {messages.clinics.reviews.loginToReview}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {messages.clinics.reviews.noReviews}
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {review.patientId?.name || messages.clinics.reviews.anonymous}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : theme === 'dark'
                            ? 'text-gray-600'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>

      {showReviewForm && (
        <ReviewForm
          clinicId={clinicId}
          theme={theme}
          locale={locale}
          messages={messages}
          onClose={() => setShowReviewForm(false)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
}
