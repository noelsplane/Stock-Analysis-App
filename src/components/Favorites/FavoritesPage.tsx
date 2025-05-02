import React, { useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { FavoriteStock } from '../../types/stock';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  // Get unique industries
  const industries = ['all', ...new Set(favorites.map(fav => fav.industry))];

  // Filter favorites by selected industry
  const filteredFavorites = selectedIndustry === 'all'
    ? favorites
    : favorites.filter(fav => fav.industry === selectedIndustry);

  return (
    <div className="favorites-page">
      <h1>Favorite Stocks</h1>
      
      <div className="industry-filter">
        <label htmlFor="industry-select">Filter by Industry: </label>
        <select
          id="industry-select"
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="form-control"
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
          <p>No favorite stocks found.</p>
        ) : (
          filteredFavorites.map((stock: FavoriteStock) => (
            <div key={stock.symbol} className="favorite-card">
              <h3>{stock.symbol}</h3>
              <p className="company-name">{stock.companyName}</p>
              <p className="industry">Industry: {stock.industry}</p>
              {stock.lastPrice && (
                <p className="price">
                  Price: ${stock.lastPrice.toFixed(2)}
                  {stock.change && (
                    <span className={stock.change >= 0 ? 'positive' : 'negative'}>
                      ({stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%)
                    </span>
                  )}
                </p>
              )}
              <button
                onClick={() => removeFavorite(stock.symbol)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 