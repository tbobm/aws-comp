import { Variants, Transition } from 'framer-motion';

/**
 * Animation variants for cost comparison cards.
 * Use on card containers to provide hover elevation and smooth transitions.
 *
 * Example:
 * ```tsx
 * <motion.div variants={cardVariants} initial="initial" animate="animate" whileHover="hover">
 * ```
 */
export const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 1,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Animation variants for cost value changes.
 * Use when cost values update due to parameter changes or real-time updates.
 * Provides subtle pulse effect to draw attention to the change.
 *
 * Example:
 * ```tsx
 * <motion.span variants={costChangeVariants} animate="animate">
 *   ${cost}
 * </motion.span>
 * ```
 */
export const costChangeVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.15, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

/**
 * Animation variants for highlighting cost savings or significant differences.
 * Creates attention-grabbing pulse effect for positive cost changes.
 *
 * Example:
 * ```tsx
 * <motion.div variants={highlightVariants} initial="initial" animate="animate">
 *   Save $X/month
 * </motion.div>
 * ```
 */
export const highlightVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: [0.9, 1.05, 1],
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Animation variants for staggered entrance animations.
 * Use with stagger children to create sequential reveal effects.
 *
 * Example:
 * ```tsx
 * <motion.div variants={fadeInUpVariants} initial="initial" animate="animate">
 *   {items.map(item => (
 *     <motion.div key={item.id} variants={fadeInUpVariants}>
 *       {item.content}
 *     </motion.div>
 *   ))}
 * </motion.div>
 * ```
 */
export const fadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Animation variants for interactive parameter sliders and controls.
 * Provides smooth feedback for user interactions.
 *
 * Example:
 * ```tsx
 * <motion.div variants={interactiveControlVariants} whileHover="hover" whileTap="tap">
 * ```
 */
export const interactiveControlVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Shared layout transition configuration for smooth layout changes.
 * Use with layout prop on motion components for automatic position animations.
 *
 * Example:
 * ```tsx
 * <motion.div layout transition={layoutTransitionConfig}>
 * ```
 */
export const layoutTransitionConfig: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 1,
};

/**
 * Animation variants for tooltip reveals.
 * Provides smooth fade-in with slight offset for visual polish.
 *
 * Example:
 * ```tsx
 * <motion.div variants={tooltipVariants} initial="initial" animate="animate" exit="exit">
 * ```
 */
export const tooltipVariants: Variants = {
  initial: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};
