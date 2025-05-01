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
  netIncome: {
    year: number;
    value: number;
  }[];
  growthMetrics?: GrowthMetrics;
}

export interface StockQueryFormProps {
  onSubmit: (symbol: string) => void;
  isLoading: boolean;
}

export interface StockMetricsProps {
  data: StockData | null;
  isLoading: boolean;
  error: string | null;
}
