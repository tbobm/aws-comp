# Design System Documentation

This document establishes the animation patterns, interaction guidelines, and visual hierarchy principles for the AWS Architecture Comparison Tool redesign.

## Section 1: Animation Patterns

### Cost Cards

**Container animations:** Use `cardVariants` from `src/utils/animations.ts`

```tsx
import { motion } from 'framer-motion';
import { cardVariants } from '@/utils/animations';

<motion.div
  variants={cardVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  whileHover="hover"
  whileTap="tap"
  className="shadow-subtle hover:shadow-hover transition-shadow duration-normal"
>
  {/* Card content */}
</motion.div>
```

**When to use:** Cost comparison cards, architecture option cards, service breakdowns.

### Cost Value Updates

**Dynamic value changes:** Use `costChangeVariants` when values update

```tsx
import { motion } from 'framer-motion';
import { costChangeVariants } from '@/utils/animations';

<motion.span
  key={cost} // Force re-animation on value change
  variants={costChangeVariants}
  initial="initial"
  animate="animate"
  className="text-2xl font-semibold"
>
  ${cost.toFixed(2)}
</motion.span>
```

**When to use:** Parameter changes, real-time cost recalculations, slider interactions.

### Savings Highlights

**Emphasizing differences:** Use `highlightVariants` for cost savings or significant differences

```tsx
import { motion } from 'framer-motion';
import { highlightVariants } from '@/utils/animations';

<motion.div
  variants={highlightVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  className="text-cost-savings bg-cost-savings-light/10 px-3 py-2 rounded-lg"
>
  <span className="font-semibold">Save ${savings.toFixed(2)}/month</span>
</motion.div>
```

**When to use:** Cost differences > 10%, "best value" indicators, savings callouts.

### Page Transitions

**Entrance animations:** Use `fadeInUpVariants` with stagger for lists

```tsx
import { motion } from 'framer-motion';
import { fadeInUpVariants } from '@/utils/animations';

<motion.div
  variants={fadeInUpVariants}
  initial="initial"
  animate="animate"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={fadeInUpVariants}
      className="mb-4"
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**When to use:** Component mounts, list reveals, page navigation.

## Section 2: Hover States and Micro-interactions

### Standard Hover Pattern

**Visual feedback on interactive elements:**

```tsx
// Scale up slightly with elevation increase
<motion.button
  whileHover={{ scale: 1.02 }}
  className="shadow-subtle hover:shadow-hover transition-all duration-quick"
>
  Compare Options
</motion.button>
```

**Principles:**
- Scale: 1.02 for cards, 1.05 for buttons
- Elevation: `shadow-subtle` → `shadow-hover`
- Duration: `duration-quick` (200ms)

### Active/Selected States

**Indicating selection or active state:**

```tsx
<motion.div
  animate={{
    scale: isSelected ? 1.05 : 1,
    boxShadow: isSelected ? 'var(--shadow-active)' : 'var(--shadow-subtle)',
  }}
  transition={{ duration: 0.2, ease: 'easeInOut' }}
  className={`border-2 ${isSelected ? 'border-primary-500' : 'border-neutral-300'}`}
>
  {/* Content */}
</motion.div>
```

**Principles:**
- Scale: 1.05 for selected
- Elevation: `shadow-active` for selected
- Color: Primary border for selection
- Maintain accessibility contrast

### Interactive Sliders

**Smooth value updates with highlighting:**

```tsx
import { motion } from 'framer-motion';
import { costChangeVariants } from '@/utils/animations';

<div>
  <input
    type="range"
    value={value}
    onChange={handleChange}
    className="w-full"
  />
  <motion.div
    variants={costChangeVariants}
    animate="animate"
    key={value}
    className="text-cost-neutral mt-2"
  >
    {value} instances
  </motion.div>
</div>
```

**Principles:**
- Animate value display on change
- Use `costChangeVariants` for emphasis
- Keep slider controls responsive (no animation lag)

### Tooltip Reveals

**Fade in with slight offset:**

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { tooltipVariants } from '@/utils/animations';

<AnimatePresence>
  {showTooltip && (
    <motion.div
      variants={tooltipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute z-10 bg-neutral-800 text-white px-3 py-2 rounded shadow-lg"
    >
      {tooltipContent}
    </motion.div>
  )}
</AnimatePresence>
```

**Principles:**
- Quick reveal (200ms)
- Slight vertical offset for visual polish
- Always use `AnimatePresence` for exit animations

## Section 3: Visual Hierarchy

### Color Semantics

**Cost-specific color usage:**

```tsx
// Positive difference (savings)
<span className="text-cost-savings">-${difference.toFixed(2)}</span>

// Negative difference (increase)
<span className="text-cost-increase">+${difference.toFixed(2)}</span>

// Baseline/neutral
<span className="text-cost-neutral">${baseline.toFixed(2)}</span>
```

**Principles:**
- Green (cost-savings) for positive outcomes
- Red (cost-increase) for negative outcomes
- Gray (cost-neutral) for baseline values
- Always maintain 4.5:1 contrast ratio

### Elevation Hierarchy

**Indicating importance through depth:**

```tsx
// Resting state - minimal elevation
<div className="shadow-subtle">Base card</div>

// Hovered - medium elevation
<div className="shadow-hover">Hovered card</div>

// Selected/Active - highest elevation
<div className="shadow-active">Selected card</div>
```

**Hierarchy rules:**
1. Selected > Hovered > Rest
2. Interactive elements > Static content
3. Modal overlays > Page content

### Animating Attention

**Draw attention to significant cost changes (>10% difference):**

```tsx
import { motion } from 'framer-motion';
import { highlightVariants } from '@/utils/animations';

{Math.abs(percentChange) > 10 && (
  <motion.div
    variants={highlightVariants}
    initial="initial"
    animate="animate"
    className="absolute top-2 right-2 bg-cost-savings text-white px-2 py-1 rounded text-sm font-semibold"
  >
    {percentChange > 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(0)}%
  </motion.div>
)}
```

**When to use:** >10% cost difference, "best value" options, configuration warnings.

## Section 4: Responsive Guidelines

### Desktop (≥1024px)

**Full animation suite:**
- All hover effects enabled
- Complex transitions with scale/elevation
- Detailed tooltips and micro-interactions
- Staggered entrance animations

```tsx
<motion.div
  variants={cardVariants}
  whileHover="hover" // Full hover effect
  className="hidden lg:block"
>
  {/* Desktop-optimized content */}
</motion.div>
```

### Tablet (768px - 1023px)

**Simplified animations with touch-friendly targets:**
- Reduced scale on hover (1.01 vs 1.02)
- Larger tap targets (min 44px)
- Simplified transitions (fewer simultaneous properties)

```tsx
<motion.button
  whileHover={{ scale: 1.01 }} // Reduced for tablet
  className="min-h-[44px] min-w-[44px] md:min-h-[40px]"
>
  {/* Touch-optimized button */}
</motion.button>
```

### Mobile (<768px)

**Minimal animations for performance:**
- Disable hover effects (not applicable on touch)
- Use instant transitions or very quick animations (100-150ms)
- Focus on tap feedback only
- Larger tap targets (min 48px)

```tsx
<motion.div
  whileTap={{ scale: 0.98 }} // Tap feedback only
  className="min-h-[48px] sm:hover:scale-102 sm:transition-transform"
>
  {/* Mobile-optimized content */}
</motion.div>
```

**Disable complex animations on mobile:**

```tsx
// Use Tailwind responsive classes to conditionally apply animations
<div className="sm:animate-fade-in"> {/* Only on tablet+ */}
  {/* Content */}
</div>
```

## Section 5: Accessibility

### Respecting User Preferences

**Always respect `prefers-reduced-motion`:**

```tsx
// Option 1: CSS-based (recommended for simple transitions)
<div className="transition-all duration-normal motion-reduce:transition-none">
  {/* Content */}
</div>

// Option 2: JavaScript-based (for Framer Motion animations)
import { useReducedMotion } from 'framer-motion';

function Component() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { scale: 1.05 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

### Keyboard Navigation

**Maintain focus states for all interactive elements:**

```tsx
<motion.button
  whileFocus={{ scale: 1.02, boxShadow: 'var(--shadow-hover)' }}
  className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
>
  Interactive Element
</motion.button>
```

**Principles:**
- Focus indicators must be visible (2px ring minimum)
- Focus states should have similar visual weight to hover states
- Keyboard navigation order should be logical (top to bottom, left to right)

### Color Contrast

**Ensure sufficient contrast for all cost values:**

```tsx
// Text on light background (neutral-50)
<span className="text-neutral-900"> {/* 4.5:1+ contrast */}
  ${cost.toFixed(2)}
</span>

// Text on colored background
<div className="bg-cost-savings text-white"> {/* White on green = 4.5:1+ */}
  Save ${savings}
</div>
```

**Test tool:** Use browser DevTools Accessibility panel to verify contrast ratios.

### Don't Rely on Color Alone

**Always pair color with icons or labels:**

```tsx
// ✅ Good - Icon + color + text
<div className="flex items-center gap-2 text-cost-savings">
  <ArrowDownIcon className="w-4 h-4" />
  <span className="font-semibold">Save ${savings}</span>
</div>

// ❌ Bad - Color only
<span className="text-cost-savings">${savings}</span>
```

**Accessible patterns:**
- Savings: Green + down arrow + "Save" text
- Increase: Red + up arrow + "Increase" text
- Neutral: Gray + dash icon + baseline label

## What to Avoid

### Over-animation

**Don't animate everything:**
- ❌ Animating every property change creates visual noise
- ❌ Chained sequences with multiple stages add unnecessary complexity
- ✅ Animate only meaningful state changes (user interactions, data updates)

### Timeline-Based Animations

**Avoid complex timeline sequences:**
- ❌ Sequenced animations with delays (per DISCOVERY.md)
- ❌ Choreographed multi-element sequences
- ✅ Simple declarative animations with variants
- ✅ Stagger children for natural reveals

### Color-Only Semantics

**Never use color as the sole indicator:**
- ❌ Red text for errors without an icon or message
- ❌ Green background for success without confirmation text
- ✅ Color + icon + text label for all semantic meanings

### Excessive Scale Changes

**Keep scale transforms subtle:**
- ❌ Scale 1.5+ creates jarring jumps
- ❌ Different scale values for similar elements creates inconsistency
- ✅ Scale 1.02 for hover, 1.05 for selection
- ✅ Scale 0.98 for tap feedback

### Ignoring Performance

**Mobile-first performance considerations:**
- ❌ Complex animations on low-end devices
- ❌ Animating expensive properties (width, height, box-shadow without will-change)
- ✅ Use transform and opacity (GPU-accelerated)
- ✅ Disable/simplify animations on mobile

---

**Next Steps:**

When implementing components, reference this document for consistent animation and interaction patterns. All patterns follow Material Design motion principles and accessibility guidelines.

**Questions or updates:** Discuss with team before deviating from established patterns.
