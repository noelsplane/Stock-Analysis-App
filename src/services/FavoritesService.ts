interface Stock {
  ticker: string;
  name: string;
  industry: string;
  // Add other properties as needed
}

class FavoritesService {
  // Get the list of favorite stocks from localStorage
  static getFavorites(): Stock[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  // Add a stock to the favorites list in localStorage
  static addFavorite(stock: Stock) {
    const favorites = this.getFavorites();
    favorites.push(stock);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Remove a stock from the favorites list in localStorage by ticker
  static removeFavorite(ticker: string) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(f => f.ticker !== ticker);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Check if a stock is in the favorites list
  static isFavorite(ticker: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(f => f.ticker === ticker);
  }
}

export default FavoritesService;

