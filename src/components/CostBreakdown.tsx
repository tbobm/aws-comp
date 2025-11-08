import type { GenericCostBreakdown } from '../types/comparison';

interface CostBreakdownProps {
  breakdown: GenericCostBreakdown;
  label?: string;
}

const getCategoryIcon = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes('storage')) return '💾';
  if (lower.includes('compute')) return '⚡';
  if (lower.includes('request') || lower.includes('i/o')) return '🔄';
  if (lower.includes('transfer') || lower.includes('data')) return '📡';
  if (lower.includes('backup')) return '🔒';
  return '📊';
};

const getCategoryColor = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes('storage')) return 'from-blue-500 to-blue-600';
  if (lower.includes('compute')) return 'from-purple-500 to-purple-600';
  if (lower.includes('request') || lower.includes('i/o')) return 'from-green-500 to-green-600';
  if (lower.includes('transfer') || lower.includes('data')) return 'from-orange-500 to-orange-600';
  if (lower.includes('backup')) return 'from-red-500 to-red-600';
  return 'from-gray-500 to-gray-600';
};

export default function CostBreakdown({ breakdown, label }: CostBreakdownProps) {
  const formatCost = (cost: number) => {
    return cost.toFixed(2);
  };

  const maxCost = Math.max(...breakdown.items.map(item => item.cost), 1);

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6 mt-6 hover:shadow-medium transition-shadow duration-300">
      {label && (
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-xl">💰</span>
          {label}
        </h3>
      )}

      <div className="space-y-4">
        {breakdown.items.map((item) => {
          const percentage = (item.cost / maxCost) * 100;
          return (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <span className="text-lg">{getCategoryIcon(item.label)}</span>
                  {item.label}
                </span>
                <span className="font-bold text-gray-900">
                  ${formatCost(item.cost)}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getCategoryColor(item.label)} transition-all duration-500 rounded-full`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        <div className="flex justify-between items-center pt-6 mt-4 border-t-2 border-primary-100 bg-gradient-to-r from-primary-50 to-primary-100 -mx-6 px-6 py-4 rounded-b-xl">
          <span className="text-xl font-bold text-primary-900">Total Cost</span>
          <span className="text-xl font-bold text-primary-700">
            ${formatCost(breakdown.total)} / month
          </span>
        </div>
      </div>
    </div>
  );
}
