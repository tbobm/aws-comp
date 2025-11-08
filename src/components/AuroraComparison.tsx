import type { AuroraConfig } from '../types/rds';
import { calculateAuroraCosts, auroraCostToGeneric } from '../utils/rdsCalculator';
import AuroraConfigForm from './AuroraConfigForm';
import CostBreakdown from './CostBreakdown';
import ComparisonLayout from './ComparisonLayout';

const defaultConfig1: AuroraConfig = {
  type: 'SERVERLESS_V2',
  config: {
    minACU: 0.5,
    maxACU: 2,
    storageGB: 100,
    ioRequests: 1000000,
    backupStorageGB: 50,
  },
};

const defaultConfig2: AuroraConfig = {
  type: 'PROVISIONED',
  config: {
    instanceType: 'db.r6g.large',
    instanceCount: 1,
    storageGB: 100,
    ioRequests: 1000000,
    backupStorageGB: 50,
  },
};

export default function AuroraComparison() {
  return (
    <ComparisonLayout
      serviceName="RDS Aurora Comparison"
      ConfigForm={AuroraConfigForm}
      CostBreakdownComponent={CostBreakdown}
      calculateCost={(config) => auroraCostToGeneric(calculateAuroraCosts(config))}
      defaultConfig1={defaultConfig1}
      defaultConfig2={defaultConfig2}
      configLabel1="Configuration 1"
      configLabel2="Configuration 2"
    />
  );
}
