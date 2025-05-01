interface FinancialData {
  netIncome: number;
  price: number;
  earningsPerShare: number;
  year: number;
}

interface GrowthMetrics {
  growthRate: number;
  peRatio: number;
  growthToPeRatio: number;
  isGrowthHigherThanPe: boolean;
}

export const calculateGrowthRate = (data: FinancialData[]): number => {
  if (data.length < 2) {
    throw new Error('Insufficient data to calculate growth rate');
  }

  const firstYear = data[0].netIncome;
  const lastYear = data[data.length - 1].netIncome;
  const years = data.length - 1;

  return ((lastYear / firstYear) ** (1 / years) - 1) * 100;
};

export const calculatePeRatio = (price: number, earningsPerShare: number): number => {
  if (earningsPerShare <= 0) {
    throw new Error('Earnings per share must be positive');
  }
  return price / earningsPerShare;
};

export const calculateGrowthToPeRatio = (growthRate: number, peRatio: number): number => {
  return growthRate / peRatio;
};

export const calculateGrowthMetrics = (data: FinancialData[], currentPrice: number): GrowthMetrics => {
  const growthRate = calculateGrowthRate(data);
  const peRatio = calculatePeRatio(currentPrice, data[data.length - 1].earningsPerShare);
  const growthToPeRatio = calculateGrowthToPeRatio(growthRate, peRatio);

  return {
    growthRate,
    peRatio,
    growthToPeRatio,
    isGrowthHigherThanPe: growthRate > peRatio
  };
};
