'use client';

import { useState } from 'react';
import { Star, X } from 'lucide-react';

interface ReviewFormProps {
  clinicId: string;
  theme: string;
  locale: string;
  messages: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewForm({ clinicId, theme, locale, messages, onClose, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError(messages.clinics.reviews.selectRating);
      return;
    }

    if (comment.trim().length < 10) {
      setError(messages.clinics.reviews.commentMinLength);
      return;
    }

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token) {
      setError(messages.clinics.reviews.loginRequired);
      return;
    }

    if (userRole !== 'patient') {
      setError(locale === 'ar' ? messages.clinics.reviews.patientRoleRequired : 'You must be logged in as a patient to write a review');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/clinics/${clinicId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comment })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit review');
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : messages.clinics.reviews.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`w-full max-w-md rounded-xl shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {messages.clinics.reviews.writeReview}
          </h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {messages.clinics.reviews.rating}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : theme === 'dark'
                        ? 'text-gray-600'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {messages.clinics.reviews.yourReview}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={messages.clinics.reviews.shareExperience}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {comment.length} {messages.clinics.reviews.characters}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {messages.clinics.reviews.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? messages.clinics.reviews.submitting : messages.clinics.reviews.submitReview}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
