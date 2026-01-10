import type { LambdaConfig, LambdaCostBreakdown } from '../types/lambda';
import type { GenericCostBreakdown } from '../types/comparison';
import { LAMBDA_ARCHITECTURE_METADATA } from '../types/lambda';

const REQUEST_PRICE_PER_MILLION = 0.20;

export function calculateLambdaCosts(config: LambdaConfig): LambdaCostBreakdown {
  const requestCost = (config.monthlyInvocations / 1_000_000) * REQUEST_PRICE_PER_MILLION;

  const gbSeconds = (config.memoryMB / 1024) * (config.avgDurationMs / 1000) * config.monthlyInvocations;

  const pricePerGBSecond = LAMBDA_ARCHITECTURE_METADATA[config.architecture].pricePerGBSecond;
  const computeCost = gbSeconds * pricePerGBSecond;

  const totalCost = requestCost + computeCost;

  return {
    requestCost,
    computeCost,
    totalCost,
  };
}

export function lambdaCostToGeneric(breakdown: LambdaCostBreakdown): GenericCostBreakdown {
  return {
    items: [
      { label: 'Lambda Requests', cost: breakdown.requestCost },
      { label: 'Compute Duration (GB-seconds)', cost: breakdown.computeCost },
    ],
    total: breakdown.totalCost,
  };
}
