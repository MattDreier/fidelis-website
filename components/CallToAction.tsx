import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="relative py-20 px-4 md:px-10 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Headline */}
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
              Ready to Talk?
            </h2>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
              No chatbots. No sales pitch. Just what you need before you need it.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <motion.a
              href="tel:913-832-0513"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-coral text-black text-base font-bold rounded-full shadow-md hover:shadow-lg hover:bg-brand-coral-dark active:bg-brand-coral-darker transition-all text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Call Now
            </motion.a>

            <motion.a
              href="https://calendar.app.google/Ww9xmnjG98NVX4cSA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-coral-text dark:text-brand-coral font-semibold px-4 py-3 group hover:text-brand-coral-dark dark:hover:text-brand-coral-light transition-colors"
              whileHover={{ x: 5 }}
            >
              Schedule a Free Inspection
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
