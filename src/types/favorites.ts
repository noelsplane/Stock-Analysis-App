import { GrowthMetrics } from './financialTypes';

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

export interface StockData extends Stock {
  symbol: string;
  high52Week: number;
  low52Week: number;
  netIncome: Array<{
    year: number;
    value: number;
  }>;
  growthMetrics?: GrowthMetrics;
}

export interface StockMetricsProps {
  data: StockData | null;
  isLoading: boolean;
  error: string | null;
}

export interface StockQueryFormProps {
  onSubmit: (ticker: string) => void;
  isLoading: boolean;
}
