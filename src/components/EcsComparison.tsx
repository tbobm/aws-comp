import type { EcsConfig } from '../types/ecs';
import { calculateEcsCosts, ecsCostToGeneric } from '../utils/ecsCalculator';
import EcsConfigForm from './EcsConfigForm';
import CostBreakdown from './CostBreakdown';
import ComparisonLayout from './ComparisonLayout';

const defaultConfig1: EcsConfig = {
  architecture: 'x86',
  vCPU: 1,
  memoryGB: 2,
  monthlyHours: 730,
};

const defaultConfig2: EcsConfig = {
  architecture: 'arm',
  vCPU: 1,
  memoryGB: 2,
  monthlyHours: 730,
};

export default function EcsComparison() {
  return (
    <ComparisonLayout
      serviceName="ECS Fargate Cost Comparison"
      ConfigForm={EcsConfigForm}
      CostBreakdownComponent={CostBreakdown}
      calculateCost={(config) => ecsCostToGeneric(calculateEcsCosts(config))}
      defaultConfig1={defaultConfig1}
      defaultConfig2={defaultConfig2}
      configLabel1="Configuration 1"
      configLabel2="Configuration 2"
    />
  );
}
