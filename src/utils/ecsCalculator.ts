import type { EcsConfig, EcsCostBreakdown } from '../types/ecs';
import type { GenericCostBreakdown } from '../types/comparison';
import { ECS_ARCHITECTURE_METADATA } from '../types/ecs';

export function calculateEcsCosts(config: EcsConfig): EcsCostBreakdown {
  const metadata = ECS_ARCHITECTURE_METADATA[config.architecture];

  const cpuCost = config.vCPU * metadata.pricePerVCPUHour * config.monthlyHours;
  const memoryCost = config.memoryGB * metadata.pricePerGBHour * config.monthlyHours;
  const totalCost = cpuCost + memoryCost;

  return {
    cpuCost,
    memoryCost,
    totalCost,
  };
}

export function ecsCostToGeneric(breakdown: EcsCostBreakdown): GenericCostBreakdown {
  return {
    items: [
      { label: 'vCPU Cost', cost: breakdown.cpuCost },
      { label: 'Memory Cost', cost: breakdown.memoryCost },
    ],
    total: breakdown.totalCost,
  };
}
