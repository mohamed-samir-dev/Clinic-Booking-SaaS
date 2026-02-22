import Link from 'next/link';

export default function HeroContent() {
  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl text-center lg:text-left">
      <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600/90 backdrop-blur-sm rounded-full">
        <span className="text-white font-semibold text-xs sm:text-sm">CareSync</span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        Your Health,
        <span className="text-teal-400"> Our Priority</span>
      </h1>
      
      <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed px-2 sm:px-0">
        Experience modern healthcare with professional medical services in a comfortable environment.
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
        <Link
          href="/pages/booking"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-teal-600 text-white rounded-full font-semibold text-sm sm:text-base hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          Book Appointment
        </Link>
        <Link
          href="/pages/contact"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full font-semibold text-sm sm:text-base hover:bg-white/20 transition-all"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
