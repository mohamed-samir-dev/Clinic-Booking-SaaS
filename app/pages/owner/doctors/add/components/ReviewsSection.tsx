import { Star, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Review {
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  onUpdate: (reviews: Review[]) => void;
}

export default function ReviewsSection({ reviews, onUpdate }: ReviewsSectionProps) {
  const [newReview, setNewReview] = useState<Review>({
    patientName: '',
    rating: 5,
    comment: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAdd = () => {
    if (newReview.patientName && newReview.comment) {
      onUpdate([...reviews, { ...newReview }]);
      setNewReview({ patientName: '', rating: 5, comment: '', date: new Date().toISOString().split('T')[0] });
    }
  };

  const handleRemove = (index: number) => {
    onUpdate(reviews.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Star size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">Initial Reviews</h3>
      </div>
      
      {reviews.length > 0 && (
        <div className="space-y-3 mb-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg border-2 border-gray-600 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-white">{review.patientName}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-300 text-sm">{review.comment}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700 p-1 ml-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-600 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Patient Name</label>
            <input
              type="text"
              value={newReview.patientName}
              onChange={(e) => setNewReview({ ...newReview, patientName: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
              placeholder="محمد أحمد"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Rating</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Comment</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 text-white"
            placeholder="دكتور ممتاز ومتمكن في تخصصه"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all font-semibold"
        >
          <Plus size={18} />
          Add Review
        </button>
      </div>
    </div>
  );
}
