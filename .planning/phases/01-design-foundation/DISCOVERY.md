# Phase 1 Discovery: Design Foundation

**Date:** 2026-01-09
**Depth:** Standard (Level 2)
**Purpose:** Research animation libraries, design patterns, and establish technical approach for visual redesign

## Research Questions

1. Which animation library best fits React 18 + Tailwind v4 + Material Design?
2. What design patterns work best for interactive cost comparison UIs?
3. How can we enhance visual hierarchy while maintaining accessibility?

## Findings

### Animation Library Selection

**Evaluated Options:**
- **Framer Motion** (now "Motion") - React-first animation library
- **GSAP** - Timeline-based, framework-agnostic
- **React Spring** - Physics-based animations

**Comparison:**

| Library | Bundle Size | API Style | Best For | Integration |
|---------|-------------|-----------|----------|-------------|
| Framer Motion | 32 KB gzip (non-modular) | Declarative, component-based | UI transitions, hover effects, page transitions | Native React |
| GSAP | 23 KB gzip (modular) | Imperative via refs | Timeline sequences, pixel-perfect control | Framework-agnostic |
| React Spring | ~29 KB | Declarative, physics-based | Realistic motion, elastic effects | React-specific |

**Adoption (2025):**
- Framer Motion: 1.7M weekly downloads, used by Stripe, Notion
- GSAP: 315K weekly downloads, used by OpenAI, The Guardian
- React Spring: 1.5M weekly downloads

**Recommendation: Framer Motion**

**Rationale:**
- Seamless Tailwind integration (handles inline style animation while Tailwind handles classes)
- Built-in features we need: scroll animations, hover effects, layout transitions
- Declarative API matches React component model
- Strong ecosystem for cost comparison UIs (smooth transitions, dynamic pricing updates)
- No imperative ref management needed (unlike GSAP)
- Bundle size acceptable for our use case (~32KB for full feature set)

**Trade-offs Accepted:**
- Non-modular (can't tree-shake unused features) - acceptable since we'll use most features
- No timeline-based sequencing (not needed for our UI patterns)

### Design Patterns for Cost Comparison

**Key Patterns Identified:**

1. **Interactive Sliders with Dynamic Highlighting**
   - Real-time pricing updates as parameters change
   - Highlighted cards/sections respond to slider values
   - Blur non-relevant options to focus attention
   - Example: Resend's dynamic email volume pricing

2. **Visual Hierarchy Through Animation**
   - Smooth transitions when cost values change
   - Animated highlighting of cost differences (savings)
   - Progressive disclosure of breakdown details
   - Hover effects to reveal additional context

3. **Comparison Table Enhancements**
   - Side-by-side layouts with synchronized scrolling
   - Interactive filtering and sorting
   - Collapsible sections for mobile responsiveness
   - Visual badges ("Best Value", "Most Popular")

4. **Data Visualization Best Practices**
   - Bar charts for simple category comparisons
   - Heat maps for multi-dimensional cost comparisons
   - Consistent sizing for accurate proportional representation
   - Clear labels and legends (avoid jargon)

**Accessibility Considerations:**
- Sufficient color contrast (WCAG AA minimum)
- Don't rely solely on color for meaning (use patterns, labels, icons)
- Keyboard navigation for interactive elements
- Screen reader friendly labels

### Material Design Integration

**Approach:**
- Extend existing Material Design theme in `src/index.css`
- Use Tailwind utilities to implement:
  - Elevation through shadows and z-index
  - Color semantics (primary, secondary, success, warning, error)
  - Spacing and typography scale
- Framer Motion for Material Design motion principles:
  - Responsive duration and easing curves
  - Meaningful motion (guide attention to cost differences)
  - Hierarchical timing (stagger animations for related elements)

### Implementation Strategy

**Standard Stack:**
- Framer Motion for all animations
- Tailwind v4 utilities for styling
- Existing Material Design theme (extend as needed)
- Recharts for chart animations (already installed)

**Architecture Patterns:**
- Wrap existing components with `<motion.*>` components
- Define animation variants for reusable motion patterns
- Use `AnimatePresence` for enter/exit transitions
- Leverage `layout` prop for automatic layout animations

**Common Pitfalls to Avoid:**
- **DON'T** animate class names (Framer Motion animates inline styles)
- **DON'T** over-animate (performance degradation on mobile)
- **DON'T** use complex timeline sequences (not needed, adds complexity)
- **DON'T** rely on color alone for cost differences (accessibility issue)

**Performance Optimization:**
- Use Tailwind's purge/tree-shaking for unused CSS
- Leverage Framer Motion's `willChange` hints
- Keep animations simple and GPU-accelerated (transform, opacity)
- Test on mobile devices early

## Code Examples

**Framer Motion + Tailwind Pattern:**
```tsx
import { motion } from "framer-motion"

export default function CostCard({ cost, isHighlighted }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      animate={{
        backgroundColor: isHighlighted ? "#1e88e5" : "#ffffff",
        scale: isHighlighted ? 1.05 : 1
      }}
      transition={{ duration: 0.3 }}
      className="px-4 py-6 rounded-lg shadow-md"
    >
      {/* Tailwind handles base styles, Framer Motion handles dynamic state */}
    </motion.div>
  )
}
```

**Animation Variants for Reusability:**
```tsx
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  hover: { scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }
}

<motion.div
  variants={cardVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  whileHover="hover"
>
  {/* Content */}
</motion.div>
```

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Use Framer Motion | Best React integration, declarative API, ideal for UI transitions we need |
| Extend existing Material Design theme | No need to rebuild - current theme is solid foundation |
| Focus on hover effects + smooth transitions | Core interactions that make cost exploration delightful |
| Avoid timeline-based animations | Not needed for our UI patterns, adds complexity |
| Keep bundle size under control | Accept 32KB for Framer Motion (worth the DX and features) |

## Next Steps

Phase planning should incorporate:
1. Design system setup (install Framer Motion, define animation variants)
2. Component animation patterns (reusable motion configs)
3. Interaction design (hover states, dynamic highlighting)
4. Mobile responsiveness considerations (simpler animations on small screens)

## References

- Framer Motion docs: https://motion.dev/
- Material Design motion: https://m3.material.io/styles/motion/overview
- Tailwind + Framer Motion integration patterns
- Cost comparison UI best practices (feature tables, dynamic pricing)
