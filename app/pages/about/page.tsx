import { FaHeart, FaLightbulb, FaCheckCircle } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-teal-600 to-teal-800 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-teal-200 text-sm font-semibold mb-2">Established 2013</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Dedicated to Your Health</h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
            Providing compassionate, world-class healthcare to our community for over a decade. 
            We combine medical expertise with a human touch.
          </p>
          <button className="bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">
            Meet Our Doctors
          </button>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Our History</h2>
            <span className="text-teal-600 text-2xl">|</span>
            <h3 className="text-2xl text-gray-600">Our Story</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Al Noor Clinic began with a simple yet profound vision: to bridge the gap between 
                high-end medical technology and personalized, patient-centric care. Founded in 2013, 
                we started as a small family practice and have grown into a comprehensive healthcare hub.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Every patient who walks through our doors is treated with the same respect and attention 
                we would give our own family. Our journey has been defined by continuous learning and an 
                unwavering commitment to the well-being of our community.
              </p>
            </div>
            
            <div className="bg-teal-50 p-8 rounded-xl border-l-4 border-teal-600">
              <p className="text-gray-800 italic text-lg leading-relaxed mb-4">
              &rdquo;Healing is an art that requires both clinical precision and deep empathy. 
                At Al Noor, we practice both&rdquo;&rdquo;
              </p>
              <p className="text-teal-700 font-semibold">- Dr. Sarah Ahmed, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2013: The Beginning</h3>
              <p className="text-gray-600">
                Opened our first facility with 3 consulting rooms and a dream to redefine healthcare.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2017: Specialization</h3>
              <p className="text-gray-600">
                Expanded to include Cardiology and Pediatrics departments with state-of-the-art diagnostic tools.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">2021: Digital Transformation</h3>
              <p className="text-gray-600">
                Introduced AI-assisted diagnostics and a fully integrated telemedicine platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Present Day</h3>
              <p className="text-gray-600">
                Serving over 5,000 patients monthly with a team of 20+ specialized practitioners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-linear-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">10+</div>
            <p className="text-teal-100 text-lg">Years Experience</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">50k+</div>
            <p className="text-teal-100 text-lg">Happy Patients</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">20+</div>
            <p className="text-teal-100 text-lg">Specialized Doctors</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Our Core Values</h2>
          <p className="text-gray-600 text-center mb-12">
            The principles that guide every diagnosis, every treatment, and every patient interaction.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center">
              <FaHeart className="text-5xl text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Compassion</h3>
              <p className="text-gray-600">
                We treat every patient with the empathy and kindness they deserve, ensuring a safe 
                and supportive environment.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center">
              <FaLightbulb className="text-5xl text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We embrace the latest medical advancements and technology to provide the most effective 
                and efficient care possible.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition text-center">
              <FaCheckCircle className="text-5xl text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">
                Our standards are set by international board-certified protocols, ensuring quality 
                medical outcomes for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-linear-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to experience better care?</h2>
          <p className="text-teal-100 text-lg mb-8">
            Schedule your consultation today and join thousands of patients who trust Al Noor Clinic 
            with their well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition">
              Book Online Now
            </button>
            <button className="bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-800 transition border-2 border-white">
              Call +1 (555) 000-1234
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
