import React, { useState, useEffect } from 'react';
import { FavoritesService } from '../services/FavoritesService';
import { Stock } from '../types/favorites';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Stock[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = (): void => {
    const savedFavorites = FavoritesService.getFavorites();
    setFavorites(savedFavorites);
  };

  const removeFavorite = (ticker: string): void => {
    FavoritesService.removeFavorite(ticker);
    loadFavorites();
  };

  // Get unique industries from favorites
  const industries = [...new Set(favorites.map(stock => stock.industry))];
  
  // Filter favorites by selected industry
  const filteredFavorites = selectedIndustry === 'all' 
    ? favorites 
    : favorites.filter(stock => stock.industry === selectedIndustry);

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
            <div key={stock.ticker} className="favorite-card">
              <div className="card-header">
                <h3>{stock.ticker}</h3>
                <button 
                  className="remove-btn"
                  onClick={() => removeFavorite(stock.ticker)}
                >
                  ×
                </button>
              </div>
              <div className="card-content">
                <p className="stock-name">{stock.name}</p>
                <div className="stock-info">
                  <div className="info-row">
                    <span className="label">Industry:</span>
                    <span className="value">{stock.industry}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Sector:</span>
                    <span className="value">{stock.sector}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Price:</span>
                    <span className="value">${stock.price.toLocaleString()}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Market Cap:</span>
                    <span className="value">${stock.marketCap.toLocaleString()}</span>
                  </div>
                </div>
                <div className="last-updated">
                  Last updated: {new Date(stock.lastUpdated).toLocaleString()}
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
