import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComparisonLayoutProps, GenericCostBreakdown, Scenario } from '../types/comparison';
import ComparisonChart from './ComparisonChart';
import {
  cardVariants,
  highlightVariants,
  fadeInUpVariants,
  layoutTransitionConfig
} from '../utils/animations';

const SCENARIO_COLORS = [
  '#2196f3', // primary-500
  '#3f51b5', // secondary-500
  '#9c27b0', // purple-500
  '#009688', // teal-500
];

export default function ComparisonLayout<TConfig, TBreakdown extends GenericCostBreakdown>({
  serviceName,
  ConfigForm,
  CostBreakdownComponent,
  calculateCost,
  defaultConfig1,
  defaultConfig2,
  configLabel1 = 'Configuration 1',
  configLabel2 = 'Configuration 2',
  enableMultiScenario = false,
}: ComparisonLayoutProps<TConfig, TBreakdown>) {
  // Multi-scenario state
  const [scenarios, setScenarios] = useState<Scenario<TConfig>[]>(() => [
    { id: 'A', label: 'Scenario A', config: defaultConfig1 },
    { id: 'B', label: 'Scenario B', config: defaultConfig2 },
  ]);

  // Standard two-config state
  const [config1, setConfig1] = useState<TConfig>(defaultConfig1);
  const [config2, setConfig2] = useState<TConfig>(defaultConfig2);

  // Helper functions for multi-scenario mode
  const addScenario = () => {
    if (scenarios.length >= 4) return;
    const nextLetter = String.fromCharCode(65 + scenarios.length); // A=65
    setScenarios([
      ...scenarios,
      { id: nextLetter, label: `Scenario ${nextLetter}`, config: defaultConfig1 },
    ]);
  };

  const removeScenario = (id: string) => {
    if (scenarios.length <= 2) return;
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  const updateScenarioConfig = (id: string, config: TConfig) => {
    setScenarios(scenarios.map(s => s.id === id ? { ...s, config } : s));
  };

  const updateScenarioLabel = (id: string, label: string) => {
    setScenarios(scenarios.map(s => s.id === id ? { ...s, label } : s));
  };

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

      {enableMultiScenario ? (
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-subtle p-6 border-l-4 relative"
                style={{ borderLeftColor: SCENARIO_COLORS[index % SCENARIO_COLORS.length] }}
                variants={fadeInUpVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
                transition={layoutTransitionConfig}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: SCENARIO_COLORS[index % SCENARIO_COLORS.length] }}
                  ></div>
                  <input
                    type="text"
                    value={scenario.label}
                    onChange={(e) => updateScenarioLabel(scenario.id, e.target.value)}
                    className="text-xl font-semibold bg-white dark:bg-neutral-900 border-b-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none transition-colors text-neutral-900 dark:text-neutral-100 px-2 py-1"
                  />
                  {scenarios.length > 2 && (
                    <button
                      onClick={() => removeScenario(scenario.id)}
                      className="ml-auto w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 flex items-center justify-center transition-colors duration-200 text-xl font-bold"
                      aria-label="Remove scenario"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="mb-4">
                  <ConfigForm
                    config={scenario.config}
                    onChange={(newConfig) => updateScenarioConfig(scenario.id, newConfig)}
                    label={scenario.label}
                  />
                </div>
                <CostBreakdownComponent
                  breakdown={calculateCost(scenario.config)}
                  label={scenario.label}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            onClick={addScenario}
            disabled={scenarios.length >= 4}
            className="w-full py-4 px-6 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-xl border-2 border-dashed border-primary-300 dark:border-primary-700 hover:border-primary-500 dark:hover:border-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span className="text-2xl">+</span>
            <span>Add Scenario</span>
          </motion.button>
        </div>
      ) : (
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
      )}

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
