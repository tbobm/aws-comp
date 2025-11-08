import { useState } from 'react';
import { ComparisonLayoutProps, GenericCostBreakdown } from '../types/comparison';
import ComparisonChart from './ComparisonChart';

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{serviceName}</h1>
        <p className="text-gray-600">
          Compare costs between two different configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{configLabel1}</h2>
          <ConfigForm config={config1} onChange={setConfig1} label={configLabel1} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{configLabel2}</h2>
          <ConfigForm config={config2} onChange={setConfig2} label={configLabel2} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Cost Comparison</h2>

        <div className="mb-6">
          <ComparisonChart
            config1Label={configLabel1}
            config2Label={configLabel2}
            breakdown1={breakdown1}
            breakdown2={breakdown2}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <CostBreakdownComponent breakdown={breakdown1} label={configLabel1} />
          </div>
          <div>
            <CostBreakdownComponent breakdown={breakdown2} label={configLabel2} />
          </div>
        </div>

        {cheaperOption && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold">
              {configLabel1 === (cheaperOption === 1 ? configLabel1 : configLabel2)} is cheaper by $
              {savings.toFixed(2)}/month ({savingsPercentage.toFixed(1)}% savings)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
