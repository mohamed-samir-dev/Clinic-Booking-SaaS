import HeroSection from './components/HeroSection';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import MapSection from './components/MapSection';
import WorkingHours from './components/WorkingHours';
import FAQSection from './components/FAQSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="w-full px-4 md:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <ContactInfo />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6 sm:mt-8">
          <MapSection />
          <WorkingHours />
        </div>

        <div className="mt-6 sm:mt-8">
          <FAQSection />
        </div>
      </div>
    </div>
  );
}
