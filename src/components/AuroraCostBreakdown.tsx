import { motion } from 'framer-motion';
import type { AuroraCostBreakdown } from '../types/rds';
import { cardVariants, costChangeVariants, highlightVariants, fadeInUpVariants } from '../utils/animations';

interface AuroraCostBreakdownProps {
  breakdown: AuroraCostBreakdown;
}

export default function AuroraCostBreakdown({ breakdown }: AuroraCostBreakdownProps) {
  const formatCost = (cost: number) => {
    return cost.toFixed(2);
  };

  const costItems = [
    { label: 'Compute', value: breakdown.computeCost },
    { label: 'Storage', value: breakdown.storageCost },
    { label: 'I/O Requests', value: breakdown.ioCost },
    { label: 'Backup Storage', value: breakdown.backupCost },
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 mt-6 shadow-subtle border-l-4 border-secondary-500 dark:border-secondary-400"
    >
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">Cost Breakdown</h3>

      <motion.div
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        className="space-y-3"
      >
        {costItems.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeInUpVariants}
            className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700"
          >
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">{item.label}</span>
            <motion.span
              key={item.value}
              variants={costChangeVariants}
              initial="initial"
              animate="animate"
              className="font-medium text-neutral-800 dark:text-neutral-200"
            >
              ${formatCost(item.value)}
            </motion.span>
          </motion.div>
        ))}

        <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-neutral-300 dark:border-neutral-600">
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Total Cost</span>
          <motion.span
            key={breakdown.totalCost}
            variants={highlightVariants}
            initial="initial"
            animate="animate"
            className="text-lg font-bold text-secondary-600 dark:text-secondary-400"
          >
            ${formatCost(breakdown.totalCost)} / month
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
