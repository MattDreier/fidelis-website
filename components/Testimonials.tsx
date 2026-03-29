import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';

// All 6 testimonials in order
const allTestimonials = [
  {
    quote: "After 10 years of having solar panels, we decided to get a backup battery installed. We received multiple bids from several companies and decided to go with Fidelis. I dealt with Alex and from start to finish, the entire transaction went smoothly. He was patient with my endless questions and concerns. The project was completed on time. The installation team was punctual, polite, and cleaned up prior to leaving. I highly recommend them and will use them again in the future.",
    author: "Jay Roberts",
    context: "Kansas City, MO"
  },
  {
    quote: "My experience with Fidelis has been nothing short of excellent. From the very beginning, the process felt smooth and well-coordinated. The team was clearly knowledgeable and completely transparent, which made the entire installation feel effortless on my end. Communication was consistent and easy to follow, and the final walkthrough was especially helpful. I feel genuinely confident about the future of my home's energy setup. Highly recommended!",
    author: "Amanda Hankins",
    context: "Overland Park, KS"
  },
  {
    quote: "Working with Fidelis was smooth sailing! Excellent experience from start to finish. The team was knowledgeable, transparent, and made the install seem easy. Really good communication and final walkthrough of how to use the app, what to track, and how to see the best results. I feel confident about what the future has in store at my house!",
    author: "Brian Polodna",
    context: "Leawood, KS"
  },
  {
    quote: "Fidelis did a remarkable job helping me correct loose ends left over by a previous installer. Dan Fuqua is managing things and doing a superb, reliable, dedicated job taking care of business. He's been very responsive, which is an outstanding attribute. Thank you!",
    author: "Ken Scott",
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

// For mobile: split into sets for the per-card carousel approach
const testimonialSets = [
  allTestimonials.slice(0, 3),
  allTestimonials.slice(3, 6)
];

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
  testimonial: typeof allTestimonials[0];
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

// Mobile: Individual card carousel component (switches between 2 testimonials)
interface MobileCardCarouselProps {
  cardIndex: number;
  onApiReady: (api: CarouselApi, index: number) => void;
}

const MobileCardCarousel: React.FC<MobileCardCarouselProps> = ({ cardIndex, onApiReady }) => {
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
        watchDrag: false,
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
  const carouselRef = useRef<HTMLDivElement>(null); // Track the carousel cards directly, not the padded container
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Mobile: Store carousel APIs for each card
  const mobileCarouselApis = useRef<(CarouselApi | undefined)[]>([undefined, undefined, undefined]);

  // Desktop: Single carousel API
  const [desktopApi, setDesktopApi] = useState<CarouselApi>();

  // Track which version each card is showing (for per-card scroll triggers on mobile)
  const [cardVersions, setCardVersions] = useState<number[]>([0, 0, 0]);

  // Desktop: Track current slide index (0-3, showing cards [0,1,2] through [3,4,5])
  const [desktopSlideIndex, setDesktopSlideIndex] = useState(0);

  // Refs for each card to track scroll position (mobile)
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

  // Handle mobile carousel API ready
  const handleMobileApiReady = useCallback((api: CarouselApi, index: number) => {
    mobileCarouselApis.current[index] = api;
  }, []);

  // Per-card scroll trigger for mobile
  useEffect(() => {
    if (!isMobile || !hasMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      const triggerLine = window.innerHeight * 0.85;

      cardRefs.forEach((ref, index) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const cardThreeQuarter = rect.top + rect.height * 0.75;  // 3/4 mark (scrolling down)
        const cardQuarter = rect.top + rect.height * 0.25;       // 1/4 mark (scrolling up)

        const api = mobileCarouselApis.current[index];
        if (!api) return;

        // Scrolling down: trigger when 3/4 mark passes trigger line
        if (isScrollingDown && cardThreeQuarter < triggerLine && cardVersions[index] === 0) {
          api.scrollTo(1);
          setCardVersions(prev => {
            const next = [...prev];
            next[index] = 1;
            return next;
          });
        }
        // Scrolling up: trigger when 1/4 mark passes below trigger line (hysteresis)
        else if (!isScrollingDown && cardQuarter > triggerLine && cardVersions[index] === 1) {
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

  // Desktop scroll logic - single carousel, slides one card at a time
  // Track the CAROUSEL element directly (the cards), not the padded container
  // offset: "end end" = progress 0 when cards' bottom hits viewport bottom
  // offset: "end start" = progress 1 when cards' bottom reaches viewport top
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["end end", "end start"]
  });

  // Thresholds for each slide transition (0→1, 1→2, 2→3)
  // First threshold near 0: triggers immediately when container is fully visible
  const SLIDE_THRESHOLDS = [0.02, 0.18, 0.34];
  const HYSTERESIS = 0.04;

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!hasMounted) return;
    if (isMobile) return;
    if (!desktopApi) return;

    // Determine target slide based on scroll progress
    let targetSlide = 0;
    for (let i = SLIDE_THRESHOLDS.length - 1; i >= 0; i--) {
      if (progress > SLIDE_THRESHOLDS[i] + HYSTERESIS) {
        targetSlide = i + 1;
        break;
      }
    }

    // Check for scrolling back up with hysteresis
    if (desktopSlideIndex > 0) {
      const currentThreshold = SLIDE_THRESHOLDS[desktopSlideIndex - 1];
      if (progress < currentThreshold - HYSTERESIS) {
        targetSlide = Math.min(targetSlide, desktopSlideIndex - 1);
      }
    }

    if (targetSlide !== desktopSlideIndex) {
      setDesktopSlideIndex(targetSlide);
      desktopApi.scrollTo(targetSlide);
    }
  });

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
        </motion.div>

        {/* Testimonials */}
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
                <MobileCardCarousel
                  cardIndex={cardIndex}
                  onApiReady={handleMobileApiReady}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          // Desktop: Single carousel with all 6 cards, showing 3 at a time
          <div ref={carouselRef}>
            <Carousel
              setApi={setDesktopApi}
              opts={{
                align: "start",
                loop: false,
                watchDrag: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-6">
                {allTestimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-6 !basis-1/3">
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
