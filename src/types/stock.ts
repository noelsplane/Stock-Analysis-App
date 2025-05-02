import { GrowthMetrics } from './financial';

export interface Stock {
  symbol: string;
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
  name: string;
  price: number;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
  netIncome: number[];
  industry?: string;
  high52Week: number;
  low52Week: number;
  revenueGrowthRate?: number;
  netIncomeGrowthRate?: number;
  growthAdjustedPE?: number;
}

export interface StockMetricsProps {
  stockData: StockData;
}

export interface StockQueryFormProps {
  onSubmit: (symbol: string) => void;
  isLoading: boolean;
}

export interface FavoriteStock {
  symbol: string;
  companyName: string;
  industry: string;
  addedAt: string;
  lastPrice?: number;
  change?: number;
}

export interface FavoritesState {
  favorites: FavoriteStock[];
  loading: boolean;
  error: string | null;
}

export interface FavoritesContextType {
  favorites: FavoriteStock[];
  addFavorite: (stock: FavoriteStock) => void;
  removeFavorite: (symbol: string) => void;
  isFavorite: (symbol: string) => boolean;
  loading: boolean;
  error: string | null;
}
