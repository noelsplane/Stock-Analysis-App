
import { Stock } from '../types/stock';

class FavoritesService {
  private static favorites: Stock[] = [];

  static getFavorites(): Stock[] {
    return this.favorites;
  }

  static addFavorite(stock: Stock): void {
    if (!this.isFavorite(stock.ticker)) {
      this.favorites.push(stock);
    }
  }

  static removeFavorite(ticker: string): void {
    this.favorites = this.favorites.filter(f => f.ticker !== ticker);
  }

  static isFavorite(ticker: string): boolean {
    return this.favorites.some(f => f.ticker === ticker);
  }
}

export default FavoritesService;
