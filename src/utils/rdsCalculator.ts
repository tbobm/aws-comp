import type {
  AuroraConfig,
  AuroraCostBreakdown,
  AuroraServerlessV2Config,
  AuroraProvisionedConfig,
} from '../types/rds';
import type { GenericCostBreakdown } from '../types/comparison';
import { AURORA_INSTANCE_METADATA } from '../types/rds';

const HOURS_PER_MONTH = 730;

function calculateServerlessV2Costs(config: AuroraServerlessV2Config): AuroraCostBreakdown {
  const acuPricePerHour = 0.12;

  const avgACU = (config.minACU + config.maxACU) / 2;
  const computeCost = avgACU * acuPricePerHour * HOURS_PER_MONTH;

  const storagePricePerGB = 0.10;
  const storageCost = config.storageGB * storagePricePerGB;

  const ioPricePerMillion = 0.20;
  const ioCost = (config.ioRequests / 1000000) * ioPricePerMillion;

  const backupPricePerGB = 0.021;
  const backupCost = config.backupStorageGB * backupPricePerGB;

  const totalCost = computeCost + storageCost + ioCost + backupCost;

  return {
    computeCost,
    storageCost,
    ioCost,
    backupCost,
    totalCost,
  };
}

function calculateProvisionedCosts(config: AuroraProvisionedConfig): AuroraCostBreakdown {
  const instanceMetadata = AURORA_INSTANCE_METADATA[config.instanceType];
  const computeCost = instanceMetadata.pricePerHour * HOURS_PER_MONTH * config.instanceCount;

  const storagePricePerGB = 0.10;
  const storageCost = config.storageGB * storagePricePerGB;

  const ioPricePerMillion = 0.20;
  const ioCost = (config.ioRequests / 1000000) * ioPricePerMillion;

  const backupPricePerGB = 0.021;
  const backupCost = config.backupStorageGB * backupPricePerGB;

  const totalCost = computeCost + storageCost + ioCost + backupCost;

  return {
    computeCost,
    storageCost,
    ioCost,
    backupCost,
    totalCost,
  };
}

export function calculateAuroraCosts(auroraConfig: AuroraConfig): AuroraCostBreakdown {
  if (auroraConfig.type === 'SERVERLESS_V2') {
    return calculateServerlessV2Costs(auroraConfig.config);
  } else {
    return calculateProvisionedCosts(auroraConfig.config);
  }
}

export function auroraCostToGeneric(breakdown: AuroraCostBreakdown): GenericCostBreakdown {
  return {
    items: [
      { label: 'Compute', cost: breakdown.computeCost },
      { label: 'Storage', cost: breakdown.storageCost },
      { label: 'I/O Requests', cost: breakdown.ioCost },
      { label: 'Backup Storage', cost: breakdown.backupCost },
    ],
    total: breakdown.totalCost,
  };
}
