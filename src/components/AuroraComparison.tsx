import { useState } from 'react';
import type { AuroraConfig } from '../types/rds';
import { calculateAuroraCosts } from '../utils/rdsCalculator';
import AuroraConfigForm from './AuroraConfigForm';
import AuroraCostBreakdown from './AuroraCostBreakdown';

export default function AuroraComparison() {
  const [config1, setConfig1] = useState<AuroraConfig>({
    type: 'SERVERLESS_V2',
    config: {
      minACU: 0.5,
      maxACU: 2,
      storageGB: 100,
      ioRequests: 1000000,
      backupStorageGB: 50,
    },
  });

  const [config2, setConfig2] = useState<AuroraConfig>({
    type: 'PROVISIONED',
    config: {
      instanceType: 'db.r6g.large',
      instanceCount: 1,
      storageGB: 100,
      ioRequests: 1000000,
      backupStorageGB: 50,
    },
  });

  const cost1 = calculateAuroraCosts(config1);
  const cost2 = calculateAuroraCosts(config2);

  const savings = cost1.totalCost - cost2.totalCost;
  const savingsPercentage = cost1.totalCost > 0 ? (savings / cost1.totalCost) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          RDS Aurora Comparison
        </h1>
        <p className="text-gray-600">
          Compare Aurora Serverless v2 vs Provisioned configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AuroraConfigForm config={config1} onChange={setConfig1} label="Configuration 1" />
          <AuroraCostBreakdown breakdown={cost1} />
        </div>

        <div>
          <AuroraConfigForm config={config2} onChange={setConfig2} label="Configuration 2" />
          <AuroraCostBreakdown breakdown={cost2} />
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
