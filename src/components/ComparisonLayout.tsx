import { useState } from 'react';
import { motion } from 'framer-motion';
import { ComparisonLayoutProps, GenericCostBreakdown } from '../types/comparison';
import ComparisonChart from './ComparisonChart';
import {
  cardVariants,
  highlightVariants,
  fadeInUpVariants,
  layoutTransitionConfig
} from '../utils/animations';

export default function ComparisonLayout<TConfig, TBreakdown extends GenericCostBreakdown>({
  serviceName,
  ConfigForm,
  CostBreakdownComponent,
  calculateCost,
  defaultConfig1,
  defaultConfig2,
  configLabel1 = 'Configuration 1',
  configLabel2 = 'Configuration 2',
}: ComparisonLayoutProps<TConfig, TBreakdown>) {
  const [config1, setConfig1] = useState<TConfig>(defaultConfig1);
  const [config2, setConfig2] = useState<TConfig>(defaultConfig2);

  const breakdown1 = calculateCost(config1);
  const breakdown2 = calculateCost(config2);

  const total1 = breakdown1.total;
  const total2 = breakdown2.total;

  const savings = Math.abs(total1 - total2);
  const savingsPercentage = total1 !== 0 || total2 !== 0
    ? (savings / Math.max(total1, total2)) * 100
    : 0;
  const cheaperOption = total1 < total2 ? 1 : total1 > total2 ? 2 : null;

  return (
    <motion.div
      className="space-y-8"
      variants={fadeInUpVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-subtle p-8 border-l-4 border-primary-500 dark:border-primary-400"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">{serviceName}</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Compare costs between two different configurations side-by-side
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        layout
        transition={layoutTransitionConfig}
      >
        <motion.div
          className={`bg-white dark:bg-neutral-800 rounded-xl shadow-subtle p-6 border-t-2 border-primary-400 dark:border-primary-500 ${cheaperOption === 1 ? 'bg-cost-savings-light dark:bg-cost-savings/20' : ''}`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-primary-500 dark:bg-primary-400 mr-2"></div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{configLabel1}</h2>
          </div>
          <ConfigForm config={config1} onChange={setConfig1} label={configLabel1} />
        </motion.div>

        <motion.div
          className={`bg-white dark:bg-neutral-800 rounded-xl shadow-subtle p-6 border-t-2 border-secondary-400 dark:border-secondary-500 ${cheaperOption === 2 ? 'bg-cost-savings-light dark:bg-cost-savings/20' : ''}`}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-secondary-500 dark:bg-secondary-400 mr-2"></div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{configLabel2}</h2>
          </div>
          <ConfigForm config={config2} onChange={setConfig2} label={configLabel2} />
        </motion.div>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-hover p-8"
        variants={cardVariants}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-4">Cost Comparison</h2>

        <div className="mb-6">
          <ComparisonChart
            config1Label={configLabel1}
            config2Label={configLabel2}
            breakdown1={breakdown1}
            breakdown2={breakdown2}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          layout
          transition={layoutTransitionConfig}
        >
          <div>
            <CostBreakdownComponent breakdown={breakdown1} label={configLabel1} />
          </div>
          <div>
            <CostBreakdownComponent breakdown={breakdown2} label={configLabel2} />
          </div>
        </motion.div>

        {cheaperOption && (
          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-cost-savings/10 to-cost-savings/5 dark:from-cost-savings/20 dark:to-cost-savings/10 border-l-4 border-cost-savings rounded-lg shadow-subtle"
            variants={highlightVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-start">
              <svg className="w-6 h-6 text-cost-savings mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-neutral-900 dark:text-neutral-100 font-bold text-lg mb-1">
                  {cheaperOption === 1 ? configLabel1 : configLabel2} is more cost-effective
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Save <span className="font-bold text-cost-savings">${savings.toFixed(2)}/month</span> ({savingsPercentage.toFixed(1)}% reduction in costs)
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
