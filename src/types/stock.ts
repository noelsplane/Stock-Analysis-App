export interface StockData {
  symbol: string;
  price: number;
  high52Week: number;
  low52Week: number;
  netIncome: {
    year: number;
    value: number;
  }[];
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