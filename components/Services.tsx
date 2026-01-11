import React from 'react';
import { motion } from 'framer-motion';

const solarRepairImage = `${import.meta.env.BASE_URL}assets/solar-repair.webp`;
const batteryServiceImage = `${import.meta.env.BASE_URL}assets/battery-service.webp`;
const monitoringImage = `${import.meta.env.BASE_URL}assets/monitoring.webp`;

const services = [
  {
    title: "Solar & Battery Systems",
    desc: "Installation, maintenance, remove & reinstall for roof repairs, critter guard installation, you name it—we've done it.",
    image: solarRepairImage
  },
  {
    title: "Backup Power",
    desc: "Batteries and generators should work when you need it most. Health checks, firmware updates, and capacity testing before the next storm hits.",
    image: batteryServiceImage
  },
  {
    title: "Performance Optimization",
    desc: "System monitoring is great, but who has their eye on the trends? If your system is not delivering what was promised we'll provide data-driven answers and take the action required to maximize performance.",
    image: monitoringImage
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 px-4 md:px-10 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          className="font-display text-text-primary-light dark:text-text-primary-dark text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What we can do for you
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="overflow-hidden rounded-2xl aspect-[4/3] w-full relative shadow-sm hover:shadow-xl transition-all duration-300">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url("${service.image}")` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="flex flex-col gap-2 px-1">
                <h3 className="font-display text-xl font-medium leading-normal text-text-primary-light dark:text-text-primary-dark group-hover:text-brand-teal transition-colors">
                  {service.title}
                </h3>
                <div className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-relaxed">
                  {service.desc.split('\n\n').map((paragraph, i) => (
                    <p key={i} className={i > 0 ? 'mt-3' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Your ROI depends on your system running like a well oiled machine. Join the thousands of solar customers in Kansas City with the peace of mind that Fidelis is on duty.
        </motion.p>
      </div>
    </section>
  );
};

export default Services;
