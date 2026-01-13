import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EcsConfig, EcsArchitecture } from '../types/ecs';
import { ECS_ARCHITECTURE_METADATA, ECS_VCPU_TIERS, ECS_MEMORY_RANGES } from '../types/ecs';
import { calculateEcsCosts } from '../utils/ecsCalculator';
import {
  fadeInUpVariants,
  interactiveControlVariants,
  costChangeVariants,
  errorVariants
} from '../utils/animations';

interface EcsConfigFormProps {
  config: EcsConfig;
  onChange: (config: EcsConfig) => void;
  label?: string;
}

export default function EcsConfigForm({ config, onChange, label }: EcsConfigFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm();
  }, [config]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const memoryRange = ECS_MEMORY_RANGES[config.vCPU];
    if (memoryRange) {
      if (config.memoryGB < memoryRange.minGB || config.memoryGB > memoryRange.maxGB) {
        newErrors.memoryGB = `Memory must be between ${memoryRange.minGB} GB and ${memoryRange.maxGB} GB for ${config.vCPU} vCPU`;
      }
    }

    if (config.monthlyHours < 1 || config.monthlyHours > 730) {
      newErrors.monthlyHours = 'Monthly hours must be between 1 and 730';
    }

    setErrors(newErrors);
  };

  const handleNumberChange = (field: keyof EcsConfig, value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ ...config, [field]: numValue });
  };

  const handleArchitectureChange = (value: string) => {
    onChange({ ...config, architecture: value as EcsArchitecture });
  };

  const handleVcpuSelect = (vCPU: number) => {
    const memoryRange = ECS_MEMORY_RANGES[vCPU];
    const adjustedMemory = Math.max(memoryRange.minGB, Math.min(config.memoryGB, memoryRange.maxGB));
    onChange({ ...config, vCPU, memoryGB: adjustedMemory });
  };

  const currentCost = calculateEcsCosts(config);
  const currentMemoryRange = ECS_MEMORY_RANGES[config.vCPU];

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
            {Object.entries(ECS_ARCHITECTURE_METADATA).map(([key, metadata]) => (
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
            {ECS_ARCHITECTURE_METADATA[config.architecture].description}
          </motion.p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 dark:text-neutral-300 mb-2">
            vCPU
          </label>
          <div className="flex gap-2 mb-2">
            <select
              onChange={(e) => handleVcpuSelect(parseFloat(e.target.value))}
              className="px-3 py-1 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              defaultValue=""
            >
              <option value="" disabled>Quick select...</option>
              {ECS_VCPU_TIERS.map((tier) => (
                <option key={tier.vCPU} value={tier.vCPU}>
                  {tier.description}
                </option>
              ))}
            </select>
          </div>
          <motion.input
            type="number"
            value={config.vCPU}
            onChange={(e) => handleNumberChange('vCPU', e.target.value)}
            min="0.25"
            max="16"
            step="0.25"
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover"
          />
        </div>

        <motion.div
          variants={errors.memoryGB ? errorVariants : undefined}
          animate={errors.memoryGB ? "animate" : undefined}
        >
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 dark:text-neutral-300 mb-2">
            Memory (GB)
          </label>
          <motion.input
            type="number"
            value={config.memoryGB}
            onChange={(e) => handleNumberChange('memoryGB', e.target.value)}
            min={currentMemoryRange?.minGB || 0.5}
            max={currentMemoryRange?.maxGB || 120}
            step="0.5"
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
              errors.memoryGB ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
            }`}
          />
          {currentMemoryRange && (
            <motion.p
              key={config.vCPU}
              variants={costChangeVariants}
              animate="animate"
              className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
            >
              Range: {currentMemoryRange.minGB} GB - {currentMemoryRange.maxGB} GB for {config.vCPU} vCPU
            </motion.p>
          )}
          <AnimatePresence>
            {errors.memoryGB && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.memoryGB}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={errors.monthlyHours ? errorVariants : undefined}
          animate={errors.monthlyHours ? "animate" : undefined}
        >
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 dark:text-neutral-300 mb-2">
            Monthly Hours
          </label>
          <motion.input
            type="number"
            value={config.monthlyHours}
            onChange={(e) => handleNumberChange('monthlyHours', e.target.value)}
            min="1"
            max="730"
            step="1"
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
              errors.monthlyHours ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
            }`}
          />
          <motion.p
            className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
          >
            Full month = 730 hours
          </motion.p>
          <AnimatePresence>
            {errors.monthlyHours && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.monthlyHours}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="pt-4 border-t border-neutral-200"
          key={currentCost.totalCost}
          variants={costChangeVariants}
          animate="animate"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Monthly Cost:</span>
            <span className="text-2xl font-bold text-primary-600">
              ${currentCost.totalCost.toFixed(2)}
            </span>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            Fargate billing: per-second granularity for vCPU and memory
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
