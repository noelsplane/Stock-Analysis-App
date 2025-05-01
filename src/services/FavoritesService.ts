import { Stock } from '../types/favorites';

const FAVORITES_KEY = 'stockAnalyzer_favorites';

export const FavoritesService = {
  getFavorites: (): Stock[] => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
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
  }
}; 
