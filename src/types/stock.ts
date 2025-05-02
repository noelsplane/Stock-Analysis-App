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

export interface StockData extends Stock {
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
