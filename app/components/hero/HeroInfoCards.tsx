import { FaClock, FaCalendarCheck } from 'react-icons/fa';
import InfoCard from './InfoCard';
import InsuranceCard from './InsuranceCard';

export default function HeroInfoCards() {
  return (
    <div className="flex flex-col gap-3 md:gap-4 w-full lg:w-auto">
      <InfoCard
        icon={FaClock}
        iconColor="text-teal-600"
        iconBgColor="bg-teal-100"
        label="Open Now"
        value="8AM - 8PM"
      />
      
      <InfoCard
        icon={FaCalendarCheck}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
        label="Avg. Wait Time"
        value="15 Minutes"
      />
      
      <InsuranceCard />
    </div>
  );
}
