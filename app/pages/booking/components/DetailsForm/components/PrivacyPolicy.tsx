'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface PrivacyPolicyProps {
  agreeToPolicy: boolean;
  setAgreeToPolicy: (value: boolean) => void;
}

export default function PrivacyPolicy({ agreeToPolicy, setAgreeToPolicy }: PrivacyPolicyProps) {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);
  const [hasReadCancellation, setHasReadCancellation] = useState(false);
  const privacyScrollRef = useRef<HTMLDivElement>(null);
  const cancellationScrollRef = useRef<HTMLDivElement>(null);

  const handlePrivacyScroll = () => {
    const element = privacyScrollRef.current;
    if (element) {
      const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
      if (isAtBottom) setHasReadPrivacy(true);
    }
  };

  const handleCancellationScroll = () => {
    const element = cancellationScrollRef.current;
    if (element) {
      const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
      if (isAtBottom) setHasReadCancellation(true);
    }
  };

  const canAgree = hasReadPrivacy && hasReadCancellation;

  useEffect(() => {
    if (canAgree && !agreeToPolicy) {
      setAgreeToPolicy(true);
    } else if (!canAgree && agreeToPolicy) {
      setAgreeToPolicy(false);
    }
  }, [canAgree, agreeToPolicy, setAgreeToPolicy]);

  return (
    <>
      <div className={`p-3 sm:p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="privacy-policy"
              checked={agreeToPolicy}
              onChange={(e) => setAgreeToPolicy(e.target.checked)}
              disabled={!canAgree}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            />
            <label htmlFor="privacy-policy" className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
              {locale === 'ar' ? 'أوافق على السياسات:' : 'I agree to the policies:'}
            </label>
          </div>
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all ${
              hasReadPrivacy 
                ? 'bg-green-100 text-green-700 border-2 border-green-500' 
                : 'bg-teal-50 text-teal-600 hover:bg-teal-100 border-2 border-teal-200'
            }`}
          >
            {hasReadPrivacy ? (locale === 'ar' ? '✓ سياسة الخصوصية' : '✓ Privacy Policy') : (locale === 'ar' ? 'اقرأ سياسة الخصوصية' : 'Read Privacy Policy')}
          </button>
          <button
            type="button"
            onClick={() => setShowCancellationModal(true)}
            className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all ${
              hasReadCancellation 
                ? 'bg-green-100 text-green-700 border-2 border-green-500' 
                : 'bg-teal-50 text-teal-600 hover:bg-teal-100 border-2 border-teal-200'
            }`}
          >
            {hasReadCancellation ? (locale === 'ar' ? '✓ سياسة الإلغاء' : '✓ Cancellation Policy') : (locale === 'ar' ? 'اقرأ سياسة الإلغاء' : 'Read Cancellation Policy')}
          </button>
        </div>
        {!canAgree && (
          <p className={`text-[10px] sm:text-xs mt-2 font-medium ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>{locale === 'ar' ? '⚠ يرجى قراءة كلا السياستين حتى النهاية قبل الموافقة' : '⚠ Please read both policies to the end before agreeing'}</p>
        )}
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className={`p-4 sm:p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</h3>
            </div>
            <div 
              ref={privacyScrollRef}
              onScroll={handlePrivacyScroll}
              className={`p-4 sm:p-6 overflow-y-auto flex-1 leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '1. جمع المعلومات' : '1. Information Collection'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'نقوم بجمع المعلومات الشخصية بما في ذلك اسمك وتفاصيل الاتصال وتاريخ الميلاد والتاريخ الطبي لتزويدك بخدمات رعاية صحية عالية الجودة.' : 'We collect personal information including your name, contact details, date of birth, and medical history to provide you with quality healthcare services.'}</p>

              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '2. استخدام البيانات' : '2. Data Usage'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'سيتم استخدام معلوماتك الشخصية والطبية حصرياً لأغراض الرعاية الصحية، بما في ذلك التشخيص وتخطيط العلاج وإدارة المواعيد.' : 'Your personal and medical information will be used exclusively for healthcare purposes, including diagnosis, treatment planning, and appointment management.'}</p>

              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '3. حماية البيانات' : '3. Data Protection'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'نطبق تدابير أمنية قياسية في الصناعة لحماية بياناتك من الوصول غير المصرح به أو الكشف أو إساءة الاستخدام.' : 'We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse.'}</p>

              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '4. مشاركة المعلومات' : '4. Information Sharing'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'سيتم مشاركة معلوماتك الطبية فقط مع مقدمي الرعاية الصحية المشاركين مباشرة في علاجك.' : 'Your medical information will only be shared with healthcare providers directly involved in your treatment.'}</p>

              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '5. حقوق المريض' : '5. Patient Rights'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'لديك الحق في الوصول إلى سجلاتك الطبية ومراجعتها وطلب تصحيحات عليها.' : 'You have the right to access, review, and request corrections to your medical records.'}</p>

              <div className="h-20"></div>
            </div>
            <div className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              {!hasReadPrivacy && (
                <p className="text-xs sm:text-sm text-amber-600 font-medium">{locale === 'ar' ? '↓ قم بالتمرير إلى الأسفل للمتابعة' : '↓ Scroll to the bottom to continue'}</p>
              )}
              {hasReadPrivacy && (
                <p className="text-xs sm:text-sm text-green-600 font-medium">{locale === 'ar' ? '✓ لقد قرأت هذه السياسة' : '✓ You have read this policy'}</p>
              )}
              <button
                onClick={() => setShowPrivacyModal(false)}
                disabled={!hasReadPrivacy}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
              >
                {hasReadPrivacy ? (locale === 'ar' ? 'إغلاق' : 'Close') : (locale === 'ar' ? 'اقرأ للمتابعة' : 'Read to Continue')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation & Rescheduling Policy Modal */}
      {showCancellationModal && (
        <div className="fixed inset-0 backdrop-blur flex items-center justify-center z-50 p-3 sm:p-4">
          <div className={`rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] flex flex-col ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className={`p-4 sm:p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{locale === 'ar' ? 'سياسة الإلغاء وإعادة الجدولة' : 'Cancellation & Rescheduling Policy'}</h3>
            </div>
            <div 
              ref={cancellationScrollRef}
              onScroll={handleCancellationScroll}
              className={`p-4 sm:p-6 overflow-y-auto flex-1 leading-relaxed text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            >
              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '1. فترة إشعار الإلغاء' : '1. Cancellation Notice Period'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'يجب إلغاء المواعيد قبل 24 ساعة على الأقل لتجنب رسوم الإلغاء.' : 'Appointments must be cancelled at least 24 hours in advance to avoid cancellation fees.'}</p>

              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '2. رسوم الإلغاء المتأخر' : '2. Late Cancellation Fee'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'الإلغاءات التي تتم قبل أقل من 24 ساعة من موعدك المحدد ستتحمل رسوماً بنسبة 50٪ من تكلفة الاستشارة.' : 'Cancellations made less than 24 hours before your scheduled appointment will incur a fee of 50% of the consultation cost.'}</p>

              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '3. سياسة عدم الحضور' : '3. No-Show Policy'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'عدم حضور موعدك المحدد دون إشعار مسبق سيؤدي إلى فرض رسوم استشارة كاملة.' : 'Failure to attend your scheduled appointment without prior notice will result in a full consultation fee charge.'}</p>

              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '4. إعادة جدولة المواعيد' : '4. Rescheduling Appointments'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'يمكنك إعادة جدولة موعدك حتى 12 ساعة قبل الوقت المحدد دون أي رسوم.' : 'You may reschedule your appointment up to 12 hours before the scheduled time without any fees.'}</p>

              <h4 className="font-bold text-lg mb-3">{locale === 'ar' ? '5. حالات الطوارئ' : '5. Emergency Situations'}</h4>
              <p className="mb-4">{locale === 'ar' ? 'نتفهم أن حالات الطوارئ الحقيقية تحدث. إذا كنت بحاجة إلى الإلغاء بسبب حالة طوارئ طبية، يرجى الاتصال بنا في أقرب وقت ممكن.' : 'We understand that genuine emergencies happen. If you need to cancel due to a medical emergency, please contact us as soon as possible.'}</p>

              <div className="h-20"></div>
            </div>
            <div className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              {!hasReadCancellation && (
                <p className="text-xs sm:text-sm text-amber-600 font-medium">{locale === 'ar' ? '↓ قم بالتمرير إلى الأسفل للمتابعة' : '↓ Scroll to the bottom to continue'}</p>
              )}
              {hasReadCancellation && (
                <p className="text-xs sm:text-sm text-green-600 font-medium">{locale === 'ar' ? '✓ لقد قرأت هذه السياسة' : '✓ You have read this policy'}</p>
              )}
              <button
                onClick={() => setShowCancellationModal(false)}
                disabled={!hasReadCancellation}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
              >
                {hasReadCancellation ? (locale === 'ar' ? 'إغلاق' : 'Close') : (locale === 'ar' ? 'اقرأ للمتابعة' : 'Read to Continue')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
