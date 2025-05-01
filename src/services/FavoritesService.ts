import { Stock } from '../types/favorites';

// Key for localStorage
const FAVORITES_KEY = 'stockAnalyzer_favorites';

// Favorites service implementation
export const FavoritesService = {
  // Get all favorite stocks
  getFavorites: (): Stock[] => {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  },

  // Add a stock to favorites
  addFavorite: (stock: Stock): void => {
    const favorites = FavoritesService.getFavorites();
    // Check if the stock is already in the favorites
    if (!favorites.some(f => f.ticker === stock.ticker)) {
      favorites.push(stock);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  },

  // Remove a stock from favorites
  removeFavorite: (ticker: string): void => {
    const favorites = FavoritesService.getFavorites();
    const updatedFavorites = favorites.filter(f => f.ticker !== ticker);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  // Check if a stock is favorited
  isFavorite: (ticker: string): boolean => {
    const favorites = FavoritesService.getFavorites();
    return favorites.some(f => f.ticker === ticker);
  }
};

