import { useState } from 'react';
import type { S3StorageConfig } from '../types/s3';
import { calculateS3Costs } from '../utils/s3Calculator';
import S3ConfigForm from './S3ConfigForm';
import CostBreakdown from './CostBreakdown';

export default function S3Comparison() {
  const [config1, setConfig1] = useState<S3StorageConfig>({
    tier: 'STANDARD',
    storageGB: 100,
    putRequests: 10000,
    getRequests: 100000,
    dataTransferGB: 50,
  });

  const [config2, setConfig2] = useState<S3StorageConfig>({
    tier: 'STANDARD_IA',
    storageGB: 100,
    putRequests: 10000,
    getRequests: 100000,
    dataTransferGB: 50,
  });

  const cost1 = calculateS3Costs(config1);
  const cost2 = calculateS3Costs(config2);

  const savings = cost1.totalCost - cost2.totalCost;
  const savingsPercentage = cost1.totalCost > 0 ? (savings / cost1.totalCost) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          S3 Storage Tiers Comparison
        </h1>
        <p className="text-gray-600">
          Compare AWS S3 storage tiers to optimize your costs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <S3ConfigForm config={config1} onChange={setConfig1} label="Configuration 1" />
          <CostBreakdown breakdown={cost1} />
        </div>

        <div>
          <S3ConfigForm config={config2} onChange={setConfig2} label="Configuration 2" />
          <CostBreakdown breakdown={cost2} />
        </div>
      </div>

      {Math.abs(savings) > 0.01 && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Cost Comparison</h3>
          <p className="text-gray-700">
            {savings > 0 ? (
              <>
                Configuration 2 saves{' '}
                <span className="font-bold text-green-600">
                  ${Math.abs(savings).toFixed(2)} ({Math.abs(savingsPercentage).toFixed(1)}%)
                </span>{' '}
                per month compared to Configuration 1
              </>
            ) : (
              <>
                Configuration 1 saves{' '}
                <span className="font-bold text-green-600">
                  ${Math.abs(savings).toFixed(2)} ({Math.abs(savingsPercentage).toFixed(1)}%)
                </span>{' '}
                per month compared to Configuration 2
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
