import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';

// Set 1: First 3 testimonials
const testimonialSet1 = [
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

// Set 2: Next 3 testimonials
const testimonialSet2 = [
  {
    quote: "We had a solar company tell us our panels were fine when they clearly weren't producing. Fidelis came out, showed us the monitoring data, and fixed an inverter issue no one else caught. Honest diagnostics make all the difference.",
    author: "Jennifer Adams",
    context: "Lee's Summit, MO"
  },
  {
    quote: "What impressed me most was the follow-up. A week after the repair, they called to make sure everything was running smoothly. That kind of attention to detail is rare in any industry.",
    author: "Robert Nguyen",
    context: "Prairie Village, KS"
  },
  {
    quote: "I was nervous about switching service providers mid-warranty. The Fidelis team walked me through everything, handled the paperwork, and now I have someone I can actually reach when I need help.",
    author: "Amanda & Chris Peterson",
    context: "Olathe, KS"
  }
];

const testimonialSets = [testimonialSet1, testimonialSet2];

// Animation variants matching Features.tsx pattern (desktop)
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

// Testimonial card component
interface TestimonialCardProps {
  testimonial: typeof testimonialSet1[0];
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="flex flex-col gap-4 p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-800 h-full">
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, idx) => (
        <Star key={idx} className="w-5 h-5 fill-amber-500 text-amber-500" />
      ))}
    </div>
    <blockquote className="text-base font-normal leading-relaxed text-text-primary-light dark:text-text-primary-dark flex-grow">
      "{testimonial.quote}"
    </blockquote>
    <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
      <cite className="not-italic text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark block">
        — {testimonial.author}
      </cite>
      <span className="text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/70">
        {testimonial.context}
      </span>
    </div>
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
        {testimonialSets.map((testimonials, setIndex) => (
          <CarouselItem key={setIndex} className="pl-0">
            <TestimonialCard testimonial={testimonials[cardIndex]} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const Testimonials: React.FC = () => {
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

  const currentTestimonials = testimonialSets[activeSet];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-20 px-4 md:px-10 bg-background-light dark:bg-background-dark transition-colors duration-300"
    >
      <div className="max-w-[1200px] mx-auto bg-surface-light dark:bg-surface-dark rounded-3xl p-8 md:p-16 transition-colors duration-300">
        {/* Static Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 items-center text-center mb-12"
        >
          <h2 className="font-display tracking-tight text-3xl md:text-4xl font-bold leading-tight max-w-2xl text-text-primary-light dark:text-text-primary-dark">
            Testimonials
          </h2>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl">
            Real stories from Kansas City homeowners who trust Fidelis with their solar systems.
          </p>
        </motion.div>

        {/* Animated Testimonial Grid - Mobile: per-card carousels, Desktop: synchronized */}
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
              className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[400px]"
              variants={cardSetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {currentTestimonials.map((testimonial, i) => (
                <motion.div
                  key={`${activeSet}-${i}`}
                  variants={cardVariants}
                  whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" }}
                  className="flex flex-col gap-4 p-8 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-100 dark:border-gray-800 h-full transition-all duration-300"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <blockquote className="text-base font-normal leading-relaxed text-text-primary-light dark:text-text-primary-dark flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
                    <cite className="not-italic text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark block">
                      — {testimonial.author}
                    </cite>
                    <span className="text-xs text-text-secondary-light/70 dark:text-text-secondary-dark/70">
                      {testimonial.context}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
