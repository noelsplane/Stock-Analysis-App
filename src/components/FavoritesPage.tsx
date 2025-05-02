import React, { useState } from 'react';
import { Stock } from '../types/stock';
import FavoritesService from '../services/FavoritesService';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const favorites = FavoritesService.getFavorites();

  // Get unique industries from favorites
  const industries = Array.from(new Set(favorites.map(stock => stock.industry)));
  
  // Filter favorites by selected industry
  const filteredFavorites = selectedIndustry === 'all' 
    ? favorites 
    : favorites.filter(stock => stock.industry === selectedIndustry);

  return (
    <div className="favorites-container">
      <div className="industry-filter">
        <select 
          value={selectedIndustry} 
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          <option value="all">All Industries</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div className="favorites-grid">
        {filteredFavorites.map(stock => (
          <div key={stock.ticker} className="favorite-card">
            <h3>{stock.ticker}</h3>
            <p>Industry: {stock.industry}</p>
            <p>Price: ${stock.price.toFixed(2)}</p>
            <button 
              className="remove-button"
              onClick={() => FavoritesService.removeFavorite(stock.ticker)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage; 
