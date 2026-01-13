export type EcsArchitecture = 'x86' | 'arm';

export interface EcsConfig {
  architecture: EcsArchitecture;
  vCPU: number;
  memoryGB: number;
  monthlyHours: number;
}

export interface EcsCostBreakdown {
  cpuCost: number;
  memoryCost: number;
  totalCost: number;
}

export interface EcsVcpuTier {
  vCPU: number;
  description: string;
}

export const ECS_VCPU_TIERS: EcsVcpuTier[] = [
  { vCPU: 0.25, description: 'Minimal (0.25 vCPU)' },
  { vCPU: 0.5, description: 'Light (0.5 vCPU)' },
  { vCPU: 1, description: 'Standard (1 vCPU)' },
  { vCPU: 2, description: 'Medium (2 vCPU)' },
  { vCPU: 4, description: 'High (4 vCPU)' },
  { vCPU: 8, description: 'Very High (8 vCPU)' },
];

export interface EcsMemoryRange {
  minGB: number;
  maxGB: number;
}

export const ECS_MEMORY_RANGES: Record<number, EcsMemoryRange> = {
  0.25: { minGB: 0.5, maxGB: 2 },
  0.5: { minGB: 1, maxGB: 4 },
  1: { minGB: 2, maxGB: 8 },
  2: { minGB: 4, maxGB: 16 },
  4: { minGB: 8, maxGB: 30 },
  8: { minGB: 16, maxGB: 60 },
  16: { minGB: 32, maxGB: 120 },
};

export interface EcsArchitectureMetadata {
  name: string;
  description: string;
  pricePerVCPUHour: number;
  pricePerGBHour: number;
}

export const ECS_ARCHITECTURE_METADATA: Record<EcsArchitecture, EcsArchitectureMetadata> = {
  x86: {
    name: 'x86_64',
    description: 'Standard x86 architecture',
    pricePerVCPUHour: 0.04048,
    pricePerGBHour: 0.004445,
  },
  arm: {
    name: 'ARM Graviton2',
    description: 'ARM-based architecture (~20% cheaper)',
    pricePerVCPUHour: 0.03238,
    pricePerGBHour: 0.003556,
  },
};
