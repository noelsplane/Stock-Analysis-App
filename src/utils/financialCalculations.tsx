// src/utils/financialCalculations.tsx
// src/utils/financialCalculations.tsx
import React from 'react';

// Function for calculating growth rate
export const calculateGrowthRate = (data: any[]) => {
  if (data.length < 2) {
    throw new Error('Insufficient data to calculate growth rate.');
  }
  const start = data[0].netIncome;
  const end = data[data.length - 1].netIncome;
  const years = data.length - 1;
  return ((end - start) / start) * 100 / years;
};

// Function to calculate P/E ratio
export const calculatePeRatio = (price: number, earningsPerShare: number) => {
  if (earningsPerShare <= 0) {
    throw new Error('Earnings per share must be greater than zero.');
  }
  return price / earningsPerShare;
};

// Function to calculate growth-to-P/E ratio
export const calculateGrowthToPeRatio = (growthRate: number, peRatio: number) => {
  if (peRatio === 0) {
    throw new Error('P/E ratio cannot be zero.');
  }
  return growthRate / peRatio;
};

// Loading component to display loading message
export const LoadingComponent: React.FC = () => {
  return <div className="loading">Loading stock data...</div>;
};

// Export everything together
export { LoadingComponent };
