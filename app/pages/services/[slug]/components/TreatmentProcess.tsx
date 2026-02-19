import { motion } from 'framer-motion';

interface TreatmentProcessProps {
  steps: { title: string; description: string }[];
}

export default function TreatmentProcess({ steps }: TreatmentProcessProps) {
  return (
    <div className="bg-linear-to-b from-white to-teal-50 py-12 sm:py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 px-2">The Treatment Process</h3>
          <div className="w-16 sm:w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-teal-200 via-teal-400 to-teal-200 -translate-x-1/2"></div>
          
          <div className="space-y-8 sm:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 sm:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all border border-teal-100"
                  >
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                      <span className="text-teal-500">{step.title}</span>
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                  viewport={{ once: true }}
                  className="relative z-10 shrink-0"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-teal-400 via-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl border-2 sm:border-4 border-white">
                    <span className="text-white text-lg sm:text-2xl font-bold">{index + 1}</span>
                  </div>
                </motion.div>

                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
