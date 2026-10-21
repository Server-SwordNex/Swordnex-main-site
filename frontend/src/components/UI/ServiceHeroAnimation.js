import './ServiceHeroAnimation.css';

/**
 * Hero Heading Motion Variants
 * Reveals the white heading first, then the cyan highlight immediately afterward:
 * - Stagger children by 0.18s with subtle delay
 * - Smooth cubic-bezier upward fade [0.22, 1, 0.36, 1] over 0.65s
 */
export const heroHeadingContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.08,
    },
  },
};

export const heroHeadingPrimaryVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroHeadingHighlightVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
