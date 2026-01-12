import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <User className="w-7 h-7 text-primary-blue" />,
    bg: "bg-primary-blue/10",
    title: "Real People Answer",
    desc: "No chatbots. No phone trees. No scripts. When you call, you get a master electrician who listens."
  },
  {
    icon: <Award className="w-7 h-7 text-primary-green" />,
    bg: "bg-primary-green/10",
    title: "Local Expertise",
    desc: "Not a national platform. A licensed master electrician who lives in Kansas City and stakes their reputation on every job."
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-brand-coral" />,
    bg: "bg-brand-coral/10",
    title: "Long-Term Partnership",
    desc: "Your solar system is a serious investment. We treat it like one—not a service call to rush through."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 }
  }
};

const Features: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-20 px-4 md:px-10 bg-background-light dark:bg-background-dark transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto text-center flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 items-center"
        >
          <h2 className="font-display tracking-tight text-3xl md:text-4xl font-bold leading-tight max-w-2xl text-text-primary-light dark:text-text-primary-dark">
            How we operate
          </h2>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl">
            We're committed to honest, personal service so you can trust your solar investment is in good hands.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" }}
              className="flex flex-col gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-8 text-left transition-all duration-300"
            >
              <div className={`flex items-center justify-center w-14 h-14 rounded-full ${f.bg} mb-2`}>
                {f.icon}
              </div>
              <h3 className="font-display text-xl font-medium text-text-primary-light dark:text-text-primary-dark">{f.title}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
