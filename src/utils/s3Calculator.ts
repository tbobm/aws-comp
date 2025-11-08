import type { S3StorageConfig, S3CostBreakdown, S3StorageTier } from '../types/s3';
import type { GenericCostBreakdown } from '../types/comparison';
import pricingData from '../../data/pricing/aws-pricing.json';

const TIER_STORAGE_CLASS_MAP: Record<S3StorageTier, string[]> = {
  STANDARD: ['S3-Standard', 'S3-Storage'],
  STANDARD_IA: ['S3-StandardIA', 'S3-SIA'],
  ONEZONE_IA: ['S3-OneZone-IA', 'S3-OZ-IA'],
  GLACIER_INSTANT: ['S3-Glacier-Instant', 'S3-GIR'],
  GLACIER_FLEXIBLE: ['S3-Glacier-Flexible', 'S3-Glacier'],
  GLACIER_DEEP: ['S3-Glacier-Deep', 'S3-GDA'],
};

function findPricingItem(usageType: string, operation?: string): number {
  const item = pricingData.s3.find((item) => {
    const matchesUsage = item.attributes.usagetype?.includes(usageType);
    const matchesOp = !operation || item.attributes.operation === operation;
    return matchesUsage && matchesOp;
  });

  return item ? parseFloat(item.pricePerUnit) : 0;
}

function getStoragePricePerGB(tier: S3StorageTier): number {
  const storageClasses = TIER_STORAGE_CLASS_MAP[tier];

  for (const storageClass of storageClasses) {
    const price = findPricingItem(`TimedStorage-${storageClass}`);
    if (price > 0) return price;
  }

  switch (tier) {
    case 'STANDARD':
      return 0.023;
    case 'STANDARD_IA':
      return 0.0125;
    case 'ONEZONE_IA':
      return 0.01;
    case 'GLACIER_INSTANT':
      return 0.004;
    case 'GLACIER_FLEXIBLE':
      return 0.0036;
    case 'GLACIER_DEEP':
      return 0.00099;
    default:
      return 0;
  }
}

function getPutRequestPrice(tier: S3StorageTier): number {
  switch (tier) {
    case 'STANDARD':
    case 'STANDARD_IA':
    case 'ONEZONE_IA':
      return 0.005 / 1000;
    case 'GLACIER_INSTANT':
    case 'GLACIER_FLEXIBLE':
    case 'GLACIER_DEEP':
      return 0.02 / 1000;
    default:
      return 0;
  }
}

function getGetRequestPrice(tier: S3StorageTier): number {
  switch (tier) {
    case 'STANDARD':
      return 0.0004 / 1000;
    case 'STANDARD_IA':
    case 'ONEZONE_IA':
      return 0.001 / 1000;
    case 'GLACIER_INSTANT':
      return 0.01 / 1000;
    case 'GLACIER_FLEXIBLE':
      return 0.0004 / 1000;
    case 'GLACIER_DEEP':
      return 0.0004 / 1000;
    default:
      return 0;
  }
}

function getDataTransferPrice(gb: number): number {
  if (gb <= 0) return 0;
  if (gb <= 10240) return 0.09;
  if (gb <= 51200) return 0.085;
  if (gb <= 153600) return 0.07;
  return 0.05;
}

export function calculateS3Costs(config: S3StorageConfig): S3CostBreakdown {
  const storagePrice = getStoragePricePerGB(config.tier);
  const putPrice = getPutRequestPrice(config.tier);
  const getPrice = getGetRequestPrice(config.tier);

  const storageCost = config.storageGB * storagePrice;
  const putRequestsCost = config.putRequests * putPrice;
  const getRequestsCost = config.getRequests * getPrice;

  const dataTransferPrice = getDataTransferPrice(config.dataTransferGB);
  const dataTransferCost = config.dataTransferGB * dataTransferPrice;

  const totalCost = storageCost + putRequestsCost + getRequestsCost + dataTransferCost;

  return {
    storageCost,
    putRequestsCost,
    getRequestsCost,
    dataTransferCost,
    totalCost,
  };
}

export function s3CostToGeneric(breakdown: S3CostBreakdown): GenericCostBreakdown {
  return {
    items: [
      { label: 'Storage', cost: breakdown.storageCost },
      { label: 'PUT Requests', cost: breakdown.putRequestsCost },
      { label: 'GET Requests', cost: breakdown.getRequestsCost },
      { label: 'Data Transfer', cost: breakdown.dataTransferCost },
    ],
    total: breakdown.totalCost,
  };
}
