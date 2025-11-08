export interface CostBreakdownItem {
  label: string;
  cost: number;
  description?: string;
}

export interface GenericCostBreakdown {
  items: CostBreakdownItem[];
  total: number;
}

export interface ServiceMetadata {
  id: string;
  title: string;
  description: string;
  icon?: string;
  path: string;
}

export interface ComparisonResult<T extends GenericCostBreakdown> {
  config1: T;
  config2: T;
  savings: number;
  savingsPercentage: number;
  cheaperOption: 1 | 2 | null;
}

export interface ComparisonLayoutProps<TConfig, TBreakdown extends GenericCostBreakdown> {
  serviceName: string;
  ConfigForm: React.ComponentType<ConfigFormProps<TConfig>>;
  CostBreakdownComponent: React.ComponentType<CostBreakdownProps<TBreakdown>>;
  calculateCost: (config: TConfig) => TBreakdown;
  defaultConfig1: TConfig;
  defaultConfig2: TConfig;
  configLabel1?: string;
  configLabel2?: string;
}

export interface ConfigFormProps<TConfig> {
  config: TConfig;
  onChange: (config: TConfig) => void;
  label?: string;
}

export interface CostBreakdownProps<TBreakdown> {
  breakdown: TBreakdown;
  label?: string;
}
