// src/utils/financialCalculations.ts

// Define the type for the data parameter (assuming netIncome and year are present)
interface FinancialData {
  netIncome: number; // The net income for a given year
  year: number; // The year of the data point
}

// Function for calculating growth rate
export const calculateGrowthRate = (data: FinancialData[]): number => {
  if (data.length < 2) {
    throw new Error('Insufficient data to calculate growth rate.');
  }
  const start = data[0].netIncome;
  const end = data[data.length - 1].netIncome;
  const years = data.length - 1;
  return ((end - start) / start) * 100 / years;
};

// Function to calculate P/E ratio
export const calculatePeRatio = (price: number, earningsPerShare: number): number => {
  if (earningsPerShare <= 0) {
    throw new Error('Earnings per share must be greater than zero.');
  }
  return price / earningsPerShare;
};

// Function to calculate growth-to-P/E ratio
export const calculateGrowthToPeRatio = (growthRate: number, peRatio: number): number => {
  if (peRatio === 0) {
    throw new Error('P/E ratio cannot be zero.');
  }
  return growthRate / peRatio;
};

// Function to calculate growth metrics (combined)
export const calculateGrowthMetrics = (data: FinancialData[], price: number) => {
  const growthRate = calculateGrowthRate(data);
  const earningsPerShare = data[data.length - 1].netIncome / price;
  const peRatio = calculatePeRatio(price, earningsPerShare);
  const growthToPeRatio = calculateGrowthToPeRatio(growthRate, peRatio);

  return {
    growthRate,
    peRatio,
    growthToPeRatio,
    isGrowthHigherThanPe: growthRate > peRatio,
  };
};
