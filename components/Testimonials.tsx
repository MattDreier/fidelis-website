import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "After our solar installer went bankrupt, we thought we were stuck with a broken system. The team at Fidelis not only fixed it but explained everything in terms we could understand. Finally, someone who actually cares about homeowners like us.",
    author: "Michael Torres",
    context: "Kansas City, MO"
  },
  {
    quote: "I called three national companies—phone trees, callbacks that never came, quotes that made no sense. Then I found Fidelis. A real person answered on the second ring. That told me everything I needed to know about who I wanted working on my system.",
    author: "Sarah Mitchell",
    context: "Overland Park, KS"
  },
  {
    quote: "Our battery backup failed during the last storm. Fidelis came out the next day, diagnosed the issue, and had us running before the next outage hit. This is what real service looks like—not AI chatbots and empty promises.",
    author: "David & Karen Chen",
    context: "Leawood, KS"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 px-4 md:px-10 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto bg-surface-light dark:bg-surface-dark rounded-3xl p-8 md:p-16 transition-colors duration-300">
        <motion.h2
          className="font-display text-3xl font-bold tracking-tight mb-12 text-center text-text-primary-light dark:text-text-primary-dark"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Testimonials
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-4 p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-800 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <blockquote className="text-base font-normal leading-relaxed text-text-primary-light dark:text-text-primary-dark flex-grow">
                "{t.quote}"
              </blockquote>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                <cite className="not-italic text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark block">
                  — {t.author}
                </cite>
                <span className="text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/70">
                  {t.context}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
