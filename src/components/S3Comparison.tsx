import type { S3StorageConfig } from '../types/s3';
import { calculateS3Costs, s3CostToGeneric } from '../utils/s3Calculator';
import S3ConfigForm from './S3ConfigForm';
import CostBreakdown from './CostBreakdown';
import ComparisonLayout from './ComparisonLayout';

const defaultConfig1: S3StorageConfig = {
  tier: 'STANDARD',
  storageGB: 100,
  putRequests: 10000,
  getRequests: 100000,
  dataTransferGB: 50,
};

const defaultConfig2: S3StorageConfig = {
  tier: 'STANDARD_IA',
  storageGB: 100,
  putRequests: 10000,
  getRequests: 100000,
  dataTransferGB: 50,
};

export default function S3Comparison() {
  return (
    <ComparisonLayout
      serviceName="S3 Storage Tiers Comparison"
      ConfigForm={S3ConfigForm}
      CostBreakdownComponent={CostBreakdown}
      calculateCost={(config) => s3CostToGeneric(calculateS3Costs(config))}
      defaultConfig1={defaultConfig1}
      defaultConfig2={defaultConfig2}
      configLabel1="Configuration 1"
      configLabel2="Configuration 2"
    />
  );
}
