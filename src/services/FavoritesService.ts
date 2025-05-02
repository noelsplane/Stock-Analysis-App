interface Stock {
  ticker: string;
  name: string;
  industry: string;
  // Add other properties as needed
}

class FavoritesService {
  // Get the list of favorite stocks from localStorage
  static getFavorites(): Stock[] {
    try {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch (e) {
      console.error("Failed to parse favorites from localStorage", e);
      return [];
    }
  }

  // Add a stock to the favorites list in localStorage
  static addFavorite(stock: Stock) {
    const favorites = this.getFavorites();
    if (!favorites.find(f => f.ticker === stock.ticker)) {
      favorites.push(stock);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
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
