import { motion } from 'framer-motion';
import type { GenericCostBreakdown } from '../types/comparison';
import { cardVariants, costChangeVariants, highlightVariants, fadeInUpVariants } from '../utils/animations';

interface CostBreakdownProps {
  breakdown: GenericCostBreakdown;
  label?: string;
}

export default function CostBreakdown({ breakdown, label }: CostBreakdownProps) {
  const formatCost = (cost: number) => {
    return cost.toFixed(2);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 mt-6 shadow-subtle border-l-4 border-primary-500 dark:border-primary-400"
    >
      {label && <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">{label}</h3>}

      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        className="space-y-3"
      >
        {breakdown.items.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeInUpVariants}
            className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700"
          >
            <span className="text-cost-neutral dark:text-neutral-400">{item.label}</span>
            <motion.span
              key={item.cost}
              variants={costChangeVariants}
              initial="initial"
              animate="animate"
              className="font-medium text-neutral-800 dark:text-neutral-200"
            >
              ${formatCost(item.cost)}
            </motion.span>
          </motion.div>
        ))}

        <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-neutral-300 dark:border-neutral-600">
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Total Cost</span>
          <motion.span
            key={breakdown.total}
            variants={highlightVariants}
            initial="initial"
            animate="animate"
            className="text-lg font-bold text-primary-600 dark:text-primary-400"
          >
            ${formatCost(breakdown.total)} / month
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
