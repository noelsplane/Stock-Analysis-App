
interface Stock {
  ticker: string;
  name: string;
  industry: string;
  // Add other properties here
}

class FavoritesService {
  static getFavorites(): Stock[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  static addFavorite(stock: Stock) {
    const favorites = this.getFavorites();
    favorites.push(stock);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  static removeFavorite(ticker: string) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(f => f.ticker !== ticker);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  static isFavorite(ticker: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(f => f.ticker === ticker);
  }
}

export default FavoritesService;
