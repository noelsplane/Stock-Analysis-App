import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { StockData } from '../types/stock';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const industries = ['all', ...new Set(favorites.map(stock => stock.industry || 'Unknown'))];

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
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          {industries.map(industry => (
            <option key={industry} value={industry}>
              {industry.charAt(0).toUpperCase() + industry.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="favorites-grid">
        {filteredFavorites.length === 0 ? (
          <div className="no-favorites">
            <p>No favorite stocks found.</p>
            <p>Add stocks to your favorites to see them here.</p>
          </div>
        ) : (
          filteredFavorites.map((stock: StockData) => (
            <div key={stock.symbol} className="favorite-card">
              <div className="card-header">
                <h3>{stock.symbol}</h3>
                <button
                  onClick={() => removeFavorite(stock.symbol)}
                  className="remove-btn"
                  aria-label="Remove from favorites"
                >
                  ×
                </button>
              </div>
              <div className="card-content">
                <p className="stock-name">{stock.name}</p>
                <div className="stock-info">
                  <div className="info-row">
                    <span className="label">Price</span>
                    <span className="value">${stock.price.toFixed(2)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Market Cap</span>
                    <span className="value">${(stock.marketCap / 1e9).toFixed(2)}B</span>
                  </div>
                  <div className="info-row">
                    <span className="label">P/E Ratio</span>
                    <span className="value">{stock.peRatio.toFixed(2)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Dividend Yield</span>
                    <span className={`value ${stock.dividendYield > 0 ? 'positive' : 'negative'}`}>
                      {stock.dividendYield.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 
