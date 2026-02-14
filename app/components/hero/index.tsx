'use client';

import Image from 'next/image';
import HeroContent from './HeroContent';
import HeroInfoCards from './HeroInfoCards';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen sm:min-h-0 sm:h-[700px] lg:h-[700px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/bg-Alnoor.webp"
          alt="CareSync"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div className="relative w-full h-full px-4 md:px-8 py-16 sm:py-20 flex items-center">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-10 lg:gap-8">
          <HeroContent />
          <HeroInfoCards />
        </div>
      </div>
    </section>
  );
}
