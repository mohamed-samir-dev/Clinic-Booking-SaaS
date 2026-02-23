import { Check } from 'lucide-react';

export default function StepsHeader({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, title: 'Services' },
    { number: 2, title: 'Doctor' },
    { number: 3, title: 'Time' },
    { number: 4, title: 'Details' }
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6 mb-4 sm:mb-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                currentStep === step.number
                  ? 'bg-linear-to-r from-teal-500 via-teal-600 to-cyan-600 text-white'
                  : currentStep > step.number
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {currentStep > step.number ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : step.number}
              </div>
              <span className={`mt-1 sm:mt-2 text-[10px] sm:text-xs font-semibold ${
                currentStep >= step.number ? 'text-teal-600' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 sm:mx-3 rounded-full ${
                currentStep > step.number ? 'bg-teal-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
