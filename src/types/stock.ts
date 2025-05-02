import { GrowthMetrics } from './financial';

export interface Stock {
  ticker: string;
  name: string;
  industry: string;
  sector: string;
  price: number;
  marketCap: number;
  volume: number;
  lastUpdated: string;
}

export interface StockData {
  symbol: string;
  price: number;
  high52Week: number;
  low52Week: number;
  netIncome: Array<{
    year: number;
    value: number;
  }>;
}

export interface StockMetricsProps {
  data: StockData | null;
  isLoading: boolean;
  error: string | null;
  growthMetrics: GrowthMetrics | null;
  errorMessage: string | null;
} 
