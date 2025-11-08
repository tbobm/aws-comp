import { useState, useEffect } from 'react';
import type { S3StorageConfig, S3StorageTier } from '../types/s3';
import { S3_TIER_METADATA } from '../types/s3';

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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{label}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Storage Tier
          </label>
          <select
            value={config.tier}
            onChange={(e) => handleTierChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(S3_TIER_METADATA).map(([key, metadata]) => (
              <option key={key} value={key}>
                {metadata.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            {S3_TIER_METADATA[config.tier].description}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Storage Size (GB)
          </label>
          <input
            type="number"
            value={config.storageGB}
            onChange={(e) => handleNumberChange('storageGB', e.target.value)}
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.storageGB ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.storageGB && (
            <p className="mt-1 text-sm text-red-600">{errors.storageGB}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PUT Requests (per month)
          </label>
          <input
            type="number"
            value={config.putRequests}
            onChange={(e) => handleNumberChange('putRequests', e.target.value)}
            min="0"
            step="1"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.putRequests ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.putRequests && (
            <p className="mt-1 text-sm text-red-600">{errors.putRequests}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GET Requests (per month)
          </label>
          <input
            type="number"
            value={config.getRequests}
            onChange={(e) => handleNumberChange('getRequests', e.target.value)}
            min="0"
            step="1"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.getRequests ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.getRequests && (
            <p className="mt-1 text-sm text-red-600">{errors.getRequests}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Transfer Out (GB per month)
          </label>
          <input
            type="number"
            value={config.dataTransferGB}
            onChange={(e) => handleNumberChange('dataTransferGB', e.target.value)}
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dataTransferGB ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dataTransferGB && (
            <p className="mt-1 text-sm text-red-600">{errors.dataTransferGB}</p>
          )}
        </div>
      </div>
    </div>
  );
}
