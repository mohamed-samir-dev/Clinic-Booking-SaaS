interface SectionHeaderProps {
  specialty: string;
}

export default function SectionHeader({ specialty }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 sm:mb-16 md:mb-20">
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
        Meet Our {specialty} Specialists
      </h3>
      <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto px-4">
        Our team of experts dedicated to your care
      </p>
    </div>
  );
}
