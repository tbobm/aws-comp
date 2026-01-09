import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type {
  AuroraConfig,
  AuroraDeploymentType,
  AuroraInstanceType,
} from '../types/rds';
import { AURORA_INSTANCE_METADATA } from '../types/rds';
import {
  fadeInUpVariants,
  interactiveControlVariants,
  costChangeVariants,
  errorVariants,
  layoutTransitionConfig
} from '../utils/animations';

interface AuroraConfigFormProps {
  config: AuroraConfig;
  onChange: (config: AuroraConfig) => void;
  label?: string;
}

export default function AuroraConfigForm({ config, onChange, label }: AuroraConfigFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm();
  }, [config]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (config.type === 'SERVERLESS_V2') {
      if (config.config.minACU < 0.5) {
        newErrors.minACU = 'Min ACU must be at least 0.5';
      }
      if (config.config.maxACU < config.config.minACU) {
        newErrors.maxACU = 'Max ACU must be greater than or equal to Min ACU';
      }
      if (config.config.storageGB < 0) {
        newErrors.storageGB = 'Storage cannot be negative';
      }
    } else {
      if (config.config.instanceCount < 1) {
        newErrors.instanceCount = 'Instance count must be at least 1';
      }
      if (config.config.storageGB < 0) {
        newErrors.storageGB = 'Storage cannot be negative';
      }
    }

    setErrors(newErrors);
  };

  const handleTypeChange = (type: AuroraDeploymentType) => {
    if (type === 'SERVERLESS_V2') {
      onChange({
        type: 'SERVERLESS_V2',
        config: {
          minACU: 0.5,
          maxACU: 2,
          storageGB: 100,
          ioRequests: 1000000,
          backupStorageGB: 50,
        },
      });
    } else {
      onChange({
        type: 'PROVISIONED',
        config: {
          instanceType: 'db.r6g.large',
          instanceCount: 1,
          storageGB: 100,
          ioRequests: 1000000,
          backupStorageGB: 50,
        },
      });
    }
  };

  const handleServerlessChange = (field: string, value: string) => {
    if (config.type !== 'SERVERLESS_V2') return;
    const numValue = parseFloat(value) || 0;
    onChange({
      ...config,
      config: { ...config.config, [field]: numValue },
    });
  };

  const handleProvisionedChange = (field: string, value: string | number) => {
    if (config.type !== 'PROVISIONED') return;
    const numValue = typeof value === 'string' ? (parseFloat(value) || 0) : value;
    onChange({
      ...config,
      config: { ...config.config, [field]: field === 'instanceType' ? value : numValue },
    });
  };

  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      animate="animate"
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-neutral-800">{label}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Deployment Type
          </label>
          <div className="flex gap-4">
            <motion.button
              onClick={() => handleTypeChange('SERVERLESS_V2')}
              variants={interactiveControlVariants}
              whileHover="hover"
              whileTap="tap"
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-quick shadow-subtle hover:shadow-hover ${
                config.type === 'SERVERLESS_V2'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              Serverless v2
            </motion.button>
            <motion.button
              onClick={() => handleTypeChange('PROVISIONED')}
              variants={interactiveControlVariants}
              whileHover="hover"
              whileTap="tap"
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-quick shadow-subtle hover:shadow-hover ${
                config.type === 'PROVISIONED'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              Provisioned
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {config.type === 'SERVERLESS_V2' ? (
            <motion.div
              key="serverless"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={layoutTransitionConfig}
              className="space-y-4"
            >
              <motion.div
                variants={errors.minACU ? errorVariants : undefined}
                animate={errors.minACU ? "animate" : undefined}
              >
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Min ACU (Aurora Capacity Units)
                </label>
                <motion.input
                  type="number"
                  value={config.config.minACU}
                  onChange={(e) => handleServerlessChange('minACU', e.target.value)}
                  min="0.5"
                  step="0.5"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
                    errors.minACU ? 'border-red-500' : 'border-neutral-300'
                  }`}
                />
                <AnimatePresence>
                  {errors.minACU && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.minACU}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                variants={errors.maxACU ? errorVariants : undefined}
                animate={errors.maxACU ? "animate" : undefined}
              >
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Max ACU (Aurora Capacity Units)
                </label>
                <motion.input
                  type="number"
                  value={config.config.maxACU}
                  onChange={(e) => handleServerlessChange('maxACU', e.target.value)}
                  min="0.5"
                  step="0.5"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
                    errors.maxACU ? 'border-red-500' : 'border-neutral-300'
                  }`}
                />
                <AnimatePresence>
                  {errors.maxACU && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.maxACU}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                variants={errors.storageGB ? errorVariants : undefined}
                animate={errors.storageGB ? "animate" : undefined}
              >
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Storage (GB)
                </label>
                <motion.input
                  type="number"
                  value={config.config.storageGB}
                  onChange={(e) => handleServerlessChange('storageGB', e.target.value)}
                  min="0"
                  step="1"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
                    errors.storageGB ? 'border-red-500' : 'border-neutral-300'
                  }`}
                />
                <AnimatePresence>
                  {errors.storageGB && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.storageGB}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  I/O Requests (per month)
                </label>
                <motion.input
                  type="number"
                  value={config.config.ioRequests}
                  onChange={(e) => handleServerlessChange('ioRequests', e.target.value)}
                  min="0"
                  step="1000"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Backup Storage (GB)
                </label>
                <motion.input
                  type="number"
                  value={config.config.backupStorageGB}
                  onChange={(e) => handleServerlessChange('backupStorageGB', e.target.value)}
                  min="0"
                  step="1"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="provisioned"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={layoutTransitionConfig}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Instance Type
                </label>
                <motion.select
                  value={config.config.instanceType}
                  onChange={(e) =>
                    handleProvisionedChange('instanceType', e.target.value as AuroraInstanceType)
                  }
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover"
                >
                  {Object.entries(AURORA_INSTANCE_METADATA).map(([key, metadata]) => (
                    <option key={key} value={key}>
                      {metadata.name} - {metadata.vcpu} vCPU, {metadata.memoryGB}GB RAM
                    </option>
                  ))}
                </motion.select>
                <motion.p
                  key={config.config.instanceType}
                  variants={costChangeVariants}
                  animate="animate"
                  className="mt-1 text-sm text-neutral-500"
                >
                  {AURORA_INSTANCE_METADATA[config.config.instanceType]?.vcpu} vCPU, {AURORA_INSTANCE_METADATA[config.config.instanceType]?.memoryGB}GB RAM
                </motion.p>
              </div>

              <motion.div
                variants={errors.instanceCount ? errorVariants : undefined}
                animate={errors.instanceCount ? "animate" : undefined}
              >
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Instance Count
                </label>
                <motion.input
                  type="number"
                  value={config.config.instanceCount}
                  onChange={(e) => handleProvisionedChange('instanceCount', e.target.value)}
                  min="1"
                  step="1"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
                    errors.instanceCount ? 'border-red-500' : 'border-neutral-300'
                  }`}
                />
                <AnimatePresence>
                  {errors.instanceCount && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.instanceCount}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                variants={errors.storageGB ? errorVariants : undefined}
                animate={errors.storageGB ? "animate" : undefined}
              >
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Storage (GB)
                </label>
                <motion.input
                  type="number"
                  value={config.config.storageGB}
                  onChange={(e) => handleProvisionedChange('storageGB', e.target.value)}
                  min="0"
                  step="1"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
                    errors.storageGB ? 'border-red-500' : 'border-neutral-300'
                  }`}
                />
                <AnimatePresence>
                  {errors.storageGB && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.storageGB}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  I/O Requests (per month)
                </label>
                <motion.input
                  type="number"
                  value={config.config.ioRequests}
                  onChange={(e) => handleProvisionedChange('ioRequests', e.target.value)}
                  min="0"
                  step="1000"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Backup Storage (GB)
                </label>
                <motion.input
                  type="number"
                  value={config.config.backupStorageGB}
                  onChange={(e) => handleProvisionedChange('backupStorageGB', e.target.value)}
                  min="0"
                  step="1"
                  variants={interactiveControlVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
