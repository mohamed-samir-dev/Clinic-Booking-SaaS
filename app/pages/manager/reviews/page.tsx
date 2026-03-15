'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, TrendingUp, MessageSquare, Filter, Building2, Stethoscope, ChevronDown, ChevronUp } from 'lucide-react';
import { ReviewCard } from './components/ReviewCard';
import { RatingDistribution } from './components/RatingDistribution';
import toast from 'react-hot-toast';

export interface Review {
  _id: string;
  patientName: string | { en: string; ar: string };
  doctorName?: string | { en: string; ar: string };
  doctorId?: string;
  doctorSpecialty?: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
}

interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

interface DoctorReviewData {
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  avgRating: string;
  totalReviews: number;
  reviews: Review[];
}

const translations = {
  ar: {
    title: 'التقييمات والمراجعات',
    subtitle: 'آراء المرضى عن العيادة والأطباء',
    clinicReviews: 'تقييمات العيادة',
    doctorsReviews: 'تقييمات الأطباء',
    clinic: 'العيادة',
    doctors: 'الأطباء',
    avgRating: 'متوسط التقييم',
    totalReviews: 'إجمالي التقييمات',
    reviews: 'تقييم',
    satisfactionRate: 'معدل الرضا',
    forClinic: 'للعيادة',
    fromAllDoctors: 'من جميع الأطباء',
    starRatings: 'تقييمات 4-5 نجوم',
    ratingDistribution: 'توزيع التقييمات',
    filterByRating: 'تصفية حسب التقييم:',
    all: 'الكل',
    showing: 'عرض',
    of: 'من',
    noReviews: 'لا توجد تقييمات بعد',
    noStarReviews: 'لا توجد تقييمات بـ',
    stars: 'نجوم',
    reviewsWillAppear: 'ستظهر التقييمات هنا بمجرد تقديم المرضى ملاحظاتهم',
    failedToLoad: 'فشل تحميل التقييمات'
  },
  en: {
    title: 'Reviews & Ratings',
    subtitle: 'Patient feedback for your clinic and doctors',
    clinicReviews: 'Clinic Reviews',
    doctorsReviews: 'Doctors Reviews',
    clinic: 'Clinic',
    doctors: 'Doctors',
    avgRating: 'Average Rating',
    totalReviews: 'Total Reviews',
    reviews: 'reviews',
    satisfactionRate: 'Satisfaction Rate',
    forClinic: 'For the clinic',
    fromAllDoctors: 'From all doctors',
    starRatings: '4-5 star ratings',
    ratingDistribution: 'Rating Distribution',
    filterByRating: 'Filter by rating:',
    all: 'All',
    showing: 'Showing',
    of: 'of',
    noReviews: 'No reviews yet',
    noStarReviews: 'No',
    stars: 'star reviews yet',
    reviewsWillAppear: 'Reviews will appear here once patients provide feedback',
    failedToLoad: 'Failed to load reviews'
  }
};

export default function ReviewsPage() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [activeTab, setActiveTab] = useState<'clinic' | 'doctors'>('clinic');
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);

  const t = translations[language];
  const isRTL = language === 'ar';
  const getName = (name: string | { en: string; ar: string }) => 
    typeof name === 'string' ? name : name[language];

  useEffect(() => {
    const savedLang = localStorage.getItem('managerLang') as 'ar' | 'en';
    if (savedLang) {
      setLanguage(savedLang);
    }

    const handleLanguageChange = () => {
      const newLang = localStorage.getItem('managerLang') as 'ar' | 'en';
      if (newLang) {
        setLanguage(newLang);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const [clinicReviews, setClinicReviews] = useState<Review[]>([]);
  const [filteredClinicReviews, setFilteredClinicReviews] = useState<Review[]>([]);
  const [clinicAvgRating, setClinicAvgRating] = useState(0);
  const [clinicTotalReviews, setClinicTotalReviews] = useState(0);
  const [clinicRatingDistribution, setClinicRatingDistribution] = useState<RatingDistribution>({
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0,
  });

  const [doctorReviews, setDoctorReviews] = useState<Review[]>([]);
  const [filteredDoctorReviews, setFilteredDoctorReviews] = useState<Review[]>([]);
  const [doctorAvgRating, setDoctorAvgRating] = useState(0);
  const [doctorTotalReviews, setDoctorTotalReviews] = useState(0);
  const [doctorRatingDistribution, setDoctorRatingDistribution] = useState<RatingDistribution>({
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0,
  });
  const [doctorReviewsData, setDoctorReviewsData] = useState<DoctorReviewData[]>([]);

  const fetchReviews = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        
        setClinicReviews(data.clinic.reviews || []);
        setFilteredClinicReviews(data.clinic.reviews || []);
        setClinicAvgRating(Number(data.clinic.avgRating) || 0);
        setClinicTotalReviews(data.clinic.totalReviews || 0);
        setClinicRatingDistribution(data.clinic.ratingDistribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
        
        setDoctorReviews(data.doctors.reviews || []);
        setFilteredDoctorReviews(data.doctors.reviews || []);
        setDoctorAvgRating(Number(data.doctors.avgRating) || 0);
        setDoctorTotalReviews(data.doctors.totalReviews || 0);
        setDoctorRatingDistribution(data.doctors.ratingDistribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
        setDoctorReviewsData(data.doctors.byDoctor || []);
      } else {
        toast.error(t.failedToLoad);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error(t.failedToLoad);
    } finally {
      setLoading(false);
    }
  }, [t.failedToLoad]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  useEffect(() => {
    if (activeTab === 'clinic') {
      if (filterRating === null) {
        setFilteredClinicReviews(clinicReviews);
      } else {
        setFilteredClinicReviews(clinicReviews.filter(r => r.rating === filterRating));
      }
    } else {
      if (filterRating === null) {
        setFilteredDoctorReviews(doctorReviews);
      } else {
        setFilteredDoctorReviews(doctorReviews.filter(r => r.rating === filterRating));
      }
    }
  }, [filterRating, clinicReviews, doctorReviews, activeTab]);

  const currentReviews = activeTab === 'clinic' ? filteredClinicReviews : filteredDoctorReviews;
  const currentAvgRating = activeTab === 'clinic' ? clinicAvgRating : doctorAvgRating;
  const currentTotalReviews = activeTab === 'clinic' ? clinicTotalReviews : doctorTotalReviews;
  const currentDistribution = activeTab === 'clinic' ? clinicRatingDistribution : doctorRatingDistribution;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-800 rounded w-64"></div>
          <div className="h-32 bg-gray-800 rounded-xl"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-900 p-3 sm:p-4 md:p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <Star className="text-teal-400" size={24} />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{t.title}</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-400">{t.subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 md:mb-6">
        <button
          onClick={() => { setActiveTab('clinic'); setFilterRating(null); }}
          className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
            activeTab === 'clinic'
              ? 'bg-teal-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Building2 size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">{t.clinicReviews}</span>
          <span className="xs:hidden">{t.clinic}</span>
          <span className="bg-gray-900 px-2 py-1 rounded-lg text-xs sm:text-sm">{clinicTotalReviews}</span>
        </button>
        <button
          onClick={() => { setActiveTab('doctors'); setFilterRating(null); }}
          className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
            activeTab === 'doctors'
              ? 'bg-teal-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <Stethoscope size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">{t.doctorsReviews}</span>
          <span className="xs:hidden">{t.doctors}</span>
          <span className="bg-gray-900 px-2 py-1 rounded-lg text-xs sm:text-sm">{doctorTotalReviews}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-yellow-400 fill-yellow-400 sm:w-6 sm:h-6" />
              <h3 className="text-base sm:text-lg font-semibold text-white">{t.avgRating}</h3>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-white">{currentAvgRating}</span>
            <span className="text-sm sm:text-base text-gray-400">/ 5.0</span>
          </div>
          <div className="flex mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`sm:w-5 sm:h-5 ${i < Math.round(currentAvgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} className="text-teal-400 sm:w-6 sm:h-6" />
              <h3 className="text-base sm:text-lg font-semibold text-white">{t.totalReviews}</h3>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-white">{currentTotalReviews}</span>
            <span className="text-sm sm:text-base text-gray-400">{t.reviews}</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            {activeTab === 'clinic' ? t.forClinic : t.fromAllDoctors}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 md:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-green-400 sm:w-6 sm:h-6" />
              <h3 className="text-base sm:text-lg font-semibold text-white">{t.satisfactionRate}</h3>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-white">
              {currentTotalReviews > 0 ? Math.round(((currentDistribution[5] + currentDistribution[4]) / currentTotalReviews) * 100) : 0}%
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">{t.starRatings}</p>
        </div>
      </div>

      <RatingDistribution distribution={currentDistribution} totalReviews={currentTotalReviews} language={language} />

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400 sm:w-5 sm:h-5" />
            <span className="text-white font-medium text-sm sm:text-base">{t.filterByRating}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterRating(null)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                filterRating === null
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {t.all}
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors flex items-center gap-1 text-sm sm:text-base ${
                  filterRating === rating
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {rating}
                <Star size={12} className="fill-current sm:w-3.5 sm:h-3.5" />
              </button>
            ))}
          </div>
          {filterRating !== null && (
            <span className="text-gray-400 text-xs sm:text-sm">
              {t.showing} {currentReviews.length} {t.of} {currentTotalReviews} {t.reviews}
            </span>
          )}
        </div>
      </div>

      {activeTab === 'doctors' && doctorReviewsData.length > 0 ? (
        <div className="space-y-6">
          {doctorReviewsData.map((doctorData) => {
            const isExpanded = expandedDoctor === doctorData.doctorId;
            const filteredDoctorReviews = filterRating === null 
              ? doctorData.reviews 
              : doctorData.reviews.filter(r => r.rating === filterRating);
            
            if (filterRating !== null && filteredDoctorReviews.length === 0) return null;

            return (
              <div key={doctorData.doctorId} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <button
                  onClick={() => setExpandedDoctor(isExpanded ? null : doctorData.doctorId)}
                  className="w-full p-4 sm:p-5 md:p-6 flex items-center justify-between hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0">
                      <Stethoscope size={20} className="text-white sm:w-6 sm:h-6" />
                    </div>
                    <div className="text-left min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white truncate">{getName(doctorData.doctorName)}</h3>
                      <p className="text-xs sm:text-sm text-teal-400 truncate">{doctorData.doctorSpecialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                    <div className="text-right">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Star size={16} className="text-yellow-400 fill-yellow-400 sm:w-5 sm:h-5" />
                        <span className="text-lg sm:text-2xl font-bold text-white">{doctorData.avgRating}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400">{doctorData.totalReviews} {t.reviews}</p>
                    </div>
                    {isExpanded ? <ChevronUp className="text-gray-400 w-5 h-5" /> : <ChevronDown className="text-gray-400 w-5 h-5" />}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="border-t border-gray-700 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 bg-gray-850">
                    {filteredDoctorReviews.map((review) => (
                      <ReviewCard key={review._id} review={review} onDelete={fetchReviews} language={language} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {currentReviews.length === 0 ? (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sm:p-8 text-center">
              <MessageSquare size={40} className="text-gray-600 mx-auto mb-4 sm:w-12 sm:h-12" />
              <p className="text-gray-400 text-base sm:text-lg">
                {filterRating !== null ? `${t.noStarReviews} ${filterRating} ${t.stars}` : t.noReviews}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                {t.reviewsWillAppear}
              </p>
            </div>
          ) : (
            currentReviews.map((review) => (
              <ReviewCard key={review._id} review={review} onDelete={fetchReviews} language={language} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
