import type { S3CostBreakdown } from '../types/s3';

interface CostBreakdownProps {
  breakdown: S3CostBreakdown;
}

export default function CostBreakdown({ breakdown }: CostBreakdownProps) {
  const formatCost = (cost: number) => {
    return cost.toFixed(2);
  };

  const costItems = [
    { label: 'Storage', value: breakdown.storageCost },
    { label: 'PUT Requests', value: breakdown.putRequestsCost },
    { label: 'GET Requests', value: breakdown.getRequestsCost },
    { label: 'Data Transfer', value: breakdown.dataTransferCost },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Cost Breakdown</h3>

      <div className="space-y-3">
        {costItems.map((item) => (
          <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium text-gray-800">
              ${formatCost(item.value)}
            </span>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-gray-300">
          <span className="text-lg font-bold text-gray-900">Total Cost</span>
          <span className="text-lg font-bold text-blue-600">
            ${formatCost(breakdown.totalCost)} / month
          </span>
        </div>
      </div>
    </div>
  );
}
