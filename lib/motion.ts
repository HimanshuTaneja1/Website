export const EASE_FLUID = [0.22, 1, 0.36, 1] as const;
export const EASE_SWIFT = [0.4, 0, 0.2, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE_FLUID },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: EASE_FLUID },
};

export const stagger = (delayChildren = 0.1, staggerChildren = 0.08) => ({
  animate: {
    transition: { delayChildren, staggerChildren },
  },
});
