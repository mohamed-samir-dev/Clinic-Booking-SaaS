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
import { preparationTips } from './data/preparationData';
import { faqs } from './data/faqData';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const service = services.find(s => s.title.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Service not found</p>
      </div>
    );
  }

  const currentOverview = serviceOverviews[service.title] || serviceOverviews['Dentistry'];
  const currentProcess = treatmentProcess[service.title] || treatmentProcess['Dentistry'];
  const currentDetails = serviceDetails[service.title] || serviceDetails['Dentistry'];
  const currentPreparation = preparationTips[service.title] || preparationTips['Dentistry'];
  const currentFaqs = faqs[service.title] || faqs['Dentistry'];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceHero 
        service={service} 
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
      <TopDoctors specialty={service.title} />
    </div>
  );
}
