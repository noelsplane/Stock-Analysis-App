import { FinancialData, GrowthMetrics } from '../types/financial';

/**
 * Calculates the growth rate based on net income over time
 * @param data Array of financial data points
 * @returns Growth rate as a percentage
 */
export const calculateGrowthRate = (data: FinancialData[]): number => {
    if (data.length < 2) {
        throw new Error('Insufficient data to calculate growth rate');
    }

    const firstYear = data[0].netIncome;
    const lastYear = data[data.length - 1].netIncome;
    const years = data.length - 1;

    return ((lastYear / firstYear) ** (1 / years) - 1) * 100;
};

/**
 * Calculates the P/E ratio
 * @param price Current stock price
 * @param earningsPerShare Earnings per share
 * @returns P/E ratio
 */
export const calculatePeRatio = (price: number, earningsPerShare: number): number => {
    if (earningsPerShare <= 0) {
        throw new Error('Earnings per share must be positive');
    }

    return price / earningsPerShare;
};

/**
 * Calculates the Growth/P-E ratio
 * @param growthRate Growth rate as a percentage
 * @param peRatio P/E ratio
 * @returns Growth/P-E ratio
 */
export const calculateGrowthToPeRatio = (growthRate: number, peRatio: number): number => {
    return growthRate / peRatio;
};

/**
 * Calculates all growth metrics for a given set of financial data
 * @param data Array of financial data points
 * @param currentPrice Current stock price
 * @returns Object containing all growth metrics
 */
export const calculateGrowthMetrics = (data: FinancialData[], currentPrice: number): GrowthMetrics => {
    const growthRate = calculateGrowthRate(data);
    const peRatio = calculatePeRatio(currentPrice, data[data.length - 1].earningsPerShare);
    const growthToPeRatio = calculateGrowthToPeRatio(growthRate, peRatio);

    return {
        growthRate,
        peRatio,
        growthToPeRatio,
        isGrowthHigherThanPe: growthToPeRatio > 1
    };
}; 
