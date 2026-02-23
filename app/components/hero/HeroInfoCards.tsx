'use client';
import { FaClock, FaCalendarCheck } from 'react-icons/fa';
import InfoCard from './InfoCard';
import InsuranceCard from './InsuranceCard';
import { useLanguage } from '@/app/contexts/LanguageContext';
import messages from '@/messages/en.json';
import messagesAr from '@/messages/ar.json';

export default function HeroInfoCards() {
  const { locale } = useLanguage();
  const t = locale === 'ar' ? messagesAr.hero : messages.hero;

  return (
    <div className="flex flex-col gap-3 md:gap-4 w-full lg:w-auto">
      <InfoCard
        icon={FaClock}
        iconColor="text-teal-600"
        iconBgColor="bg-teal-100"
        label={t.openNow}
        value={t.hours}
      />
      
      <InfoCard
        icon={FaCalendarCheck}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
        label={t.avgWaitTime}
        value={t.waitTime}
      />
      
      <InsuranceCard />
    </div>
  );
}
