import { FinancialData, GrowthMetrics } from '../types/financial';

/**
 * Calculates the growth rate based on net income over time
 * @param data Array of financial data points
 * @returns Growth rate as a percentage
 */
export const calculateGrowthRate = (data: FinancialData[]): number => {
    if (data.length < 2) {
        throw new Error('At least two data points are required to calculate growth rate');
    }

    // Sort data by year to ensure chronological order
    const sortedData = [...data].sort((a, b) => a.year - b.year);
    const oldestIncome = sortedData[0].netIncome;
    const newestIncome = sortedData[sortedData.length - 1].netIncome;
    const years = sortedData[sortedData.length - 1].year - sortedData[0].year;

    // Calculate compound annual growth rate (CAGR)
    const growthRate = Math.pow(newestIncome / oldestIncome, 1 / years) - 1;
    return growthRate * 100; // Convert to percentage
};

/**
 * Calculates the P/E ratio
 * @param price Current stock price
 * @param earningsPerShare Earnings per share
 * @returns P/E ratio
 */
export const calculatePeRatio = (price: number, earningsPerShare: number): number => {
    if (earningsPerShare <= 0) {
        throw new Error('Earnings per share must be positive to calculate P/E ratio');
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
        isGrowthHigherThanPe: growthRate > peRatio
    };
}; 