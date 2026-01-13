import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useCurrentPng } from 'recharts-to-png';
import FileSaver from 'file-saver';
import { useState } from 'react';
import { GenericCostBreakdown } from '../types/comparison';
import { fadeInUpVariants, cardVariants } from '../utils/animations';
import { useTheme } from '../contexts/ThemeContext';

interface ComparisonChartProps {
  config1Label?: string;
  config2Label?: string;
  breakdown1?: GenericCostBreakdown;
  breakdown2?: GenericCostBreakdown;
  scenarios?: Array<{
    id: string;
    label: string;
    breakdown: GenericCostBreakdown;
    color: string;
  }>;
  serviceName?: string;
}

export default function ComparisonChart({
  config1Label,
  config2Label,
  breakdown1,
  breakdown2,
  scenarios,
  serviceName = 'comparison',
}: ComparisonChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isDownloading, setIsDownloading] = useState(false);
  const [getPng, { ref }] = useCurrentPng();

  // Abbreviate long labels to prevent overlap
  const abbreviateLabel = (label: string): string => {
    const abbreviations: Record<string, string> = {
      'I/O Requests': 'I/O Req',
      'Backup Storage': 'Backup',
      'Data Transfer': 'Transfer',
    };
    return abbreviations[label] || label;
  };

  // Use scenarios if provided, otherwise fall back to 2-config mode
  const isMultiScenario = !!scenarios;
  const breakdowns = isMultiScenario
    ? scenarios!.map(s => ({ label: s.label, breakdown: s.breakdown, color: s.color }))
    : [
        { label: config1Label!, breakdown: breakdown1!, color: '#2196f3' },
        { label: config2Label!, breakdown: breakdown2!, color: '#3f51b5' },
      ];

  const allCategories = new Set(
    breakdowns.flatMap(b => b.breakdown.items.map(item => item.label))
  );

  const chartData = Array.from(allCategories).map(category => {
    const dataPoint: Record<string, any> = {
      category: abbreviateLabel(category),
      fullCategory: category,
    };
    breakdowns.forEach(b => {
      const item = b.breakdown.items.find(item => item.label === category);
      dataPoint[b.label] = item?.cost || 0;
    });
    return dataPoint;
  });

  const totalDataPoint: Record<string, any> = {
    category: 'Total',
    fullCategory: 'Total',
  };
  breakdowns.forEach(b => {
    totalDataPoint[b.label] = b.breakdown.total;
  });
  chartData.push(totalDataPoint);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const png = await getPng();
      if (png) {
        const filename = isMultiScenario
          ? `aws-${serviceName}-${breakdowns.length}-scenarios.png`
          : 'aws-comparison.png';
        FileSaver.saveAs(png, filename);
      }
    } catch (error) {
      console.error('Error downloading chart:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="initial"
      animate="animate"
      className="pb-[30px]"
    >
      <ResponsiveContainer width="100%" height={400} ref={ref}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#424242' : '#eeeeee'} />
          <XAxis
            dataKey="category"
            angle={0}
            textAnchor="middle"
            height={60}
            interval={0}
            tick={{ fontSize: 13, fill: '#E5E7EB', fontWeight: 500 }}
            style={{ minHeight: '10px' }}
          />
          <YAxis
            label={{
              value: 'Cost ($/month)',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 13, fill: '#E5E7EB', textAnchor: 'middle' }
            }}
            tick={{ fontSize: 13, fill: '#E5E7EB' }}
          />
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: isDark ? '#2a2a2a' : '#fff',
              border: isDark ? '1px solid #424242' : '1px solid #e0e0e0',
              boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.08)',
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '0.375rem',
              color: isDark ? '#f5f5f5' : '#212121',
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '10px',
              color: isDark ? '#fafafa' : '#212121',
            }}
          />
          {breakdowns.map(b => (
            <Bar
              key={b.label}
              dataKey={b.label}
              fill={b.color}
              animationDuration={500}
              animationEasing="ease-in-out"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-end mt-4">
        <motion.button
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg shadow-soft hover:shadow-hover transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span>{isDownloading ? 'Downloading...' : 'Download Chart'}</span>
          <span className="text-lg">↓</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
