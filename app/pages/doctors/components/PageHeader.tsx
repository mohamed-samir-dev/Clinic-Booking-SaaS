export default function PageHeader() {
  return (
    <div className="bg-linear-to-r from-teal-500 to-teal-600 text-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">Our Doctors</h1>
        <p className="text-base sm:text-lg md:text-xl text-teal-50">Find the best medical professionals for your needs</p>
      </div>
    </div>
  );
}
