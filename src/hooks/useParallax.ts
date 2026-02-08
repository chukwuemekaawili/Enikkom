import { useScroll, useTransform, MotionValue, useReducedMotion } from "framer-motion";
import { useRef, RefObject } from "react";

interface UseParallaxOptions {
  offset?: number;
  speed?: number;
}

interface ParallaxResult {
  ref: RefObject<HTMLDivElement>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export function useParallax({ offset = 50, speed = 0.5 }: UseParallaxOptions = {}): ParallaxResult {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // If user prefers reduced motion, return static values
  const effectiveOffset = prefersReducedMotion ? 0 : offset * speed;
  
  const y = useTransform(scrollYProgress, [0, 1], [effectiveOffset, -effectiveOffset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return { ref, y, opacity, scale };
}

export function useScrollReveal() {
  const prefersReducedMotion = useReducedMotion();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: prefersReducedMotion ? 1 : 0, 
      y: prefersReducedMotion ? 0 : 24 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return { containerVariants, itemVariants };
}
