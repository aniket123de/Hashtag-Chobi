"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  href?: string; // Add optional href for navigation
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'right' | 'left'>('right');
  const [isManuallyScrolling, setIsManuallyScrolling] = useState(false);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  // Auto-scroll animation with reverse direction
  useEffect(() => {
    if (!isHovered && !isManuallyScrolling && carouselRef.current) {
      const scrollInterval = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

          if (scrollDirection === 'right') {
            // Scrolling to the right
            if (scrollLeft >= scrollWidth - clientWidth - 10) {
              // Reached the end, change direction to left
              setScrollDirection('left');
            } else {
              carouselRef.current.scrollBy({ left: 1, behavior: "auto" });
            }
          } else {
            // Scrolling to the left
            if (scrollLeft <= 10) {
              // Reached the beginning, change direction to right
              setScrollDirection('right');
            } else {
              carouselRef.current.scrollBy({ left: -1, behavior: "auto" });
            }
          }
        }
      }, 30); // Adjust speed by changing this interval (lower = faster)

      return () => clearInterval(scrollInterval);
    }
  }, [isHovered, scrollDirection, isManuallyScrolling]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      setIsManuallyScrolling(true);
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      // Resume auto-scroll after manual scroll is complete
      setTimeout(() => setIsManuallyScrolling(false), 1000);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      setIsManuallyScrolling(true);
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      // Resume auto-scroll after manual scroll is complete
      setTimeout(() => setIsManuallyScrolling(false), 1000);
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      setIsManuallyScrolling(true);
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
      // Resume auto-scroll after manual scroll is complete
      setTimeout(() => setIsManuallyScrolling(false), 1000);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ scrollBehavior: 'auto' }}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const handleClick = () => {
    if (card.href) {
      // Navigate to the specified href
      window.location.href = card.href;
    }
  };

  return (
    <motion.button
      layoutId={layout ? `card-${card.title}` : undefined}
      onClick={handleClick}
      className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900 transition-transform duration-300 hover:scale-105"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="relative z-40 p-8">
        <motion.p
          layoutId={layout ? `category-${card.category}` : undefined}
          className="text-left font-sans text-sm font-medium text-white md:text-base"
        >
          {card.category}
        </motion.p>
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className="mt-2 max-w-xs text-left font-serif text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
        >
          {card.title}
        </motion.p>
      </div>
      <BlurImage
        src={card.src}
        alt={card.title}
        className="absolute inset-0 z-10 object-cover"
      />
    </motion.button>
  );
};

export const BlurImage = ({
  src,
  className,
  alt,
  ...rest
}: {
  src: string;
  className?: string;
  alt?: string;
  [key: string]: any;
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
