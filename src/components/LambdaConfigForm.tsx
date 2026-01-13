import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LambdaConfig, LambdaArchitecture } from '../types/lambda';
import { LAMBDA_ARCHITECTURE_METADATA, LAMBDA_MEMORY_TIERS } from '../types/lambda';
import {
  fadeInUpVariants,
  interactiveControlVariants,
  costChangeVariants,
  errorVariants
} from '../utils/animations';

interface LambdaConfigFormProps {
  config: LambdaConfig;
  onChange: (config: LambdaConfig) => void;
  label?: string;
}

export default function LambdaConfigForm({ config, onChange, label }: LambdaConfigFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm();
  }, [config]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (config.memoryMB < 128 || config.memoryMB > 10240) {
      newErrors.memoryMB = 'Memory must be between 128 MB and 10,240 MB';
    }
    if (config.monthlyInvocations < 0) {
      newErrors.monthlyInvocations = 'Monthly invocations cannot be negative';
    }
    if (config.avgDurationMs < 0) {
      newErrors.avgDurationMs = 'Duration cannot be negative';
    }

    setErrors(newErrors);
  };

  const handleNumberChange = (field: keyof LambdaConfig, value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ ...config, [field]: numValue });
  };

  const handleArchitectureChange = (value: string) => {
    onChange({ ...config, architecture: value as LambdaArchitecture });
  };

  const handleMemoryTierSelect = (memoryMB: number) => {
    onChange({ ...config, memoryMB });
  };

  const calculateGBSeconds = () => {
    const gbSeconds = (config.memoryMB / 1024) * (config.avgDurationMs / 1000) * config.monthlyInvocations;
    return gbSeconds.toFixed(2);
  };

  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      animate="animate"
      className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">{label}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 dark:text-neutral-300 mb-2">
            Architecture
          </label>
          <motion.select
            value={config.architecture}
            onChange={(e) => handleArchitectureChange(e.target.value)}
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover"
          >
            {Object.entries(LAMBDA_ARCHITECTURE_METADATA).map(([key, metadata]) => (
              <option key={key} value={key}>
                {metadata.name}
              </option>
            ))}
          </motion.select>
          <motion.p
            key={config.architecture}
            variants={costChangeVariants}
            animate="animate"
            className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
          >
            {LAMBDA_ARCHITECTURE_METADATA[config.architecture].description}
          </motion.p>
        </div>

        <motion.div
          variants={errors.memoryMB ? errorVariants : undefined}
          animate={errors.memoryMB ? "animate" : undefined}
        >
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 dark:text-neutral-300 mb-2">
            Memory (MB)
          </label>
          <div className="flex gap-2 mb-2">
            <select
              onChange={(e) => handleMemoryTierSelect(parseInt(e.target.value))}
              className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              defaultValue=""
            >
              <option value="" disabled>Quick select...</option>
              {LAMBDA_MEMORY_TIERS.map((tier) => (
                <option key={tier.memoryMB} value={tier.memoryMB}>
                  {tier.description}
                </option>
              ))}
            </select>
          </div>
          <motion.input
            type="number"
            value={config.memoryMB}
            onChange={(e) => handleNumberChange('memoryMB', e.target.value)}
            min="128"
            max="10240"
            step="1"
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
              errors.memoryMB ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
            }`}
          />
          <AnimatePresence>
            {errors.memoryMB && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.memoryMB}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={errors.monthlyInvocations ? errorVariants : undefined}
          animate={errors.monthlyInvocations ? "animate" : undefined}
        >
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 dark:text-neutral-300 mb-2">
            Monthly Invocations
          </label>
          <motion.input
            type="number"
            value={config.monthlyInvocations}
            onChange={(e) => handleNumberChange('monthlyInvocations', e.target.value)}
            min="0"
            step="1"
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
              errors.monthlyInvocations ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
            }`}
          />
          <AnimatePresence>
            {errors.monthlyInvocations && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.monthlyInvocations}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={errors.avgDurationMs ? errorVariants : undefined}
          animate={errors.avgDurationMs ? "animate" : undefined}
        >
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 dark:text-neutral-300 mb-2">
            Average Duration (milliseconds)
          </label>
          <motion.input
            type="number"
            value={config.avgDurationMs}
            onChange={(e) => handleNumberChange('avgDurationMs', e.target.value)}
            min="0"
            step="1"
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
              errors.avgDurationMs ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
            }`}
          />
          <motion.p
            key={calculateGBSeconds()}
            variants={costChangeVariants}
            animate="animate"
            className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
          >
            ≈ {calculateGBSeconds()} GB-seconds per month
          </motion.p>
          <AnimatePresence>
            {errors.avgDurationMs && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.avgDurationMs}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
