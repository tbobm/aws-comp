import { useState, useEffect } from 'react';
import type {
  AuroraConfig,
  AuroraDeploymentType,
  AuroraInstanceType,
} from '../types/rds';
import { AURORA_INSTANCE_METADATA } from '../types/rds';

interface AuroraConfigFormProps {
  config: AuroraConfig;
  onChange: (config: AuroraConfig) => void;
  label: string;
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{label}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deployment Type
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => handleTypeChange('SERVERLESS_V2')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                config.type === 'SERVERLESS_V2'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Serverless v2
            </button>
            <button
              onClick={() => handleTypeChange('PROVISIONED')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                config.type === 'PROVISIONED'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Provisioned
            </button>
          </div>
        </div>

        {config.type === 'SERVERLESS_V2' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min ACU (Aurora Capacity Units)
              </label>
              <input
                type="number"
                value={config.config.minACU}
                onChange={(e) => handleServerlessChange('minACU', e.target.value)}
                min="0.5"
                step="0.5"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.minACU ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.minACU && (
                <p className="mt-1 text-sm text-red-600">{errors.minACU}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max ACU (Aurora Capacity Units)
              </label>
              <input
                type="number"
                value={config.config.maxACU}
                onChange={(e) => handleServerlessChange('maxACU', e.target.value)}
                min="0.5"
                step="0.5"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.maxACU ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.maxACU && (
                <p className="mt-1 text-sm text-red-600">{errors.maxACU}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage (GB)
              </label>
              <input
                type="number"
                value={config.config.storageGB}
                onChange={(e) => handleServerlessChange('storageGB', e.target.value)}
                min="0"
                step="1"
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
                I/O Requests (per month)
              </label>
              <input
                type="number"
                value={config.config.ioRequests}
                onChange={(e) => handleServerlessChange('ioRequests', e.target.value)}
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Storage (GB)
              </label>
              <input
                type="number"
                value={config.config.backupStorageGB}
                onChange={(e) => handleServerlessChange('backupStorageGB', e.target.value)}
                min="0"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instance Type
              </label>
              <select
                value={config.config.instanceType}
                onChange={(e) =>
                  handleProvisionedChange('instanceType', e.target.value as AuroraInstanceType)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(AURORA_INSTANCE_METADATA).map(([key, metadata]) => (
                  <option key={key} value={key}>
                    {metadata.name} - {metadata.vcpu} vCPU, {metadata.memoryGB}GB RAM
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instance Count
              </label>
              <input
                type="number"
                value={config.config.instanceCount}
                onChange={(e) => handleProvisionedChange('instanceCount', e.target.value)}
                min="1"
                step="1"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.instanceCount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.instanceCount && (
                <p className="mt-1 text-sm text-red-600">{errors.instanceCount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage (GB)
              </label>
              <input
                type="number"
                value={config.config.storageGB}
                onChange={(e) => handleProvisionedChange('storageGB', e.target.value)}
                min="0"
                step="1"
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
                I/O Requests (per month)
              </label>
              <input
                type="number"
                value={config.config.ioRequests}
                onChange={(e) => handleProvisionedChange('ioRequests', e.target.value)}
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Storage (GB)
              </label>
              <input
                type="number"
                value={config.config.backupStorageGB}
                onChange={(e) => handleProvisionedChange('backupStorageGB', e.target.value)}
                min="0"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
