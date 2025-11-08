export type AuroraDeploymentType = 'SERVERLESS_V2' | 'PROVISIONED';

export type AuroraInstanceType =
  | 'db.r6g.large'
  | 'db.r6g.xlarge'
  | 'db.r6g.2xlarge'
  | 'db.r6g.4xlarge'
  | 'db.r6g.8xlarge'
  | 'db.r6g.12xlarge'
  | 'db.r6g.16xlarge';

export interface AuroraServerlessV2Config {
  minACU: number;
  maxACU: number;
  storageGB: number;
  ioRequests: number;
  backupStorageGB: number;
}

export interface AuroraProvisionedConfig {
  instanceType: AuroraInstanceType;
  instanceCount: number;
  storageGB: number;
  ioRequests: number;
  backupStorageGB: number;
}

export type AuroraConfig =
  | { type: 'SERVERLESS_V2'; config: AuroraServerlessV2Config }
  | { type: 'PROVISIONED'; config: AuroraProvisionedConfig };

export interface AuroraCostBreakdown {
  computeCost: number;
  storageCost: number;
  ioCost: number;
  backupCost: number;
  totalCost: number;
}

export interface AuroraInstanceMetadata {
  name: string;
  vcpu: number;
  memoryGB: number;
  pricePerHour: number;
}

export const AURORA_INSTANCE_METADATA: Record<AuroraInstanceType, AuroraInstanceMetadata> = {
  'db.r6g.large': {
    name: 'db.r6g.large',
    vcpu: 2,
    memoryGB: 16,
    pricePerHour: 0.24,
  },
  'db.r6g.xlarge': {
    name: 'db.r6g.xlarge',
    vcpu: 4,
    memoryGB: 32,
    pricePerHour: 0.48,
  },
  'db.r6g.2xlarge': {
    name: 'db.r6g.2xlarge',
    vcpu: 8,
    memoryGB: 64,
    pricePerHour: 0.96,
  },
  'db.r6g.4xlarge': {
    name: 'db.r6g.4xlarge',
    vcpu: 16,
    memoryGB: 128,
    pricePerHour: 1.92,
  },
  'db.r6g.8xlarge': {
    name: 'db.r6g.8xlarge',
    vcpu: 32,
    memoryGB: 256,
    pricePerHour: 3.84,
  },
  'db.r6g.12xlarge': {
    name: 'db.r6g.12xlarge',
    vcpu: 48,
    memoryGB: 384,
    pricePerHour: 5.76,
  },
  'db.r6g.16xlarge': {
    name: 'db.r6g.16xlarge',
    vcpu: 64,
    memoryGB: 512,
    pricePerHour: 7.68,
  },
};
