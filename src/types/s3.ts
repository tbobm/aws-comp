export type S3StorageTier =
  | 'STANDARD'
  | 'STANDARD_IA'
  | 'ONEZONE_IA'
  | 'GLACIER_INSTANT'
  | 'GLACIER_FLEXIBLE'
  | 'GLACIER_DEEP';

export interface S3StorageConfig {
  tier: S3StorageTier;
  storageGB: number;
  putRequests: number;
  getRequests: number;
  dataTransferGB: number;
}

export interface S3CostBreakdown {
  storageCost: number;
  putRequestsCost: number;
  getRequestsCost: number;
  dataTransferCost: number;
  totalCost: number;
}

export interface S3TierMetadata {
  name: string;
  description: string;
  minStorageDays?: number;
  minObjectSize?: number;
}

export const S3_TIER_METADATA: Record<S3StorageTier, S3TierMetadata> = {
  STANDARD: {
    name: 'S3 Standard',
    description: 'General purpose storage for frequently accessed data',
  },
  STANDARD_IA: {
    name: 'S3 Standard-IA',
    description: 'Infrequently accessed data with rapid access',
    minStorageDays: 30,
    minObjectSize: 128,
  },
  ONEZONE_IA: {
    name: 'S3 One Zone-IA',
    description: 'Lower-cost option for infrequently accessed data in a single AZ',
    minStorageDays: 30,
    minObjectSize: 128,
  },
  GLACIER_INSTANT: {
    name: 'S3 Glacier Instant Retrieval',
    description: 'Archive data with instant retrieval',
    minStorageDays: 90,
    minObjectSize: 128,
  },
  GLACIER_FLEXIBLE: {
    name: 'S3 Glacier Flexible Retrieval',
    description: 'Archive data with minutes-to-hours retrieval',
    minStorageDays: 90,
  },
  GLACIER_DEEP: {
    name: 'S3 Glacier Deep Archive',
    description: 'Lowest-cost storage for long-term archive',
    minStorageDays: 180,
  },
};
