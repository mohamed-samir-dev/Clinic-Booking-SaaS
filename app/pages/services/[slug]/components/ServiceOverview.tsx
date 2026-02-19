import { FaCheckCircle } from 'react-icons/fa';

interface ServiceOverviewProps {
  intro: string;
  features: string[];
}

export default function ServiceOverview({ intro, features }: ServiceOverviewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 sm:py-16 md:py-20">
      <div className="text-center mb-10 sm:mb-16">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 px-2">Service Overview</h3>
        <div className="w-16 sm:w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
      </div>
      
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-12 text-center px-2">
        {intro}
      </p>
      
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <FaCheckCircle className="text-teal-500 text-lg sm:text-xl shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
