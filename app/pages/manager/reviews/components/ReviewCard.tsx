import { Star, User, Calendar, Stethoscope, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { Review } from '../page';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ReviewCardProps {
  review: Review;
  onDelete?: () => void;
  language?: 'ar' | 'en';
}

const translations = {
  ar: {
    verified: 'موثق',
    pending: 'قيد المراجعة',
    deleteReview: 'حذف التقييم',
    confirmDelete: 'هل أنت متأكد من حذف هذا التقييم؟',
    delete: 'حذف',
    cancel: 'إلغاء',
    deleteSuccess: 'تم حذف التقييم بنجاح',
    deleteFailed: 'فشل حذف التقييم',
    doctor: 'د.'
  },
  en: {
    verified: 'Verified',
    pending: 'Pending',
    deleteReview: 'Delete review',
    confirmDelete: 'Are you sure you want to delete this review?',
    delete: 'Delete',
    cancel: 'Cancel',
    deleteSuccess: 'Review deleted successfully',
    deleteFailed: 'Failed to delete review',
    doctor: 'Dr.'
  }
};

export const ReviewCard = ({ review, onDelete, language = 'ar' }: ReviewCardProps) => {
  const [deleting, setDeleting] = useState(false);
  const t = translations[language];
  const isRTL = language === 'ar';

  const getText = (text: string | { en: string; ar: string }) => 
    typeof text === 'string' ? text : text[language];

  const handleDelete = async () => {
    toast((toastId) => (
      <div className="flex flex-col gap-3">
        <p className="text-gray-900 font-medium">{t.confirmDelete}</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(toastId.id);
              setDeleting(true);
              try {
                const token = localStorage.getItem('token');
                const type = review.doctorId ? 'doctor' : 'clinic';
                const url = `http://localhost:5000/api/manager/reviews/${review._id}?type=${type}`;
                
                const response = await fetch(url, {
                  method: 'DELETE',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                  body: review.doctorId ? JSON.stringify({ doctorId: review.doctorId }) : undefined
                });

                if (response.ok) {
                  toast.success(t.deleteSuccess);
                  if (onDelete) onDelete();
                } else {
                  toast.error(t.deleteFailed);
                }
              } catch (error) {
                console.error('Error deleting review:', error);
                toast.error(t.deleteFailed);
              } finally {
                setDeleting(false);
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t.delete}
          </button>
          <button
            onClick={() => toast.dismiss(toastId.id)}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
    });
  };

  return (
    <div className={`bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6 hover:border-teal-600 transition-all duration-300 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 mb-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shrink-0">
            <User size={18} className="text-white sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-semibold text-base sm:text-lg truncate">{getText(review.patientName)}</p>
            {review.doctorName && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mt-1 flex-wrap">
                <Stethoscope size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="truncate">{t.doctor} {getText(review.doctorName)}</span>
                {review.doctorSpecialty && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="text-teal-400 truncate">{review.doctorSpecialty}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-700 px-2.5 sm:px-3 py-1.5 rounded-lg">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`sm:w-4 sm:h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              <span className="text-white font-bold text-sm sm:text-base">{review.rating.toFixed(1)}</span>
            </div>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-1.5 sm:p-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg transition-colors"
              title={t.deleteReview}
            >
              <Trash2 size={14} className="text-white sm:w-4 sm:h-4" />
            </button>
          </div>
          {review.isVerified !== undefined && (
            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
              review.isVerified 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-yellow-900/30 text-yellow-400'
            }`}>
              {review.isVerified ? (
                <>
                  <CheckCircle size={12} />
                  <span>{t.verified}</span>
                </>
              ) : (
                <>
                  <Clock size={12} />
                  <span>{t.pending}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-750 rounded-lg p-3 sm:p-4 mb-3">
        <p className="text-gray-300 leading-relaxed text-sm sm:text-base wrap-break-word">{review.comment}</p>
      </div>
      
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
        <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
        <span>{new Date(review.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</span>
      </div>
    </div>
  );
};
