import { useState, useEffect } from 'react';
import { FavoritesService } from '../services/FavoritesService';
import { FavoriteStock } from '../types/stock';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteStock[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = (): void => {
    const savedFavorites = FavoritesService.getFavorites();
    setFavorites(savedFavorites);
  };

  const removeFavorite = (symbol: string): void => {
    FavoritesService.removeFavorite(symbol);
    loadFavorites();
  };

  // Get unique industries from favorites
  const industries = [...new Set(favorites.map(stock => stock.industry))];
  
  // Filter favorites by selected industry
  const filteredFavorites = selectedIndustry === 'all' 
    ? favorites 
    : favorites.filter((stock: FavoriteStock) => stock.industry === selectedIndustry);

  return (
    <div className="favorites-page">
      <h1>Favorite Stocks</h1>
      
      <div className="industry-filter">
        <label htmlFor="industry-select">Filter by Industry:</label>
        <select 
          id="industry-select"
          value={selectedIndustry}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedIndustry(e.target.value)}
        >
          <option value="all">All Industries</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="no-favorites">
          <p>No favorites yet!</p>
          <p>Add stocks to your favorites from the stock details page.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {filteredFavorites.map((stock) => (
            <div key={stock.symbol} className="favorite-card">
              <div className="card-header">
                <h3>{stock.symbol}</h3>
                <button 
                  className="remove-btn"
                  onClick={() => removeFavorite(stock.symbol)}
                >
                  ×
                </button>
              </div>
              <div className="card-content">
                <p className="stock-name">{stock.companyName}</p>
                <div className="stock-info">
                  <div className="info-row">
                    <span className="label">Industry:</span>
                    <span className="value">{stock.industry}</span>
                  </div>
                  {stock.lastPrice && (
                    <div className="info-row">
                      <span className="label">Price:</span>
                      <span className="value">${stock.lastPrice.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                <div className="last-updated">
                  Added: {new Date(stock.addedAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 
