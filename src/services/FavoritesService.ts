// FavoritesService - Manages favorite stocks in localStorage

// Stock interface defined locally to avoid import issues
interface Stock {
  ticker: string;
  name: string;
  industry: string;
  sector: string;
  price: number;
  marketCap: number;
  volume: number;
  lastUpdated: string;
}

const FAVORITES_KEY = 'stockAnalyzer_favorites';

export const FavoritesService = {
  getFavorites: (): Stock[] => {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  },

  addFavorite: (stock: Stock): void => {
    const favorites = FavoritesService.getFavorites();
    if (!favorites.some(f => f.ticker === stock.ticker)) {
      favorites.push(stock);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  },

  removeFavorite: (ticker: string): void => {
    const favorites = FavoritesService.getFavorites();
    const updatedFavorites = favorites.filter(f => f.ticker !== ticker);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  isFavorite: (ticker: string): boolean => {
    const favorites = FavoritesService.getFavorites();
    return favorites.some(f => f.ticker === ticker);
  },

  // New method to clear all favorites
  clearFavorites: (): void => {
    localStorage.removeItem(FAVORITES_KEY);
  },

  // Get favorites grouped by industry
  getFavoritesByIndustry: (): Record<string, Stock[]> => {
    const favorites = FavoritesService.getFavorites();
    return favorites.reduce((acc, stock) => {
      const industry = stock.industry || 'Uncategorized';
      if (!acc[industry]) {
        acc[industry] = [];
      }
      acc[industry].push(stock);
      return acc;
    }, {} as Record<string, Stock[]>);
  }
}; 
