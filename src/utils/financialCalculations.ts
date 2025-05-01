import { StockData } from '../types/stock';

export interface GrowthMetrics {
  growthRate: number;
  peRatio: number;
  growthToPeRatio: number;
  isGrowthHigherThanPe: boolean;
}

export const calculateGrowthRate = (data: StockData): number => {
  if (!data.netIncome || data.netIncome.length < 2) return 0;
  
  const latestIncome = data.netIncome[0].value;
  const previousIncome = data.netIncome[1].value;
  
  return ((latestIncome - previousIncome) / previousIncome) * 100;
};

export const calculatePeRatio = (data: StockData): number => {
  if (!data.price || !data.earningsPerShare) return 0;
  return data.price / data.earningsPerShare;
};

export const calculateGrowthToPeRatio = (growthRate: number, peRatio: number): number => {
  if (peRatio === 0) return 0;
  return growthRate / peRatio;
};

export const calculateGrowthMetrics = (data: StockData): GrowthMetrics => {
  const growthRate = calculateGrowthRate(data);
  const peRatio = calculatePeRatio(data);
  const growthToPeRatio = calculateGrowthToPeRatio(growthRate, peRatio);
  
  return {
    growthRate,
    peRatio,
    growthToPeRatio,
    isGrowthHigherThanPe: growthRate > peRatio
  };
};
