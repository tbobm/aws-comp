export type LambdaArchitecture = 'x86' | 'arm';

export interface LambdaConfig {
  architecture: LambdaArchitecture;
  memoryMB: number;
  monthlyInvocations: number;
  avgDurationMs: number;
}

export interface LambdaCostBreakdown {
  requestCost: number;
  computeCost: number;
  totalCost: number;
}

export interface LambdaMemoryTier {
  memoryMB: number;
  description: string;
}

export const LAMBDA_MEMORY_TIERS: LambdaMemoryTier[] = [
  { memoryMB: 128, description: 'Minimal (128 MB)' },
  { memoryMB: 256, description: 'Low (256 MB)' },
  { memoryMB: 512, description: 'Light (512 MB)' },
  { memoryMB: 1024, description: 'Standard (1 GB)' },
  { memoryMB: 2048, description: 'Medium (2 GB)' },
  { memoryMB: 3008, description: 'High (3 GB)' },
  { memoryMB: 5120, description: 'Very High (5 GB)' },
  { memoryMB: 10240, description: 'Maximum (10 GB)' },
];

export interface LambdaArchitectureMetadata {
  name: string;
  description: string;
  pricePerGBSecond: number;
}

export const LAMBDA_ARCHITECTURE_METADATA: Record<LambdaArchitecture, LambdaArchitectureMetadata> = {
  x86: {
    name: 'x86_64',
    description: 'Standard x86 architecture',
    pricePerGBSecond: 0.0000166667,
  },
  arm: {
    name: 'ARM Graviton2',
    description: 'ARM-based architecture (~20% cheaper)',
    pricePerGBSecond: 0.0000133334,
  },
};
