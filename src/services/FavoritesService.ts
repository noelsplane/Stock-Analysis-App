import { StockData } from '../types/stock';

const STORAGE_KEY = 'favoriteStocks';

export class FavoritesService {
  static async getFavorites(): Promise<StockData[]> {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static async addFavorite(stock: StockData): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.some(fav => fav.symbol === stock.symbol)) {
      favorites.push(stock);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }

  static async removeFavorite(symbol: string): Promise<void> {
    const favorites = await this.getFavorites();
    const updatedFavorites = favorites.filter(stock => stock.symbol !== symbol);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
  }

  static async isFavorite(symbol: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.some(fav => fav.symbol === symbol);
  }
} 
