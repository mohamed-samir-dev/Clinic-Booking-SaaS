'use client';

import { useParams } from 'next/navigation';
import { services } from '@/app/components/services/servicesdata';
import ServiceHero from './components/ServiceHero';
import ServiceOverview from './components/ServiceOverview';
import TreatmentProcess from './components/TreatmentProcess';
import PreparationTips from './components/PreparationTips';
import FAQSection from './components/FAQSection';
import TopDoctors from './TopDoctors';
import { serviceOverviews, serviceDetails } from './data/overviewData';
import { treatmentProcess } from './data/treatmentData';
import { treatmentProcessAr } from './data/treatmentData.ar';
import { preparationTips } from './data/preparationData';
import { preparationTipsAr } from './data/preparationData.ar';
import { faqs } from './data/faqData';
import { faqsAr } from './data/faqData.ar';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import translations from '@/messages/translations';

const keyToTitle: Record<string, string> = {
  'generalmedicine': 'General Medicine',
  'pediatrics': 'Pediatrics',
  'dermatology': 'Dermatology',
  'dentistry': 'Dentistry',
  'gynecology': 'Gynecology',
  'orthopedics': 'Orthopedics',
  'cardiology': 'Cardiology',
  'ent': 'ENT'
};

export default function ServiceDetailPage() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;
  const t = translations[locale].services.serviceDetails;
  
  const service = services.find(s => s.key.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!service) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Service not found</p>
      </div>
    );
  }

  const serviceTitle = keyToTitle[service.key.toLowerCase()] || 'Dentistry';
  const serviceKey = service.key.toLowerCase();
  const currentOverview = t.overview[serviceKey as keyof typeof t.overview] || t.overview.dentistry;
  const currentProcess = locale === 'ar' 
    ? (treatmentProcessAr[serviceTitle] || treatmentProcessAr['Dentistry'])
    : (treatmentProcess[serviceTitle] || treatmentProcess['Dentistry']);
  const currentDetails = serviceDetails[serviceTitle] || serviceDetails['Dentistry'];
  const currentPreparation = locale === 'ar'
    ? (preparationTipsAr[serviceTitle] || preparationTipsAr['Dentistry'])
    : (preparationTips[serviceTitle] || preparationTips['Dentistry']);
  const currentFaqs = locale === 'ar'
    ? (faqsAr[serviceTitle] || faqsAr['Dentistry'])
    : (faqs[serviceTitle] || faqs['Dentistry']);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ServiceHero 
        service={service} 
        serviceTitle={serviceTitle}
        duration={currentDetails.duration} 
        price={currentDetails.price} 
      />
      <ServiceOverview 
        intro={currentOverview.intro} 
        features={currentOverview.features} 
      />
      <TreatmentProcess steps={currentProcess} />
      <PreparationTips tips={currentPreparation} />
      <FAQSection faqs={currentFaqs} />
      <TopDoctors specialty={serviceTitle} />
    </div>
  );
}
