export interface FinancialData {
    netIncome: number;
    price: number;
    earningsPerShare: number;
    year: number;
}

export interface GrowthMetrics {
    growthRate: number;
    peRatio: number;
    growthToPeRatio: number;
    isGrowthHigherThanPe: boolean;
} 