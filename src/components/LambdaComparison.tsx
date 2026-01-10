import type { LambdaConfig } from '../types/lambda';
import { calculateLambdaCosts, lambdaCostToGeneric } from '../utils/lambdaCalculator';
import LambdaConfigForm from './LambdaConfigForm';
import CostBreakdown from './CostBreakdown';
import ComparisonLayout from './ComparisonLayout';

const defaultConfig1: LambdaConfig = {
  architecture: 'x86',
  memoryMB: 1024,
  monthlyInvocations: 1_000_000,
  avgDurationMs: 200,
};

const defaultConfig2: LambdaConfig = {
  architecture: 'arm',
  memoryMB: 1024,
  monthlyInvocations: 1_000_000,
  avgDurationMs: 200,
};

export default function LambdaComparison() {
  return (
    <ComparisonLayout
      serviceName="AWS Lambda Comparison"
      ConfigForm={LambdaConfigForm}
      CostBreakdownComponent={CostBreakdown}
      calculateCost={(config) => lambdaCostToGeneric(calculateLambdaCosts(config))}
      defaultConfig1={defaultConfig1}
      defaultConfig2={defaultConfig2}
      configLabel1="Configuration 1"
      configLabel2="Configuration 2"
    />
  );
}
