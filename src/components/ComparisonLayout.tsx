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
      <div className="bg-white rounded-xl shadow-soft p-8 border-l-4 border-primary-500">
        <h1 className="text-4xl font-bold text-neutral-900 mb-3">{serviceName}</h1>
        <p className="text-lg text-neutral-600">
          Compare costs between two different configurations side-by-side
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6 border-t-2 border-primary-400">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
            <h2 className="text-xl font-semibold text-neutral-900">{configLabel1}</h2>
          </div>
          <ConfigForm config={config1} onChange={setConfig1} label={configLabel1} />
        </div>

        <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6 border-t-2 border-secondary-400">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></div>
            <h2 className="text-xl font-semibold text-neutral-900">{configLabel2}</h2>
          </div>
          <ConfigForm config={config2} onChange={setConfig2} label={configLabel2} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-medium p-8">
        <h2 className="text-2xl font-bold mb-6 text-neutral-900 border-b border-neutral-200 pb-4">Cost Comparison</h2>

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
          <div className="mt-8 p-6 bg-gradient-to-r from-success/10 to-success/5 border-l-4 border-success rounded-lg shadow-soft">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-success mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-neutral-900 font-bold text-lg mb-1">
                  {cheaperOption === 1 ? configLabel1 : configLabel2} is more cost-effective
                </p>
                <p className="text-neutral-700">
                  Save <span className="font-bold text-success">${savings.toFixed(2)}/month</span> ({savingsPercentage.toFixed(1)}% reduction in costs)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
