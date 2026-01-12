import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sun, Battery, Phone, ShieldCheck } from 'lucide-react';

const heroImage = `${import.meta.env.BASE_URL}assets/hero-solar-home.webp`;

const offers = [
  {
    icon: Sun,
    color: 'warning',
    title: 'Solar System Repair',
    description: 'Diagnose and fix what others left behind.'
  },
  {
    icon: Battery,
    color: 'success',
    title: 'Battery Health Checks',
    description: 'Your backup power, ready when you need it.'
  },
  {
    icon: Phone,
    color: 'warning',
    title: 'A Real Person Answers',
    description: 'No phone trees. No chatbots. Just a master electrician.'
  },
  {
    icon: ShieldCheck,
    color: 'primary',
    title: '10+ Years Experience',
    description: 'Licensed. Local. Here for the long haul.'
  }
];

const colorClasses = {
  primary: {
    bg: 'bg-primary-blue/10',
    icon: 'text-primary-blue'
  },
  success: {
    bg: 'bg-primary-green/10',
    icon: 'text-primary-green'
  },
  warning: {
    bg: 'bg-primary-yellow/10',
    icon: 'text-primary-yellow'
  }
};

// Animation variants for orchestrated entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Smooth decel with subtle settle
    },
  },
};

const Hero: React.FC = () => {
  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-16 px-4 md:px-10 overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left Content - Staggered entrance */}
        <motion.div
          className="flex flex-col gap-6 text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* WHY - The belief */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-text-primary-light dark:text-text-primary-dark"
            variants={itemVariants}
          >
            Promises Kept.
          </motion.h1>

          {/* HOW - The differentiators */}
          <motion.p
            className="text-lg leading-relaxed text-text-secondary-light dark:text-text-secondary-dark max-w-xl"
            variants={itemVariants}
          >
            Your investment in solar is here to stay—even if the installer went bankrupt or a fly-by-night solar bro won't answer your calls. Our electricians are solar industry veterans who will get boots on the roof and make it right.
          </motion.p>

          {/* Qualifying question */}
          <motion.p
            className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark"
            variants={itemVariants}
          >
            Do you need a hand with your system?
          </motion.p>

          {/* WHAT - Service CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4"
            variants={itemVariants}
          >
            <motion.a
              href="tel:913-832-0513"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-coral text-black text-base font-bold rounded-full shadow-md hover:shadow-lg hover:bg-brand-coral-dark active:bg-brand-coral-darker transition-all text-center"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Call Now
            </motion.a>

            <motion.a
              href="https://calendar.app.google/Ww9xmnjG98NVX4cSA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-coral-text dark:text-brand-coral font-semibold px-4 py-3 group hover:text-brand-coral-dark dark:hover:text-brand-coral-light transition-colors"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Schedule a Free Inspection
              <motion.span
                className="inline-block"
                whileHover={{ x: 2, rotate: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Image - Spring entrance with subtle overshoot */}
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] w-full"
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1], // Slight overshoot curve
            scale: { type: "spring", stiffness: 100, damping: 15 }
          }}
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[2s] hover:scale-105"
            style={{ backgroundImage: `url("${heroImage}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

          {/* Floating Badge - Animated Carousel */}
          <div className="absolute bottom-6 left-6 right-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentOffer}
                className="p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md rounded-xl flex items-center gap-4 shadow-lg border border-white/50 dark:border-gray-700 transition-colors duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className={`${colorClasses[offers[currentOffer].color].bg} p-2 rounded-full flex-shrink-0`}>
                  {React.createElement(offers[currentOffer].icon, {
                    className: `w-8 h-8 ${colorClasses[offers[currentOffer].color].icon}`
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-text-primary-light dark:text-text-primary-dark text-base">
                    {offers[currentOffer].title}
                  </p>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {offers[currentOffer].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
