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
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8 shadow-soft border border-primary-200">
        <h1 className="text-4xl font-bold text-primary-900 mb-3 flex items-center gap-3">
          <span className="text-4xl">📊</span>
          {serviceName}
        </h1>
        <p className="text-lg text-primary-700">
          Compare costs between two different configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-8 hover:shadow-medium transition-shadow duration-300 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-aws-blue flex items-center gap-2">
            <span className="bg-primary-100 text-primary-700 rounded-lg px-3 py-1 text-sm font-bold">1</span>
            {configLabel1}
          </h2>
          <ConfigForm config={config1} onChange={setConfig1} label={configLabel1} />
        </div>

        <div className="bg-white rounded-xl shadow-soft p-8 hover:shadow-medium transition-shadow duration-300 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-aws-blue flex items-center gap-2">
            <span className="bg-secondary-100 text-secondary-700 rounded-lg px-3 py-1 text-sm font-bold">2</span>
            {configLabel2}
          </h2>
          <ConfigForm config={config2} onChange={setConfig2} label={configLabel2} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-aws-blue flex items-center gap-2">
          <span className="text-2xl">📈</span>
          Cost Comparison
        </h2>

        <div className="mb-8">
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
          <div className="mt-8 p-6 bg-gradient-to-r from-success-50 to-success-100 border-2 border-success-300 rounded-xl shadow-soft">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <p className="text-lg font-bold text-success-900 mb-1">
                  {cheaperOption === 1 ? configLabel1 : configLabel2} is More Cost-Effective
                </p>
                <p className="text-success-700 font-semibold">
                  Save ${savings.toFixed(2)}/month ({savingsPercentage.toFixed(1)}% savings)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
