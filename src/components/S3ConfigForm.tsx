import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { S3StorageConfig, S3StorageTier } from '../types/s3';
import { S3_TIER_METADATA } from '../types/s3';
import {
  fadeInUpVariants,
  interactiveControlVariants,
  costChangeVariants,
  errorVariants
} from '../utils/animations';

interface S3ConfigFormProps {
  config: S3StorageConfig;
  onChange: (config: S3StorageConfig) => void;
  label?: string;
}

export default function S3ConfigForm({ config, onChange, label }: S3ConfigFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm();
  }, [config]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (config.storageGB < 0) {
      newErrors.storageGB = 'Storage size cannot be negative';
    }
    if (config.putRequests < 0) {
      newErrors.putRequests = 'PUT requests cannot be negative';
    }
    if (config.getRequests < 0) {
      newErrors.getRequests = 'GET requests cannot be negative';
    }
    if (config.dataTransferGB < 0) {
      newErrors.dataTransferGB = 'Data transfer cannot be negative';
    }

    setErrors(newErrors);
  };

  const handleNumberChange = (field: keyof S3StorageConfig, value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ ...config, [field]: numValue });
  };

  const handleTierChange = (value: string) => {
    onChange({ ...config, tier: value as S3StorageTier });
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
            Storage Tier
          </label>
          <motion.select
            value={config.tier}
            onChange={(e) => handleTierChange(e.target.value)}
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover"
          >
            {Object.entries(S3_TIER_METADATA).map(([key, metadata]) => (
              <option key={key} value={key}>
                {metadata.name}
              </option>
            ))}
          </motion.select>
          <motion.p
            key={config.tier}
            variants={costChangeVariants}
            animate="animate"
            className="mt-1 text-sm text-neutral-500"
          >
            {S3_TIER_METADATA[config.tier].description}
          </motion.p>
        </div>

        <motion.div
          variants={errors.storageGB ? errorVariants : undefined}
          animate={errors.storageGB ? "animate" : undefined}
        >
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Storage Size (GB)
          </label>
          <motion.input
            type="number"
            value={config.storageGB}
            onChange={(e) => handleNumberChange('storageGB', e.target.value)}
            min="0"
            step="0.01"
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

        <motion.div
          variants={errors.putRequests ? errorVariants : undefined}
          animate={errors.putRequests ? "animate" : undefined}
        >
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            PUT Requests (per month)
          </label>
          <motion.input
            type="number"
            value={config.putRequests}
            onChange={(e) => handleNumberChange('putRequests', e.target.value)}
            min="0"
            step="1"
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
              errors.putRequests ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          <AnimatePresence>
            {errors.putRequests && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.putRequests}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={errors.getRequests ? errorVariants : undefined}
          animate={errors.getRequests ? "animate" : undefined}
        >
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            GET Requests (per month)
          </label>
          <motion.input
            type="number"
            value={config.getRequests}
            onChange={(e) => handleNumberChange('getRequests', e.target.value)}
            min="0"
            step="1"
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
              errors.getRequests ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          <AnimatePresence>
            {errors.getRequests && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.getRequests}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={errors.dataTransferGB ? errorVariants : undefined}
          animate={errors.dataTransferGB ? "animate" : undefined}
        >
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Data Transfer Out (GB per month)
          </label>
          <motion.input
            type="number"
            value={config.dataTransferGB}
            onChange={(e) => handleNumberChange('dataTransferGB', e.target.value)}
            min="0"
            step="0.01"
            variants={interactiveControlVariants}
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-quick shadow-subtle focus:shadow-hover ${
              errors.dataTransferGB ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          <AnimatePresence>
            {errors.dataTransferGB && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.dataTransferGB}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
