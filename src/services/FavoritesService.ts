import { FavoriteStock } from '../types/stock';

const FAVORITES_KEY = 'favorites';

export const FavoritesService = {
  getFavorites: (): FavoriteStock[] => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  addFavorite: (stock: FavoriteStock): void => {
    const favorites = FavoritesService.getFavorites();
    if (!favorites.some(f => f.symbol === stock.symbol)) {
      favorites.push(stock);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  },

  removeFavorite: (symbol: string): void => {
    const favorites = FavoritesService.getFavorites();
    const updatedFavorites = favorites.filter(f => f.symbol !== symbol);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  isFavorite: (symbol: string): boolean => {
    const favorites = FavoritesService.getFavorites();
    return favorites.some(f => f.symbol === symbol);
  }
}; 
