import HeroSection from '@/components/hero';
import MedicalServices from '@/components/services/MedicalServices';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <MedicalServices />
    </div>
  );
}
