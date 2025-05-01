import {
    calculateGrowthRate,
    calculatePeRatio,
    calculateGrowthToPeRatio,
    calculateGrowthMetrics
} from './financialCalculations';

describe('Financial Calculations', () => {
    const mockFinancialData = [
        { netIncome: 1000000, price: 0, earningsPerShare: 0, year: 2020 },
        { netIncome: 1200000, price: 0, earningsPerShare: 0, year: 2021 },
        { netIncome: 1500000, price: 0, earningsPerShare: 0, year: 2022 }
    ];

    describe('calculateGrowthRate', () => {
        it('should calculate correct growth rate', () => {
            const growthRate = calculateGrowthRate(mockFinancialData);
            // Expected growth rate from 1M to 1.5M over 2 years
            expect(growthRate).toBeCloseTo(22.47, 2);
        });

        it('should throw error with insufficient data', () => {
            expect(() => calculateGrowthRate([mockFinancialData[0]])).toThrow();
        });
    });

    describe('calculatePeRatio', () => {
        it('should calculate correct P/E ratio', () => {
            const peRatio = calculatePeRatio(100, 5);
            expect(peRatio).toBe(20);
        });

        it('should throw error with zero or negative EPS', () => {
            expect(() => calculatePeRatio(100, 0)).toThrow();
            expect(() => calculatePeRatio(100, -5)).toThrow();
        });
    });

    describe('calculateGrowthToPeRatio', () => {
        it('should calculate correct Growth/P-E ratio', () => {
            const ratio = calculateGrowthToPeRatio(20, 10);
            expect(ratio).toBe(2);
        });
    });

    describe('calculateGrowthMetrics', () => {
        const testData = [
            { netIncome: 1000000, price: 100, earningsPerShare: 5, year: 2020 },
            { netIncome: 1200000, price: 100, earningsPerShare: 6, year: 2021 },
            { netIncome: 1500000, price: 100, earningsPerShare: 7.5, year: 2022 }
        ];

        it('should calculate all metrics correctly', () => {
            const metrics = calculateGrowthMetrics(testData, 100);
            
            expect(metrics.growthRate).toBeCloseTo(22.47, 2);
            expect(metrics.peRatio).toBeCloseTo(13.33, 2);
            expect(metrics.growthToPeRatio).toBeCloseTo(1.69, 2);
            expect(metrics.isGrowthHigherThanPe).toBe(true);
        });
    });
}); 