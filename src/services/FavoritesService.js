const FAVORITES_KEY = 'stockAnalyzer_favorites';

export const FavoritesService = {
  getFavorites: () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  addFavorite: (stock) => {
    const favorites = FavoritesService.getFavorites();
    if (!favorites.some(f => f.ticker === stock.ticker)) {
      const favoriteStock = {
        ticker: stock.ticker,
        name: stock.name,
        industry: stock.industry,
        sector: stock.sector,
        price: stock.price,
        marketCap: stock.marketCap,
        volume: stock.volume,
        lastUpdated: new Date().toISOString()
      };
      favorites.push(favoriteStock);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  },

  removeFavorite: (ticker) => {
    const favorites = FavoritesService.getFavorites();
    const updatedFavorites = favorites.filter(f => f.ticker !== ticker);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  isFavorite: (ticker) => {
    const favorites = FavoritesService.getFavorites();
    return favorites.some(f => f.ticker === ticker);
  }
};
