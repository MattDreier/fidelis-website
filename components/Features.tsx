import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { User, Award, ShieldCheck, Zap, Handshake, TrendingUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';

// Set 1: Service Values (Blue, Green, Red)
const serviceValues = [
  {
    icon: <User className="w-7 h-7 text-primary-blue" />,
    bg: "bg-primary-blue/10",
    title: "Real People Answer",
    desc: "No chatbots. No phone trees. No scripts. When you call, you get a master electrician who listens."
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-primary-green" />,
    bg: "bg-primary-green/10",
    title: "Protected Investment",
    desc: "Maximize your ROI with proactive maintenance. We catch small issues before they become expensive problems."
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-brand-coral" />,
    bg: "bg-brand-coral/10",
    title: "Long-Term Partnership",
    desc: "Your solar system is a serious investment. We treat it like one—not a service call to rush through."
  }
];

// Set 2: Customer Benefits (Red, Gray, Blue)
const customerBenefits = [
  {
    icon: <Zap className="w-7 h-7 text-brand-coral" />,
    bg: "bg-brand-coral/10",
    title: "Fast Response",
    desc: "Same-day diagnosis for urgent issues. No weeks of waiting while your system sits broken."
  },
  {
    icon: <Handshake className="w-7 h-7 text-gray-500 dark:text-gray-400" />,
    bg: "bg-gray-100 dark:bg-gray-700",
    title: "Lifetime Support",
    desc: "We remember your system. Every service call builds on the last—no starting from scratch."
  },
  {
    icon: <Award className="w-7 h-7 text-primary-blue" />,
    bg: "bg-primary-blue/10",
    title: "Local Expertise",
    desc: "Not a national platform. A licensed master electrician who lives in Kansas City and stakes their reputation on every job."
  }
];

const cardSets = [serviceValues, customerBenefits];

// Animation variants for card set transitions (desktop)
const cardSetVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: "easeIn"
    }
  }
};

// Mobile card entrance animation (for initial load)
const mobileCardEnterVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18
    }
  }
};

// Card component
interface FeatureCardProps {
  card: typeof serviceValues[0];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ card }) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-8 text-left h-full">
    <div className={`flex items-center justify-center w-14 h-14 rounded-full ${card.bg} mb-2`}>
      {card.icon}
    </div>
    <h3 className="font-display text-xl font-medium text-text-primary-light dark:text-text-primary-dark">
      {card.title}
    </h3>
    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-relaxed">
      {card.desc}
    </p>
  </div>
);

// Individual card carousel component
interface CardCarouselProps {
  cardIndex: number;
  onApiReady: (api: CarouselApi, index: number) => void;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cardIndex, onApiReady }) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api) {
      onApiReady(api, cardIndex);
    }
  }, [api, cardIndex, onApiReady]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: false,
        watchDrag: false, // Disable manual swiping - scroll controls it
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-0">
        {cardSets.map((cards, setIndex) => (
          <CarouselItem key={setIndex} className="pl-0">
            <FeatureCard card={cards[cardIndex]} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSet, setActiveSet] = useState<0 | 1>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Store carousel APIs for each card
  const carouselApis = useRef<(CarouselApi | undefined)[]>([undefined, undefined, undefined]);

  // Track which version each card is showing (for per-card scroll triggers)
  const [cardVersions, setCardVersions] = useState<number[]>([0, 0, 0]);

  // Refs for each card to track scroll position
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  // Track scroll direction
  const lastScrollY = useRef(0);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Delay scroll-based changes until after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Handle carousel API ready
  const handleApiReady = useCallback((api: CarouselApi, index: number) => {
    carouselApis.current[index] = api;
  }, []);

  // Per-card scroll trigger for mobile
  useEffect(() => {
    if (!isMobile || !hasMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      const triggerLine = window.innerHeight * 0.65;

      cardRefs.forEach((ref, index) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const cardTop = rect.top;

        const api = carouselApis.current[index];
        if (!api) return;

        // Scrolling down: trigger when card center passes trigger line
        if (isScrollingDown && cardCenter < triggerLine && cardVersions[index] === 0) {
          api.scrollTo(1);
          setCardVersions(prev => {
            const next = [...prev];
            next[index] = 1;
            return next;
          });
        }
        // Scrolling up: trigger when card top passes below trigger line (hysteresis)
        else if (!isScrollingDown && cardTop > triggerLine && cardVersions[index] === 1) {
          api.scrollTo(0);
          setCardVersions(prev => {
            const next = [...prev];
            next[index] = 0;
            return next;
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, hasMounted, cardVersions]);

  // Desktop scroll logic
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.3"]
  });

  const peakProgress = useRef(0);
  const THRESHOLD = 0.4;
  const HYSTERESIS = 0.05;

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!hasMounted) return;
    if (isMobile) return; // Mobile uses per-card logic above

    if (progress > peakProgress.current) {
      peakProgress.current = progress;
    }

    if (activeSet === 0 && progress > THRESHOLD + HYSTERESIS) {
      setActiveSet(1);
    } else if (activeSet === 1 && progress < THRESHOLD - HYSTERESIS && progress > 0.1) {
      setActiveSet(0);
      peakProgress.current = 0;
    }
  });

  const currentCards = cardSets[activeSet];

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="py-20 px-4 md:px-10 bg-background-light dark:bg-background-dark transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto text-center flex flex-col gap-12">
        {/* Static Header */}
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

        {/* Animated Card Grid - Mobile: per-card carousels, Desktop: synchronized */}
        {isMobile ? (
          // Mobile: Each card has its own carousel that triggers on scroll
          <div className="flex flex-col gap-6">
            {[0, 1, 2].map((cardIndex) => (
              <motion.div
                key={cardIndex}
                ref={cardRefs[cardIndex]}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={mobileCardEnterVariants}
              >
                <CardCarousel
                  cardIndex={cardIndex}
                  onApiReady={handleApiReady}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          // Desktop: All cards animate together as a set
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSet}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={cardSetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {currentCards.map((card, i) => (
                <motion.div
                  key={`${activeSet}-${i}`}
                  variants={cardVariants}
                  whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" }}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-8 text-left transition-all duration-300"
                >
                  <div className={`flex items-center justify-center w-14 h-14 rounded-full ${card.bg} mb-2`}>
                    {card.icon}
                  </div>
                  <h3 className="font-display text-xl font-medium text-text-primary-light dark:text-text-primary-dark">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default Features;
