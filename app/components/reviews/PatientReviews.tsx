'use client';

import { useEffect, useState } from 'react';
import { FaStar, FaQuoteLeft, FaPlus } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';
import {Review,ReviewStats}from '../../types/index'
import { api } from '../../lib/api';
import GeneralReviewModal from './GeneralReviewModal';


export default function PatientReviews() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const t = translations[locale].reviews;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [reviewsData, statsData] = await Promise.all([
        api.reviews.getAll(),
        api.reviews.getStats(),
      ]);

      setReviews((reviewsData as { data: Review[] }).data || []);
      setStats((statsData as { data: ReviewStats }).data || null);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${i < rating ? 'text-yellow-400' : (theme === 'dark' ? 'text-gray-600' : 'text-gray-300')}`}
      />
    ));
  };

  const getPercentage = (count: number) => {
    if (!stats || stats.totalReviews === 0) return 0;
    return Math.round((count / stats.totalReviews) * 100);
  };

  if (loading) {
    return (
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="w-full px-4 md:px-8">
          <div className="animate-pulse">
            <div className={`h-10 rounded w-64 mx-auto mb-12 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`h-96 rounded-3xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className={`h-96 rounded-3xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <GeneralReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchData();
        }}
      />

      <section className={`py-12 sm:py-16 md:py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="w-full px-4 sm:px-6 md:px-8">
          <div className="mb-8 sm:mb-10 md:mb-14">
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{t.title} </span>
                <span className="text-teal-600">{t.titleHighlight}</span>
              </h2>
              <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.description}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
              >
                <FaPlus className="text-sm" />
                {t.writeReview}
              </button>
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Left Side - Stats Card */}
          <div className={`rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 border h-auto lg:h-[400px] flex flex-col ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-600 mb-2">
                {stats?.averageRating.toFixed(1) || '0.0'}
              </div>
              <div className="flex justify-center gap-1 mb-3">
                {renderStars(Math.round(stats?.averageRating || 0))}
              </div>
              <p className={`text-sm sm:text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.basedOn} {stats?.totalReviews || 0} {t.reviewsCount}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats?.ratingDistribution[rating as keyof typeof stats.ratingDistribution] || 0;
                const percentage = getPercentage(count);

                return (
                  <div key={rating} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1 w-12 sm:w-16">
                      <span className={`text-xs sm:text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{rating}</span>
                      <FaStar className="text-yellow-400 text-xs" />
                    </div>
                    <div className={`flex-1 h-2.5 sm:h-3 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-linear-to-r from-teal-500 to-teal-600 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs sm:text-sm font-medium w-10 sm:w-12 text-right ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Reviews List */}
          <div className={`rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border h-auto lg:h-[400px] flex flex-col ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar space-y-3 sm:space-y-4 max-h-[500px] lg:max-h-none">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-100'}`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md">
                        {review.patientId?.name?.charAt(0).toUpperCase() || 'A'}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <h4 className={`font-bold text-sm sm:text-base truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {review.patientId?.name || 'Anonymous'}
                        </h4>
                        <div className="flex gap-0.5 shrink-0">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="relative">
                        <FaQuoteLeft className={`absolute -left-1 -top-1 text-base sm:text-xl ${theme === 'dark' ? 'text-teal-800' : 'text-teal-200'}`} />
                        <p className={`text-xs sm:text-sm md:text-base leading-relaxed pl-4 sm:pl-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {review.comment}
                        </p>
                      </div>
                      <p className={`text-xs mt-2 sm:mt-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {new Date(review.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
