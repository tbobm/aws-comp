import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GenericCostBreakdown } from '../types/comparison';

interface ComparisonChartProps {
  config1Label: string;
  config2Label: string;
  breakdown1: GenericCostBreakdown;
  breakdown2: GenericCostBreakdown;
}

export default function ComparisonChart({
  config1Label,
  config2Label,
  breakdown1,
  breakdown2,
}: ComparisonChartProps) {
  const allCategories = new Set([
    ...breakdown1.items.map(item => item.label),
    ...breakdown2.items.map(item => item.label),
  ]);

  const chartData = Array.from(allCategories).map(category => {
    const item1 = breakdown1.items.find(item => item.label === category);
    const item2 = breakdown2.items.find(item => item.label === category);

    return {
      category,
      [config1Label]: item1?.cost || 0,
      [config2Label]: item2?.cost || 0,
    };
  });

  chartData.push({
    category: 'Total',
    [config1Label]: breakdown1.total,
    [config2Label]: breakdown2.total,
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="category"
          angle={-45}
          textAnchor="end"
          height={100}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          label={{ value: 'Cost ($/month)', angle: -90, position: 'insideLeft' }}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) => `$${value.toFixed(2)}`}
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
        />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        <Bar dataKey={config1Label} fill="#3b82f6" />
        <Bar dataKey={config2Label} fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
